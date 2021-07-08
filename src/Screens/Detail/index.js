import React, {useState, useEffect} from "react"
import {
  Heading,
  ChevronLeftIcon,
  Stack,
  Center,
  HStack,
  VStack,
  Pressable,
  Text,
  View,
} from "native-base"
import {useNavigation} from "@react-navigation/native"
import {getApiRequest} from "src/API/apiUtils"
import {LineChart, YAxis, Grid} from "react-native-svg-charts"

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

export default function Detail({route}){
  const navigation = useNavigation()
  const {codigo, nombre, fecha, valor, medida} = route.params
  const [loading, setLoading] = useState(true)
  const [valores, setValores] = useState([])
  const [fechas, setFechas] = useState([])

  const cargarSeries = async() => {
    setLoading(false)
    const response = await getApiRequest("/api/"+codigo)
    const data = response.data.serie.slice(0, 10)
    let values=[]
    let dates=[]
    for(const item of data){
      values = [...values, item.valor]
      dates = [...dates, item.fecha]
    }
    setValores(values)
    setFechas(dates)
    setLoading(true)
  }
  useEffect(()=>{
    cargarSeries()
  },[])
  return(
    <View style={{flex:1}}>
      <MyHeader navigation={navigation} title={nombre}/>
      <Stack pt={15}>
        <Center>
          <Text fontSize={38} color="blue.700" bold>{valor}</Text>
        </Center>
        <HStack p={5}>
          <Text>Nombre</Text><Text pl={45}>{nombre}</Text>
        </HStack>
        <HStack p={5}>
          <Text>Fecha</Text><Text pl={45}>{fecha.substring(0,10)}</Text>
        </HStack>
        <HStack p={5}>
          <Text>Unidada de Medida</Text><Text pl={45}>{medida}</Text>
        </HStack>
      </Stack>
      {valores && (
        <View p={5} mt={100} style={{height:200, flexDirection:'row'}}>
          <YAxis
            data={valores}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={valores}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
        </View>
      )}
    </View>
  )
}
