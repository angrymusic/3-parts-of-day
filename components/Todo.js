import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Todo(props) {
    const [newMorning, setNewMorning] = useState("");
    const [newAfternoon, setNewAfternoon] = useState("");
    const [newNight, setNewNight] = useState("");
    const [updateMorningToggle, setUpdateMorningToggle] = useState({});
    const [updateAfternoonToggle, setUpdateAfternoonToggle] = useState({});
    const [updateNightToggle, setUpdateNightToggle] = useState({});
    const [updateText, setUpdateText] = useState("");

    const allUpdateToggleOffNotMe = (when, key) => {
        for (let k in when) {
            if (key !== k) {
                when[k] = false;
            }
        }
    };
    const morningUpdateToggleOff = () => {
        for (let k in updateMorningToggle) {
            updateMorningToggle[k] = false;
        }
    };
    const afternoonUpdateToggleOff = () => {
        for (let k in updateAfternoonToggle) {
            updateAfternoonToggle[k] = false;
        }
    };
    const nightUpdateToggleOff = () => {
        for (let k in updateNightToggle) {
            updateNightToggle[k] = false;
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>오전</Text>

            <View style={styles.todos}>
                {Object.keys(props.todo).map((key) =>
                    "morning" === props.todo[key].when ? (
                        <View>
                            <View key={key} style={styles.todo}>
                                <Text
                                    style={{
                                        ...styles.todoText,
                                        textDecorationLine: props.todo[key].clear ? "line-through" : "none",
                                    }}
                                >
                                    {props.todo[key].text}
                                </Text>
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            const newUpdateMorningToggle = { ...updateMorningToggle };
                                            allUpdateToggleOffNotMe(newUpdateMorningToggle, key);
                                            afternoonUpdateToggleOff();
                                            nightUpdateToggleOff();
                                            newUpdateMorningToggle[key] = !newUpdateMorningToggle[key];
                                            setUpdateMorningToggle(newUpdateMorningToggle);
                                        }}
                                    >
                                        <AntDesign name="reload1" size={20} color="#24B2FF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => props.clearTodo(key)}>
                                        <AntDesign name="check" size={24} color="#99DBA0" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.deleteTodo(key)}>
                                        <AntDesign name="close" size={24} color="#F06B6E" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {updateMorningToggle[key] && (
                                <TextInput
                                    onChangeText={(e) => setUpdateText(e)}
                                    onSubmitEditing={() => {
                                        if (updateText !== "") {
                                            props.updateTodo(key, updateText);
                                        }
                                        setUpdateText("");
                                        setUpdateMorningToggle(false);
                                    }}
                                    returnKeyType="done"
                                    value={updateText}
                                    placeholder={" " + props.todo[key].text}
                                    style={styles.updateInput}
                                ></TextInput>
                            )}
                        </View>
                    ) : null
                )}
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

            <View style={styles.todos}>
                {Object.keys(props.todo).map((key) =>
                    "afternoon" === props.todo[key].when ? (
                        <View>
                            <View key={key} style={styles.todo}>
                                <Text
                                    style={{
                                        ...styles.todoText,
                                        textDecorationLine: props.todo[key].clear ? "line-through" : "none",
                                    }}
                                >
                                    {props.todo[key].text}
                                </Text>
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            const newUpdateToggle = { ...updateAfternoonToggle };
                                            allUpdateToggleOffNotMe(newUpdateToggle, key);
                                            morningUpdateToggleOff();
                                            nightUpdateToggleOff();
                                            newUpdateToggle[key] = !newUpdateToggle[key];
                                            setUpdateAfternoonToggle(newUpdateToggle);
                                        }}
                                    >
                                        <AntDesign name="reload1" size={20} color="#24B2FF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => props.clearTodo(key)}>
                                        <AntDesign name="check" size={24} color="#99DBA0" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.deleteTodo(key)}>
                                        <AntDesign name="close" size={24} color="#F06B6E" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {updateAfternoonToggle[key] && (
                                <TextInput
                                    onChangeText={(e) => setUpdateText(e)}
                                    onSubmitEditing={() => {
                                        if (updateText !== "") {
                                            props.updateTodo(key, updateText);
                                        }
                                        setUpdateText("");
                                        setUpdateAfternoonToggle(false);
                                    }}
                                    returnKeyType="done"
                                    value={updateText}
                                    placeholder={" " + props.todo[key].text}
                                    style={styles.updateInput}
                                ></TextInput>
                            )}
                        </View>
                    ) : null
                )}
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
                {Object.keys(props.todo).map((key) =>
                    "night" === props.todo[key].when ? (
                        <View>
                            <View key={key} style={styles.todo}>
                                <Text
                                    style={{
                                        ...styles.todoText,
                                        textDecorationLine: props.todo[key].clear ? "line-through" : "none",
                                    }}
                                >
                                    {props.todo[key].text}
                                </Text>
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            const newUpdateToggle = { ...updateNightToggle };
                                            allUpdateToggleOffNotMe(newUpdateToggle, key);
                                            morningUpdateToggleOff();
                                            afternoonUpdateToggleOff();
                                            newUpdateToggle[key] = !newUpdateToggle[key];
                                            setUpdateNightToggle(newUpdateToggle);
                                        }}
                                    >
                                        <AntDesign name="reload1" size={20} color="#24B2FF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => props.clearTodo(key)}>
                                        <AntDesign name="check" size={24} color="#99DBA0" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => props.deleteTodo(key)}>
                                        <AntDesign name="close" size={24} color="#F06B6E" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {updateNightToggle[key] && (
                                <TextInput
                                    onChangeText={(e) => setUpdateText(e)}
                                    onSubmitEditing={() => {
                                        if (updateText !== "") {
                                            props.updateTodo(key, updateText);
                                        }
                                        setUpdateText("");
                                        setUpdateNightToggle(false);
                                    }}
                                    returnKeyType="done"
                                    value={updateText}
                                    placeholder={" " + props.todo[key].text}
                                    style={styles.updateInput}
                                ></TextInput>
                            )}
                        </View>
                    ) : null
                )}
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
        paddingBottom: 14,
        fontSize: 18,
    },
    updateInput: {
        marginTop: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 18,
        borderColor: "#24B2FF",
        borderWidth: 1.5,
        borderRadius: 20,
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
        fontWeight: 500,
    },
    row: {
        flexDirection: "row",
    },
    button: {
        marginRight: 20,
    },
});
