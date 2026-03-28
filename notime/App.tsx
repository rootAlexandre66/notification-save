import { View, StyleSheet } from "react-native";
import { Login } from "./src/screens/Login";

export const App = () => {

  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})