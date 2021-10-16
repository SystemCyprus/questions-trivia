import React from 'react'
import { Card } from 'semantic-ui-react'

const Quote = ({ quoteList, currentQuote }) => {
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
                <Card.Description>DaterandomQuote.airdate</Card.Description>
            </Card.Content>
            <Card.Content>
                <Card.Header>Réponse</Card.Header>
                <Card.Description>{quoteList[currentQuote].answer}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Quote
