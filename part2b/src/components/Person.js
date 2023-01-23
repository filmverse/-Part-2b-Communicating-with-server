
const Person = ({ phoneBookPerson }) => {
    return (
        <div>
            <ul>
                <li>
                    {phoneBookPerson.name}: {phoneBookPerson.number}
                </li>
            </ul>
        </div>
    )
}

export default Person;