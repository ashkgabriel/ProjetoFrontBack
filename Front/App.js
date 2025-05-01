import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Dialog,
  Divider,
  Modal,
  Provider as PaperProvider,
  Paragraph,
  Portal,
  TextInput,
  Title,
} from "react-native-paper";
import styles from "./styles/global";

export default function App() {
  const [campos, setCampos] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [ingrediente, setIngrediente] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [valor, setValor] = useState("");

  const [visible, setVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editIngrediente, setEditIngrediente] = useState("");
  const [editIngredientes, setEditIngredientes] = useState([]);
  const [editValor, setEditValor] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => {
        console.log("Status:", response.status);
        if (!response.ok) {
          return Promise.reject(`Server responded with ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);

        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text().then((text) => {
            console.log("Response text:", text);
            return Promise.reject("Received non-JSON response");
          });
        }
      })
      .then((data) => {
        console.log("Data received:", data);
        if (typeof data === "object") {
          setCampos(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const adicionarIngrediente = () => {
    if (ingrediente.trim()) {
      setIngredientes([...ingredientes, ingrediente.trim()]);
      setIngrediente("");
    }
  };

  const removerIngrediente = (index) => {
    const novaLista = [...ingredientes];
    novaLista.splice(index, 1);
    setIngredientes(novaLista);
  };

  const adicionarLamen = async () => {
    try {
      if (!nome.trim() || ingredientes.length === 0 || !valor.trim()) {
        setDialogMessage("Por favor, preencha todos os campos");
        setVisible(true);
        return;
      }

      const response = await fetch("http://localhost:3000/addLamen/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          nome: nome,
          ingredientes: ingredientes,
          valor: parseFloat(valor),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log("Lamen adicionado:", data);

      setNome("");
      setIngredientes([]);
      setValor("");

      setDialogMessage("Lamen adicionado com sucesso!");
      setVisible(true);

      buscarLamens();
    } catch (error) {
      console.error("Erro ao adicionar lamen:", error);
      setDialogMessage("Erro ao adicionar lamen");
      setVisible(true);
    }
  };

  const buscarLamens = async () => {
    try {
      const response = await fetch("http://localhost:3000/getLamen");

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log("Lamens:", data);
      setCampos(data);
    } catch (error) {
      console.error("Erro ao buscar lamens:", error);
      setDialogMessage("Erro ao buscar lamens");
      setVisible(true);
    }
  };

  const prepararEdicao = (item) => {
    setEditId(item._id);
    setEditNome(item.nome);
    setEditIngredientes([...item.ingredientes]);
    setEditValor(item.valor.toString());
    setEditModalVisible(true);
  };

  const adicionarIngredienteEdicao = () => {
    if (editIngrediente.trim()) {
      setEditIngredientes([...editIngredientes, editIngrediente.trim()]);
      setEditIngrediente("");
    }
  };

  const removerIngredienteEdicao = (index) => {
    const novaLista = [...editIngredientes];
    novaLista.splice(index, 1);
    setEditIngredientes(novaLista);
  };

  const atualizarLamen = async () => {
    try {
      if (
        !editNome.trim() ||
        editIngredientes.length === 0 ||
        !editValor.trim()
      ) {
        setDialogMessage("Por favor, preencha todos os campos");
        setVisible(true);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/updateLamen/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            nome: editNome,
            ingredientes: editIngredientes,
            valor: parseFloat(editValor),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log("Lamen atualizado:", data);

      setEditModalVisible(false);
      setDialogMessage("Lamen atualizado com sucesso!");
      setVisible(true);
      buscarLamens();
    } catch (error) {
      console.error("Erro ao atualizar lamen:", error);
      setDialogMessage("Erro ao atualizar lamen");
      setVisible(true);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.nome}</Title>
        <Paragraph>Valor: R$ {item.valor.toFixed(2)}</Paragraph>
        <View style={styles.chipContainer}>
          {item.ingredientes.map((ing, index) => (
            <Chip key={index} style={styles.chip}>
              {ing}
            </Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button icon="pencil" onPress={() => prepararEdicao(item)}>
          Editar
        </Button>
        <Button icon="delete" onPress={() => deletarLamen(item._id)}>
          Excluir
        </Button>
      </Card.Actions>
    </Card>
  );

  const deletarLamen = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteLamen/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setDialogMessage("Lamen excluído com sucesso!");
      setVisible(true);
      buscarLamens();
    } catch (error) {
      console.error("Erro ao excluir lamen:", error);
      setDialogMessage("Erro ao excluir lamen");
      setVisible(true);
    }
  };

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Aviso</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>

        <Modal
          visible={editModalVisible}
          onDismiss={() => setEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView style={styles.modalScroll}>
            <Card>
              <Card.Title title="Editar Lamen" />
              <Card.Content>
                <TextInput
                  label="Nome do Lamen"
                  value={editNome}
                  onChangeText={setEditNome}
                  mode="outlined"
                  style={styles.input}
                />

                <View style={styles.ingredientesInput}>
                  <TextInput
                    label="Ingrediente"
                    value={editIngrediente}
                    onChangeText={setEditIngrediente}
                    mode="outlined"
                    style={[styles.input, { flex: 1 }]}
                  />
                  <Button
                    mode="contained"
                    onPress={adicionarIngredienteEdicao}
                    style={styles.addButton}
                  >
                    +
                  </Button>
                </View>

                {editIngredientes.length > 0 && (
                  <View style={styles.chipContainer}>
                    {editIngredientes.map((ing, index) => (
                      <Chip
                        key={index}
                        onClose={() => removerIngredienteEdicao(index)}
                        style={styles.chip}
                      >
                        {ing}
                      </Chip>
                    ))}
                  </View>
                )}

                <TextInput
                  label="Valor (R$)"
                  value={editValor}
                  onChangeText={setEditValor}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button mode="contained" onPress={atualizarLamen}>
                  Salvar
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => setEditModalVisible(false)}
                >
                  Cancelar
                </Button>
              </Card.Actions>
            </Card>
          </ScrollView>
        </Modal>
      </Portal>

      <SafeAreaView style={[styles.safeArea, styles.containerBox]}>
        <View style={styles.mainContent}>
          <ScrollView style={styles.contentContainer}>
            <Card style={styles.formCard}>
              <Card.Title title="Cadastro de Lamen" />
              <Card.Content>
                <TextInput
                  label="Nome do Lamen"
                  value={nome}
                  onChangeText={setNome}
                  mode="outlined"
                  style={styles.input}
                />

                <View style={styles.ingredientesInput}>
                  <TextInput
                    label="Ingrediente"
                    value={ingrediente}
                    onChangeText={setIngrediente}
                    mode="outlined"
                    style={[styles.input, { flex: 1 }]}
                  />
                  <Button
                    mode="contained"
                    onPress={adicionarIngrediente}
                    style={styles.addButton}
                  >
                    +
                  </Button>
                </View>

                {ingredientes.length > 0 && (
                  <View style={styles.chipContainer}>
                    {ingredientes.map((ing, index) => (
                      <Chip
                        key={index}
                        onClose={() => removerIngrediente(index)}
                        style={styles.chip}
                      >
                        {ing}
                      </Chip>
                    ))}
                  </View>
                )}

                <TextInput
                  label="Valor (R$)"
                  value={valor}
                  onChangeText={setValor}
                  mode="outlined"
                  keyboardType="numeric"
                  style={styles.input}
                />
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button mode="contained" onPress={adicionarLamen}>
                  Cadastrar
                </Button>
                <Button mode="outlined" onPress={buscarLamens}>
                  Listar Todos
                </Button>
              </Card.Actions>
            </Card>

            <Divider style={styles.divider} />

            <Title style={styles.listTitle}>Lamens Cadastrados</Title>

            <FlatList
              data={campos}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              style={styles.listContainer}
              contentContainerStyle={styles.listContent}
              scrollEnabled={false}
              ListEmptyComponent={
                <Card style={styles.emptyCard}>
                  <Card.Content>
                    <Paragraph>Nenhum lamen cadastrado</Paragraph>
                  </Card.Content>
                </Card>
              }
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
