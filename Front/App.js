import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const addUser = async () => {
    fetch("http://localhost:3000/addUser/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        name: "John Doe",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
  };
  const Exibir = async () => {
    fetch("http://localhost:3000/getUser/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const Atualizar0 = (id) => {
    fetch(`http://localhost:3000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        name: "xx",
      }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json));
  };

  const Delete = (id) => {
    fetch(`https://localhost:3000/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => addUser()}
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Add User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Atualizar0("67edd7d98d2ad7a9ee604638")}
        style={{
          backgroundColor: "purple",
          padding: 10,
          borderRadius: 5,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Exibir()}
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 5,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Exibir</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Delete("67edd7d98d2ad7a9ee604638")}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 5,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Deletar</Text>
      </TouchableOpacity>
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
