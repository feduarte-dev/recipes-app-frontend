import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import ContextSearch from '../context/ContextSearch';
import Meals from './Meals';
import Drinks from './Drinks';

function Recipes() {
  const { fetchRecipes, recipeFilters, handleClick, apiData,
  } = useContext(ContextRecipes);
  const navigate = useNavigate();
  const { category } = useParams();
  const { showFilter } = useContext(ContextSearch);
  useEffect(() => {
    fetchRecipes(category);
  }, [category]);
  if (showFilter && category === 'meals') {
    return (
      <Meals />
    );
  }
  if (showFilter && category === 'drinks') {
    return (
      <Drinks />
    );
  }
  return (
    <>
      {recipeFilters.length > 0 && recipeFilters.map((filter, index) => (
        <button
          data-testid={ `${filter.strCategory}-category-filter` }
          key={ index }
          onClick={ (event) => handleClick(event, category) }
          value={ filter.strCategory }
        >
          {filter.strCategory}
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        onClick={ () => fetchRecipes(category) }
      >
        Limpar Filtros
      </button>
      {apiData.length > 0 && apiData.map((recipe, index: number) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ index }
          onClick={ () => navigate(`/${category}/${category === 'meals'
            ? recipe.idMeal : recipe.idDrink}`) }
          aria-hidden="true"
        >
          <img
            src={ category === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ `${index}-card-img` }
            data-testid={ `${index}-card-img` }
            width="200"
          />
          <p data-testid={ `${index}-card-name` }>
            {category === 'meals' ? recipe.strMeal : recipe.strDrink}
          </p>
        </div>
      ))}
    </>
  );
}
export default Recipes;
