import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState()

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
    setFilter(
      countries
        .filter(country => 
          country.name.official
          .toLowerCase()
          .includes(event.target.value)
        )
    ) 
   }
   console.log('search is...', search)
  console.log('current filter', filter)

  return(
  <div>
    <b>Search countries: </b>
        <Search handleSearch={handleSearch}/>
        <Display filteredCountries={filter} setFilter={setFilter}/>
    
  </div>
  )
}
export default App