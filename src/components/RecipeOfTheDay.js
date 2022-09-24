import React from "react";

function RecipeOfTheDay(props) {
  return (
    <div className="recipe-container recipeoftheday">
      <h2>Päivän resepti</h2>
      <div>
        {props.recipe.map((recipe) => {
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
    </div>
  );
}

export default RecipeOfTheDay;
