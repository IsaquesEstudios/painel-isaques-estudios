
import Payment from "@/component/payment";
import { authContext } from "@/context/AuthContext";
import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useContext } from "react";

export default function Conta() {
  const { data } = useContext(authContext)

  return (
    <Box w='100%' >

      <Box bgColor='Black.900' maxW='90%' px='50px' py='40px' mx='5%' mt='100px' borderRadius={10}>
        <Payment user={data?.email} limit={undefined} offset={undefined} />
      </Box>

      {/* <Text fontSize={40}>{data.}</Text> */}

    </Box>
  )
}



// export async function getServerSideProps(context: GetServerSideProps) {
//   return{}
// }