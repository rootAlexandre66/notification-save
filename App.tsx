import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { Login } from "./src/screens/Login";

const { width, height } = Dimensions.get('window');

export const App = () => {

  const logoSize = width * 0.3;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>

        {/* Card de login */}
        <Login />

        {/* Imagem flutuando */}
        <Image
          source={require('./src/assets/bg.png')}
          style={[
            styles.logo,
            {
              width: logoSize,
              height: logoSize,
              top: height * 0.08, // 👈 ajusta aqui
            }
          ]}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // fundo escuro
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
  }
});