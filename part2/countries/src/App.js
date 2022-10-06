import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

const App = () => {
  const [search, setSearch] = useState()
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
   }

   const filter =  countries
                  .filter(country => 
                    country.name.official
                    .toLowerCase()
                    .includes(search))

  console.log(filter)

  return(
  <div>
    <b>Search countries: </b>
        <Search handleSearch={handleSearch}/>
        <Display countries={filter}/>
    
  </div>
  )
}
export default App