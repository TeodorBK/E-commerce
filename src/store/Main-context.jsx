//Imports from react
import { createContext, useState } from 'react';
import { useHistory } from 'react-router';

//making a default context with all the context that is going to be used
const MainContext = createContext({
  //favorite variables and function
  favorites: [],
  totalFavorites: 0,
  addFavorite: favoriteProduct => {},
  removeFavorite: productId => {},
  itemIsFavorite: productId => {},

  //shoppingcart variables and function
  shoppingCart: [],
  totalCartProducts: 0,
  addToCart: shoppingProduct => {},
  removeCardProduct: productId => {},
  itemIsInCart: productId => {},

  //category variables and function
  category: '',
  categoryChange: () => {},

  //buy product variables and function
  buyProducts: '',
  totalbuyProducts: 0,
  addBuyProduct: () => {},
  removeBuyProduct: () => {},
  removeAllBuyProduct: () => {},

  totalPrice: 0,
  sortPrices: priceId => {},
  makeTotalPrice: () => {},
});

//main react function. it is this files defalt export and is where all the code for this component is
export function MainContextProvider(props) {
  //favorites context
  //state for the favorite list
  const [userFavorites, setUserFavorites] = useState([]);

  //function for adding favorites to the favorite list state
  function addFavoriteHandler(favoriteProduct) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.concat(favoriteProduct);
    });
  }

  //function for removing favorites from the favorite list state
  function removeFavoriteHandler(productId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(product => product.id !== productId);
    });
  }

  //function for checking if there are some favorites in the favorite list state
  function itemIsFavoriteHandler(productId) {
    return userFavorites.some(product => product.id === productId);
  }

  //shoppingcart context
  //state for the shoppingcart list
  const [userCart, setUserCart] = useState([]);

  //function for adding products to the shoppingcart list state
  function addToCartHandler(shoppingProduct) {
    setUserCart(prevUserCart => {
      return prevUserCart.concat(shoppingProduct);
    });
  }

  //function for removing products form the shoppingcart list state
  function removeCardProductHandler(productId) {
    setUserCart(prevUserCart => {
      return prevUserCart.filter(product => product.id !== productId);
    });
  }

  //function for checking if there are some product in the shoppingcart list state
  function itemIsInCartHandler(productId) {
    return userCart.some(product => product.id === productId);
  }

  //category change
  //state for the category string
  const [theCategory, setTheCategory] = useState('');

  //function for changing the category
  //using the category selector to use the value and seting the category state to that value
  function toggleCategoryStatus(ref) {
    const enteredCategory = ref.current.value;
    setTheCategory(enteredCategory);
  }

  //buy product
  //state for the buy products list
  const [userBuyProduct, setUserBuyProduct] = useState([]);

  const BuyProductHistory = useHistory();

  //function for adding products to the buy products list state
  function addBuyProductHandler(buyProduct) {
    setUserBuyProduct(prevUserbuy => {
      return prevUserbuy.concat(buyProduct);
    });
  }

  //function for removing products form the buy products list state
  function removeBuyProductHandler(buyProduct) {
    setUserBuyProduct(prevUserbuy => {
      return prevUserbuy.filter(product => product.id !== buyProduct);
    });
    if (userBuyProduct.length < 2) {
      BuyProductHistory.replace('/');
    }
  }

  //function for removing all products form the buy products list state
  function removeAllBuyProductHandler() {
    setUserBuyProduct([]);
  }

  //total price
  //state for the total price
  const [totalPriceState, setTotalPriceState] = useState(0);

  //variables for an array of the prices and for the total price
  let totalPriceList = [];
  let totalPriceSum = 0;

  //function for puting all the prices in an array
  function settingTotalPriceHandler(priceId) {
    //variable for the value from all the price h3
    const priceRef = document.getElementById(priceId).innerHTML;

    //removing the last element ($) in the price.
    priceRef.slice(0, -1);

    //adding the price to a list of all the product prices and returning it
    totalPriceList.push(priceRef);
  }

  //function for making the prices to numbers and adding them together
  function makeTotalPriceHandler() {
    //variable for maping through the total price list and returns a new list with numbers
    var newTotalPriceListe = totalPriceList.map(item => {
      return parseInt(item, 10);
    });

    //looping through the new total price list and adding together all the prices
    for (let addPrice = 0; addPrice < totalPriceList.length; addPrice++) {
      totalPriceSum += newTotalPriceListe[addPrice];
    }

    //setting the totalPriceState to the total price
    setTotalPriceState(totalPriceSum);
  }

  //context
  //variable for the new context that should be used if the user needs some of the context in the main-context file
  //over running the default context
  const context = {
    //favorite variables and function
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,

    //shoppingcart variables and function
    shoppingCart: userCart,
    totalCartProducts: userCart.length,
    addToCart: addToCartHandler,
    removeCardProduct: removeCardProductHandler,
    itemIsInCart: itemIsInCartHandler,

    //category variables and function
    category: theCategory,
    categoryChange: toggleCategoryStatus,

    //buy product variables and function
    buyProducts: userBuyProduct,
    totalbuyProducts: userBuyProduct.length,
    addBuyProduct: addBuyProductHandler,
    removeBuyProduct: removeBuyProductHandler,
    removeAllBuyProduct: removeAllBuyProductHandler,

    totalPrice: totalPriceState,
    sortPrices: settingTotalPriceHandler,
    makeTotalPrice: makeTotalPriceHandler,
  };

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    //the tag with the context as a value so that all the components in this tag can use the context
    <MainContext.Provider value={context}>
      {/* props.children is so all the components that is wraped inside this component will be rendered out */}
      {props.children}
    </MainContext.Provider>
  );
}

export default MainContext;
