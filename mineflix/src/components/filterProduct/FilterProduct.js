const FilterProduct = (props) => {
    const filterHandler = (event) => {
        props.filterValue(event.target.value);
   }
    
    return (
        <>
            <select name="active" onChange={filterHandler}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="not active">Not Active</option>

            </select>
        </>
    )
}
export default FilterProduct;