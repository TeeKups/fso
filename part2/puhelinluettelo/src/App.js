import { useState, Fragment } from 'react';

const Filter = ({filter, setFilter}) => (
    <form onSubmit={event => event.preventDefault()}>
        <div>filter <input onChange={(event) => setFilter(event.target.value)}/></div>
    </form>
);

const ContactForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
            number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <button type='submit'>add</button>
    </form>
);

const Persons = ({persons, filter}) => (
    <ul>
        { persons
            .filter((element) => element.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .map((person) => <li key={person.name}>{person.name} {person.number}</li>)
        }
    </ul>
);

export const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.find((element) => element.name === newName)) {
            alert(`${newName} is already in the phonebook.`);
            setNewName('');
            setNewNumber('');
            return;
        }

        setPersons( persons.concat({name: newName, number: newNumber}) );
        setNewName('');
        setNewNumber('');
    }

    return (
    <Fragment>
        <h1>Phonebook</h1>

        <Filter filter={filter} setFilter={setFilter} />

        <h2>Add new contact</h2>
        <ContactForm
            addPerson={addPerson}
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}
        />

        <h2>Numbers</h2>
        <Persons persons={persons} filter={filter}/>
    </Fragment>
    );
};
