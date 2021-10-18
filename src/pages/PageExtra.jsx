import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const PageExtra = () => {

    const [erreur, setErreur] = useState('');
    const [listeCategories, setListeCategories] = useState([]);
    const [offset, setOffset] = useState(0);

    const chercherCategories = async () => {
        try {
            let response = await fetch(`https://jservice.io/api/categories?count=100&offset=${offset}`);
            let data = await response.json()
            setListeCategories(data);
        }
        catch (e) {
            setErreur("Erreur lors de l'appel à l'API");
        }
    };

    useEffect(() => {
        chercherCategories();
    }, [offset]);

    return (
        <>
            <h1>Catégories aditionnelles</h1>
            <label>Début: {offset} (100 items)</label>
            <br/>
            <input className="offsetCategories" type="range" min="0" max="18300" onChange={(e) => setOffset(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                    </tr>
                </thead>
                <tbody>
                    {listeCategories.map((categorie, i) => {
                        return (
                            <tr>
                                <td><Link to={`/categorie/${categorie.id}`}>{categorie.id}</Link></td>
                                <td><Link to={`/categorie/${categorie.id}`}>{categorie.title}</Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h2>{erreur}</h2>
        </>
    )
}

export default PageExtra;
