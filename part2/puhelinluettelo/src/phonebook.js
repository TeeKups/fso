import axios from 'axios';

const dbURL = 'http://localhost:3001';
const personsResource = '/persons';

const getAll = () => {
    console.log(`Requesting ${personsResource}`);
    return axios.get(dbURL+personsResource)
        .then(res => {
            console.log(`Got ${personsResource} from server`);
            return res.data
        });
}

const addPerson = (newPerson) => {
    console.log(`POST ${dbURL+personsResource}`, newPerson);
    return axios.post(dbURL+personsResource, newPerson)
        .then(response => {
            console.log(`New person added to phonebook with name '${response.data.name}' and number '${response.data.number}'`);
            return response.data;
        });
};

const deletePerson = (id) => {
    const url = `${dbURL}${personsResource}/${id}`
    console.log(`DELETE ${url}`);
    return axios.delete(url)
        .then(response => {
            console.log(`Deleted person with id ${id} from phonebook.`);
            return response;
        });
};

const setPhoneNumber = (person, newNumber) => {
    const url = `${dbURL}${personsResource}/${person.id}`
    console.log(`PUT ${url}: changing phone number of ${person.name} to ${newNumber}.`);
    return axios.put(url, { ...person, number: newNumber })
        .then(response => {
            console.log(`Changed phone number of ${response.data.name} to ${response.data.number}.`);
            return response.data;
        });
};
export default { getAll, addPerson, deletePerson, setPhoneNumber };
