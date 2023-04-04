import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Drawer } from "react-native-drawer-layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "./components/Todo";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const STORAGE_TODOS_KEY = "@todos";
const STORAGE_GOALS_KEY = "@goals";

export default function App() {
    const [open, setOpen] = useState(false);
    const [today, setToday] = useState("");
    const [todos, setTodos] = useState({});
    const [goals, setGoals] = useState({});
    const [todayTodo, setTodayTodo] = useState({});
    const [dayCursor, setDayCursor] = useState();

    const saveTodos = async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    };
    const loadTodos = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_TODOS_KEY);
            if (data) {
                setTodos(JSON.parse(data));
            }
        } catch (e) {
            console.log(e);
        }
    };
    const saveGoals = async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_GOALS_KEY, JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    };
    const loadGoals = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_GOALS_KEY);
            if (data) {
                setGoals(JSON.parse(data));
            }
        } catch (e) {
            console.log(e);
        }
    };
    const addTodo = (newTodo, when) => {
        if (newTodo === "") {
            return;
        } else {
            console.log(newTodo);
        }
    };
    const getDay = (today) => {
        if (!today) {
            today = new Date();
        }
        const week = ["일", "월", "화", "수", "목", "금", "토"];

        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const todayWeek = week[today.getDay()];

        setToday(todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + todayWeek + "요일");
    };
    const goTomorrow = () => {
        setDayCursor(new Date(dayCursor.setDate(dayCursor.getDate() + 1)));
    };
    const goYesterday = () => {
        setDayCursor(new Date(dayCursor.setDate(dayCursor.getDate() - 1)));
    };
    useEffect(() => {
        setDayCursor(new Date());
        getDay(dayCursor);
    }, []);
    useEffect(() => {
        getDay(dayCursor);
    }, [dayCursor]);

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            drawerPosition="right"
            renderDrawerContent={() => {
                return (
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.title}>할 일</Text>
                    </SafeAreaView>
                );
            }}
        >
            <StatusBar style="black" />
            <SafeAreaView style={styles.topBar}>
                <Text style={styles.title}>{today}</Text>
                <TouchableOpacity>
                    <AntDesign
                        style={styles.sideButton}
                        onPress={() => setOpen((prevOpen) => !prevOpen)}
                        name="menu-unfold"
                        size={26}
                        color="black"
                    />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.todoWrapper}>
                <TouchableOpacity style={styles.arrowButton} onPress={goYesterday}>
                    <AntDesign style={styles.arrowButton} name="left" size={24} color="black" />
                </TouchableOpacity>
                <Todo todo={todayTodo} addTodo={addTodo} />
                <TouchableOpacity style={styles.arrowButton} onPress={goTomorrow}>
                    <AntDesign style={styles.arrowButton} name="right" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </Drawer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8EAD6",
    },
    todoWrapper: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#E8EAD6",
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#99DBA0",
    },
    title: {
        paddingLeft: 15,
        fontSize: 20,
        fontWeight: 700,
        paddingBottom: 5,
    },
    sideButton: {
        paddingRight: 10,
        paddingBottom: 10,
    },
    arrowButton: {
        padding: 3,
        justifyContent: "center",
    },
});
