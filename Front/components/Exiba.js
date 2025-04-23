import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DadoDelete from "./Delete";

const DadoExiba = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={props.campos}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  margin: 20,
                  backgroundColor: "#00FFFF",
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                <Text>{item._id}</Text>
                <Text>{item.name}</Text>

                <DadoDelete id={item._id} />
              </View>
            );
          }}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flexGrow: 1,
  },
});

export default DadoExiba;
