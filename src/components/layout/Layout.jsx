//import other files as components
import { MainContextProvider } from '../../store/Main-context';
import MainNavigation from './mainNavigation/MainNavigation';

//main react function. it is this files defalt export and is where all the code for this component is. it is using props to
//use all that is inside of the jsx component
function Layout(props) {
  return (
    <main>
      <MainContextProvider>
        <MainNavigation />
        {props.children}
      </MainContextProvider>
    </main>
  );
}

export default Layout;
