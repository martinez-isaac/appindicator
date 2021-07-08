import React, {useState, useEffect, useRef} from "react"
import {
  Heading,
  ChevronLeftIcon,
  HStack,
  VStack,
  Pressable,
  Center,
  Text,
  Input,
  View,
  ActionSheet,
  ScrollView,
} from "native-base"
import {useNavigation} from "@react-navigation/native"
import {getApiRequest} from "src/API/apiUtils"

const MyHeader = ({navigation, title}) => {
  return (
    <HStack alignItems="center" mt={0} style={{
      backgroundColor: '#fff',
        width: "100%",
        height: 70,
        shadowColor: 'gray',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity:  0.3,
        shadowRadius: 3,
        elevation: 8,
    }} >
      <Pressable onPress={() => navigation.goBack()} position="absolute" ml={2} zIndex={1}>
        <ChevronLeftIcon ml={2} size="sm" color={'gray.600'} />
      </Pressable>
      <Center flex={1} >
        <Heading size="md" color='gray.600' >{title}</Heading>
      </Center>
    </HStack>
  );
}
export default function Indicator({route}){
  const navigation = useNavigation()
  const {codigo, nombre, fecha, valor} = route.params
  const [loading, setLoading] = useState(true)
  const [series, setSeries] = useState([])
  const cargarSeries = async() => {
    setLoading(false)
    const response = await getApiRequest("/api/"+codigo)
    setSeries(response.data.serie)
    setLoading(true)
  }
  useEffect(()=>{
    cargarSeries()
  },[])
  return(
    <View style={{flex:1}}>
      <MyHeader navigation={navigation} title={nombre}/>
      {series && (
        <ScrollView style={{flex:1}}>
          {Object.values(series).map((item, index) => {
            let myFecha = fecha.substring(0, 10)
            return(
              <HStack 
                width="100%"
                space={2}
                py={4}
                borderBottomColor="grey"
                borderBottomWidth={1}
                key={index}
              > 
                <Text color="blue.700" pl={5}>{myFecha}</Text>
                <Text pos="absolute" pr={5} right={0}>{"$"+valor}</Text>
              </HStack>
            )
          })}
        </ScrollView>
      )}
    </View>
  )
}
