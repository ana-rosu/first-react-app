import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

// component = self contained piece of code that returns some visual UI representation of HTML
// jsx has made it easier to tell our App function what we want it to actually render visually
//callback function in setState is going to run only after this state is fully updated
// whenever i use .map i want to make sure that at the highest level of this element i add the unique key, so react knows what exactly should re render, it is much more performant and efficient when it comes to differentiating these components from each other and figure out which one should be updated when the value changes
// the moment your component is placed onto the DOM is when you want to make an api request
// constructor is first called always, it initialize the state, then render method it renders the initial ui, then componenentDidMount which fetches some data and calls setState which updates the state and makes react rerender the ui component
// a component is meant to tie together functionality and visual representation of our ui
// to tie together reusable portions of the code
// whenever props change our component will also rerender
// !!! Components rerender based on two conditions: when setState gets called and when props are updated !!!
// no matter where  you import a css file it is going to be applicable to the entire website. we import it at component level for us, css in js libraries will help us with isolation
// useEffect hook will run on mount and renrun the callback function whenever the values in the options array have changed
const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search monsters..."
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
////////////////
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           }
//           // () => {
//           //   console.log(this.state);
//           // }
//         )
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="Search monsters..."
//           className="monsters-search-box"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
