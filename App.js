import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet,Alert ,Button, TouchableOpacity, ScrollView} from 'react-native'
import firebase from './firebase.js'
import CardView from './CardView'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      id:"",
      Name:"",
      Email:"",
      DATA:[],
    }
  }
  componentDidMount(){
    this.show();
  }
  add(Name, Email){
    if(Name != "" || Email != ""){
      var id = firebase.database().ref("userdata").push().getKey();
      firebase.database().ref("userdata").child(id).set({
        id,
        Name,
        Email,
      }).then(() => {
        Alert.alert("Success")
      }).catch((error) => {
        Alert.alert(error.message)
      })
    }
    else{
      Alert.alert("Please Provide Complete Details")
    }
  }
  show(){
    const userdataRef = firebase.database().ref("userdata");
    userdataRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];

      for(let item in items){
        newState.push({
          id: items[item].id,
          Name: items[item].Name,
          Email: items[item].Email
        })
      }

      this.setState({
        DATA:newState
      })
    });
  }
  showedit(id){
    this.setState({
      id:id
    })
    for(let i = 0; i < this.state.DATA.length; i++){
      if(this.state.DATA[i].id == id){
        this.setState({
          Name:this.state.DATA[i].Name,
          Email: this.state.DATA[i].Email,
        })
        break; 
      }
    }
  }
  edit(){
    if(this.state.id != ""){
      firebase.database().ref("userdata").child(this.state.id).update({
        "id":this.state.id,
        "Name":this.state.Name,
        "Email":this.state.Email
      })
    }
    else{
      Alert.alert("Please Select Contact")
    }
  } 
  render(){
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.upperSection}>
              <Text>Name</Text>
              <TextInput 
                value={this.state.Name}
                onChangeText={(value) => this.setState({Name:value})}
                style={styles.textbox}

              />
              <Text>Email</Text>
              <TextInput 
                value={this.state.Email}
                onChangeText={(value) => this.setState({Email:value})}
                style={styles.textbox}

              />
              <View style={styles.BtnView}>
                  <TouchableOpacity 
                  onPress={() => {
                    this.add(this.state.Name, this.state.Email)
                  }}
                  style={styles.Btn}>
                      <Text style={{opacity:0.9}}>
                        ADD
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={
                    () => {
                      this.edit();
                    }
                  }
                  style={styles.Btn}>
                      <Text style={{opacity:0.9}}>
                        UPDATE
                      </Text>
                  </TouchableOpacity>
              </View>
              
          </View>
          <View style={styles.lowerSection}>
                  {this.state.DATA.map((data) => <CardView Name={data.Name} Email={data.Email} id={data.id} showedit={() => this.showedit(data.id)}/>)}
                  {/* <CardView Name="Javed" Email="Arsaljavedk@gmail.com"/> */}
          </View>
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'lightblue'
  },
  upperSection:{
    flex:4,
    backgroundColor:'white'
  },
  lowerSection:{
    flex:8,
    marginTop:10,
  },
  textbox:{
    backgroundColor:'whitesmoke',
    margin:5
  },
  BtnView:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  Btn:{
    height:40, 
    width:120,
    backgroundColor:'lightblue',
    marginLeft:5,
    alignItems:'center',
    justifyContent:'center'
    
  }
  
})
