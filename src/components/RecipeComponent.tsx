import { ARecipe } from "../recipe";

const RecipeComponent = (props: { recipe: ARecipe }) => {
    const { recipe } = props; 
    return (
        <div className="recipe">
            <div className="title">
                <img src={recipe.thumbnail || 'http//localhost:3000/put your asset here'} alt={recipe.title} />
                <p>{recipe.title}</p>
            </div>
            {recipe.ingridients &&  
              <ul>
                {recipe.ingridients.split(',').map(ingridient => <li>{ingridient}</li>)}
              </ul>
            }
            <a href={recipe.href} target="_bla">View Recipe</a>
        </div>
    );
}

export default RecipeComponent;