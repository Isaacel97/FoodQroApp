import React, { useState, useEffect} from 'react'
import { ScrollView, View, Image, Modal } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Card, Text, Button, IconButton, TextInput } from 'react-native-paper'
import { styles } from './RestaurantDetail.styles'
import Loading from '../../../utils/Lotties/Loading'
import { FIREBASE_API_KEY, URL_GOOGLE_PLACE_PHOTO, URL_GOOGLE_PLACE_DETAILS } from '@env'
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from '../../../utils/styles/colors';
import { callToast } from '../../../api/commonFunctions'
const { getFavorite, addFavorite, deleteFavorite } = require('../../../api/favorites');
const { addComment, getComments, setLikes, getLikes } = require('../../../api/restaurants');

const RestaurantDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { item } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [meGusta, setMeGusta] = useState(false);
    const [noMeGusta, setNoMeGusta] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState();
    const [likesNumber, setLikesNumber] = useState(0);
    const [dislikesNumber, setDislikesNumber] = useState(0);

    const handleLikePress = async() => {
        setLoading(true);
        try {
            if (isLiked) {
                await deleteFavorite(item.place_id);
            } else {
                await addFavorite(item.place_id);
            }
        } catch (error) {
          console.error(error);  
        } finally {
            setLoading(false);
            setIsLiked((prevIsLiked) => !prevIsLiked);
        }
    };

    const handleCommentPress = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        console.log('cancel');
        setModalVisible(false);
        setComment('');
    };

    const handleSend = async() => {
        console.log('Comentario:', comment);
        if (!comment.trim()) {
            callToast('El comentario es obligatorio');
            return;
        }
        await addComment(item.place_id, comment);
        await getCommentsRestaurant();
        setModalVisible(false);
        setComment('');
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

    const calification = async(type, action) => {
        await setLikes(type, action, item.place_id);
        await getLikesRestaurant();
    }

    const getCommentsRestaurant = async () => {
        try {
            const res = await getComments(item.place_id);
            console.log('comentarios', res);
            setComments(res);
        } catch (error) {
            console.error('error getComments:', error);
        }
    }

    const getLikesRestaurant = async () => {
        try {
            const {likes, dislikes} = await getLikes(item.place_id);
            console.log('likes', likes, 'dislikes', dislikes);
            setLikesNumber(likes);
            setDislikesNumber(dislikes);
        } catch (error) {
            console.error('error getLikes:', error);
        }
    }

    const isFavorite = async () => {
        const res = await getFavorite(item.place_id);
        console.log('res', res);
        setIsLiked(res);
    }

    useEffect(() => {
        getRestaurant();
        getCommentsRestaurant();
        getLikesRestaurant();
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
        {!comments || !comments.length ? (
            <Text variant="bodyMedium">No hay comentarios</Text>
            ) : (
            comments.map((item, index) => (
                <Card key={index} style={styles.card}>
                <Card.Content>
                    <Text variant="bodyMedium">Usuario: {item.usuario}</Text>
                    <Text variant="bodyMedium">Comentario: {item.comentario}</Text>
                </Card.Content>
                </Card>
            ))
        )}

        <View style={styles.container}>
            <Button mode='contained' labelStyle={{ color: 'white' }} onPress={handleCommentPress}>
                Comentar
            </Button>
            
            <Text>{likesNumber}</Text>
            <IconButton
                icon="thumb-up-outline"
                color="black"
                size={20}
                onPress={() => calification('likes', 'add')}
            />

            <Text>{dislikesNumber}</Text>
            <IconButton
                icon="thumb-down-outline"
                color="black"
                size={20}
                onPress={() => calification('dislikes', 'add')}
            />
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(false);
            }}>
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                    <TextInput
                    multiline
                    placeholder="Escribe tu comentario"
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                    style={{ borderWidth: 1, borderColor: 'black', padding: 8, marginBottom: 10 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button 
                            mode='text'
                            onPress={() => handleCancel()}>
                            Cancelar
                        </Button>
                        <Button 
                            mode='text'
                            onPress={() => handleSend()}>
                            Enviar
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    </ScrollView>
  )
}

export default RestaurantDetail