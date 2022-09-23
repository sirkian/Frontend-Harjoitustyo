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
    // v MUISTA POISTAA SIT KU TOIMII NIINKU PITÄÄKI
    // eslint-disable-next-line
  }, [props.recipes]);

  if ([recipes].length === 0) {
    return <div className="recipe"> Ei reseptejä (vielä!). </div>;
  }

  return (
    <div>
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id} className="recipe">
            <h3>{recipe.name}</h3>

            <span>ID {recipe.id}</span>

            {recipe.portions.length > 0 && (
              <p> Annosmäärä: {recipe.portions} </p>
            )}

            {recipe.time.length > 0 && <p> Valmistusaika: {recipe.time} </p>}

            {recipe.incredientList.map((list, index) => {
              return <p key={index}>Raaka-aine: {list.incredient}</p>;
            })}

            <p>{recipe.instructions}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ShowRecipes;
