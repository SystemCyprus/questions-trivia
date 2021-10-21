import React, { useState, useEffect  } from 'react'
import { Card } from 'semantic-ui-react';
import '../components/textBox.css';

const PageRandom = () => {
    // state qui contient l'objet de la question retournee par le fetch
    const [randomQuote, setRandomQuote] = useState({});
    // state pour afficher une erreur lors du fetch, s'il y a lieu
    const [erreur, setErreur] = useState('');
    
    // simple fetch pour aller chercher un json a partir de l'api, qui contient une question aleatoire
    const afficherQuestion = async () => {
        try {
            let response = await fetch('https://jservice.io/api/random');
            let data = await response.json()
            setRandomQuote(data[0]);
        }
        catch (e) {
            setErreur("Erreur lors de l'appel à l'API");
        }
    };

    // hook useEffect pour loader notre api au moment de l'affichage, avec un tableau de dependences vide pour ne pas le loader sans cesse
    useEffect(() => {
        afficherQuestion();
    }, []);

    // variable pour formatter la date
    let date = new Date(randomQuote.airdate);

    // ici on affiche la question aleatoire dans un Card de semantic-ui
    // on utilise pas le composant Quote vu que c'est pas tout a fait pareil et les differences ferait juste compliquer qqch de si simple
    return (
        <>
            <div className="text-box">
                <h1>Trivia</h1>
            </div>
            <button onClick={afficherQuestion}>Générer Aléatoire</button>
            <Card className="centered">
                <Card.Content>
                    <Card.Header>Id</Card.Header>
                    <Card.Description>{randomQuote.id}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Header>Question</Card.Header>
                    <Card.Description>{randomQuote.question}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Header>Date de Parution</Card.Header>
                    <Card.Description>{date.toLocaleDateString("fr-CA", "yyyy-MM-dd")}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Header>Réponse</Card.Header>
                    <Card.Description>{randomQuote.answer}</Card.Description>
                </Card.Content>
            </Card>

            {/* si il y a erreur, elle sera affichee */}
            <h2>{erreur}</h2>
        </>
    )
}

export default PageRandom;
