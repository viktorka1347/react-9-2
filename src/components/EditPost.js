import { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../AppContext';
import { request } from '../utils/http';
import editpost from '../img/editpost.jpg';

function EditPost(props) {
  const { id } = props.match.params;   
  const { data, setData, setWaiting, setError } = useContext(AppContext);
  const post = data.length ? data.find(item => item.id === +id) : { content: '' }
  const [text, setText] = useState(post.content);
  const [redirect, setRedirect] = useState(false);

  if (!post.content) {
    return <Redirect to={process.env.PUBLIC_URL} />
  }
  
  const linkto = {
    pathname: process.env.PUBLIC_URL + '/posts/' + id,
    state: { isEdit: false }
  }; 
  
  const changeText = event => {
    setText(event.target.value);
  }

  const savePost = async (event) => {
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
        id: +id,
        content: text
      })
    };
    
    setWaiting(true);
    let response = await request(process.env.REACT_APP_SERVER, options);
    setError(response.error);  
    response = await request(process.env.REACT_APP_SERVER);
    setError(response.error); 
    setData(response.data);
    setWaiting(false);

    setRedirect(true);
  }

  return (
    <div className="EditPost">
      <img className="EditPost-image" src={editpost} width="100%" alt="no load" />
      <Link to={linkto} className="EditPost-close"> 
        &#x274C;
      </Link> 
      <input 
        className="EditPost-input" 
        type="text" 
        name="text" 
        value={text}
        placeholder="Текст поста (обязательно для заполнения)"
        required
        onChange={changeText} />
      <div className="EditPost-save">
        <Link to={linkto} className="EditPost-save-button" onClick={savePost}>
          Сохранить
        </Link>
      </div>
      {redirect && <Redirect to={linkto} />}
    </div>
  );
}

export default EditPost;