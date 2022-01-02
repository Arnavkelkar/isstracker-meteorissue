import React,{Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            meteors:{}
        }
    }
    componentDidMount(){
        this.getMeteors()
    }
    getMeteors=()=>{
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=gGJH02QRIImtHYpeLFNJbAdDa6dhJziwTGY5mOaW")
        .then(response=>{
            console.log(response)
            this.setState({
                meteors:response.data.near_earth_objects
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }

    render(){
        if(Object.keys(this.state.meteors).length==0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>Loading...</Text></View>
            );
        }
        else{
            var meteor_arr=Object.keys(this.state.meteors).map(meteor_date=>{
                return this.state.meteors[meteor_date]
            })
            var meteors = [].concat.apply([],meteor_arr);
            meteors.forEach(function(element){
                var diameter=(element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2;
                console.log(diameter)
                var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000;
                element.threat_score=threatScore
            });
            return(
                <View style = {styles.container}>
                   
                    <Text>Meteor Screen</Text>
                </View>
            )
        }
        
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})