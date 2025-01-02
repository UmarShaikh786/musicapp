import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import loading from './loading.gif'


function App() {

  const songlist = [
    "tera mera pyar amar",
    "On my Way -Alan walker",
    "Shayad",
    "Tum Hi Ho - Aashiqui 2",
    "Chaiyya Chaiyya - Dil Se",
    "Humsafar",
    "kaun tujhe",
    "Kabhi Kabhi Aditi - Jaane Tu Ya Jaane Na",
    "Tum Se Hi - Jab We Met",
    "Tum hi aana",
    "Mere Haath Mein - Fanaa",
    "Jai Ho - Slumdog Millionaire",
    "Tere Bina - Guru",
    "Zara Zara - Rehnaa Hai Terre Dil Mein",
    "Gerua - Dilwale",
    "Tum Jo Aaye - Once Upon A Time In Mumbaai",
    "Kuch Kuch Hota Hai - Kuch Kuch Hota Hai",
    "Kal Ho Naa Ho - Kal Ho Naa Ho",
    "Tum Mile - Tum Mile",
    "Tum Hi Ho Bandhu - Cocktail",
    "Yeh Ishq Hai - Jab We Met",
    "Lungi Dance - Chennai Express",
    "Dil Diyan Gallan - Tiger Zinda Hai",
    "Nashe Si Chadh Gayi - Befikre",
    "Ae Dil Hai Mushkil - Ae Dil Hai Mushkil",
    "Dekhona Dekhona -Anuv Jain",
    "Husn -Anuv Jain",
]

  const randomSong=Math.floor(Math.random()*songlist.length)
  

  const [tracks,setTracks]=useState([])
  const [song,setsong]=useState(songlist[randomSong])
  const [isLoading,setLoading]=useState(false)
  

  const options={
    method: 'get',
    url: `https://v1.nocodeapi.com/umarshaikh2482/spotify/FyetDbWXfXOkhcjx/search?q=${song}&type=track`
  }
  const getData=async()=>{
    
    if(song!=='')
      {
      setLoading(true)
      const result=await axios.request(options)
      if(result.status===429)
      {

        alert("Too many requests, Please try again later")
      }
      else if(result.status===200)
      {

        setLoading(false)
        const data=await result.data
        setTracks(data.tracks.items)
      }
      }
      else
      {
        alert("Please give Input...")
      }
  }
  useEffect(()=>{
   getData()
  },[])
  const handleClick=async(e)=>{
    e.preventDefault()
    getData()
    
  }
  return (
    <div className="App">
     <Navbar handleClick={handleClick} setsong={setsong}/>
     <div className="container my-4">
     <div className="row row-gap-5">
    {isLoading && <div>
      <img src={loading} alt='loader' width='400px'></img> </div>}
   {
   tracks && tracks.map((track)=>(
<Card track={track} key={track.id}/>
   ))
   }

    </div>
    </div>
</div>
  );
}

export default App;
