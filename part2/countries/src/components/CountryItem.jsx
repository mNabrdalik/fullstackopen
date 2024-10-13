/* eslint-disable react/prop-types */
import CountryData from './CountryData';

const CountryItem = ({ country, isVisible, toggleVisibility }) => {
  return (
    <div className='country'>
      <div className='country__name'>
        <p>{country.name.common}</p>
        <button onClick={() => toggleVisibility(country.cca3)}>
          {isVisible ? "hide" : "show"}
        </button>
      </div>
      <div className={`country__data ${isVisible ? "show" : "hide"}`}>
        <CountryData country={country} />
      </div>
    </div>
  );
};

export default CountryItem;
