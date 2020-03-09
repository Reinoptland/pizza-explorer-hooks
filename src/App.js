import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PizzaList from "./components/PizzaList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PizzaList />
      </header>
    </div>
  );
}

export default App;
