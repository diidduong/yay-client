import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import './Trailer.css';

const Trailer = () => {
  let params = useParams()
  let youtubeID = params.youtubeID;

  return (
    <div className='react-player-container'>
      {youtubeID!=null?<ReactPlayer url={`https://www.youtube.com/watch?v=${youtubeID}`} playing={true} width='100%' height='100%'/>:null}
    </div>
  )
}

export default Trailer
