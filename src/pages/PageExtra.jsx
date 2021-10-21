import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../components/textBox.css';


const PageExtra = () => {

    // state pour choisir le debut de la liste de categorie, vu qu'on en affiche seulement 100 par page sur plus de 1800
    const [offset, setOffset] = useState(0);
    // la liste des categories contient 100 items, et elle s'ajuste selon ce que l'usager choisit avec le input de type range
    const [listeCategories, setListeCategories] = useState([]);
    // state pour afficher une erreur lors du fetch, s'il y a lieu
    const [erreur, setErreur] = useState('');
    
    // fonction pour aller chercher les categories avec un fetch API, paramétré seulement avec le numéro de début
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

    // le hook useEffect permet de loader la liste des l'affichage de cette page, et aussi lors du changement de debut des questions
    useEffect(() => {
        chercherCategories();
    }, [offset]);

    return (
        <>
            <div className="text-box">
                <h1>Extra</h1>
            </div>
            {/* simple page avec titre et tableau pour afficher les categories, que l'on pourra cliquer pour voir leurs questions */}
            <h1>Catégories aditionnelles</h1>
            <label>Début: {offset} (100 items)</label>
            <br />
            {/* un simple 'slider' pour pouvoir choisir le debut des questions, avec sa limite qui reflete le nombre maximum des questions */}
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

            {/* si il y a erreur, elle sera affichee */}
            <h2>{erreur}</h2>
        </>
    )
}

export default PageExtra;
