import { useContext, useState, useEffect, Fragment } from 'react';
import phonebook from './phonebook';
import Filter from './components/Filter';
import ContactForm from './components/ContactForm';
import Persons from './components/Persons';
import { NotificationContext, notificationKind, notifyError, notifyInfo } from './components/Notifications';

export const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterStr, setFilter] = useState('');

    const notificationContext = useContext(NotificationContext);
    const { notifyInfo, notifyError } = notificationContext;

    useEffect(() => {
        phonebook.getAll().then(personsData => setPersons(personsData));
    }, []);

    const setPhoneNumber = (person, newNumber) => {
        phonebook.setPhoneNumber(person, newNumber)
            .then(persons => {
                notifyInfo(`Phone number of ${person.name} changed to ${newNumber}`);
                setPersons( persons );
            }).catch(error => {
                notifyError(error.message);
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
                }).catch(error => {
                    notifyError(error.message);
                });
            setNewName('');
            setNewNumber('');
            return;
        }

        const newPerson = {name: newName, number: newNumber};
        phonebook.addPerson(newPerson)
            .then( newPersonData => {
                setPersons(persons.concat(newPersonData));
                notifyInfo(`Contact added. Name: ${newPersonData.name}, number: ${newPersonData.number}`)
            })
            .catch(error => {
                notifyError(error.message);
            });

        setNewName('');
        setNewNumber('');
    }

    const deletePerson = (person) => {
        return () => {
            if (! window.confirm(`Really remove ${person.name}?`)) {
                notifyInfo(`Deleting ${person.name} cancelled.`);
                return;
            }

            phonebook.deletePerson(person.id)
                .then(response => {
                    setPersons( persons.filter(personIter => personIter.id !== person.id) );
                    notifyInfo(`Contact ${person.name} deleted.`);
                })
                .catch(error => {
                    notifyError(error.message);
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
