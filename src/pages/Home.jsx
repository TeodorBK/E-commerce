//Imports from react
import { useState, useEffect } from 'react';
import { useContext } from 'react';

//import css and other files as components
import classes from './Home.module.css';
import Products from '../components/products/Products';
import LoadingContainer from '../components/loadingCard/LoadingContainer';
import MainContext from '../store/Main-context';

//main react function. it is this files defalt export and is where all the code for this component is
function Home() {
  //variables for state when the page is loading and is loaded
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProdjects, setLoadedProdjects] = useState([]);

  //variable for using context
  const categoryCtx = useContext(MainContext);

  //using useEffect to run this code block only when a particular state changes
  useEffect(() => {
    // variable for the base url
    const baseUrl = 'https://e-commerce-5f150-default-rtdb.firebaseio.com';

    //variable for the url that is going to be used
    let url = '';

    //checking the category changer to decide witch url it should use
    if (categoryCtx.category === 'all' || categoryCtx.category === '') {
      url = `${baseUrl}/products.json`;
    } else if (categoryCtx.category === 'watch') {
      url = `${baseUrl}/appleWatch.json`;
    } else if (categoryCtx.category === 'ipad') {
      url = `${baseUrl}/ipads.json`;
    } else if (categoryCtx.category === 'iphone') {
      url = `${baseUrl}/iphone.json`;
    } else if (categoryCtx.category === 'macbook') {
      url = `${baseUrl}/macbook.json`;
    }

    //fetching the url to get data from database and returning it in json
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const products = [];

        for (const key in data) {
          const product = {
            id: key,
            //spread opperator
            //copy all the key value pairs of the key object til the product object
            ...data[key],
          };

          products.push(product);
        }

        //setting the loading state to false and the loaded state to the finished fetch return object
        setIsLoading(false);
        setLoadedProdjects(products);
      })
      //catching a error so if you cant fetch it will just loade
      .catch(error => {
        console.log(error);
        return <LoadingContainer />;
      });
  }, [categoryCtx.category]);

  //checking if the page is loading and rendering out a loading screen
  if (isLoading) {
    return (
      <section className={classes.load}>
        <h2 className={classes.productTitle}>Products</h2>
        <LoadingContainer />
      </section>
    );
  }

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    <div>
      <h2 className={classes.productTitle}>Products</h2>
      {/* pasing in the loadedProdjects state with the json object */}
      <Products products={loadedProdjects} />
    </div>
  );
}

export default Home;
