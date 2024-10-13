/* eslint-disable react/prop-types */
const CountryData = ({country}) => {

    const langList = Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ));

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>Languages</h3>
            <ul>{langList}</ul>
            <img src={country.flags.png} alt={`${country.name.common} flag`} />
        </div>
    )
}

export default CountryData