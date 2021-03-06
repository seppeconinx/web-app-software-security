import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading, ComicDetail, CreateComic  } from "./components";
import { Home, Profile, ExternalApi, PrivacyPolicy } from "./views";

import "./App.css";
import ProtectedRoute from "./auth/protected-route";
import Terms from "./views/terms";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <div className="mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/external-api" component={ExternalApi} />
            <Route path="/privacy" exact component={PrivacyPolicy} />
            <Route path="/terms" exact component={Terms} />
            <ProtectedRoute path="/add" component={CreateComic} />
            <Route exact path="/comic/:id" component={ComicDetail}/>
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;