//Imports from react
import React, { useState, useContext } from 'react';

//import icons
import { MdShoppingCart } from 'react-icons/md';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { MdFavorite } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

//import css and other files as components
import classes from './Product.module.css';
import MainContext from '../../../store/Main-context';

//main react function. it is this files defalt export and is where all the code for this component is
//here i use props to use variables and functions form other components higher up in the hierarchy
function Product(props) {
  // variables for state and context for the shoppingcart
  const [cartProduct, setCartProduct] = useState(false);
  const shoppingCartCtx = useContext(MainContext);
  const itemIsInCart = shoppingCartCtx.itemIsInCart(props.id);

  //function to se the shoppingcart status when a product should be added or removed for the shoppingcart based on the state
  function toggleCartStatus() {
    //if the product is in the shoppingcart should it be removed. else should it be added
    if (itemIsInCart) {
      shoppingCartCtx.removeCardProduct(props.id);
    } else {
      //making a add to shoppingcart function call and pasing in a object made from the product that is clicked
      shoppingCartCtx.addToCart({
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
      });
    }

    //checking if the product is in the shoppingcart to change the shoppingcart icon
    if (cartProduct) {
      setCartProduct(false);
    } else {
      setCartProduct(true);
    }
  }

  // variables for state and context to the favorites
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const favoriteCtx = useContext(MainContext);
  const itemIsInFavorites = favoriteCtx.itemIsFavorite(props.id);

  //function to se the favorite status when a product should be added or removed for the favorites based on the state
  function toggleFavoriteStatus() {
    //if the product is a favorite should it be removed. else should it be added
    if (itemIsInFavorites) {
      favoriteCtx.removeFavorite(props.id);
    } else {
      //making a add to favorite function call and pasing in a object made from the product that is clicked
      favoriteCtx.addFavorite({
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
      });
    }

    //checking if the product is favorite to shange the favorite icon
    if (favoriteProduct) {
      setFavoriteProduct(false);
    } else {
      setFavoriteProduct(true);
    }
  }

  //function for clicking the buy button. it makes a addBuyProduct function call and pasing in a object made from the product that is clicked
  function buyBtn() {
    favoriteCtx.addBuyProduct({
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price,
    });
  }

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    <div className={classes.cardContainer}>
      {/* the product card */}
      <div className={classes.allIconContainer}>
        {/* icon container for the favorite and shoppingcart icon */}
        <div className={classes.iconContainer}>
          {/* favorite icon */}
          {itemIsInFavorites ? (
            <MdFavorite
              className={classes.favIcon}
              onClick={toggleFavoriteStatus}
            />
          ) : (
            <AiOutlineHeart
              className={classes.notFavIcon}
              onClick={toggleFavoriteStatus}
            />
          )}

          {/* shoppingcart icon */}
          {itemIsInCart ? (
            <MdRemoveShoppingCart
              className={classes.cartIcon}
              onClick={toggleCartStatus}
            />
          ) : (
            <MdShoppingCart
              className={classes.cartIcon}
              onClick={toggleCartStatus}
            />
          )}
        </div>
      </div>

      {/* product image */}
      <div className={classes.productImage}>
        <img src={props.image} alt="product" />
      </div>

      {/* product title */}
      <div>
        <h2>{props.title}</h2>
      </div>

      {/* product price */}
      <div>
        <p>{props.price + '$'}</p>
      </div>

      {/* buy button */}
      <Link to="/buy-products" className={classes.buyBtn} onClick={buyBtn}>
        Buy
      </Link>
    </div>
  );
}

export default Product;
