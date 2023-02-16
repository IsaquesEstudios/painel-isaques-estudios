import { Box, BoxProps, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface NotificationProps extends BoxProps {
  number: number
  icon: IconType
  linkIcon: string
}

export default function Notification({ number, icon, linkIcon, ...rest }: NotificationProps) {


  return (
    <Link href={linkIcon}>
      <Box position='relative' {...rest} cursor='pointer'>
        {
         number > 1 && <Flex position='absolute' left='-8px' bgColor='red' borderRadius={25} alignItems='center' justifyContent='center' w='16px' h='16px'>
            <Text fontSize='14px'>{number}</Text>
          </Flex>
        }
        <Icon as={icon} fontSize={22} />
      </Box>
    </Link>
  )
}