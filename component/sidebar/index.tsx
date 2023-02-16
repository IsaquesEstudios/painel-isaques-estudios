import { Box, Flex, Stack, Icon, Text, VStack, HStack } from "@chakra-ui/react";

import Image from "next/image";
import Link from "next/link";
import LogoLetter from "../global/logo-letter";
import Item from "./item";



export default function Sidebar() {

  return (
    <Flex gridArea='sidebar' as='aside' w='300px' h='calc(100vh - 50px)' bgColor='Black.900' flexDirection='column'>

      <Stack direction='column' mt='10' w='100%'>
        <Link href='/usuario'>
          <Item _hover={{bgColor:'yellow.700'}}  px='14%' py='14px'>
            início
          </Item>
        </Link>
        <Link href='/usuario'>
          <Item _hover={{bgColor:'yellow.700'}}  px='14%' py='14px'>
            início
          </Item>
        </Link>
        <Link href='/usuario'>
          <Item _hover={{bgColor:'yellow.700'}}  px='14%' py='14px'>
            início
          </Item>
        </Link>
        <Link href='/usuario'>
          <Item _hover={{bgColor:'yellow.700'}}  px='14%' py='14px'>
            início
          </Item>
        </Link>
        <Link href='/usuario'>
          <Item _hover={{bgColor:'yellow.700'}}  px='14%' py='14px'>
            início
          </Item>
        </Link>
      </Stack>
    </Flex>
  )
}