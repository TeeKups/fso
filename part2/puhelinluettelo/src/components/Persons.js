const Persons = ({persons, filterStr, deleteAction}) => (
    <ul>
        { persons
            .filter((person) => person.name.toLowerCase().indexOf(filterStr.toLowerCase()) !== -1)
            .map((person) => (
                <li key={person.id}>
                    <div>
                        {person.name} {person.number}
                        <button type={'button'} onClick={deleteAction(person)}>Delete</button>
                    </div>
                </li>
            ))
        }
    </ul>
);

export default Persons;
