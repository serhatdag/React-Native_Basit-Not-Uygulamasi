import { StyleSheet } from "react-native";
import { width_screen } from "../NoteList";

export const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    container_black:{
        backgroundColor:"#4d4d4d"
    },
    container_purple:{
        backgroundColor:"#aeadfd"
    },
    container_green:{
        backgroundColor:"#adfdc2"
    },
    container_white:{
        backgroundColor:"#ffffff"
    },
    container_pink:{
        backgroundColor:"#f9c7fc"
    },
    container_yellow:{
        backgroundColor:"#f8fdad"
    },
    top_bar:{
        width:"100%",
        height:"10%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    colors:{
        flexDirection:"row",
        zIndex: 2
    },
    add_btn:{
        height:"100%",
        width: "15%",
        justifyContent:"center",
        alignItems:"center",
        zIndex: 1
    },
    add:{
        resizeMode:"contain",
        height:"65%",
        maxWidth:"100%"
    },

    add_black:{
        tintColor:"#dddddd"
    },
    circle:{
        width:"8%",
        aspectRatio: 1,
        marginHorizontal: 5,
        borderRadius: ((width_screen*8)/100)/2,
        borderWidth:2,
    },
 
    black:{
        backgroundColor:"#4d4d4d",
        borderColor:"#3a3a3a"
    },
    purple:{
        backgroundColor:"#aeadfd",
        borderColor:"#876ae0"
    },
    green:{
        backgroundColor:"#adfdc2",
        borderColor:"#68dcaf"
    },
    yellow:{
        backgroundColor:"#f8fdad",
        borderColor:"#fada83"
    },
    pink:{
        backgroundColor:"#f9c7fc",
        borderColor:"#f083d2"
    },
    white:{
        borderColor:"#dddddd",
        backgroundColor:"#ffffff"
    },
    footer:{
        width:"100%",
        height: "15%",
        justifyContent:"center",
        paddingLeft:"5%",
    },
    content:{
        width:"100%",
        height:"75%",
        paddingHorizontal: "5%",
        paddingTop:"5%",
    },
    logo:{
        resizeMode:"contain",
        width:"15%",
    },
    middle_add:{
        resizeMode:"contain",
        height:"40%"
    },
    middle_add_black:{
        tintColor:"#dddddd"
    },
    txt_input_text:{
        flex:10,
        color:"black",
        lineHeight: 25,
        letterSpacing: 1,
        fontSize: 17,
        marginTop:"5%"
    },
    txt_input_text_black:{
        color:"#dddddd"
    },
    txt_input_text_write:{
        paddingLeft:"5%"
    },
    txt_input_title:{
        flex:3,
        borderWidth:3,
        width:"100%",
        height:"10%",
        paddingHorizontal:"5%",
        fontWeight:"bold",
        fontSize: 15,
        borderRadius: 10,
        color:"black"
    },
    txt_input_title_black:{
        borderColor:"#3a3a3a",
        color:"#dddddd"

    },
    txt_input_title_purple:{
        borderColor:"#876ae0"
    },
    txt_input_title_green:{
        borderColor:"#68dcaf"
    },
    txt_input_title_white:{
        borderColor:"#dddddd"
    },
    txt_input_title_pink:{
        borderColor:"#f083d2"
    },
    txt_input_title_yellow:{
        borderColor:"#fada83"
    },
    txt_input_title_not_write:{
        borderWidth:0,
        marginLeft:"-5%"
    },
    scroll_view:{
        width:"100%",
        height:"100%"
    }
})