import React from 'react'

const Search = ({temp, wind, icon}) => {
    const url = `http://openweathermap.org/img/wn/${icon}@2x.png`
    console.log(temp)
    console.log(wind)
    console.log(icon)

    return(
        <div>
            Temperature: {temp} C <br></br>
            Wind: {wind} m/s
            <div>
                <img src={url} alt='weather icon'></img>
            </div>
        </div>
    )
}

export default Search