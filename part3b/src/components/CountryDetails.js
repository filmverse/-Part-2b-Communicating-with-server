
const CountryDetails = ({ country }) => {


    return (
        <div>
            <ul>
                <li>Name: {country.name}</li>
                <li>Capital: {country.capital}</li>
                <li>Area: {country.area}</li>
                <>Language:
                    <ul>
                        {Object.values(country.language).map(
                            clang => <li key={clang}>{clang}</li>
                        )}
                    </ul>
                </>
                <>Flag:
                    <img src={country.flags.png} alt={`${country.name} flag`} />
                </>
            </ul>
        </div>
    )
}

export default CountryDetails;