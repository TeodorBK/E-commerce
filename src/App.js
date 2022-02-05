//Imports from react
import { Route, Switch } from 'react-router';

//import other files as components
import Layout from './components/layout/Layout';
import Buy from './pages/Buy';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import ShoppingCard from './pages/ShoppingCard';

//main react function. it is this files defalt export and is where all the code for this component is
function App() {
  return (
    // using layout to wrap everything in under the mainNavigation file so i don't need to make the same navigation for every page
    <Layout>
      {/* using swith and route to navigate between pages without sending a new http request */}
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/shopping-cart">
          <ShoppingCard />
        </Route>
        <Route path="/buy-products" exact>
          <Buy />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
