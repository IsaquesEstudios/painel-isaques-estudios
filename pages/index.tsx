import { authContext } from "@/context/AuthContext";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";


export default function index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useContext(authContext)


  async function HandleSubmit(form: any) {

    form.preventDefault()


    await signIn({ email, password })
  }

  return (
    <Box as='main' w='100%' height='100vh' display='flex' >
      <Box h='100%' flex='0.5' bgColor='Black.700'>

        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' h='100%' maxW='90%' mx='10%'>
          <Text fontSize='30px' fontWeight={700} >Acesse sua conta e tenha maior controle sobre sua empresa</Text>
          <Text>Acesse sua conta agora mesmo e veja seus dados e informações de todos os trabalhos feitos pela isaques estúdios.</Text>
        </Box>

      </Box>

      <Box flex='0.5' bgColor='Black.800' display='flex' alignItems='center' justifyContent='center'>
        <Stack as='form' onSubmit={HandleSubmit}>
          <Input type='email' required onChange={(e) => { setEmail(e.target.value) }} />
          <Input type='password' required onChange={(e) => { setPassword(e.target.value) }} />

          <Button bgColor='Yellow.800' _hover={{ bgColor: 'Yellow.900' }} type='submit'>Login</Button>
        </Stack>
      </Box>
    </Box>
  )
}