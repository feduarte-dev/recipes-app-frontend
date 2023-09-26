import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

const mockedDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
localStorage.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
describe('Testando page DoneRecipes', () => {
  it('Verifica botões de filtro e compartilhar', async () => {
    renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();

    const buttonShare = screen.getAllByTestId('0-horizontal-share-btn');
    expect(buttonShare.length > 0).toBe(true);

    await userEvent.click(buttonShare[0]);
    const linkCopied = screen.getAllByText('Link copied!');
    expect(linkCopied.length > 0).toBe(true);
  });
  it('Verifica funcionalidade dos filtros', async () => {
    renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    await userEvent.click(buttonMeals);
    const HORIZONTAL_NAME_TEST_ID = '0-horizontal-name';
    expect(screen.getAllByTestId(HORIZONTAL_NAME_TEST_ID)[0]).toBeInTheDocument();

    await userEvent.click(buttonDrinks);
    expect(screen.getAllByTestId(HORIZONTAL_NAME_TEST_ID)[0]).toBeInTheDocument();

    await userEvent.click(buttonAll);
    expect(screen.getAllByTestId(HORIZONTAL_NAME_TEST_ID)[0]).toBeInTheDocument();
  });
});
