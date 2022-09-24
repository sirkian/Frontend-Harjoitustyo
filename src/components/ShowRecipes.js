import React, { useState, useEffect } from "react";

function ShowRecipes(props) {
  const [recipes, setRecipes] = useState([]);

  // TÄN TILALLE ASYNC FUNKTIO, KUN HAETAAN KANNASTA
  const fetchRecipe = () => {
    const position = props.recipes.length - 1;
    if (position < 0) {
      return;
    }
    const recipe = props.recipes[position].recipe;
    try {
      const json = JSON.parse(recipe);
      setRecipes([...recipes, json]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecipe();
    // v SELVITÄ MIKSI HERJAA
    // eslint-disable-next-line
  }, [props.recipes]);

  if (recipes.length === 0) {
    return <div className="recipe"> Ei reseptejä (vielä!). </div>;
  }

  return (
    <div>
      <h2>Omat reseptit</h2>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id} className="recipe">
            <h3>{recipe.name}</h3>
            <span>ID {recipe.id}</span>
            <div className="row">
              {recipe.time.length > 0 && (
                <p>
                  Valmistusaika: <b>{recipe.time}</b>
                </p>
              )}
              {recipe.portions.length > 0 && (
                <p>
                  Annosmäärä: <b>{recipe.portions}</b>
                </p>
              )}
            </div>
            <div className="row">
              <div className="recipe-incredients">
                Raaka-aineet:
                <ul>
                  {recipe.incredientList.map((list, index) => {
                    return <li key={index}>{list.incredient}</li>;
                  })}
                </ul>
              </div>
              <div className="recipe-instructions">
                Valmistusohje:
                <p>{recipe.instructions}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShowRecipes;
