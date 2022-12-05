/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      const response = axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
      // eslint-disable-next-line no-shadow
      response.then((response) => {
        setCountry(response.data[0]);
      });
    }
  }, [name]);
  return country;
};

function Country({ country }) {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>
        population
        {country.population}
      </div>
      <div>
        capital
        {country.capital}
      </div>
      <img src={country.flags.png} height="100" alt={`flag of ${country.name.common}`} />
    </div>
  );
}

function App() {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  );
}

export default App;
