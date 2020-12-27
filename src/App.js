
import React from "react"
import './scss/App.scss'
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'


import Contact from "./pages/Contact.jsx"



import {Switch, Route, BrowserRouter as Router} from "react-router-dom"

function App() {  
      // state is created in parent so we can pass it down to children as props
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // useEffect is hook function that in functional components stands for lifecycle methods, when you pass [] as a 2. parameter to this function it is exactly the same as componentDidMount() in classes.
  // when you pass [value] as a 2. parameter, than this method will be called everytime the value in [] has changed.
  useEffect(() => {
    fetchData();
    console.log(searchResults);
  }, [searchValue])

  const fetchData = async () => {
    const url = 
      "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=";
      //string concatigation to use our searchValue and wikipedia url to fetch data
    const response = await fetch(url + searchValue);
    // const resp = await fetch(
    // `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=${searchValue}`
    // )
    const data = await response.json();

    // first before I set search results I need to check if the results actually exists and if the data structure is returning something
    // if ( data && data.query && data.query.search) {
    //   setSearchResults(data.query.search);
    // }
    // if statement can be written inline in react like this:
    data && data.query && data.query.search && setSearchResults(data.query.search);
  }
  
    return (
        <div>
              <div className="App">
      {console.log(searchResults)}
      <SearchBar setSearchValue={setSearchValue} />
      <SearchResults searchValue={searchValue} searchResults={searchResults} />
    </div>
        <Router>
            
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </Router>
        </div>
    )
}

export default App
