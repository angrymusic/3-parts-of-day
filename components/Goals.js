import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Goals(props) {
    const [newGoal, setNewGoal] = useState("");
    return (
        <ScrollView style={styles.container}>
            {Object.keys(props.goals).map((key) => (
                <View key={key} style={styles.goal}>
                    <Text
                        style={{
                            ...styles.goalText,
                            textDecorationLine: props.goals[key].clear ? "line-through" : "none",
                        }}
                    >
                        {props.goals[key].text}
                    </Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => props.clearGoal(key)}>
                            <AntDesign name="check" size={24} color="#99DBA0" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => props.deleteGoal(key)}>
                            <AntDesign name="close" size={24} color="#F06B6E" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            <TextInput
                onChangeText={(e) => setNewGoal(e)}
                onSubmitEditing={() => {
                    props.addGoal(newGoal);
                    setNewGoal("");
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
