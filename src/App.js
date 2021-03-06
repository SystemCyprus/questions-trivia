import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//on importe les composants de notre application
import NavBar from './components/NavBar';
import PageExtra from './pages/PageExtra';
import PageOptions from './pages/PageCategorie';
import PageRandom from './pages/PageRandom';
import video from "./components/video/video.mp4";

function App() {

  // nous avons un router dans cette page, qui s'occupe d'afficher les pages, sans reloader notre application au complet
  return (
    <BrowserRouter>
      <div className="App">
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            width: "100%",
            left: "50%",
            top: "50%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: "-1"
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
        {/* simple composant pour avoir une barre de navigation, qu'on place avant le switch pour qu'elle affiche sur chaque page */}
        <NavBar />
        <Switch>
          <Route path="/" component={PageRandom} exact />
          {/* si on n'a pas choisi une categorie extra, on load la page categorie tel qu'elle avec exact */}
          <Route path="/categorie" component={PageOptions} exact />
          {/* si on detecte un parametre url, on l'indique au router et on le passe a notre composant page */}
          <Route path="/categorie/:categorieId" component={PageOptions} />
          <Route path="/extra" component={PageExtra} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
