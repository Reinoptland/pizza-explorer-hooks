import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function allPizzas(reduxState) {
  console.log("WHAT IS MY SELECTOR", reduxState);
  return reduxState.pizzas.sort(
    (pizzaA, pizzaB) => pizzaB.bought - pizzaA.bought
  );
}

export default function PizzaList() {
  const pizzas = useSelector(allPizzas);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  //   dispatch({ type: "TESTING" });
  console.log("PIZZAS IN MY COMPONENT??", pizzas);

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

  return (
    <div>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </ul>
      <h2>New Pizza</h2>
      <form onSubmit={submitPizza}>
        <label>Pizza Name</label>
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
