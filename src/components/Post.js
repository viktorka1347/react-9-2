import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { timeToAgo } from '../utils/time';
import post_top from '../img/post-top.jpg';
import post_bottom from '../img/post-bottom.jpg';

function Post(props) {
  const { content, created } = props;
  const [ago, setAgo] = useState('');
  
  const timer = () => {
    const newAgo = timeToAgo(created);
    if (newAgo !== ago) {
      setAgo(newAgo);
    }
  }

  useEffect(() => {
    timer();
    const timerId = setInterval(timer, 5000);
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  return (
    <div className="Post">
      <img className="Post-image-top" src={post_top} width="100%" alt="no load" />
      <p className="Post-ago">{ago}</p>
      <p className="Post-content">{content}</p>
      <img className="Post-image-bottom" src={post_bottom} width="100%" alt="no load" />
      {props.children}  
    </div>
  )
}

Post.propTypes = {
  content: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired
};

export default Post;