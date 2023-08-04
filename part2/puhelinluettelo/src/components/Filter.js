const Filter = ({filterStr, setFilter}) => (
    <form onSubmit={event => event.preventDefault()}>
        <div>filter <input onChange={(event) => setFilter(event.target.value)}/></div>
    </form>
);

export default Filter;
