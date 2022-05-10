import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import { request } from '../utils/http';
import newpost from '../img/newpost.jpg';

function NewPost() {
  const [text, setText] = useState('');    
  const { setWaiting, setError } = useContext(AppContext);
  
  const changeText = event => {
    setText(event.target.value);
  }
  
  const addPost = async (event) => {
    event.preventDefault();

    if (!text) {
      return;
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        id: 0,
        content: text
      })
    };
    
    setWaiting(true);
    const response = await request(process.env.REACT_APP_SERVER, options);
    setError(response.error);  

    document.location.href = event.target.href;
  }
  
  return (
    <div className="NewPost">
      <img className="NewPost-image" src={newpost} width="100%" alt="no load" />
      <Link to={process.env.PUBLIC_URL} className="NewPost-close"> 
        &#x274C;
      </Link> 
      <input 
        className="NewPost-input" 
        type="text" 
        name="text" 
        value={text}
        placeholder="Текст поста (обязательно для заполнения)"
        required
        onChange={changeText} />
      <div className="NewPost-post">
        <Link to={process.env.PUBLIC_URL} className="NewPost-post-button" onClick={addPost}>
          Опубликовать
        </Link>
      </div>
    </div>
  );
}

export default NewPost;