import { toggleSomething } from "../utils";

const initialState = {
  user: {
    name: "Helva",
    favorites: [67283, 357311]
  },
  pizzas: [
    {
      id: 161235,
      name: "Pizza Margherita",
      description:
        "The typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt and extra-virgin olive oil.",
      bought: 5,
      ingredients: ["tomatoes", "mozzarella", "basil", "oil"]
    },
    {
      id: 67283,
      name: "Pizza Napoletana",
      description:
        "Neapolitan pizza also known as Naples-style pizza, is a style of pizza made with tomatoes and mozzarella cheese.",
      bought: 2,
      ingredients: ["tomatoes", "mozzarella", "oil"]
    },
    {
      id: 357311,
      name: "Pizza Bianca",
      description:
        "White pizza, which omits tomato sauce from the equation, often substituting it with pesto or sour cream.",
      bought: 10,
      ingredients: ["ricotta", "mozzarella", "garlic"]
    }
  ]
};

function reducer(state = initialState, action) {
  //   console.log("ACTION?", action);
  switch (action.type) {
    case "ADD_PIZZA":
      return {
        ...state,
        pizzas: [...state.pizzas, { ...action.payload, bought: 0 }]
      };

    case "TOGGLE_FAVORITE_PIZZA":
      // current favorites
      //   console.log("Favs", state.user.favorites);
      // pizza id that needs to be toggled
      //   console.log("ADDED OR TAKEN AWAY", action.payload);

      const newFavorites = toggleSomething(
        state.user.favorites,
        action.payload
      );

      return {
        ...state,
        user: {
          ...state.user,
          favorites: newFavorites
        }
      };

    default:
      return state;
  }
}

export default reducer;
