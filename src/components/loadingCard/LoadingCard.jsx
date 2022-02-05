//import css as component
import classes from './LoadingCard.module.css';

//main react function. it is this files defalt export and is where all the code for this component is
function LoadingCard() {
  // returns a div as the loaded card when the screen is loading
  return <div className={classes.cardContainer}></div>;
}

export default LoadingCard;
