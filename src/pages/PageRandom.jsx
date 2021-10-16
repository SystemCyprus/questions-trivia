import React, { useState, useEffect  } from 'react'
import { Card } from 'semantic-ui-react';

const PageRandom = () => {
    const [randomQuote, setRandomQuote] = useState({});
    const [erreur, setErreur] = useState('');
    
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

    useEffect(() => {
        afficherQuestion();
    }, []);

    return (
        <>
            <h1>Simple API question trivia aléatoire</h1>
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
                    <Card.Description>Date{randomQuote.airdate}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Header>Réponse</Card.Header>
                    <Card.Description>{randomQuote.answer}</Card.Description>
                </Card.Content>
            </Card>
            <button onClick={afficherQuestion}>Question Aléatoire</button>
            <h2>{erreur}</h2>
        </>
    )
}

export default PageRandom;
