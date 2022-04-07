import { StatusBar } from 'expo-status-bar';
import React , {useState,useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput , ScrollView,Image} from 'react-native';
import axios from 'axios';

export default function App() {
const apiurl= "http://www.omdbapi.com/?i=tt3896198&apikey=3d92b65e";

const [show,setShow]=useState(0);
const [state, setState] = useState({
  s: "Enter a movie...",
   results: [],
   Topresult: [],                 
   selected: {}
 });


 useEffect(()=>{
  axios(apiurl+"&s=movies&type=movie&page=1").then(({data}) => {
    let Topresult = data.Search
    
    setState(State=>{
 
     return {...State, Topresult: Topresult}
    })
 
    })
  
 },[]); 
 
 const search = () => {

   axios(apiurl + "&s=" + state.s).then(({data}) => {
   let results = data.Search
   
   setState(prevState=>{

    return {...prevState, results: results}
   })

   })
 }

  return (
    <View style={styles.container}>
   
     <Text style={styles.title}>Movie App</Text>
     <TextInput style={styles.searchBox} value={state.s}
     onChangeText={text => setState(prevState =>{

      return {...prevState,s: text}
     })}
     
     onSubmitEditing={()=>{search();setShow(1);}}
     />
   {show?
   <ScrollView style={styles.result}>
     {state.results.map(result=>(
       <View key={result.imdbID} style={styles.result}>
         <Image source={{uri:result.Poster}}
         style={{width:'100%',height:300}}/>
         <Text style={styles.heading}>{result.Title}</Text>
       </View>
     ))}
   
   </ScrollView>:
   <ScrollView style={styles.result}>
     {state.Topresult.map(topresult=>(
       <View key={topresult.imdbID} style={styles.result}>
         <Image source={{uri:topresult.Poster}}
         style={{width:'100%',height:300}}/>
         <Text style={styles.heading}>{topresult.Title}</Text>
       </View>
     ))}

   </ScrollView>
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop:70,
   
  },
  title: {

    color:'#FFF',
    fontSize:32,
    fontWeight:'700',
    textAlign:'center',
    marginBottom:20,
  

    
  },
  searchBox: {


    fontSize:20,
    fontWeight:'300',
    padding:20,
    width:'80%',
    backgroundColor:'#FFF',
    textAlign:'center',
    borderRadius:8,
    marginBottom:40


    
  },
  result: {


    flex:1,
    width:'80%',
    marginBottom:20,
    paddingLeft:20,

    
  },
  heading:{

  color:'#FFF',
  fontSize:18,
  fontWeight:'700',
  padding:20,
  backgroundColor:"#445565",
   


  }
});
