import React from 'react'
import Country from './Country'

const Display = ({filteredCountries, setFilter}) => {

    const handleClick = (event, e) => {
        console.log('setting new filter to ', e)
        setFilter([e])
    }

    if(!filteredCountries){return(null)}
            
    if(filteredCountries.length > 10 ){
        return(
            <>Too many matches, specify another filter</>
        )
    }

    if(filteredCountries.length >1 && filteredCountries.length < 10){
        return(
            <>
                {filteredCountries.map(e => 
                <div key={e.name.official}>
                    {e.name.official}
                    <button onClick={event => handleClick(event, e)}>show</button>
                </div>)}
            </>
        )
    }
   if(filteredCountries.length === 1){
        return(
            <>
                <Country name={filteredCountries[0].name.official} 
                        capital={filteredCountries[0].capital} 
                        area={filteredCountries[0].area} 
                        languages={filteredCountries[0].languages} 
                        flag={filteredCountries[0].flags.png}
                        code={filteredCountries[0].cca3}
                />
            </>
        )
    }
}

export default Display