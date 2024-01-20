import {
    View,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Button,
    Text
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused as isFocused } from '@react-navigation/native';


// --------------------------  P A G E S --------------------------  
import { styles } from "./styles/Note_Style"
// --------------------------  P A G E S --------------------------  


export const width_screen = Dimensions.get("window").width

const Note = ({ route, navigation }) => {
    // ---------------------- V A R I A B L E S ---------------------- 
    const [theme_color, setThemeColor] = useState("");
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    const is_Focused = isFocused();
    const [note_id, setNoteId] = useState("");
    const [index, setIndex] = useState(null);
    // ---------------------- V A R I A B L E S ---------------------- 


    // ---------------------- F U N C T I O N S ---------------------- 

    useEffect(() => {
        if (is_Focused) {
            const { text, title, id, write, index } = route.params;
            setText(text);
            setTitle(title);
            setNoteId(id);
            setIndex(index)
            readData();
        }
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

    const createdRandomId = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    const readData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('notes');
            if (jsonValue != null) {
                setData(JSON.parse(jsonValue));
            }
            else { setIsThere(false) }
        } catch (error) {
            console.log("async hatası: " + error)
        }
    }

    const saveNote = async (text, title) => {

        let new_title = "";
        if (title.length === 0 && text.length > 7) {
            new_title = text.substring(0, 8) + "...";
        }
        else if (title.length === 0 && text.length <= 7) {
            new_title = text
        }
        else {
            new_title = title
        }
        if (data.length > 0 && note_id == null) {

            const temprorary_data = data;
            temprorary_data.push({ "text": text, "title": new_title, "id": createdRandomId(15) })
            try {
                const jsonValue = JSON.stringify(temprorary_data);
                await AsyncStorage.setItem('notes', jsonValue);
                navigation.navigate("NoteList")
            } catch (e) {
                console.log("ASYNC: " + e)
            };
        }
        else if (data.length > 0 && note_id != null) {
            data[index] = { text: text, title: title, id: note_id };
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem('notes', jsonValue);
                navigation.navigate("NoteList")
            } catch (e) {
                console.log("ASYNC: " + e)
            }

        }
        else if (data.length < 1) {
            try {
                const jsonValue = JSON.stringify([{ "text": text, "title": new_title, "id": createdRandomId(15) }]);
                await AsyncStorage.setItem('notes', jsonValue);
                navigation.navigate("NoteList")
            } catch (e) {
                console.log("ASYNC: " + e)
            }
        }
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

                <TouchableOpacity style={styles.add_btn} onPress={() => { saveNote(text, title) }} >
                    <Image
                        source={require("../assets/Save.png")}
                        style={[styles.add, theme_color == "black" && styles.add_black]}

                    />
                </TouchableOpacity>
            </View>


            {/* ---------------------- CONTENT ----------------------*/}
            <View style={[styles.content]} >
                <ScrollView style={styles.scroll_view} scrollEnabled={true}>

                    <TextInput
                        style={[
                            styles.txt_input_title,
                            theme_color == "black" && styles.txt_input_title_black,
                            theme_color == "purple" && styles.txt_input_title_purple,
                            theme_color == "green" && styles.txt_input_title_green,
                            theme_color == "white" && styles.txt_input_title_white,
                            theme_color == "pink" && styles.txt_input_title_pink,
                            theme_color == "yellow" && styles.txt_input_title_yellow
                        ]}
                        value={title}
                        onChangeText={(event) => { setTitle(event) }}
                        inputMode='text'
                        placeholder='Bir başlık ekleyin...'
                        placeholderTextColor={theme_color == "black" ? "#dddddd" : "#000000"}
                    />


                    <TextInput
                        style={[
                            styles.txt_input_text,
                            theme_color == "black" && styles.txt_input_text_black,
                        ]}
                        value={text}
                        onChangeText={(event) => { setText(event) }}
                        textAlignVertical="top"
                        multiline
                        inputMode='text'
                        placeholder='Bir not ekleyin...'
                        placeholderTextColor={theme_color == "black" ? "#dddddd" : "#3a3a3a"}
                    />
                </ScrollView >
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

export default Note;
