import "./ScoreReturn.scss";
// tableau pour exemple et application des filtres
const tableauScore = [
  { nom: "John", score: 100, levelgame: "Facile", id: "John" },
  { nom: "Alice", score: 150, levelgame: "Facile", id: "Alice" },
  { nom: "Bob", score: 80, levelgame: "Facile", id: "Bob" },
  { nom: "Arthur", score: 90, levelgame: "Difficile", id: "Arthur" },
  { nom: "Martin", score: 120, levelgame: "Difficile", id: "Martin" },
  { nom: "Pierre", score: 160, levelgame: "Difficile", id: "Pierre" },
  { nom: "Marie", score: 180, levelgame: "Difficile", id: "Marie" },
  { nom: "Robert", score: 70, levelgame: "Difficile", id: "Robert" },
  { nom: "Olivier", score: 200, levelgame: "Difficile", id: "Olivier" },
  { nom: "Florence", score: 110, levelgame: "Moyen", id: "Arthur" },
  { nom: "Laura", score: 120, levelgame: "Moyen", id: "Laura" },
  { nom: "Romain", score: 130, levelgame: "Moyen", id: "Romain" },
  { nom: "Tamara", score: 125, levelgame: "Moyen", id: "Tamara" },
];
// Affichage du suffix
function getSuffix(index) {
  let retour = "";
  if (index === 0) {
    retour = "er";
  }
  if (index === 1) {
    retour = "nd";
  }
  if (index !== 0 && index !== 1) {
    retour = "eme";
  }
  return retour;
}

// Aplication d'une couleur au suffix

function getColor(index) {
  let retour = "";
  if (index === 0) {
    retour = "#F5B404";
  }
  if (index === 1) {
    retour = "#787474";
  }
  if (index !== 0 && index !== 1) {
    retour = "#E1692E";
  }
  return retour;
}
// filtre du niveau jeu
const filterLevel = tableauScore.filter(
  (levelgame) => levelgame.levelgame === "Facile"
);
// tri et classement par score
filterLevel.sort(function compare(a, b) {
  if (a.score < b.score) return 1;
  if (a.score > b.score) return -1;
  return 0;
});

function ScoreReturnf() {
  return (
    <div className="panelScore">
      <table>
        <thead>
          <tr id="titreNom">
            <th>Classement</th>
            <th>Nom</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filterLevel.map((player, index) => {
            if (index < 3) {
              return (
                <tr key={player.id}>
                  <td style={{ color: getColor(index) }}>
                    {index + 1} {getSuffix(index)}
                  </td>
                  <td>{player.nom}</td>
                  <td>{player.score}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreReturnf;
