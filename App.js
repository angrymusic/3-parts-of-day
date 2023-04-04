import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View, SafeAreaView, Alert, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Drawer } from "react-native-drawer-layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Todo from "./components/Todo";

const STORAGE_TODOS_KEY = "@todos";
const STORAGE_GOALS_KEY = "@goals";

export default function App() {
    const [open, setOpen] = useState(false);
    const [today, setToday] = useState("");
    const [todos, setTodos] = useState(new Map());
    const [goals, setGoals] = useState({});
    const [todayTodo, setTodayTodo] = useState({});
    const [dayCursor, setDayCursor] = useState();
    const [dayKey, setDayKey] = useState();
    const [topColor, setTopColor] = useState(false);

    const saveTodos = async (data) => {
        try {
            await AsyncStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(Object.fromEntries(data)));
        } catch (e) {
            console.log(e);
        }
    };
    const loadTodos = async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_TODOS_KEY);
            if (data) {
                setTodos(new Map(Object.entries(JSON.parse(data))));
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
    //새로 할 일 추가 하기
    const addTodo = (newTodo, when) => {
        if (newTodo === "") {
            return;
        } else {
            const newMemo = { ...todos.get(dayKey), [Date.now()]: { text: newTodo, when: when } };
            console.log(todos.get(dayKey));
            setTodos((prev) => new Map(prev).set(dayKey, newMemo));
            console.log(todos.get(dayKey));
            saveTodos(todos);
        }
    };
    const deleteTodo = (id) => {
        if (!id) {
            return;
        } else {
            Alert.alert("삭제할까요?", "정말로요?", [
                {
                    text: "네",
                    onPress: () => {
                        const newMemo = todos.get(dayKey);
                        delete newMemo[id];
                        setTodos((prev) => new Map(prev).set(dayKey, newMemo));
                        saveTodos(todos);
                    },
                },
                {
                    text: "아니요",
                },
            ]);
        }
    };

    //화면 상단에 표시할 날짜와 input된 날짜로 기반한 스토리지 조회에 사용될 키 이름 생성
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
        setDayKey(("" + todayYear + todayMonth + todayDate) * 1);
    };

    //오늘 할일 데이터 가져오기
    const getTodayTodo = () => {
        //오늘 날짜로 데이터가 있다면 가져오기 없다면 새로 생성
        if (!todos.has(dayKey)) {
            todos.set(dayKey, {});
        }
        setTodayTodo(todos.get(dayKey));
    };
    const goTomorrow = async () => {
        setDayCursor(new Date(dayCursor.setDate(dayCursor.getDate() + 1)));
        getDay(dayCursor);
        setTopColor((prev) => !prev);
    };

    const goYesterday = async () => {
        setDayCursor(new Date(dayCursor.setDate(dayCursor.getDate() - 1)));
        getDay(dayCursor);
        setTopColor((prev) => !prev);
    };

    useEffect(() => {
        setDayCursor(new Date());
        loadTodos();
        loadGoals();
        getDay(dayCursor);
        getTodayTodo();
    }, []);

    useEffect(() => {
        getTodayTodo();
    }, [dayCursor, todos]);

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
            <SafeAreaView style={{ ...styles.topBar, backgroundColor: topColor ? "#F06B6E" : "#99DBA0" }}>
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
                    <Entypo style={styles.arrowButton} name="chevron-thin-left" size={28} color="black" />
                </TouchableOpacity>
                <Todo todo={todayTodo} addTodo={addTodo} deleteTodo={deleteTodo} />
                <TouchableOpacity style={styles.arrowButton} onPress={goTomorrow}>
                    <Entypo style={styles.arrowButton} name="chevron-thin-right" size={28} color="black" />
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
        borderBottomColor: "black",
        borderBottomWidth: 1.5,
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
