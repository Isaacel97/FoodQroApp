import React from 'react'
import { View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

const ListRestaurants = (props) => {
    const goToRestaurantDetail = (item) => {
        navigation.navigate(constants.SCREENS.RESTAURANTDETAIL, { item });
    };

    const { restaurants } = props
  return (
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
  )
}

export default ListRestaurants