import React, { useState, useEffect } from 'react'
import { Label, Select } from 'semantic-ui-react';
import Quote from '../components/Quote';

const optionsCategorie = [
    { value: "25", key: "25", text: "Science" },
    { value: "114", key: "114", text: "History" },
    { value: "267", key: "267", text: "Food" },
    { value: "99", key: "99", text: "Religion" },
    { value: "567", key: "567", text: "Literature" },
];

const PageOptions = () => {
    const [quoteList, setQuoteList] = useState([]);
    const [erreur, setErreur] = useState('');
    const [currentQuote, setCurrentQuote] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(0);


    useEffect(() => {
        async function fetchMyAPI() {
            try {
                fetch(`https://jservice.io/api/category?id=${currentCategory})`)
                    .then(response => response.json())
                    .then(data => setQuoteList(data.clues));
            }
            catch (e) {
                setErreur("Erreur lors de l'appel à l'API" + e);
            }
        }
        if (currentCategory !== 0) fetchMyAPI();
    }, [currentCategory]);

    const questionPrecedente = () => {
        if (quoteList.length > 0) {
            if (currentQuote === 0) setCurrentQuote(quoteList.length - 1);
            else setCurrentQuote(currentQuote - 1);
        }
    }

    const questionSuivante = () => {
        if (quoteList.length > 0) {
            if (currentQuote === quoteList.length - 1) setCurrentQuote(0);
            else setCurrentQuote(currentQuote + 1);
        }
    }

    const onCategorieChange = (e, data) => {
        setCurrentCategory(data.value);
        setCurrentQuote(0);
    }

    return (
        <>
            <h1>Api avec des options</h1>
            <Select placeholder="Catégorie" options={optionsCategorie} onChange={onCategorieChange}></Select>
            <br /><br />
            <button onClick={questionPrecedente}>Question Précédente</button>
            <Label>{currentQuote}</Label>
            <button onClick={questionSuivante}>Question Suivante</button>

            {quoteList.length > 0 ? <Quote quoteList={quoteList} currentQuote={currentQuote} /> : undefined}

            <h2>{erreur}</h2>
        </>

    )
}

export default PageOptions;
