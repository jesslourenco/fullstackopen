import React from 'react'
import Country from './Country'

const Display = ({countries}) => {
    

    if(countries.length > 10 ){
        return(
            <>Too many matches, specify another filter</>
        )
    }

    if(countries.length >1 && countries.length < 10){
        return(
            <>
                {countries.map(e => 
                    <div key={e.altSpellings[0]}>{e.name.official}</div>
                    )}
            </>
        )
    }
   if(countries.length === 1){
        return(
            <>
                <Country name={countries[0].name.official} 
                        capital={countries[0].capital} 
                        area={countries[0].area} 
                        languages={countries[0].languages} 
                        flag={countries[0].flags.png}
                />
            </>
        )
    }
}

export default Display