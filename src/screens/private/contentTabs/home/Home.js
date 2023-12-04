import React, { useState, useEffect, useRef } from 'react'
import { View, ScrollView } from 'react-native'
import { Button, Card, Title, Paragraph, FAB } from 'react-native-paper'
import { styles } from './Home.styles'
import colors from '../../../../utils/styles/colors'
import { FIREBASE_API_KEY, URL_GOOGLE_NEARBY_SEARCH } from "@env"
import * as Location from 'expo-location';
import Loading from '../../../../utils/Lotties/Loading'
import { constants } from '../../../../utils/constants/constants'
import { callToast } from '../../../../api/commonFunctions'

const Home = ({ navigation }) => {
  const categorias = [
    {nombre: 'Restaurant'},
    {nombre: 'Cafe'},
    {nombre: 'Bar'},
  ]
  const [selectedCategory, setSelectedCategory] = useState(categorias[0].nombre);
  const [restaurants, setRestaurants] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const fetchRef = useRef(null);

  const changeCat = async(cat) => {
    setSelectedCategory((prevCategory) => {
      if (prevCategory === cat) {
        return prevCategory;
      }
      fetchRestaurants(cat);
      return cat;
    });
  }

  const goToRestaurantDetail = (item) => {
    navigation.navigate(constants.SCREENS.RESTAURANTDETAIL, { item });
  };

  const fetchRestaurants = async (cat) => {
    try {
      if (fetchRef.current) {
        return;
      }
      
      setLoadingState(true);
      fetchRef.current = true;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != 'granted') {
        callToast('Los permisos de ubicación fueron denegados');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = `${location.coords.latitude},${location.coords.longitude}`;
      const radius = '5000';
      const lowerCat = cat.toLowerCase();
      console.log('Categoria ', lowerCat);
      const type = `food|${lowerCat}`;
      const uri = `${URL_GOOGLE_NEARBY_SEARCH}location=${coords}&radius=${radius}&type=${type}&key=${FIREBASE_API_KEY}`;
      const res = await fetch(uri);
      const data = await res.json();
      setRestaurants(data.results);
    } catch (error) {
      console.error(error);
      setRestaurants([]);
    } finally {
      setLoadingState(false);
      fetchRef.current = null;
    }
  }

  useEffect(() => {
    fetchRestaurants(selectedCategory);
  }, [selectedCategory]);

  return loadingState ? (<Loading/>) : (
    <>
      <ScrollView style={{marginTop: 50}}>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          {categorias.map((item, index) => (
            <Button 
              key={index}
              mode='text'
              labelStyle={{
                color: selectedCategory === item.nombre ? colors.secondary : colors.grey,
              }}
              rippleColor={colors.secondaryLight}
              onPress={() => changeCat(item.nombre)}>
              {item.nombre}
            </Button>
          ))}
        </View>
        <View style={{marginTop: 20}}>
          {restaurants.map((item, index) => (
            <Card key={index} style={styles.card} onPress={() => goToRestaurantDetail(item)}>
              <Card.Cover source={{ uri: item.icon }} resizeMode="contain" />
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.vicinity}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="google-nearby"
        style={styles.fab}
        onPress={() => fetchRestaurants(selectedCategory)}
      />
    </>
  )
}

export default Home