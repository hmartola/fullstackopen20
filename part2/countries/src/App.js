import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const hook = () => {
    console.log("effect")
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log("promise fulfilled")
      setData(response.data)
    })
  }

  useEffect(hook, [])

  const handleSearchEdit = (event) => {
    setSearch(event.target.value)
  } 

  return (
    <div>
      <h1>Country Data</h1>
      find countries: <input value={search} onChange={handleSearchEdit}/>
      
    </div>
  );
}

export default App;
