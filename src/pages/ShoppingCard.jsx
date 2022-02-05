//Imports from react
import { useContext } from 'react';
import { Link } from 'react-router-dom';

//import css and other files as components
import classes from './ShoppingCart.module.css';
import MainContext from '../store/Main-context';
import Products from '../components/products/Products';

//main react function. it is this files defalt export and is where all the code for this component is
function ShoppingCard() {
  //variable for using context
  const shoppingCartCtx = useContext(MainContext);

  //this function maps through the shoppingcart list and makes a oject of all the products and sending them as an parameter to the
  //addBuyProduct function using useContext
  function buyAll() {
    shoppingCartCtx.shoppingCart.map(data => {
      const product = {
        id: data.id,
        title: data.title,
        image: data.image,
        price: data.price,
      };

      return shoppingCartCtx.addBuyProduct(product);
    });
  }

  //variable for content on the shoppingcart page
  let content;

  //if the total of shoppingcart products is less than one, say that there is nothing in the shoppingcart. else show the shoppingcart products
  if (shoppingCartCtx.totalCartProducts === 0) {
    content = <p>You got no products in the cart yet. Start adding some?</p>;
  } else {
    content = <Products products={shoppingCartCtx.shoppingCart} />;
  }

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    <section>
      {/* title */}
      <h2 className={classes.productTitle}>Shopping cart</h2>
      {/* contect variable */}
      {content}
      {/* checking if total cart products is more then one and displaying a buy all button */}
      {shoppingCartCtx.totalCartProducts > 1 ? (
        <div className={classes.buyBtnContainer}>
          <Link to="/buy-products" className={classes.buyBtn} onClick={buyAll}>
            Buy all
          </Link>
        </div>
      ) : (
        ''
      )}
    </section>
  );
}

export default ShoppingCard;
