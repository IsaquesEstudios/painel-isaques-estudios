import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";

import Logo from './../../img/global/logo-branca.png'

interface LogoLetterProps extends BoxProps { }

export default function LogoLetter({ ...rest }: LogoLetterProps) {

  return (
    <Box {...rest}>
      <Image src={Logo} alt='logo-isaques-estúdios-png' />
    </Box>
  )
}