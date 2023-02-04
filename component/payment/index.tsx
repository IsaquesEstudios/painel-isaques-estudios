import { ApiCliente } from "@/util/axios";
import { Status } from "@/util/formater";
// import { formateDate } from "@/util/formateDate";
import { Box, Grid, Spinner, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { Query, useQuery } from "react-query";

type PaymentsRecivedType = {
  id: number
  description: string
  transaction_amount: number
  status: string
  date_of_expiration: string
}

type PaymentParamsType = {
  limit: number | undefined
  offset: number | undefined
}

export default function Payment({ limit, offset }: PaymentParamsType) {
  const { data, error, isLoading } = useQuery("payments", async () =>
    await axios.get('https://api.mercadopago.com/v1/payments/search', {
      params: {
        external_reference: 'matteus.isaque28@gmail.com',
        limit: limit,
        offset: offset
      },
      headers: {
        Authorization: `Bearer APP_USR-6224878114061378-071003-98d48a2185ebf86cf3f9bd60a4a2fc02-513614546`
      }
    }).then((res) => {
      return res.data.results
    })
  )

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
        data?.map((item: PaymentsRecivedType, index: number) => {

          let convertDate = new Date(item?.date_of_expiration)
          const formateDate = new Intl.DateTimeFormat('pt-BR').format(convertDate)

          return (
            <Grid w='100%' gridTemplateColumns='40% 10% 15% 15% 10%' gridColumnGap='2.5%' key={index}>
              <Text>
                <Link href={`usuario/pagamento/${item.id}`}>
                  {item.description}
                </Link>
              </Text>
              <Text>{item.transaction_amount}</Text>
              <Text>{Status(item.status)}</Text>
              {item.date_of_expiration && <Text>{formateDate}</Text>}
              <Text>BOTÂO</Text>
            </Grid>
          )
        })
        :
        <Spinner />
      }
    </Stack>
  )
}