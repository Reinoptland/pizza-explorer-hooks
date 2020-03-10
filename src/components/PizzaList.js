import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function allPizzas(reduxState) {
  console.log("WHAT IS MY SELECTOR", reduxState);
  return reduxState.pizzas.sort(
    (pizzaA, pizzaB) => pizzaB.bought - pizzaA.bought
  );
}

function userFavorites(reduxState) {
  return reduxState.user.favorites;
}

export default function PizzaList() {
  const pizzas = useSelector(allPizzas);
  const favorites = useSelector(userFavorites);
  //   console.log("FAVORITES", favorites);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  //   dispatch({ type: "TESTING" });
  //   console.log("PIZZAS IN MY COMPONENT??", pizzas);

  function submitPizza(event) {
    event.preventDefault();
    console.log("SUBMITTING");
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
    console.log("FAV!", pizzaId);
    const action = {
      type: "TOGGLE_FAVORITE_PIZZA",
      payload: pizzaId
    };

    dispatch(action);
  }

  return (
    <div>
      ♡ ♥
      <ul>
        {pizzas.map(pizza => {
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
