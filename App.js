import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Sudoku } from "./components/Sudoku";

export default function App() {
  return (
    <View style={styles.container}>
      <Sudoku />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
