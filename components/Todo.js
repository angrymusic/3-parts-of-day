import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Todo(props) {
    const [newMorning, setNewMorning] = useState("");
    const [newAfternoon, setNewAfternoon] = useState("");
    const [newNight, setNewNight] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>오전</Text>
            <View style={styles.todos}>
                <TextInput
                    onChangeText={(e) => setNewMorning(e)}
                    onSubmitEditing={() => {
                        props.addTodo(newMorning, "morning");
                        setNewMorning("");
                    }}
                    onFocus={() => {
                        setNewAfternoon("");
                        setNewNight("");
                    }}
                    returnKeyType="done"
                    value={newMorning}
                    onPressIn={() => {}}
                    placeholder="+ 할 일"
                    style={styles.input}
                ></TextInput>
            </View>

            <Text style={styles.title}>오후</Text>
            <View style={styles.todos}>
                <TextInput
                    onChangeText={(e) => setNewAfternoon(e)}
                    onSubmitEditing={() => {
                        props.addTodo(newAfternoon, "afternoon");
                        setNewAfternoon("");
                    }}
                    onFocus={() => {
                        setNewMorning("");
                        setNewNight("");
                    }}
                    returnKeyType="done"
                    value={newAfternoon}
                    placeholder="+ 할 일"
                    style={styles.input}
                ></TextInput>
            </View>
            <Text style={styles.title}>야간</Text>
            <View style={styles.todos}>
                <TextInput
                    onChangeText={(e) => setNewNight(e)}
                    onSubmitEditing={() => {
                        props.addTodo(newNight, "night");
                        setNewNight("");
                    }}
                    onFocus={() => {
                        setNewMorning("");
                        setNewAfternoon("");
                    }}
                    returnKeyType="done"
                    value={newNight}
                    placeholder="+ 할 일"
                    style={styles.input}
                ></TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
    },
    todos: {
        minHeight: 100,
    },
    title: {
        fontWeight: 700,
        fontSize: 30,
    },
    input: {
        paddingTop: 10,
        paddingBottom: 7,
        fontSize: 18,
    },
    plusButton: {
        marginTop: 10,
    },
});
