import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import auth, {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [res, setRes] = useState<string>('');

  useEffect(() => {
    // IMPORTANTE: Pegue o 'client_id' (tipo 3) dentro do seu google-services.json
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  // --- Login com Email e Senha ---
  async function handleLogin() {
    if (!email || !senha) {
      setRes('Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        senha,
      );
      setRes(`Welcome, ${userCredential.user.email}`);
    } catch (error: any) {
      console.log('Firebase Auth Error:', error.code);

      switch (error.code) {
        case 'auth/invalid-email':
          setRes('The email address is invalid.');
          break;
        case 'auth/invalid-credential':
          setRes('Invalid email or password.');
          break;
        case 'auth/too-many-requests':
          setRes('Too many attempts. Please try again later.');
          break;
        default:
          setRes('An unexpected error occurred.');
      }
    }
  }

  // --- Login/Cadastro com Google ---
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('ID Token not found');
      }

      // 2. Use a nova forma modular de criar a credencial
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // 3. Use a função signInWithCredential passando o auth como primeiro argumento
      const authUser = getAuth();
      const userCredential = await signInWithCredential(authUser, googleCredential);

      setRes(`Signed in as: ${userCredential.user.email}`);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setRes('Login cancelled by user.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setRes('Google Play Services not available.');
      } else {
        setRes('Could not connect to Google.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {res ? <Text style={styles.statusText}>{res}</Text> : null}

      <TextInput
        placeholder="Email"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={email}
        autoCapitalize="none"
        onChangeText={text => {
          setEmail(text);
          if (res) setRes('');
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={text => {
          setSenha(text);
          if (res) setRes('');
        }}
      />

      <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
        <Text style={styles.mainButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.boxLine}>
        <View style={styles.line} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={onGoogleButtonPress}
      >
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account? <Text style={styles.link}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 30,
  },
  statusText: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  mainButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  orText: {
    marginHorizontal: 12,
    color: '#94a3b8',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  googleButtonText: {
    color: '#1e293b',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
  link: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
});
