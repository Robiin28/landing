const FilterProduct = (props) => {
    const filterHandler = (event) => {
        props.filterValue(event.target.value);
   }
    
    return (
        <div>
            <select name="active" onChange={filterHandler}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="not active">Not Active</option>

            </select>
        </div>
    )
}
export default FilterProduct;