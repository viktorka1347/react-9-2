import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Post from './Post';
import { request } from '../utils/http';
import comment from '../img/comment.jpg';

function PostsList() {
  const { data, setData, setWaiting, setError } = useContext(AppContext);
  
  useEffect(() => {
    async function fetchData() {
      setWaiting(true);
      const response = await request(process.env.REACT_APP_SERVER);
      setError(response.error);  
      setData(response.data); 
      setWaiting(false);
    }

    fetchData();
  }, [setData, setError, setWaiting]);

  return (
    <div className="PostsList">
      <div className="PostsList-new">
        <Link to={process.env.PUBLIC_URL + '/posts/new'} className="PostsList-new-button">
          Создать пост
        </Link>
      </div>
      {data.map(({ id, content, created }) => (
        <Post key={id} content={content} created={created}>
          <img className="PostsList-comment-image" src={comment} width="100%" alt="no load" /> 
          <Link 
            to={{
              pathname: process.env.PUBLIC_URL + '/posts/' + id,
              state: { isEdit: false }
            }} 
            className="PostsList-post-button"
          >
            &#x02EC;
          </Link>           
        </Post>
      ))}
    </div>
  );
}

export default PostsList;