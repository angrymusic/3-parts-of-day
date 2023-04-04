import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Todo(props) {
    const [newMorning, setNewMorning] = useState("");
    const [newAfternoon, setNewAfternoon] = useState("");
    const [newNight, setNewNight] = useState("");
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>오전</Text>
            {Object.keys(props.todo).map((key) =>
                "morning" === props.todo[key].when ? (
                    <View key={key} style={styles.todo}>
                        <Text style={styles.todoText}>{props.todo[key].text}</Text>
                        <TouchableOpacity onPress={() => props.deleteTodo(key)}>
                            <AntDesign name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                ) : null
            )}
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
                    placeholder="+ 할 일"
                    style={styles.input}
                ></TextInput>
            </View>

            <Text style={styles.title}>오후</Text>
            {Object.keys(props.todo).map((key) =>
                "afternoon" === props.todo[key].when ? (
                    <View key={key} style={styles.todo}>
                        <Text style={styles.todoText}>{props.todo[key].text}</Text>
                        <TouchableOpacity onPress={() => props.deleteTodo(key)}>
                            <AntDesign name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                ) : null
            )}
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
            {Object.keys(props.todo).map((key) =>
                "night" === props.todo[key].when ? (
                    <View key={key} style={styles.todo}>
                        <Text style={styles.todoText}>{props.todo[key].text}</Text>
                        <TouchableOpacity onPress={() => props.deleteTodo(key)}>
                            <AntDesign name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                ) : null
            )}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
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
    todo: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    todoText: {
        fontSize: 18,
    },
});
