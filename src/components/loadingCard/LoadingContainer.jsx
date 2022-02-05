//import css and other files as components
import LoadingCard from './LoadingCard';
import classes from './LoadingContainer.module.css';

//main react function. it is this files defalt export and is where all the code for this component is
function LoadingContainer() {
  //returning a container with loeader cards for when the screen is loading
  return (
    <div className={classes.container}>
      {/* here i use the loadingCard component to make multiple loaded cards to make it look like it loads multiple products */}
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
}

export default LoadingContainer;
