import Navbar from './components/Navbar';
import Main from './components/Main';
import './App.css';
import { useEffect, useState } from 'react';

const KEY = 'AIzaSyCeaTHv87Re_fcAEqfn5_MQ2QlTe3aOlX8';
const MAX_RESULT = '50';
const PLAY_URL = '//www.youtube.com/embed/';
const POPULAR_URL = `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=${KEY}&part=snippet&maxResults=${MAX_RESULT}`;
const SEARCH_URL =`https://www.googleapis.com/youtube/v3/search?chart=mostPopular&key=${KEY}&part=snippet&maxResults=${MAX_RESULT}&type=video&q=`;
// For channel thumbnails
const channelUrl =`https://www.googleapis.com/youtube/v3/channels?chart=mostPopular&key=${KEY}&part=snippet&id=`;

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [player, setPlayer] = useState({video: '', title: '', description: ''});
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);


  useEffect(() => {
    fetch(POPULAR_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      const items = responseJson['items'].map(item => {
        return {
          id: item.id,
          title: item.snippet.localized.title,
          description: item.snippet.localized.description,
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
        }
      });
      return items;
    })
    .then(items => {
      setThumbnails(items);
    });
   

  }, []);


  const hanldeSearch = (keyword) => {
    fetch(SEARCH_URL+keyword)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      const items = responseJson['items'].map(item => {
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle,
          channelId: item.snippet.channelId,
        }
      });
      return items;
    })
    .then(items => {
      setThumbnails(items);
    });
  };

  const handlePlay = (e) => {
    if (e.currentTarget.tagName !== 'LI') {
      return;
    }
    window.scrollTo(0,0);

    const id = e.currentTarget.id;
    const item = items.find(item => item.id === id);

    setPlayer(prevState => {
      return item ? 
      {
        url: PLAY_URL + item.id,
        title: item.title,
        description: item.description
      } : 
      {url: '', title: '', description: ''};
    });
    setIsPlayerOpened(true);
  };

  const setThumbnails = (items) => {
    let promises = [];
      for (let i=0; i<items.length; i++) {
        promises.push(
          fetch(channelUrl+items[i].channelId)
          .then(response => response.json())
          .then(responseJson => responseJson['items'][0].snippet.thumbnails.default.url)
          .then(url => {
            items[i].channelThumbnails  = url;
          })
        );
      }
      Promise.all(promises)
      .then(() => {
        setItems(items);
        setIsFetching(true);
        setPlayer({video: '', title: '', description: ''});
        setIsPlayerOpened(false);
      });
  };

  

  return (
    <>
      <Navbar onSearch={hanldeSearch} />
      <Main 
        className="main"
        player={player} 
        onPlay={handlePlay} 
        items={isFetching ? items : []}
        isPlayerOpened={isPlayerOpened}
        />
    </>
  );
}

export default App;
