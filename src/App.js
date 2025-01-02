import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import loading from './loading.gif';

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
    "Dekhona Dekhona - Anuv Jain",
    "Husn - Anuv Jain",
  ];

  const randomSong = Math.floor(Math.random() * songlist.length);

  const [tracks, setTracks] = useState([]);
  const [song, setSong] = useState(songlist[randomSong]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    if (song !== '') {
      try {
        setLoading(true);
        const result = await axios.get(
          `https://v1.nocodeapi.com/umarshaikh2482/spotify/FyetDbWXfXOkhcjx/search?q=${song}&type=track`
        );
        if (result.status === 200) {
          setLoading(false);
          const data = result.data;
          setTracks(data.tracks.items || []); // Ensure we handle empty results gracefully
        } else if (result.status === 429) {
          alert('Too many requests, Please try again later');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Please give Input...');
    }
  };

  useEffect(() => {
    getData();
  }, [song]); // Trigger fetch whenever `song` changes

  const handleClick = async (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <Navbar handleClick={handleClick} setSong={setSong} />
      <div className="container my-4">
        <div className="row row-gap-5">
          {isLoading && (
            <div>
              <img src={loading} alt="loader" width="400px" />
            </div>
          )}
          {!isLoading && tracks.length === 0 && (
            <div>No tracks found. Try searching for a different song.</div>
          )}
          {!isLoading &&
            tracks.map((track) => (
              <Card track={track} key={track.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
