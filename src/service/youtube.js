class Youtube {
    constructor(key) {
        this.key = key;
        this.getRequestOptions = {
          method: 'GET',
          redirect: 'follow',
        };
      }

    mostPopular() {
        return fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
            this.getRequestOptions
          )
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
        });
    }

    search(keyword) {
        return fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=${this.key}`,
            this.getRequestOptions
          )
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
        });
    }

    
    setThumbnails(items, promises) {
        for (let i=0; i<items.length; i++) {
            promises.push(
              fetch(`https://www.googleapis.com/youtube/v3/channels?chart=mostPopular&key=${this.key}&part=snippet&id=${items[i].channelId}`)
              .then(response => response.json())
              .then(responseJson => responseJson['items'][0].snippet.thumbnails.default.url)
              .then(url => {
                items[i].channelThumbnails  = url;
              })
            );
          }
          return promises;
    }
}

export default Youtube;