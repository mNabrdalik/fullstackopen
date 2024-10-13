/* eslint-disable react/prop-types */
import CountryItem from './CountryItem';

const CountryList = ({ countries, visibleCountries, toggleVisibility }) => {
  return (
    <div>
      {countries.map(country => (
        <CountryItem
          key={country.cca3}
          country={country}
          isVisible={visibleCountries[country.cca3]}
          toggleVisibility={toggleVisibility}
        />
      ))}
    </div>
  );
};

export default CountryList;