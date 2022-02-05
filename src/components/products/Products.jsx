//Imports from react
import React from 'react';

//import css and other files as components
import Product from './product/Product';
import classes from './Products.module.css';

//main react function. it is this files defalt export and is where all the code for this component is.
//here i use props to use variables and functions form other components higher up in the hierarchy
function Products(props) {
  return (
    //container for all the product cards
    <div className={classes.container}>
      {/* maping through the array with all the products and  making a product card to all of them. i pas in all the input 
      the product need to work. eks: id, title, price*/}
      {props.products.map(data => {
        return (
          // making a product card for all the products
          <Product
            id={data.id}
            key={data.id}
            title={data.title}
            price={data.price}
            image={data.image}
          />
        );
      })}
    </div>
  );
}

export default Products;
