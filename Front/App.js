import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function App() {

  const addUser = async () => {
    fetch("http://localhost:3000/addUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        name: "John Doe"
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => addUser()} style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
        <Text style={{ color: "white", fontWeight: "bold" }} >Add User</Text>
      </TouchableOpacity> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
