//Imports from react
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//import css and other files as components
import { MainContextProvider } from './store/Main-context';
import './index.css';
import App from './App';

//saying the prodject is react and that is shound render out thats inside app.jsx
ReactDOM.render(
  //using MainContextProvider to use context form main-context in all the files inside app.jsx
  <MainContextProvider>
    {/* using BrowserRouter so that one can switch between pages without sending a http request */}
    <BrowserRouter>
      {/* app is where all the pages and componens is to make the application */}
      <App />
    </BrowserRouter>
  </MainContextProvider>,
  document.getElementById('root')
);
