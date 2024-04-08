import "./ChoiceUser.scss";
import imgBg from "../../assets/img/03_Tablettes/bg_4.png";

function FormChoice({
  back,
  onClickInvited,
  onclickLog,
  setPseudoGuest,
  errorInputGuest,
  setErrorInputGuest,
}) {
  const handlePseudo = (e) => {
    setPseudoGuest(e.target.value);
    setErrorInputGuest(false);
  };

  return (
    <div className="containerUsers">
      <img
        id="logo"
        src="src/assets/img/02_Images/Logo/Logo.png"
        alt="Titre site"
      />
      <div className="panneauWood">
        <img src={imgBg} alt="background" />
        <div className="panneauWood-content">
          <button type="button" id="btn-back" onClick={back}>
            {" "}
          </button>
          <div className="panneauWood-title">
            <h2> Play as Guest or Login ? </h2>
          </div>
          <div className="panneauWood-link">
            <div className="Invited">
              {/* PSEUDO GUEST  */}
              <input
                className={`input-form ${errorInputGuest && "error"}`}
                type="text"
                id="invited-input"
                name="invited-input"
                placeholder="Jean-michmMouch"
                onChange={handlePseudo}
              />
              {/* BOUTON GUEST */}
              <button
                type="button"
                id="btn-choiceUser-invite"
                onClick={onClickInvited}
              >
                Guest !
              </button>
            </div>

            {/* BOUTON LOGIN  */}

            <div className="Loggin">
              {/* <div className="useLogged-text-playas"> Play as </div> */}
              <button
                type="button"
                id="btn-choiceUser-log"
                onClick={onclickLog}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormChoice;
