import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#e1e1e1",
  },
  containerBox: {
    flex: 1,

    margin: 0,
  },
  header: {
    margin: 0,
    height: 0,
    padding: 0,

  },
  drawerSection: {
    backgroundColor: "#04012a",
    width: 280,
    height: "90%",
  },
  appbarTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  formCard: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  ingredientesInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addButton: {
    marginLeft: 8,
    marginBottom: 12,
  },
  modalScroll: {
    flexGrow: 1,
    height: "100%",
    paddingBottom: 16,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    margin: 4,
  },
  cardActions: {
    justifyContent: "space-around",
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 16,
    height: 2,
  },
  listTitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    width: "100%",
  },
  listContent: {
    gap: 16,
  },
  card: {
    marginBottom: 12,
  },
  emptyCard: {
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
    height: "80%",
  },
});

export const gradientColors = {
  navbar: ["#040122", "#ff7e5f"],
};

export default styles;
