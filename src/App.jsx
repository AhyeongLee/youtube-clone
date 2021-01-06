import Navbar from './components/Navbar';
import Main from './components/Main';
import './App.css';
import { useEffect, useState } from 'react';

const regexp = /\/\/www.youtube.com[\w.\/]+/;
const playUrl = '//www.youtube.com/embed/';
const mainUrl = 'https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyCeaTHv87Re_fcAEqfn5_MQ2QlTe3aOlX8&part=snippet&maxResults=50';
const searchUrl ='https://www.googleapis.com/youtube/v3/search?chart=mostPopular&key=AIzaSyCeaTHv87Re_fcAEqfn5_MQ2QlTe3aOlX8&part=snippet&maxResults=50&type=video&q=';
const channelUrl ='https://www.googleapis.com/youtube/v3/channels?chart=mostPopular&key=AIzaSyCeaTHv87Re_fcAEqfn5_MQ2QlTe3aOlX8&part=snippet&id=';

const App = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [player, setPlayer] = useState({video: '', title: '', description: ''});
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);

  const hanldeSearch = (keyword) => {
    console.log(searchUrl+keyword);
    fetch(searchUrl+keyword)
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
    });
  }

  const handlePlay = (e) => {
    if (e.currentTarget.tagName !== 'LI') {
      return;
      
    }
    const id = e.currentTarget.id;
    const item = items.find(item => item.id === id);

    setPlayer(prevState => {
      console.log(item);
      return item ? {
        url: playUrl + item.id,
        title: item.title,
        description: item.description
      } : {url: '', title: '', description: ''};
    });
    setIsPlayerOpened(true);
  };

  useEffect(() => {
    fetch(mainUrl)
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
    });
   
          // id: item.id,
          // title: item.snippet.localized.title,
          // description: item.snippet.localized.description,
          // thumbnails: item.snippet.thumbnails,
          // channelTitle: item.snippet.channelTitle,
          // channelId: item.snippet.channelId,
   

  }, []);

  

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
