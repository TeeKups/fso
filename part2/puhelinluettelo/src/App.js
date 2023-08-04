import { useState, useEffect, Fragment } from 'react';
import phonebook from './phonebook';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Persons from './components/Persons';

export const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterStr, setFilter] = useState('');

    useEffect(() => {
        phonebook.getAll().then(personsData => setPersons(personsData));
    }, []);

    const setPhoneNumber = (person, newNumber) => {
        phonebook.setPhoneNumber(person, newNumber).
            then(persons => {
                console.log(`Phone number of ${person.name} changed to ${newNumber}`);
                setPersons( persons );
            }).
            catch(error => {
                console.log(error.message);
                alert(error.message);
            });
        setNewName('');
        setNewNumber('');
    };

    const addPerson = (event) => {
        event.preventDefault();

        const resetFields = () => {
        };

        const personFound = persons.find(person => person.name === newName);
        if (personFound) {
            phonebook.setPhoneNumber(personFound, newNumber)
                .then(newPersonData => {
                    setPersons( persons.map( person =>
                        (person.id === newPersonData.id)
                            ? { ...newPersonData }
                            : person
                    ))
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message);
                });
            setNewName('');
            setNewNumber('');
            return;
        }

        const newPerson = {name: newName, number: newNumber};
        phonebook.addPerson(newPerson)
            .then( newPersonData => {
                setPersons(persons.concat(newPersonData));
            })
            .catch(error => {
                console.log(error);
                alert(error.message);
            });

        setNewName('');
        setNewNumber('');
    }

    const deletePerson = (person) => {
        return () => {
            if (! window.confirm(`Really remove ${person.name}?`)) {
                console.log(`Deleting ${person.name} cancelled.`);
                return;
            }

            phonebook.deletePerson(person.id)
                .then(response => {
                    setPersons( persons.filter(personIter => personIter.id !== person.id) );
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message);
                });
        };
    }

    return (
    <Fragment>
        <h1>Phonebook</h1>

        <Filter filterStr={filterStr} setFilter={setFilter} />

        <h2>Add new contact</h2>
        <ContactForm
            addPerson={addPerson}
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}
        />

        <h2>Numbers</h2>
        <Persons persons={persons} filterStr={filterStr} deleteAction={deletePerson}/>
    </Fragment>
    );
};
