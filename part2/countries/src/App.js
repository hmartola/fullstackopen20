import React, {useState} from 'react';
import './App.css';
import axios from 'axios'
import Countries from './components/Countries'

function App() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  
  const clickedShow = (view) => {
    axios
    .get(`https://restcountries.eu/rest/v2/name/${view}`)
    .then(response => {
      setData(response.data)
    })
  }
  
  const handleSearchEdit = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setData(response.data) 
    })
  }
  
   const filter = data.filter(country => 
    country.name.toLowerCase().includes(search)) 
    

  return (
    <div>
      <h1>Country Data</h1>
      find countries: <input value={search} onChange={handleSearchEdit}/>
      <Countries country={filter} view={clickedShow}/>
    </div>
  );
}

export default App;
