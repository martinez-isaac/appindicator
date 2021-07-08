import React, { useEffect } from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import SideBarMenu from "./components/SideBarMenu"
import {
  NativeBaseProvider,
  Button,
  Box,
  HamburgerIcon,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon
} from "native-base"
import { TouchableOpacity } from "react-native"

import Home from "../Screens/Home"
import Indicator from "../Screens/Indicator"
import Detail from "../Screens/Detail"

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function homeScreenStack({navigation}){
  return(
    <>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="IndicatorScreen"
          component={Indicator}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={Detail}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </>
  )
}

function AppStack(){
  return(
      <Drawer.Navigator
        drawerContent={(props)=>(
          <SideBarMenu {...props} />
        )}
        hideStatusBar={false}
        edgeWidth={100}
        drawerContentOptions={{
          activeTintColor: "#ff6600",
          itemStyle: { marginTop: 0},
        }}
        headerStatusBarHeight={0}
      >
        <Drawer.Screen
          name="HomeScreen"
          options={{
            drawerLabel:"Inicio",
            swipeEnabled: true,
          }}
          component={homeScreenStack}
        />
      </Drawer.Navigator>
  )
}
export default AppStack
