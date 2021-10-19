import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Label, Select } from 'semantic-ui-react';
import Quote from '../components/Quote';

// tableau pour les categories du Select de semantic-ui
const optionsCategorie = [
    { value: "25", key: "25", text: "Science" },
    { value: "223", key: "223", text: "Word Origins" },
    { value: "114", key: "114", text: "History" },
    { value: "267", key: "267", text: "Food" },
    { value: "99", key: "99", text: "Religion" },
    { value: "21", key: "21", text: "Animals" },
];

// notre composant de la page categorie
const PageOptions = () => {
    // si on a un parametre url, on le récupère dans ce state
    const { categorieId } = useParams();
    // un state juste pour le titre, je le fais comme ca pour que le code soit plus verbose
    const [titreCategorie, setTitreCategorie] = useState('');
    // tableau pour la liste des Quotes
    const [quoteList, setQuoteList] = useState([]);
    // state pour savoir quel est le Quote actuel
    const [currentQuote, setCurrentQuote] = useState(0);
    // state pour l'id de la categorie, si il y a un parametre url, c'est lui, sinon 0 en attendant le choix de l'usager
    const [currentCategory, setCurrentCategory] = useState(categorieId ? categorieId:0);
    // state pour le message d'erreur
    const [erreur, setErreur] = useState('');

    // ce hook aidera a faire l'appel api non seulement au premier load, mais aussi a chaque changement de categorie
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                fetch(`https://jservice.io/api/category?id=${currentCategory})`)
                    .then(response => response.json())
                    // on chage le state du Quote et le titre de la categorie direct ici en recevant le json de l'api
                    .then(data => { setQuoteList(data.clues); setTitreCategorie(data.title);})
            }
            catch (e) {
                setErreur("Erreur lors de l'appel à l'API" + e);
            }
        }
        // si la categorie est autre que zero (soit le parametre url, soit le choix du Select) on fait appel a la fonction fetch
        if (currentCategory !== 0) fetchMyAPI(); 
    }, [currentCategory]);

    // pour la question precedente, si il y en a, sinon on va a la fin des quotes et on recommence
    const questionPrecedente = () => {
        if (quoteList.length > 0) {
            if (currentQuote === 0) setCurrentQuote(quoteList.length - 1);
            else setCurrentQuote(currentQuote - 1);
        }
    }

    // pour la question suivante, si il y en a, sinon on retourne au debut
    const questionSuivante = () => {
        if (quoteList.length > 0) {
            if (currentQuote === quoteList.length - 1) setCurrentQuote(0);
            else setCurrentQuote(currentQuote + 1);
        }
    }

    // quand l'usager choisi une categorie, on change le state pour son id, et aussi on remet a zero la question courrante
    const onCategorieChange = (e, data) => {
        setCurrentCategory(data.value);
        setCurrentQuote(0);
    }

    return (
        <>
            {/* si on a un parametre url( venant de la page extra), on affiche le titre de la categorie, sinon on offre un choix de qqes categories */}
            <h1>{categorieId ? "Catégorie: " + titreCategorie : 'Catégories populaires'}</h1>

            {/* on indque le nombre de questions dans la categorie actuelle */}
            <label>{quoteList.length} questions dans cette categorie</label><br />
            
            {/* on affiche le select seulement si il n'y a pas deja une categorie choisie dans le parametre url */}
            {categorieId?undefined:<Select placeholder="Catégorie" options={optionsCategorie} onChange={onCategorieChange}></Select>}
            {categorieId ? undefined : <br />}<br />

            {/* boutons pour la navigation des questions, ainsi qu'un indice pour la question actuelle */}
            <button onClick={questionPrecedente}>Question Précédente</button>
            <Label>{currentQuote + 1}</Label>
            <button onClick={questionSuivante}>Question Suivante</button>

            {/* on affiche notre composant Quote, seulement si nous avons une liste de Quotes */}
            {quoteList.length > 0 ? <Quote quoteList={quoteList} currentQuote={currentQuote} /> : undefined}

            {/* si il y a erreur, elle sera affichee */}
            <h2>{erreur}</h2>
        </>

    )
}

export default PageOptions;
