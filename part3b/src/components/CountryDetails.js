const CountryDetails = ({ country }) => {
    return (
        <div>
            <ul>
                <li>{country.name}</li>
                <li>{country.capital}</li>
                <li>{country.area}</li>
                {Object.values(country.language).map(
                        clang => <li key={clang}>{clang}</li>
                )}
                <img src={country.flags.png} alt={`${country.name} flag`} />
            </ul>
        </div>
    )
}

export default CountryDetails;