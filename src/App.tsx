import React, { useState, useEffect, FormEvent } from "react";
import "./App.css";
import { StringifyOptions } from "querystring";
import { queryAllByAltText } from "@testing-library/dom";
import RecipeComponent from "./components/RecipeComponent";
import Recipe from "./components/RecipeComponent";
import { ARecipe } from "./recipe";

function App() {
  const [recipesFound, setRecipesFound] = useState<ARecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState('');

  const searchForRecipes = async (query: string): Promise<ARecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json).results;
  };
  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const response = await searchForRecipes(query);
      setRecipesFound(response);
    })();
  }, [recipeSearch]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
    input.value = '';
  };

  return (
    <div className="App">
      <h1>Recipe Search App</h1>
      <form className="searchForm" onSubmit={event => search(event)} >
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}...</p>}
      <div className="recipes-container">
        {recipesFound.length &&
          recipesFound.map(recipe =>
            (<RecipeComponent key={recipe.href} recipe={recipe}></RecipeComponent>))
        }
      </div>
    </div>
  );
}

export default App;