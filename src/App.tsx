import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Homepage from "./components/Homepage";
import Shop from "./components/Shop";
import Confirmation from "./components/Confirmation";
import Blog from "./components/Blog";
import { Analytics } from "@vercel/analytics/react"
// import UserPage from "./components/UserPage";
import { enableVisualEditing } from "@sanity/visual-editing";
import { isPreviewMode } from "./lib/preview";

const App = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  // stuff for preview mode on sanity
  
  useEffect(() => {
    const isPreview = isPreviewMode();
    if (!isPreview) return;

    const disable = enableVisualEditing({ zIndex: 999999 });
    return () => disable();
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/shop" component={Shop} />
        <Route path="/confirmation" component={Confirmation} />
        {/* <Route path="/users/:name" component={UserPage} /> */}
        <Route path="/blog/:slug" component={Blog} />

        {/* Shows a 404 error if the path doesn't match anything */}
        {
          <Route>
            <p className="p-4">404: Page Not Found</p>
          </Route>
        }
      </Switch>

      <Analytics/>
    </>
  );
};

export default App;