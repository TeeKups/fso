const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

const Contact = require('./models/contact');

const PORT = process.env.PORT || 3001;

function isEmpty(obj) {
    for (var x in obj) { return false; }
    return true;
}

const errorMiddleware = (error, request, response, next) => {
    console.error(error.message);
    switch(error.name) {
        case 'CastError':
            return response.status(400).send({ error: "Malformed ID" });
        case 'ValidationError':
            return response.status(400).send({ error: error.message });
        default:
            next(error);
    }
};

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "Unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(morgan((tokens, request, response) => {
    let logline = [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms'
    ];

    if (request.method === 'POST') {
        logline.push(JSON.stringify(request.body));
    }

    return logline.join(' ');
}));

app.get('/', (request, response) => {
    response.redirect('/info');
});

app.get('/api/persons', (request, response, next) => {
    Contact.find({})
        .then(contacts => {
            response.json(contacts);
        }).catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(found => {
            if (found) {
                response.json(found);
            } else {
                response.status(404).end();
            }
        }).catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
    if ( ! request.body.number || ! request.body.name ) {
        response.status(400).send({ error: "Name or number is missing." }).end();
        return;
    };

    const contact = new Contact({
        name: `${request.body.name}`,
        number: `${request.body.number}`
    });

    Contact.findOne({name: contact.name})
        .then(found => {
            if (found) {
                response.status(409).send({error: `Contact with name "${contact.name}" exists already.`}).end()
            } else {
                contact.save()
                    .then(contact => {
                        response.status(201).json(contact);
                    })
                    .catch(error => next(error));
            }
        }).catch(error => next(error));
});


app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;

    Contact.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    ).then(updated => {
        response.json(updated);
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id).then(contact => {
        response.status(204).end();
    });
});

app.get('/info', (request, response) => {
    html = `
        <p>Phonebook has information for ${phonebook.length} prople.</p>
        <p>${new Date().toString()}</p>
    `;
    response.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(unknownEndpoint);
app.use(errorMiddleware);
