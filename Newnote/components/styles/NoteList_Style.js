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
        paddingLeft:"5%"
    },
    content:{
        width:"100%",
        height:"75%",
        padding: "5%"
    },
    logo:{
        resizeMode:"contain",
        width:"15%",
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
    middle_add:{
        resizeMode:"contain",
        height:"40%"
    },
    middle_add_black:{
        tintColor:"#dddddd"
    },
    list_button:{
        width:"100%",
        height:"auto",
        justifyContent:"center",
        marginVertical:"2%",
        paddingVertical:"3.5%",
        paddingHorizontal:"4%",
        borderRadius:5,
        borderWidth:.5,
        borderColor: "black"
    },
    list_button_black:{
        backgroundColor:"#3a3a3a",
        borderColor:"#dddddd"
    },
    list_button_purple:{
        backgroundColor:"#876ae0"
    },
    list_button_green:{
        backgroundColor:"#68dcaf"
    },
    list_button_white:{
        backgroundColor:"#dddddd"
    },
    list_button_pink:{
        backgroundColor:"#f083d2"
    },
    list_button_yellow:{
        backgroundColor:"#fada83"
    },
    list_txt:{
        color:"black",
        fontSize:16,
        letterSpacing: 1.5,
        fontWeight:500
    },
    list_txt_black:{
        color :"#dddddd",
        
    },
    list_button_selected:{
        borderWidth:3,
        borderColor:"red"
    }
})