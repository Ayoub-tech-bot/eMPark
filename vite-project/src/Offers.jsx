
import "../src/Offers.css"

function Offers(){

    return(
    <div className="Offers-container">
        <div className="Offer">
            <h3 className="title"> A la carte </h3>
            <h4 className="description">Parfait pour les utilisateurs occasionnels </h4>
            <h3 className="price">0 DH frais de base</h3>
            <ul className="list">
                <li>Paiment delon la duree reelle</li>
                <li>Recherche de parkings </li>
                <li>Resrvation instantanee</li>
                <li>Historique des stationnements</li>
            </ul>
            <button className="Offers-Btn" >Commencer gratuitement</button>
        </div>
        <div className="Offer">
            <h3 className="title"> Hebdomadaire </h3>
            <h4 className="description">Ideal pour les trajets quotidiens </h4>
            <h3 className="price">49 DH/semaine</h3>
            <ul className="list">
                <li>Tout de a la carte *</li>
                <li>stationnements illimites </li>
                <li>Recommandations gratuites</li>
                <li>Support prioritaire</li>
            </ul>
            <button className="Offers-Btn" >Choisir ce plan </button>
        </div>
        <div className="Offer">
            <h3 className="title"> Mensuel </h3>
            <h4 className="description">La meillieure valeur pour les reguliers </h4>
            <h3 className="price">149 DH/mois</h3>
            <ul className="list">
                <li>Tout de hebdomadaire +</li>
                <li>Economisez 25% </li>
                <li>Resrvation a l' avance</li>
                <li>Parking premium</li>
            </ul>
            <button className="Offers-Btn" >Choisir ce plan</button>
        </div>

    </div>)
}

export default Offers 