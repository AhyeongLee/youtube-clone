import Navbar from './components/Navbar';
import Thumnails from './components/Thumbnails';
import './App.css';
import { useEffect, useState } from 'react';


let responseItems;
const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyCTlyW-ihOoQm7Luaajfzjy_8TJ89JQnq4&part=snippet,contentDetails,statistics,status')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      // console.log(JSON.stringify(myJson));
      setItems(myJson['items']);
      setIsFetching(true);
    });
  }, []);

  
    

  

  return (
    <>
      <Navbar>
      </Navbar>
      <Thumnails items={isFetching ? items : []} />
    </>
  );
}

export default App;
