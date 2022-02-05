//Imports from react
import { useContext } from 'react';

//import css and other files as components
import classes from './Favorites.module.css';
import MainContext from '../store/Main-context';
import Products from '../components/products/Products';

//main react function. it is this files defalt export and is where all the code for this component is
export default function Favorites() {
  //varable for using context
  const favoriteCtx = useContext(MainContext);

  //variable for content on the favorite page
  let content;

  //if the total of favorite products is less than one, say that there is no favorites. else show the favorites
  if (favoriteCtx.totalFavorites < 1) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = <Products products={favoriteCtx.favorites} />;
  }

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    <section>
      <h2 className={classes.productTitle}>Favorites</h2>
      {content}
    </section>
  );
}
