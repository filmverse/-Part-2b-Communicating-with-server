
const PersonFilter = ({ filterName, changeFilterName }) => {
    return (
        <div>
            filter shown with <input value={filterName} onChange={changeFilterName} />
        </div>
    )
}

export default PersonFilter;