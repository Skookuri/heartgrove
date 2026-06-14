import Homepage from "./components/Homepage";
import Shop from "./components/Shop";
import Confirmation from "./components/Confirmation";
import { Route, Switch } from "wouter";
// import UserPage from "./components/UserPage";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/shop" component={Shop} />
        <Route path="/confirmation" component={Confirmation} />
        {/* <Route path="/users/:name" component={UserPage} /> */}

        {/* Shows a 404 error if the path doesn't match anything */}
        {
          <Route>
            <p className="p-4">404: Page Not Found</p>
          </Route>
        }
      </Switch>
    </>
  );
};

export default App;
