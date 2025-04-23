import { Text, TouchableOpacity } from "react-native";

const DadoDelete = (props) => {
    const Delete = (id) => {
        fetch(`http://localhost:3000/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((resp) => resp.json())
            .then((json) => console.log(json));

    }
    return (
        <TouchableOpacity onPress={(props) => { 
            Delete(props)
            console.log(props); 
        }} style={{
            backgroundColor: "red",
            padding: 10,
            borderRadius: 5,
            marginBottom: 8,
            width: "40%",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Text>Excluir</Text>
        </TouchableOpacity>
    )
}

export default DadoDelete;