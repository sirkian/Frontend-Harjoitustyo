import React, { useState } from "react";
import ShowRecipes from "./ShowRecipes";

function AddRecipe() {
  // TODO: REFAKTOROI TILANHALLINTA ( REDUCER ? )
  // JA LISÄÄ AINAKIN TAGIT, MÄÄRÄT, KUVA... ( MUITA ? )
  const [name, setName] = useState("");
  const [incredientList, setIncredientList] = useState([{ incredient: "" }]);
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("");
  const [portions, setPortions] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddIncredient = () => {
    setIncredientList([...incredientList, { incredient: "" }]);
  };

  const handleRemoveIncredient = (index) => {
    const list = [...incredientList];
    list.splice(index, 1);
    setIncredientList(list);
  };

  const handleIncredientChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...incredientList];
    list[index][name] = value;
    setIncredientList(list);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePortionChange = (e) => {
    setPortions(e.target.value);
  };

  // MUUTA SITTEN AIKANAAN LÄHETTÄMÄÄN KANTAAN TILAMUUTTUJAN SIJAAN
  const handleSubmit = (e) => {
    e.preventDefault();
    // ESITTÄÄ BACKENDIN LUOMAA UNIIKKIA ID:TÄ
    const id = Math.random() * 100;
    const recipe = {
      name,
      incredientList,
      instructions,
      time,
      portions,
      id,
    };
    setRecipes([...recipes, { recipe: JSON.stringify(recipe) }]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Nimi:
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e)}
          ></input>
        </label>
        <div className="form-incredients">
          <label>
            Raaka-aineet:
            {incredientList.map((incredient, index) => (
              <div key={index}>
                <input
                  name="incredient"
                  type="text"
                  value={incredient.incredient}
                  onChange={(e) => handleIncredientChange(e, index)}
                />
                {incredientList.length - 1 === index && (
                  <button type="button" onClick={handleAddIncredient}>
                    Lisää
                  </button>
                )}
                {incredientList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIncredient(index)}
                  >
                    Poista
                  </button>
                )}
              </div>
            ))}
          </label>
        </div>
        <label>
          Työvaiheet:
          <textarea
            name="instructions"
            value={instructions}
            onChange={(e) => handleInstructionsChange(e)}
          />
        </label>
        <div className="form-options">
          <label>
            Valmistusaika
            <select value={time} onChange={(e) => handleTimeChange(e)}>
              <option value="">Valitse</option>
              <option value="alle 10 min">alle 10min</option>
              <option value="10-20min"> 10-20min </option>
              <option value="20-30min"> 20-30min </option>
              <option value="+30min"> +30min </option>
              <option value="1h"> 1h </option>
              <option value="1,5h"> 1,5h </option>
              <option value="+2h"> +2h </option>
            </select>
          </label>
          <label>
            Annosmäärä
            <select value={portions} onChange={(e) => handlePortionChange(e)}>
              <option value="">Valitse</option>
              <option value="1 annos">1 annos</option>
              <option value="2 annosta"> 2 annosta </option>
              <option value="3 annosta"> 3 annosta </option>
              <option value="4 annosta"> 4 annosta </option>
              <option value="5 annosta"> 5 annosta </option>
              <option value="6 annosta"> 6 annosta </option>
            </select>
          </label>
        </div>
        <input type="submit" value="Lisää resepti" />
      </form>
      <ShowRecipes recipes={recipes} />
    </div>
  );
}

export default AddRecipe;
