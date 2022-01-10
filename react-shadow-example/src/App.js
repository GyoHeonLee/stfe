import logo from "./logo.svg";
import "./App.css";
import React from "react";

const Person = React.memo(({ name, age }) => {
  console.log("Person render");
  return (
    <div>
      {name} / {age}
    </div>
  );
});

function App() {
  const [state, setState] = React.useState({
    text: "",
    persons: [
      { id: 1, name: "Mark", age: 39 },
      { id: 2, name: "Hanna", age: 29 },
    ],
  });

  const { text, persons } = state;

  return (
    <div>
      <input type="text" value={text} onChange={change} />
      <ul>
        {persons.map((person) => (
          <Person {...person} key={person.id} />
        ))}
      </ul>
    </div>
  );

  function change(e) {
    setState({
      ...state,
      text: e.target.value,
    });
  }
}

export default App;