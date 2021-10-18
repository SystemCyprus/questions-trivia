import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PageExtra from './pages/PageExtra';
import PageOptions from './pages/PageCategorie';
import PageRandom from './pages/PageRandom';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" component={PageRandom} exact />
          <Route path="/categorie" component={PageOptions} exact />
          <Route path="/categorie/:categorieId" component={PageOptions} />
          <Route path="/extra" component={PageExtra} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
