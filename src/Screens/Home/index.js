import React, {useState, useEffect, useRef} from "react"
import {
  Box,
  HamburgerIcon,
  InfoOutlineIcon,
  ChevronRightIcon,
  Pressable,
  Heading,
  Stack,
  HStack,
  VStack,
  Text,
  Center,
  Divider,
  Icon,
  View,
  FlatList,
  ScrollView
} from "native-base"
import {RefreshControl} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {getApiRequest} from "src/API/apiUtils"

const MyHeader = ({drawer}) => {
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
      <Pressable onPress={() => drawer()} position="absolute" ml={2} zIndex={1}>
        <HamburgerIcon ml={2} size="sm" color={'gray.600'} />
      </Pressable>
      <Center flex={1} >
        <Heading size="md" color='gray.600' >Indicadores</Heading>
      </Center>
    </HStack>
  );
}

export default function Home(){
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [indicadores, setIndicadores] = useState([])
  
  const cargarIndicadores = async() => {
    setLoading(false)
    const response = await getApiRequest("/api")
    const data = Object.fromEntries(
      Object.entries(response.data).filter(
        item => typeof(item[1]) === "object"
      )
    )
    setIndicadores(data)
    setLoading(true)
  }

  useEffect(()=>{
    cargarIndicadores()
  },[])

  const indicatorPress = ({codigo, nombre, fecha, valor}) => {
    navigation.navigate('IndicatorScreen', {
      codigo: codigo,
      nombre: nombre,
      fecha: fecha,
      valor: valor,
    })
  }
  const indicatorDetailPress = ({codigo, nombre, fecha, valor, unidad_medida}) => {
    navigation.navigate('DetailScreen', {
      codigo: codigo,
      nombre: nombre,
      fecha: fecha,
      valor: valor,
      medida: unidad_medida,
    })
  }
  return(
    <>
      <MyHeader drawer={()=> navigation.toggleDrawer()} />
      {indicadores && (
        <ScrollView my={5}>
        {Object.entries(indicadores).map((item, index) => {
          return (
            <HStack 
              width="100%" 
              space={2} 
              py={4}
              borderBottomColor="grey" 
              borderBottomWidth={1}
              key={index}
            >
              <VStack pl={5} >
                <Pressable onPress={() => indicatorPress(item[1])}>
                  <Text fontSize={16} fontWeight="bold">{item[1].nombre}</Text>
                  <Text fontSize={12} color="blue.700" >{item[1].unidad_medida}</Text>
                </Pressable>
              </VStack>    
              <HStack  pos="absolute" right={0} top="50%">
                <Pressable onPress={()=> indicatorDetailPress(item[1])}>
                  <InfoOutlineIcon />
                </Pressable>
                <Pressable>
                  <ChevronRightIcon />
                </Pressable>
              </HStack>
            </HStack>
          )
        })}
        </ScrollView>
      )}
    </>
  )
}
