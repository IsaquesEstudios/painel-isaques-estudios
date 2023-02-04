import { Box, Flex, Stack, Icon, Text } from "@chakra-ui/react";
// import {} from 'react-'
import Image from "next/image";
import Link from "next/link";

import Logo from './../../img/global/logo-branca.png'

export default function Header() {

  return (
    <Flex as='aside' w='350px' h='100vh' alignItems='center' flexDirection='column' bgColor='Black.900'>
      <Box px='20px' mt='50px'>
        <Image src={Logo} alt='logo-isaques-estúdios-png' />
      </Box>

      <Stack direction='column' mt='10'>
        <Link href='/'>
          {/* <Icon as={} /> */}
          INÍCIO
        </Link>
      </Stack>
    </Flex>
  )
}