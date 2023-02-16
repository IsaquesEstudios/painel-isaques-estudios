import { authContext } from "@/context/AuthContext";
import { ApiCliente } from "@/util/axios";
import { Status } from "@/util/formater";
// import { formateDate } from "@/util/formateDate";
import { Box, Button, Grid, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { Query, useQuery } from "react-query";


type PaymentsRecivedType = {
  id: number
  description: string
  transaction_amount: number
  status: string
  date_of_expiration: string
}

type AllPaymentRecived = {
  results: PaymentsRecivedType[]
}

type PaymentParamsType = {
  limit: number | undefined
  offset: number | undefined
  user: string
}

export default function Payment({ limit, offset, user }: PaymentParamsType) {
  const [tst, setTst] = useState<number>(0)

  const { data, isLoading } = useQuery(`payment${tst}`, async () =>
    await axios.get('https://api.mercadopago.com/v1/payments/search', {
      params: {
        external_reference: user,
        limit: limit,
        offset: offset
      },
      headers: {
        Authorization: `Bearer APP_USR-6224878114061378-071003-98d48a2185ebf86cf3f9bd60a4a2fc02-513614546`
      }
    }).then((res) => {
      return (res.data)
    })
  )
  // setTimeout(() => {
  //   setTst(tst + 1)
  // }, 10000)

  function FormateDate(item: any) {
    let convertDate = new Date(item)
    const formateDate = new Intl.DateTimeFormat('pt-BR').format(convertDate)

    return formateDate
  }

  return (
    <Stack spacing={6} w='100%' >
      <Box>
        <Grid w='100%' gridTemplateColumns='40% 10% 15% 15% 10%' gridColumnGap='2.5%'>
          <Text fontWeight={700}>DESCRIÇÃO</Text>
          <Text fontWeight={700}>VALOR</Text>
          <Text fontWeight={700}>STATUS</Text>
          <Text fontWeight={700}>PAGAR ATÉ</Text>
          <Text fontWeight={700}></Text>
        </Grid>
      </Box>
      {!isLoading ?
        data?.results?.map((item: PaymentsRecivedType, index: number) => {

          return (
            <Grid w='100%' justifyContent='center' alignItems='center' gridTemplateColumns='40% 10% 15% 15% 10%' gridColumnGap='2.5%' key={index}>
              <Text>{item.description}</Text>
              <Text>{item.transaction_amount}</Text>
              <Text>{Status(item.status)}</Text>
              {item.date_of_expiration && <Text>{FormateDate(item.date_of_expiration)}</Text>}

              <Link href={`usuario/pagamento/${item.id}`}>
                <Button w='100%' bgColor='Yellow.800' color='Black.900'>PAGAR</Button>
              </Link>
            </Grid>
          )
        })
        :
        <Spinner />
      }
    </Stack>
  )
}