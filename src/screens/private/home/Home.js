import React, { useState } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import colors from '../../../utils/styles/colors'

const Home = () => {
  const categorias = [
    {nombre: 'Desayunos'},
    {nombre: 'Comidas'},
    {nombre: 'Cenas'},
  ]
  const [selectedCategory, setSelectedCategory] = useState('Desayunos');

  return (
    <View style={{marginTop: 50}}>
      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        {categorias.map((item, index) => (
          <Button 
            key={index}
            mode='text'
            labelStyle={{
              color: selectedCategory === item.nombre ? colors.secondary : colors.grey,
            }}
            rippleColor={colors.secondaryLight}
            onPress={() => setSelectedCategory(item.nombre)}>
            {item.nombre}
          </Button>
        ))}
      </View>
    </View>
  )
}

export default Home