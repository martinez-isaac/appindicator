import React from "react"

import{
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer"
import {useNavigation} from "@react-navigation/native"
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
  Icon,
} from 'native-base';


const SideBarMenu = (props) =>{
  return(
    <DrawerContentScrollView {...props} safeArea>
    <VStack space={6} my={2} mx={1}>
      <Box px={4}>
        <Text bold color="gray.700">AppIndicator 2021</Text>
      </Box>
    <VStack divider={<Divider />} space={4}>
          <VStack space={5}>
            <Text fontWeight={500} fontSize={14} px={5} color="gray.500">Navegacion</Text>
            <VStack space={3}>
              <Pressable
                px={5}
                py={3}
              >
                <HStack space={7} alignItems="center">
                  <Text color='gray.700' fontWeight={500}>
                    Inicio
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
}
export default SideBarMenu
