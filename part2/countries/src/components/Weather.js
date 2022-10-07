import React from 'react'

const Weather= ({temp, wind, icon}) => {
    const url = `http://openweathermap.org/img/wn/${icon}@2x.png`

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

export default Weather