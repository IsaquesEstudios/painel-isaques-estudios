import { HStack, Text, Icon, StackProps } from "@chakra-ui/react";
import { FaRegUser } from 'react-icons/fa'
import { ReactNode } from 'react'

interface ItemProps extends StackProps {
  children: ReactNode
}



export default function Item({ children, ...rest }: ItemProps) {
  return (
    <HStack w='100%' transition='0.5s' _hover={{ transition: '0.5s' }} {...rest}>
      <Icon as={FaRegUser} />
      <Text fontSize='18px'>{children}</Text>
    </HStack>
  )
}