import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class RecieverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      recieverId      : this.props.navigation.getParam('details')["user_name"],
      requestId       : this.props.navigation.getParam('details')["request_id"],
      bookName        : this.props.navigation.getParam('details')["item_name"],
      reason_for_requesting     : this.props.navigation.getParam('details')["description"],
      recieverName    : '',
      recieverContact : '',
      recieverAddress : '',
      recieverRequestDocId : ''
    }
  }



getRecieverDetails(){

  db.collection('users').where('email_id','==' ,this.state.recieverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc=>{
      this.setState({
        recieverName    : doc.data().first_name,
        recieverContact : doc.data().contact,
        recieverAddress : doc.data().address,
      })
    })
  });

  db.collection('exchange_requests').where('request_id','==',this.state.recieverId).get()
  .then(snapshot=>{
    snapshot.forEach(doc => {
      this.setState({recieverRequestDocId:doc.id})
   })
})}

updateItemStatus=()=>{
  db.collection('all_donations').add({
    item_name           : this.state.bookName,
    exchange_id          : this.state.requestId,
    requested_by        : this.state.recieverName,
    donor_id            : this.state.userId,
    request_status      :  "Donor Interested"
  })
}



componentDidMount(){
  this.getRecieverDetails()
}


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <Header
            leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
            centerComponent={{ text:"Donate Items", style: { color: 'black', fontSize:20,fontWeight:"bold", fontFamily :'TimesNewRoman',fontWeight :'bold'} }}
            backgroundColor = "gold"
          />
        </View>
        <View style={{flex:0.3}}>
          <Card
              title={"Item Information"}
              titleStyle= {{fontSize : 20, fontFamily :'TimesNewRoman',fontWeight :'bold'}}
            >
            <Card >
              <Text style={{fontWeight:'bold', fontFamily :'TimesNewRoman'}}>Name : {this.state.bookName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold', fontFamily :'TimesNewRoman'}}>Dscription : {this.state.reason_for_requesting}</Text>
            </Card>
          </Card>
        </View>
        <View style={{flex:0.3}}>
          <Card
            title={"Reciever Information"}
            titleStyle= {{fontSize : 20, fontFamily :'TimesNewRoman',fontWeight :'bold'}}
            >
            <Card>
              <Text style={{fontWeight:'bold', fontFamily :'TimesNewRoman'}}>Name: {this.state.recieverName}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold', fontFamily :'TimesNewRoman'}}>Contact: {this.state.recieverContact}</Text>
            </Card>
            <Card>
              <Text style={{fontWeight:'bold', fontFamily :'TimesNewRoman'}}>Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View style={styles.buttonContainer}>
          {
            this.state.recieverId !== this.state.userId
            ?(
                 <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.updateItemStatus()
                this.props.navigation.navigate('MyDonations')
              }}>
            <Text style={styles.container}>I want to Donate</Text>
          </TouchableOpacity>
          
            )
            : null
          }
        </View>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    fontFamily :'TimesNewRoman',
    fontWeight :'bold',
  },
  buttonContainer : {
    flex:0,
    justifyContent:'center',
    alignItems:'center',
    marginTop : -100
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'black',
    shadowColor: "#000",
    
    shadowOffset: {
       width: 0,
       height: 0
     },
    elevation : 16
  }
})