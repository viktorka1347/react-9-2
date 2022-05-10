import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AppProvider from './AppProvider';
import PostsList from './components/PostsList';
import NewPost from './components/NewPost';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import Fetch from './components/Fetch';

function App() {    
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path={process.env.PUBLIC_URL + '/posts/new'} component={NewPost} />
            <Route 
              path={process.env.PUBLIC_URL + '/posts/:id([0-9]+)'} 
              render={({ location, match }) => location.state.isEdit ? <EditPost match={match} /> : <ViewPost match={match} />}
            /> 
            <Route path={process.env.PUBLIC_URL} component={PostsList} />
          </Switch> 
          <Fetch />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;