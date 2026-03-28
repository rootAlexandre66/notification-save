import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Login } from "./src/screens/Login";

export const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Login/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#8f8f8f",
  }
})