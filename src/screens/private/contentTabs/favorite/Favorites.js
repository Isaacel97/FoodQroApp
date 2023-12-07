import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { styles } from './Favorite.styles'
import { FIREBASE_API_KEY, URL_GOOGLE_PLACE_DETAILS } from "@env"
import Loading from '../../../../utils/Lotties/Loading'
import { getFavorites } from '../../../../api/favorites'
import { constants } from '../../../../utils/constants/constants'

const Favorites = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const goToRestaurantDetail = (item) => {
    navigation.navigate(constants.SCREENS.RESTAURANTDETAIL, { item });
  }

  const fetchRestaurants = async () => {
    try {
      setLoadingState(true);
      const favorites = await getFavorites();

      const promises = favorites.map(async (item) => {
        const res = await fetch(`${URL_GOOGLE_PLACE_DETAILS}place_id=${item}&key=${FIREBASE_API_KEY}`);
        const result = await res.json();
        return result.result;
      });

      const results = await Promise.all(promises);
      setRestaurants(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(false);
    }
  }

  // useEffect(() => {
  //   fetchRestaurants();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRestaurants();
    }, [])
  );

  console.log('restaurants: ', restaurants);

  return loadingState ? (<Loading/> ) : (
    <ScrollView style={{marginTop: 50}}>
      <View style={{marginTop: 20}}>
        {!restaurants || !restaurants.length ? <Title style={{textAlign: 'center'}}>No hay restaurantes favoritos</Title> : (
          restaurants.map((item, index) => (
            <Card key={index} style={styles.card} onPress={() => goToRestaurantDetail(item)}>
              <Card.Cover source={{ uri: item.icon }} resizeMode="contain" />
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>{item.vicinity}</Paragraph>
              </Card.Content>
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  )
}

export default Favorites