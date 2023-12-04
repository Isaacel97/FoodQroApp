import React, { useState, useEffect} from 'react'
import { ScrollView, View, Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Card, Text, Button, IconButton } from 'react-native-paper'
import { styles } from './RestaurantDetail.styles'
import Loading from '../../../utils/Lotties/Loading'
import { FIREBASE_API_KEY, URL_GOOGLE_PLACE_PHOTO, URL_GOOGLE_PLACE_DETAILS } from '@env'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from '../../../utils/styles/colors';
const { getFavorite, addFavorite, deleteFavorite } = require('../../../api/favorites');

const RestaurantDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { item } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    const handleLikePress = async() => {
        if (isLiked) {
            await deleteFavorite(item.place_id);
        } else {
            await addFavorite(item.place_id);
        }
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };

    const getRestaurant = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${URL_GOOGLE_PLACE_DETAILS}place_id=${item.place_id}&key=${FIREBASE_API_KEY}`);
            const result = await res.json();
            console.log('result', result);
            setRestaurant(result.result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const isFavorite = async () => {
        const res = await getFavorite(item.place_id);
        console.log('res', res);
        setIsLiked(res);
    }

    useEffect(() => {
        getRestaurant();
        isFavorite();
    }, [item])

    useEffect(() => {
        navigation.setOptions({
            title: `Detalles ${restaurant?.name || ''}`,
            headerRight: () => (
                <AwesomeIcon 
                    name={isLiked ? 'heart' : 'heart-o'}
                    size={25}
                    color={isLiked ? colors.primary : 'black'}
                    style={{marginHorizontal: 8}}
                    onPress={handleLikePress}
                />
            ),
        });
    }, [restaurant, isLiked, handleLikePress, navigation])

    const getUrlPhoto = () => {
        const ref = item.photos && item.photos.length > 0 && item.photos[0].photo_reference
        if (!ref) {
            return item.icon;
        }
        const img = `${URL_GOOGLE_PLACE_PHOTO}maxwidth=400&photoreference=${ref}&key=${FIREBASE_API_KEY}`
        return img;
    }

  return loading ? (<Loading/>) : (
    <ScrollView style={{marginHorizontal: 16}}>
        <Image source={{ uri: getUrlPhoto() }} style={styles.image} />
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>Información: </Text>
        <Card style={styles.card}>
            <Card.Content>
                <Text variant="bodyMedium">Dirección: {restaurant.vicinity}</Text>
                <Text variant="bodyMedium">Telefono: {restaurant.formatted_phone_number}</Text>
                <Text variant="bodyMedium">Estado: {restaurant.opening_hours && restaurant.opening_hours.open_now ? 'Abierto' : 'Cerrado'}</Text>
                {restaurant.opening_hours && restaurant.opening_hours.weekday_text ? (
                    <>
                        <Text variant="bodyMedium">Horarios: </Text>
                        {restaurant.opening_hours.weekday_text.map((item, index) => (
                            <Text key={index}>{item}</Text>
                        ))}
                    </>
                ) : (null)}
            </Card.Content>
        </Card>

        <Text style={styles.subtitle}>Comentarios: </Text>
        <View style={styles.container}>
            <Button mode='contained' labelStyle={{ color: 'white' }} onPress={() => console.log('Comentar')}>
                Comentar
            </Button>
            
            <IconButton
                icon="thumb-up-outline"
                color="black"
                size={20}
                onPress={() => console.log('Pressed')}
            />

            <IconButton
                icon="thumb-down-outline"
                color="black"
                size={20}
                onPress={() => console.log('Pressed')}
            />
        </View>
    </ScrollView>
  )
}

export default RestaurantDetail