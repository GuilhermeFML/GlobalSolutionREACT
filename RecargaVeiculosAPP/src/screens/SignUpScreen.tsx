import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Center, Text, VStack } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    if (!username || !password || !confirmPassword) {
      setMessage('Todos os campos são obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();
      console.log(data); // Log da resposta

      if (!response.ok) {
        setMessage(data.message || 'Erro desconhecido');
      } else {
        setMessage('Usuário registrado com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro:', error); // Log de erros
      setMessage('Erro ao cadastrar usuário.');
    }
    console.log('Dados a serem enviados:', { username, password, confirmPassword });
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="#f0f0f0" px={6}>
        <Box w="100%" maxW="400px" p={6} bg="white" borderRadius={10} shadow={3}>
          <VStack space={4}>
            <Text fontSize="xl" color="gray.700" bold textAlign="center">
              Criar Conta
            </Text>
            <Text fontSize="md" color="gray.500" textAlign="center">
              Preencha os campos abaixo para se cadastrar
            </Text>

            <Input
              placeholder="Nome de Usuário"
              value={username}
              onChangeText={setUsername}
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
            <Input
              placeholder="Confirmar Senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />

            {message ? (
              <Text fontSize="md" color={message.includes('sucesso') ? 'green.500' : 'red.500'}>
                {message}
              </Text>
            ) : null}

            <Button
              mt={4}
              onPress={handleSignUp}
              bg="green.500"
              _text={{ color: 'white', fontSize: 'md' }}
              borderRadius={8}
              _hover={{ bg: 'green.600' }}
              _focus={{ bg: 'green.700' }}
            >
              Criar Conta
            </Button>

            <Button
              mt={2}
              variant="link"
              onPress={() => navigation.navigate('Login')}
              _text={{ color: 'green.500', fontSize: 'sm' }}
            >
              Já possui uma conta? Faça login.
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default SignUpScreen;
