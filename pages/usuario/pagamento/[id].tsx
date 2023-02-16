// import { formateDate } from "@/util/formateDate";
import { Box, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "react-query";

import QRcode from 'react-qr-code'
import { useState } from "react";

type detailsPaymentProps = {
  date_of_expiration: string
  description: string
  status: string
  transaction_amount: string
  payment_method: {
    id: string
  }
  point_of_interaction: {
    transaction_data: {
      qr_code: string
    }
  }
}

export default function Pagamento({ id }: any) {
  const [detailsPayment, setDetailsPayment] = useState<detailsPaymentProps>()
  const paramPage = id?.id

  const { error, isLoading } = useQuery("payments", async () =>
    await axios.get(`https://api.mercadopago.com/v1/payments/${paramPage}`, {
      params: {
        external_reference: 'matteus.isaque28@gmail.com'
      },
      headers: {
        Authorization: `Bearer APP_USR-6224878114061378-071003-98d48a2185ebf86cf3f9bd60a4a2fc02-513614546`
      }
    }).then((res) => setDetailsPayment(res.data))
  )

  function date(date: any) {
    const currentDate = new Date(date).toLocaleDateString()

    return currentDate
  }

  function status(value: string | undefined) {
    if (value === 'approved') {
      return ('aprovado')
    } else {
      return ('pendente')
    }
  }

  return (
    <Box as='main' w='100%'>
      {!isLoading ?
        <Box bgColor='Black.900' maxW='90%' px='5%' py='20px' mx='5%' mt='50px' borderRadius={10} >
          <Text fontWeight='bold' fontSize='24px'>{detailsPayment?.description}</Text>

          <Box mt='2'>
            <Text>Este pagamento deve ser feito até o dia de: {date(detailsPayment?.date_of_expiration)}</Text>
            <Text>Código do pagamento: {detailsPayment?.payment_method.id}</Text>
            <Text>Status: {status(detailsPayment?.status)}</Text>
            <Text>Valor: {detailsPayment?.transaction_amount}</Text>
          </Box>

          <Box mt='10'>
            <Text mb='4'>Método de pagamento: {detailsPayment?.payment_method?.id}</Text>
            {detailsPayment?.payment_method.id.length &&
              <QRcode
                bgColor="#000000"
                fgColor="#ffffff"
                size={256}
                level="L"
                // value={detailsPayment?.point_of_interaction.transaction_data.qr_code}
                value='00020126330014br.gov.bcb.pix01115276413185252040000530398654040.015802BR5913MATTEUSISAQUE6008So Paulo62240520mpqrinter543601635276304B707'
              />}
          </Box>
        </Box>
        :
        <Spinner />
      }
    </Box>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params


  return {
    props: {
      id
    }
  }
}