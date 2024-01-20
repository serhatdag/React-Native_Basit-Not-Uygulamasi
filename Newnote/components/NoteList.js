import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    Button
} from 'react-native'
import React, { useEffect, useState, useIsFocused } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused as isFocused } from '@react-navigation/native';




// --------------------------  P A G E S --------------------------  
import { styles } from "./styles/NoteList_Style"
// --------------------------  P A G E S --------------------------  


export const width_screen = Dimensions.get("window").width

const NoteList = ({ navigation }) => {
    // ---------------------- V A R I A B L E S ---------------------- 
    const [theme_color, setThemeColor] = useState("");
    const [data, setData] = useState([]);
    const [is_there, setIsThere] = useState(true);
    const is_Focused = isFocused();
    const [select_active, setSelectActive] = useState(false);
    const [deleted, setDeleted] = useState([])
    // ---------------------- V A R I A B L E S ---------------------- 


    // ---------------------- F U N C T I O N S ---------------------- 

    useEffect(() => {
        if (is_Focused) {
            readData();
        }
        readData()
        readThemeColor();

    }, [is_Focused]);

    const changeStatusBar = (color, content) => {
        StatusBar.setBackgroundColor(color);
        StatusBar.setBarStyle(content);
    }

    const readThemeColor = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('theme_color');
            if (jsonValue != null) {
                const parsedValue = JSON.parse(jsonValue);
                if (parsedValue.background) {
                    setThemeColor(parsedValue.background);
                    changeStatusBar(parsedValue.code, parsedValue.content);
                } else {
                    setThemeColor("white");
                    changeStatusBar("#dddddd", "dark-content");
                }
            } else {
                setThemeColor("white");
                changeStatusBar("#dddddd", "dark-content");
            }
        } catch (error) {
            setThemeColor("white");
            changeStatusBar("#dddddd", "dark-content");
        }
    }

    const changeThemeColor = async (color_name, statusbar_content, statusbar_code) => {
        if (theme_color != color_name) {
            changeStatusBar(statusbar_code, statusbar_content)
            setThemeColor(color_name)
        }

        try {
            await AsyncStorage.setItem(
                'theme_color', JSON.stringify({
                    "background": color_name,
                    "content": statusbar_content,
                    "code": statusbar_code
                }))

        } catch (error) {
            console.log("Kaydetme hatası" + error)
        }
    }

    const readData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('notes');
            if (jsonValue != null) {
                setData(JSON.parse(jsonValue));
                setIsThere(true)
            }
            else { setIsThere(false) }
        } catch (error) {
            console.log("async hatası: " + error)
        }
    }

    const addNote = () => {
        navigation.navigate(
            "Note",
            {
                text: "",
                title: "",
                id: null,
                write: true,
                index: null
            }
        )
    }

    const showNote = (text, title, id, index) => {
        navigation.navigate(
            "Note",
            {
                text,
                title,
                id,
                write: false,
                index
            }
        )
    }

    const Trash = async () => {
        const newData = data.filter(item => !deleted.includes(item.id));
        setData(newData)
        setSelectActive(false);
        setDeleted([]);
        try {
            const jsonValue = JSON.stringify(newData);
            await AsyncStorage.setItem('notes', jsonValue);
        } catch (e) {
            console.log("ASYNC: " + e)
        };
    }
    // ---------------------- F U N C T I O N S ----------------------



    return (
        <SafeAreaView
            style={[
                styles.container,
                theme_color == "black" && styles.container_black,
                theme_color == "purple" && styles.container_purple,
                theme_color == "green" && styles.container_green,
                theme_color == "white" && styles.container_white,
                theme_color == "pink" && styles.container_pink,
                theme_color == "yellow" && styles.container_yellow
            ]}
        >

            {/* ---------------------- TOP  BAR ----------------------*/}
            <View
                style={[
                    styles.top_bar,
                    theme_color == "black" && styles.container_black,
                    theme_color == "purple" && styles.container_purple,
                    theme_color == "green" && styles.container_green,
                    theme_color == "white" && styles.container_white,
                    theme_color == "pink" && styles.container_pink,
                    theme_color == "yellow" && styles.container_yellow
                ]}
            >
                <View style={styles.colors} >
                    <TouchableOpacity style={[styles.circle, styles.black]} onPress={() => { changeThemeColor("black", "light-content", "#3a3a3a") }}></TouchableOpacity>
                    <TouchableOpacity style={[styles.circle, styles.purple]} onPress={() => { changeThemeColor("purple", "dark-content", "#876ae0") }}></TouchableOpacity>
                    <TouchableOpacity style={[styles.circle, styles.green]} onPress={() => { changeThemeColor("green", "dark-content", "#68dcaf") }}></TouchableOpacity>
                    <TouchableOpacity style={[styles.circle, styles.white]} onPress={() => { changeThemeColor("white", "dark-content", "#dddddd") }}></TouchableOpacity>
                    <TouchableOpacity style={[styles.circle, styles.pink]} onPress={() => { changeThemeColor("pink", "dark-content", "#f083d2") }}></TouchableOpacity>
                    <TouchableOpacity style={[styles.circle, styles.yellow]} onPress={() => { changeThemeColor("yellow", "dark-content", "#fada83") }}  ></TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.add_btn} onPress={() => { !select_active ? addNote() : Trash() }}
                >
                    <Image
                        source={!select_active ? require("../assets/Add.png") : require("../assets/Delete.png")}
                        style={[styles.add, theme_color == "black" && styles.add_black]}

                    />
                </TouchableOpacity>
            </View>


            {/* ---------------------- CONTENT ----------------------*/}
            <View style={[styles.content, !is_there && { justifyContent: "center", alignItems: "center" }]} >

                {
                    is_there
                        ?

                        <FlatList
                            style={styles.flatlist}
                            data={data}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (select_active) {
                                            if (deleted.indexOf(item.id) == -1) {
                                                setDeleted([...deleted, item.id])
                                            }
                                            else if (deleted.indexOf(item.id) >= 0) {
                                                let new_deleted = deleted;
                                                new_deleted = new_deleted.filter((new_deleted) => {
                                                    return new_deleted.indexOf(item.id) === -1
                                                });
                                                if (new_deleted.length == 0) {
                                                    setSelectActive(false)
                                                }
                                                setDeleted(new_deleted);

                                            };



                                        }
                                        else {
                                            showNote(item.text, item.title, item.id, index)
                                        }

                                    }}
                                    key={item.id}
                                    onLongPress={() => {
                                        setSelectActive(true);
                                        setDeleted([...deleted, item.id])
                                    }}
                                    style={[
                                        styles.list_button,
                                        theme_color == "black" && styles.list_button_black,
                                        theme_color == "purple" && styles.list_button_purple,
                                        theme_color == "green" && styles.list_button_green,
                                        theme_color == "white" && styles.list_button_white,
                                        theme_color == "pink" && styles.list_button_pink,
                                        theme_color == "yellow" && styles.list_button_yellow,
                                        deleted.indexOf(item.id) != -1 && styles.list_button_selected
                                    ]}
                                >
                                    <Text style={[styles.list_txt, theme_color == "black" && styles.list_txt_black]} >{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        :

                        <TouchableOpacity onPress={() => { addNote() }}>
                            <Image source={require("../assets/Add.png")} style={[styles.middle_add, theme_color == "black" && styles.middle_add_black]} />
                        </TouchableOpacity>
                }
            </View>
            {/* ---------------------- CONTENT ----------------------*/}


            {/* ---------------------- FOOTER ----------------------*/}
            <View style={styles.footer} >
                <Image source={require("../assets/Alt_Logo.png")} style={[styles.logo]} />
            </View>
            {/* ---------------------- FOOTER ----------------------*/}

        </SafeAreaView>
    )
}

export default NoteList;
