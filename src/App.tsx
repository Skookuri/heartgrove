import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Homepage from "./components/Homepage";
import Shop from "./components/Shop";
import Confirmation from "./components/Confirmation";
import Blog from "./components/Blog";
// import UserPage from "./components/UserPage";

const App = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/shop" component={Shop} />
        <Route path="/confirmation" component={Confirmation} />
        {/* <Route path="/users/:name" component={UserPage} /> */}
        <Route path="/post/:slug" component={Blog} />

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
