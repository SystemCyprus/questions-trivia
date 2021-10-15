import React, { useState, useEffect }  from 'react'

const PageRandom = () => {

    const [randomQuote, setRandomQuote] = useState();
    const [erreur, setErreur] = useState('');

    useEffect(() => {
        fetch('https://jservice.io/api/random')
            .then((response) => JSON.stringify(response).json())
            .then((data) => setRandomQuote(data))
            .catch((er) => setErreur(er));
        console.log(randomQuote);
    }, []);

    return (
        <h1>Simple API question trivia aléatoire</h1>
    )
}

export default PageRandom;
