import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSomething } from "../utils";

function allPizzas(reduxState) {
  //   console.log("WHAT IS MY SELECTOR", reduxState);
  return reduxState.pizzas.sort(
    (pizzaA, pizzaB) => pizzaB.bought - pizzaA.bought
  );
}

function userFavorites(reduxState) {
  return reduxState.user.favorites;
}

function uniquePizzaIngredients(reduxState) {
  return [...new Set(reduxState.pizzas.flatMap(pizza => pizza.ingredients))];
}

export default function PizzaList() {
  const pizzas = useSelector(allPizzas);
  const favorites = useSelector(userFavorites);
  const uniqueIngredients = useSelector(uniquePizzaIngredients);
  //   console.log(uniqueIngredients);
  //   console.log("FAVORITES", favorites);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const [disabledIngredients, setDisabledIngredients] = useState([]);

  //   dispatch({ type: "TESTING" });
  //   console.log("PIZZAS IN MY COMPONENT??", pizzas);

  function submitPizza(event) {
    event.preventDefault();
    // console.log("SUBMITTING");
    const action = {
      type: "ADD_PIZZA",
      payload: {
        id: pizzas.length + 1,
        name: name,
        description: description
      }
    };

    dispatch(action);
  }

  function toggleFavorite(pizzaId) {
    // console.log("FAV!", pizzaId);
    const action = {
      type: "TOGGLE_FAVORITE_PIZZA",
      payload: pizzaId
    };

    dispatch(action);
  }

  function toggleIngredient(ingredientToToggle) {
    // console.log(ingredientToToggle);
    const newDisabledIngredients = toggleSomething(
      disabledIngredients,
      ingredientToToggle
    );

    setDisabledIngredients(newDisabledIngredients);
  }

  return (
    <div>
      <ul>
        {uniqueIngredients.map(ingredient => {
          const checked = !disabledIngredients.includes(ingredient);
          return (
            <div>
              <label>{ingredient}</label>
              <input
                onChange={() => toggleIngredient(ingredient)}
                checked={checked}
                type="checkbox"
              />
            </div>
          );
        })}
      </ul>

      <ul>
        {pizzas
          .filter(pizza => {
            // console.log("PIZZA INGREDIENTS", pizza.ingredients);
            // console.log("DISABLED", disabledIngredients);
            return !disabledIngredients.some(ingredient =>
              pizza.ingredients.includes(ingredient)
            );
          })
          .map(pizza => {
            //   console.log("FAVORITES IN MAP", favorites);
            //   console.log("ID OF THIS PIZZA", pizza.id);
            //   console.log("IS THIS A FAVORITE");
            const isFavorite = favorites.includes(pizza.id);
            return (
              <li key={pizza.id}>
                <div>
                  <h3>{pizza.name}</h3>
                  <button onClick={() => toggleFavorite(pizza.id)}>
                    {isFavorite ? `♥` : `♡`}
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      <h2>New Pizza</h2>
      <form onSubmit={submitPizza}>
        <label>Pizza Name </label>
        <input value={name} onChange={event => setName(event.target.value)} />
        <label>Pizza Description</label>
        <input
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
