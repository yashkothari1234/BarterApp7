import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity,TextInput,Alert,KeyboardAvoidingView } from 'react-native';
import { ListItem  } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
export default class ExchangeScreen extends React.Component {
  constructor(){
    super()
    this.state={
      text : '',
   userName : firebase.auth().currentUser.email,
   itemName : '',
   description : '',
    }
  }
  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }
addItem=(itemName,description)=>{
var userName = this.state.userName
var randomExchangeId = this.createUniqueId()

      db.collection('exchange_requests').add({
       "user_name" : userName,
       "item_name" : itemName,
       "description" : description,
       "exhange_id"  : randomExchangeId,
       })
       this.setState({
        itemName : '',
        description : ''
        })

        return alert(
'Item Ready To Exchange',
'',
[
  {text : 'ok',onPress : ()=>{
    this.props.navigation.navigate('Home')
  }}
]
        )
}

  render(){
    return(
      <View style={{flex:1}}>
          <MyHeader title="Exchange Items" navigation ={this.props.navigation}/>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style ={styles.formTextInput}
          placeholder={"Enter item name...."}
          onChangeText={(text)=>{
              this.setState({
                  itemName:text
              })
          }}
          value={this.state.itemName}
        />
    
        <TextInput
          style ={[styles.formTextInput,{height:300}]}
          multiline
          numberOfLines ={8}
          placeholder={"What is it's description ??"}
          onChangeText ={(text)=>{
              this.setState({
                  description:text
              })
          }}
          value ={this.state.description}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.addItem(this.state.itemName,this.state.description)}}
          >
          <Text style= {styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
   
</View>
    )
  }
}
const styles = StyleSheet.create({
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'gold',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10,
    fontFamily : 'TimesNewRoman',
   fontWeight : 'bold'
 },




 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"black",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.50,
   shadowRadius: 10.32,
   elevation: 20,
   padding: 10
 },
 buttonText:{
   fontSize:20,
    fontFamily : 'TimesNewRoman',
   fontWeight : 'bold',
    color:"gold",
 }
})