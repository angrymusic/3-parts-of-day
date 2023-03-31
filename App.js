import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { StyleSheet, Text, Button, View, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { Drawer } from "react-native-drawer-layout";

export default function App() {
    const [open, setOpen] = useState(false);
    const [today, setToday] = useState("");

    const getDay = () => {
        const today = new Date();
        const week = ["일", "월", "화", "수", "목", "금", "토"];

        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();
        const todayWeek = week[today.getDay()];

        setToday(todayYear + "년 " + todayMonth + "월 " + todayDate + "일 " + todayWeek + "요일");
    };
    useEffect(() => {
        getDay();
    }, []);
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
                <FontAwesome
                    style={styles.sideButton}
                    onPress={() => setOpen((prevOpen) => !prevOpen)}
                    name="check-square"
                    size={32}
                    color="#222222"
                />
            </SafeAreaView>
            <ScrollView style={styles.container}></ScrollView>
        </Drawer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    sideButton: {
        paddingRight: 10,
        paddingBottom: 5,
    },
});
