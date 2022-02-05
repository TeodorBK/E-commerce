//Imports from react
import { useContext, useEffect } from 'react/cjs/react.development';
import { useState } from 'react';
import { useHistory } from 'react-router';

//import icons
import { IoTrashOutline } from 'react-icons/io5';

//import css and other files as components
import MainContext from '../store/Main-context';
import classes from './BuyProduct.module.css';

//main react function. it is this files defalt export and is where all the code for this component is
function BuyProducts() {
  //variables to use context and history
  const productCtx = useContext(MainContext);
  const history = useHistory();

  //variable for what the price is multiplied by. this changes for how many of one product you wants
  let newPrice = 1;
  let amount = '';
  const [changePrice, setChangePrice] = useState(0);

  //function to edit how many of one product you want
  function editAmount(productId, productPrice, amountId) {
    //variable for the input for changing the amout of one product you want
    amount = document.getElementById(amountId).value;

    //the h3 update
    document.getElementById(productId).innerHTML = productPrice * amount + '$';

    setChangePrice(amount);
  }

  //state for when you click the buy button. this will take up the overlay where you input email and more
  const [buyProductClick, setBuyProductClick] = useState(false);

  //variables for total price
  let totalPriceSum = 0;
  const totalPrice = productCtx.totalPrice;

  //useEffect for making the total price update
  useEffect(() => {
    //
    productCtx.buyProducts.map(data => {
      return productCtx.sortPrices(data.id);
    });
    productCtx.makeTotalPrice();
  }, [productCtx, changePrice]);

  //sendin mail function
  function sendMail() {
    //variable for mail input
    const mailRef = document.getElementById('mail').value;

    //using history to send the user back to the home page
    history.replace('/');

    //varible for maping through the list of products and using it in the message
    let productName = productCtx.buyProducts.map(data => {
      return data.title;
    });

    //maping through the list of products and returning a sorted list of the product prices
    productCtx.buyProducts.map(data => {
      return productCtx.sortPrices(data.id);
    });
    //setting the totalPriceSum variable to the total price from the main context
    totalPriceSum = productCtx.totalPrice;
    console.log(totalPriceSum);

    //setting at timeout so that the user comes back to the home page before the alert about that the mail is send pops up
    setTimeout(() => {
      alert(
        `Your receipt for ${productName}, will be sendt to you on mail to ${mailRef}. The total price is: ${totalPriceSum}$`
      );
    }, 1500);

    //caling the removeAllBuyProduct function from the productCtx. it removes all elements from the buyProduct list
    productCtx.removeAllBuyProduct();
  }

  //returning the main JSX code form the main react function. this is where HTML code is for this specific component
  return (
    <div className={classes.productTable}>
      {/* maping through the list of products that shoult be buyed */}
      {productCtx.buyProducts.map(data => {
        //setting the newPrice variable to the price of the product
        newPrice = data.price;

        //returning the table with a product
        return (
          <div key={data.id} className={classes.centerTable}>
            {/* table containers */}
            <div className={classes.table}>
              {/* image table column */}
              <div className={classes.tableImage}>
                <div className={classes.flexBox}>
                  <img
                    className={classes.productImage}
                    src={data.image}
                    alt="product"
                  />
                </div>
              </div>

              {/* title table column */}
              <div className={classes.tableTitle}>
                <div className={classes.flexBox}>
                  <h3>{data.title}</h3>
                </div>
              </div>

              {/* amount table column */}
              <div className={classes.tableAmount}>
                <div className={classes.flexBox}>
                  <div className={classes.amountBox}>
                    {/* input for the amount */}
                    <input
                      className={classes.amount}
                      id={data.title}
                      type="number"
                      placeholder={1}
                      min={1}
                      max={100}
                      // calling the editAmount function to update the product price when the amount input changes
                      onChange={() => {
                        editAmount(data.id, data.price, data.title);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* price table column */}
              <div className={classes.tablePrice}>
                <div className={classes.flexBox}>
                  <h3 id={data.id}>{newPrice + '$'}</h3>
                </div>
              </div>

              {/* delete button table column */}
              <div className={classes.tableEdit}>
                <div className={classes.flexBox}>
                  {/* delete button to delete a product from the buy products */}
                  <button
                    className={classes.removeProductBtn}
                    // calling the removeBuyProduct function through the productCtx and pasing in the product id
                    onClick={() => {
                      productCtx.removeBuyProduct(data.id);
                    }}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className={classes.totalPriceContainer}>
        <h2>Total price: {totalPrice}$</h2>
      </div>

      {/* the buy button. it changes from Buy Product to Buy Products if there is more than on buy product */}
      {productCtx.buyProducts.length > 0 ? (
        <div className={classes.buyBtnContainer}>
          <button
            className={classes.buyBtn}
            //setting the buyProductClick state to true so that the overlay where the email input and more is
            onClick={() => {
              setBuyProductClick(true);
            }}
          >
            {productCtx.buyProducts.length > 1 ? 'Buy Products' : 'Buy Product'}
          </button>
        </div>
      ) : (
        ''
      )}

      {/* the overlay when you buy the products. it comes up just when the buyProductClick state is true */}
      {buyProductClick ? (
        // overlay
        <div className={classes.overlay}>
          <div className={classes.mailBox}>
            <div className={classes.mainInputContainer}>
              <div className={classes.formCenter}>
                <div className={classes.formBox}>
                  {/* form for all the inputs */}
                  <form
                    autoComplete="off"
                    className={classes.mailForm}
                    // when the form is submited the sendMail function is called
                    onSubmit={() => {
                      sendMail();
                    }}
                  >
                    {/* label and input for mail */}
                    <label htmlFor="main">E-mail</label>
                    <input
                      id="mail"
                      type="email"
                      placeholder="Your email address"
                      name="mail"
                      required
                    />

                    {/* label and input for phone number */}
                    <label htmlFor="number">Phone number</label>
                    <input
                      type="telNo"
                      minLength={8}
                      maxLength={8}
                      placeholder="Your phone number"
                      name="number"
                      required
                    />

                    {/* label and input for credit card number */}
                    <label htmlFor="card">Credit card number</label>
                    <input
                      type="text"
                      minLength={16}
                      maxLength={16}
                      placeholder="xxxx xxxx xxxx xxxx"
                      name="card"
                      required
                    />

                    {/* the submit and cancle buttons */}
                    <div>
                      <button className={classes.buySendBtn} type="submit">
                        {/* the text in the submit button changes for Buy Product to Buy Products if there is more than one product
                        that is going to bought */}
                        {productCtx.buyProducts.length > 1
                          ? 'Buy Products'
                          : 'Buy Product'}
                      </button>
                      <button
                        className={classes.buySendCancelBtn}
                        onClick={() => {
                          setBuyProductClick(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BuyProducts;
