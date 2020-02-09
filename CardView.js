import React,{Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import firebase from './firebase.js'

export default class CardView extends Component{
    delete(id){
        firebase.database().ref("userdata").child(id).remove().then(() => {
            Alert.alert("Item Deleted")
        }).catch(() => {
            Alert.alert("error")
        })
      }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{fontWeight:'bold'}}>{this.props.Name}</Text>
                    <Text>{this.props.Email}</Text>
                </View>
                <TouchableOpacity
                 onPress={() => {
                     this.delete(this.props.id);
                 }}
                 style={styles.btnDelete}>
                    <Image
                        style={{height:30, width:30}}
                        source={require("./delete.png")}

                    />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                    this.props.showedit(this.props.id)
                }}
                style={styles.btnEdit}>
                    <Image
                        style={{height:30, width:30}}
                        source={require("./edit.png")}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        height:50,
        // justifyContent:"center",
        // paddingLeft:20,
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        marginTop:5,

    },
    content:{
        flex:6,
        // backgroundColor:'red',
        justifyContent:'center',
        paddingLeft:20,
    },
    btnEdit:{
        flex:2,
        // backgroundColor:'green'
        alignItems:'center',
        justifyContent:'center'
    },
    btnDelete:{
        flex:2,
        alignItems:'center',
        justifyContent:'center'
        // backgroundColor:'blue',
        
    }
})
