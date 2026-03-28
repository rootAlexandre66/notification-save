import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [res , setRes] = useState<string>('');

async function handleLogin() {
  try {
    const user = await getAuth().signInWithEmailAndPassword(email, senha);
    setRes(user.user.email ?? 'Login bem-sucedido, mas email não disponível');
  } catch (error) {
    console.log('Erro:', error);
    setRes('Erro ao fazer login: ' + error as any);
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text>{res}</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
