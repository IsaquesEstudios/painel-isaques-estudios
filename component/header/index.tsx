import { Box, Flex, HStack, Icon, Stack, VStack } from "@chakra-ui/react";
import LogoLetter from "../global/logo-letter";
import { FaMoneyBillWave } from 'react-icons/fa'
import { BsBellFill } from 'react-icons/bs'
import Notification from "./notification";
import { useQuery } from "react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "@/context/AuthContext";


export default function Header() {
  const [notificationPayment, setNotificationPayment] = useState<number>(0)
  const user = useContext(authContext)

  console.log(user)

  const { error, data, isLoading } = useQuery("payments", async () =>
    await axios.get(`https://api.mercadopago.com/v1/payments/search`, {
      params: {
        external_reference: user.data.email
      },
      headers: {
        Authorization: `Bearer APP_USR-6224878114061378-071003-98d48a2185ebf86cf3f9bd60a4a2fc02-513614546`
      }
    }).then((res) => (res.data))
  )

  // console.log(data?.results)

  data?.results?.map((item: any) => {
    if(item.status === 'pendent'){

      setNotificationPayment(notificationPayment + 1)
    }
  })

  return (
    <Flex gridArea='header' as='header' justifyContent='space-between' alignItems='center' height='80px' w='100%' pl='40px' pr='80px' bgColor='Black.900'>
      <LogoLetter maxW='200px' />
      {/* <Box>da</Box> */}
      <HStack spacing={4}>
        <Notification linkIcon="/usuario" number={notificationPayment} icon={FaMoneyBillWave} />
        <Icon as={BsBellFill} size={18} />
      </HStack>
    </Flex>
  )
}