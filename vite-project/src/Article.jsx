import "../src/Article.css";

function Article() {
  return (
    <div className="Article">
      <div className="main">
        <div className="main-text-container">
          <p className="main-text">
            Trouvez votre place <br /> de{" "}
            <span className="parking">parking</span> en <br /> quelques
            secondes.
          </p>
          <p className="side-text">Reserve your place now </p>
          <button className="Reserve-Btn">Reserve</button>
        </div>
        <img
          className="agdir-img"
          src="../src/assets/Agadir.png"
          alt="agadir-map"
        />
      </div>
      <button className="more" > Voir PLus <br/> ⏷ </button>
    </div>
  );
}
export default Article;
