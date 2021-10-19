import React from 'react'
import { Card } from 'semantic-ui-react'

// composant fonctionnel qu'on peut reutiliser pour afficher nos questions
// recoit comme prop une liste de questions ainsi que le numero de la question qu'on veut afficher
const Quote = ({ quoteList, currentQuote }) => {

    // variable pour formatter la date
    let date = new Date(quoteList[currentQuote].airdate);

    return (
        <Card className="centered">
            <Card.Content>
                <Card.Header>Id</Card.Header>
                <Card.Description>{quoteList[currentQuote].id}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Header>Question</Card.Header>
                <Card.Description>{quoteList[currentQuote].question}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Header>Date de Parution</Card.Header>
                <Card.Description>{date.toLocaleDateString("fr-CA", "yyyy-MM-dd")}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Header>Réponse</Card.Header>
                <Card.Description>{quoteList[currentQuote].answer}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Quote
