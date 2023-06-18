import PropTypes from 'prop-types'
const FilterComponent = ({ onFilter, onClear, filterText }) => {
    return (
      <div>
        <input type="text" placeholder="Filter" value={filterText} onChange={onFilter} />
        <button onClick={onClear}>Clear</button>
      </div>
    );
  };
  

FilterComponent.propTypes={
    onFilter:PropTypes.func,
    onClear:PropTypes.func,
    filterText:PropTypes.node
}
  export default FilterComponent;
  