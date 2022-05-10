import { createContext } from 'react';

const AppContext = createContext({
  data: [],
  waiting: false,
  error: ''
});

export default AppContext;