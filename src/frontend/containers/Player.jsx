import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/components/Player.scss';
import axios from 'axios';
import NotFound from './NotFound';
import { Youtube, moviePath } from '../utils/Vars';
import getVideoSource from '../actions/videoSource';

const Player = (props) => {
  const { match, playing } = props;
  const { params } = match;
  const { id } = params;

  useEffect(async () => {
    const results = await Promise.all([axios.get(`${moviePath}${id}/videos?api_key=${process.env.APIKey}&language=en-US`)]);
    const { key } = results[0].data.results.find((item) => item.site === 'YouTube');
    props.getVideoSource({ id, key });
  }, []);

  const hasPlaying = Object.keys(playing).length > 0;

  return hasPlaying ? (
    <div className='Player'>
      <iframe title='myMovie' src={`${Youtube}${playing.key}`} allow='autoplay' allowFullScreen />
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>Regresar</button>
      </div>
    </div>
  ) :
    <NotFound />;
};

const mapDispatchToProps = {
  getVideoSource,
};

const mapStateToProps = (state) => {
  return {
    playing: state.reducers.playing,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
