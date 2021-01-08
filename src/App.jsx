import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

const PLAY_URL = '//www.youtube.com/embed/';

const App = ({ youtube }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [player, setPlayer] = useState({video: '', title: '', description: ''});
  const [isPlayerOpened, setIsPlayerOpened] = useState(false);


  useEffect(() => {
    youtube
      .mostPopular()
      .then(items => {
        let promises = [];
        Promise.all(youtube.setThumbnails(items, promises))
        .then(() => {
          setItems(items);
          setIsFetching(true);
          setPlayer({video: '', title: '', description: ''});
          setIsPlayerOpened(false);
        });
      });

  }, []);

  const handleSearch = useCallback((keyword) => {
    youtube.search(keyword)
    .then(items => {
      let promises = [];
        Promise.all(youtube.setThumbnails(items, promises))
        .then(() => {
          setItems(items);
          setIsFetching(true);
          setPlayer({video: '', title: '', description: ''});
          setIsPlayerOpened(false);
        });
    });
  }, []);


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
  

  return (
    <>
      <Navbar onSearch={handleSearch} />
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
