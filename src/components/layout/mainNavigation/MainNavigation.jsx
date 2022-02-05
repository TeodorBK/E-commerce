//Imports from react
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useRef } from 'react/cjs/react.development';

//import icons
import { RiShoppingBasket2Fill } from 'react-icons/ri';

//import css and other files as components
import classes from './MainNavigation.module.css';
import MainContext from '../../../store/Main-context';

//main react function. it is this files defalt export and is where all the code for this component is
function MainNavigation() {
  //variables for context form other files. this is importet from the main-context file and used with useContext from react
  const shoppingCartCtx = useContext(MainContext);
  const favoriteCtx = useContext(MainContext);
  const categoryCtx = useContext(MainContext);

  // variable for reference to the category selector
  const categorysRef = useRef();

  //function for changing on the category selector
  function toggleCategoryStatus() {
    categoryCtx.categoryChange(categorysRef);
  }

  //function for removing all buyProducts on the buy product side when leaving that page
  function toggleRemoveBuyProduct() {
    if (categoryCtx.totalbuyProducts > 0) {
      categoryCtx.removeAllBuyProduct();
    }
  }

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    //the header
    <div className={classes.navContainer}>
      {/* logo */}
      <div className={classes.logo}>
        <Link to="/" onClick={toggleRemoveBuyProduct}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/862px-Apple_logo_grey.svg.png"
            alt="logo"
          />
        </Link>
      </div>

      {/* category selector */}
      <select
        name="categorys"
        className={classes.categorys}
        ref={categorysRef}
        onChange={toggleCategoryStatus}
      >
        <option value="all">All products</option>
        <option value="ipad">Ipad</option>
        <option value="iphone">Iphone</option>
        <option value="macbook">Macbook</option>
        <option value="watch">Watch</option>
      </select>
      <div></div>

      {/* navbar/ navigation to other sides */}
      <div className={classes.navbar}>
        <Link to="/" className={classes.link} onClick={toggleRemoveBuyProduct}>
          Home
        </Link>
        <Link
          to="/favorites"
          className={classes.link}
          onClick={toggleRemoveBuyProduct}
        >
          Favorites
          {favoriteCtx.totalFavorites > 0 ? (
            <span className={classes.totalFav}>
              {favoriteCtx.totalFavorites}
            </span>
          ) : (
            ''
          )}
        </Link>
      </div>

      {/* shoppingcart */}
      <div>
        <div className={classes.cart}>
          {shoppingCartCtx.totalCartProducts > 0 ? (
            <p className={classes.totalCart}>
              {shoppingCartCtx.totalCartProducts}
            </p>
          ) : (
            ''
          )}
          <Link to="/shopping-cart" onClick={toggleRemoveBuyProduct}>
            <RiShoppingBasket2Fill className={classes.basketIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainNavigation;
