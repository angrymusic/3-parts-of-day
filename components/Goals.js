import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Goals(props) {
    const [newGoal, setNewGoal] = useState("");
    const [updateToggle, setUpdateToggle] = useState({});
    const [updateText, setUpdateText] = useState("");
    return (
        <ScrollView style={styles.container}>
            {Object.keys(props.goals).map((key) => (
                <View key={key}>
                    <View style={styles.goal}>
                        <Text
                            style={{
                                ...styles.goalText,
                                textDecorationLine: props.goals[key].clear ? "line-through" : "none",
                            }}
                        >
                            {props.goals[key].text}
                        </Text>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    const newUpdateToggle = { ...updateToggle };
                                    for (let k in newUpdateToggle) {
                                        if (key !== k) {
                                            newUpdateToggle[k] = false;
                                        }
                                    }
                                    newUpdateToggle[key] = !newUpdateToggle[key];
                                    setUpdateToggle(newUpdateToggle);
                                }}
                            >
                                <AntDesign name="reload1" size={20} color="#24B2FF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => props.clearGoal(key)}>
                                <AntDesign name="check" size={24} color="#99DBA0" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => props.deleteGoal(key)}>
                                <AntDesign name="close" size={24} color="#F06B6E" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {updateToggle[key] && (
                        <TextInput
                            onChangeText={(e) => setUpdateText(e)}
                            onSubmitEditing={() => {
                                if (updateText !== "") {
                                    props.updateGoal(key, updateText);
                                }
                                setUpdateText("");
                                setUpdateToggle(false);
                            }}
                            returnKeyType="done"
                            value={updateText}
                            placeholder={" " + props.goals[key].text}
                            style={styles.updateInput}
                        ></TextInput>
                    )}
                </View>
            ))}
            <TextInput
                onChangeText={(e) => setNewGoal(e)}
                onSubmitEditing={() => {
                    props.addGoal(newGoal);
                    setNewGoal("");
                }}
                onFocus={() => {
                    const newUpdateToggle = { ...updateToggle };
                    for (let k in newUpdateToggle) {
                        newUpdateToggle[k] = false;
                    }
                    setUpdateToggle(newUpdateToggle);
                }}
                returnKeyType="done"
                value={newGoal}
                placeholder="+ 할 일"
                style={styles.input}
            ></TextInput>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    goals: {
        minHeight: 100,
    },
    title: {
        fontWeight: 700,
        fontSize: 30,
    },
    input: {
        padding: 10,
        fontSize: 18,
    },
    updateInput: {
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 7,
        marginBottom: 10,
        fontSize: 18,
        borderColor: "#24B2FF",
        borderBottomWidth: 1.5,
    },
    plusButton: {
        marginTop: 10,
    },
    goal: {
        marginVertical: 5,
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    goalText: {
        fontSize: 18,
        fontWeight: 500,
    },
    row: {
        flexDirection: "row",
    },
    button: {
        marginRight: 10,
    },
});
