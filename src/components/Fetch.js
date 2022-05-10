import { useContext } from 'react';
import AppContext from '../AppContext';

function Fetch() {
  const { waiting, error } = useContext(AppContext);  

  if (waiting) {
    return (
      <div className="Fetch-waiting">
        <p className="Fetch-waiting-text">Waiting...</p>
      </div>
    );     
  } else if (error) {
    return (
      <div className="Fetch-error">
        <p className="Fetch-error-text">{error}</p>
      </div>
    );    
  } else {
    return null;
  }
};

export default Fetch;