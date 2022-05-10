import { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../AppContext';
import Post from './Post';
import { request } from '../utils/http';

function ViewPost(props) {
  const { id } = props.match.params;
  const { data, setWaiting, setError } = useContext(AppContext);
  const post = data.length && data.find(item => item.id === +id);

  if (!post) {
    return <Redirect to={process.env.PUBLIC_URL} />
  }

  const deletePost = async (event) => {
    event.preventDefault();

    const options = {
      method: 'DELETE'
    };
    
    setWaiting(true);
    const response = await request(process.env.REACT_APP_SERVER + '/' + id, options);
    setError(response.error);  

    document.location.href = event.target.href;
  }
    
  return (
    <div className="ViewPost">
      <Post content={post.content} created={post.created}>
        <Link to={process.env.PUBLIC_URL} className="ViewPost-close"> 
          &#x274C;
        </Link>
        <div className="ViewPost-modify">
          <Link 
            to={{
              pathname: process.env.PUBLIC_URL + '/posts/' + id,
              state: { isEdit: true }
            }} 
            className="ViewPost-edit"
          >
            Изменить
          </Link>
          <Link to={process.env.PUBLIC_URL} className="ViewPost-delete" onClick={deletePost}>
            Удалить
          </Link>
        </div>   
      </Post>
    </div>
  );
}

export default ViewPost;