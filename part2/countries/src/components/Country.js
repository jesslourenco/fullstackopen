import React from 'react'

const Country = ({name, capital, area, languages, flag}) => {
    const lang = Object.values(languages)
    return (
        <div>
            <h2>{name}</h2>
            Captial: {capital} <br></br>
            Area: {area} <br></br>
            <p><b>Languages:</b></p>
                <ul>
                    {lang.map(e => 
                                <li key={e}>{e}</li>
                            )
                    }
                </ul>
            <img src={flag} alt='the flag of the country'></img>  
        </div>
    )
}

export default Country