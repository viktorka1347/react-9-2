import { useState } from 'react';
import AppContext from './AppContext';

function AppProvider(props) {
  const [data, setData] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState('');
  
  return (
    <AppContext.Provider value={{ data, waiting, error, setData, setWaiting, setError }}>
      {props.children}  
    </AppContext.Provider>
  )
}

export default AppProvider;