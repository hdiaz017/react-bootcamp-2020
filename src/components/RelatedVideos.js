import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { GlobalContext } from '../context/GlobalContext';
import { useFetch } from '../hooks/useFetch';
import { VideoThumbnail } from './VideoThumbnail';

export const RelatedVideos = () => {
  const { video } = useContext(GlobalContext);
  console.log(video.query);
  const API_KEY = 'AIzaSyD1gLhLYnPMzo2z2KWvKPy1N-W6xnNqjEI';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${video.query}&type=video&maxResults=12`;

  const { data, loading } = useFetch(url);

  const { items } = !!data && data;

  let thumbnails = [];

  if (!loading) {
    thumbnails = items.map((item) => (
      <VideoThumbnail
        key={item.id.videoId}
        videoId={item.id.videoId}
        channelName={item.snippet.channelTitle}
        title={item.snippet.title}
        description={item.snippet.description}
        img={item.snippet.thumbnails.medium.url}
      />
    ));
  }

  return (
    <div>
      {loading ? <p>loading</p> : <div className='video_related'>{thumbnails}</div>}
    </div>
  );
};
