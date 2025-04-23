import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native"

export const DadoInserir = () => {

    const [nome, setNome] = useState(null);
    
    const addUser = async () => {
        fetch("http://localhost:3000/addUser/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                name: nome,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
    }
    
    return(
        <View style={{
            borderStyle: "solid",
            borderWidth: 0.5,
            borderColor: "black",
            margin: 3,
            padding: 12,
            width: "40%",
            gap: 8,
        }} >
            <Text style={{fontWeight: "bold"}}>Nome</Text>
            <TextInput
                placeholder="Digite o nome" 
                onChangeText={(text) => {setNome(text)}}
                style={{
                    borderStyle: "solid",
                    borderWidth: 0.2,
                    borderColor: "black",
                    padding: 6,
                    marginBottom: 8,
                    borderRadius: 4,
                    width: "100%"
                }}
            />
            <TouchableOpacity style={{backgroundColor: "navy", padding: 8, borderRadius: 4}} onPress={(nome) => {addUser(nome)}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}