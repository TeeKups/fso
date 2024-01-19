const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
});

describe('API tests', () => {
    describe('GET', () => {
        test('initial state is correct', async () => {
            const response = await api.get('/api/blogs');
            expect(response.body).toHaveLength(initialBlogs.length);
        });

        test('blogs are returned as JSON', async () => {
            await api.get('/api/blogs')
                .expect(200)
                .expect('content-type', /application\/json/)
        });

        test('database entry is identified by id', async () => {
            const result = await api.get('/api/blogs');
            expect(result.status).toBe(200);
            expect(result.body[0].id).toBeDefined();
        });

        test('blog can be fetched by id', async () => {
            const response = await api.get('/api/blogs');
            const id = response.body[0].id;
            const endpoint = `/api/blogs/${id}`;

            const result = await api.get(endpoint)
                .expect(200)
                .expect('content-type', /application\/json/);

            expect(result.body.id).toBe(id);
        });

        test('returns 400 on invalid id', async () => {
            const response = await api.get('/api/blogs');
            const id = 'asdfasdf';
            const endpoint = `/api/blogs/${id}`;

            await api.get(endpoint)
                .expect(400);
        });
    });

    describe('POST', () => {
        test('a valid blog can be added', async () => {
            const endpoint = '/api/blogs';
            const newBlog = {
                title: "Motherfucking Website",
                author: "some German motherfucker",
                url: "http://motherfuckingwebsite.com/",
                likes: 69,
            };

            await api
                .post(endpoint)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get(endpoint);
            expect(response.body).toHaveLength(initialBlogs.length + 1);
        });

        test('entries with missing items are rejected', async () => {
            const endpoint = '/api/blogs';
            const testData = [
                {
                    author: "some German motherfucker",
                    url: "http://motherfuckingwebsite.com/",
                    likes: 69,
                }, {
                    title: "Motherfucking Website",
                    url: "http://motherfuckingwebsite.com/",
                    likes: 69,
                }, {
                    title: "Motherfucking Website",
                    author: "some German motherfucker",
                    likes: 69,
                }
            ];

            for (const testCase of testData) {
                await api
                    .post(endpoint)
                    .send(testCase)
                    .expect(400)

                const response = await api.get(endpoint);
                expect(response.body).toHaveLength(initialBlogs.length);
            }
        });

        test('likes is set to zero unless given', async () => {
            const endpoint = '/api/blogs';
            const testData = {
                title: "Motherfucking Website",
                author: "some German motherfucker",
                url: "http://motherfuckingwebsite.com/",
            };

            await api
                .post(endpoint)
                .send(testData)
                .expect(201)

            const response = await api.get(endpoint);
            expect(response.body).toHaveLength(initialBlogs.length + 1);
            expect(response.body[initialBlogs.length].likes).toBe(0);
        });

        test('entries with invalid data format are rejected', async () => {
            const endpoint = '/api/blogs';
            const testData = [
                {
                    title: [],
                    author: "some German motherfucker",
                    url: "http://motherfuckingwebsite.com/",
                    likes: 69,
                }, {
                    title: "Motherfucking Website",
                    author: [],
                    url: "http://motherfuckingwebsite.com/",
                    likes: 69,
                }, {
                    title: "Motherfucking Website",
                    author: "some German motherfucker",
                    url: [],
                    likes: 69,
                }, {
                    title: "motherfucking website",
                    author: "some german motherfucker",
                    url: "http://motherfuckingwebsite.com/",
                    likes: "asdf",
                }
            ];

            for (const testCase of testData) {
                await api
                    .post(endpoint)
                    .send(testCase)
                    .expect(400)

                const response = await api.get(endpoint);
                expect(response.body).toHaveLength(initialBlogs.length);
            }
        });
    });

    describe('PUT', () => {
        test('cannot modify what does not exist', async () => {
            const response = await api.get('/api/blogs');
            const id = '123456123456';
            const endpoint = `/api/blogs/${id}`;

            await api.put(endpoint)
                .expect(404);
        });

        test('returns 400 on invalid id', async () => {
            const response = await api.get('/api/blogs');
            const id = 'asdfasdf';
            const endpoint = `/api/blogs/${id}`;

            await api.put(endpoint)
                .expect(400);
        });

        test('returns updated document', async () => {
            const initialData = await api.get('/api/blogs');
            const id = initialData.body[0].id;
            const endpoint = `/api/blogs/${id}`;

            const response = await api.put(endpoint)
                .send({
                    title: "motherfucking website",
                    author: "some german motherfucker",
                    url: "http://motherfuckingwebsite.com/",
                    likes: 420
                })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.likes).toBe(420);
        });

        test('update is validated', async () => {
            const initialData = await api.get('/api/blogs');
            const id = initialData.body[0].id;
            const endpoint = `/api/blogs/${id}`;

            await api.put(endpoint)
                .send({
                    title: "motherfucking website",
                    author: "some german motherfucker",
                    url: "http://motherfuckingwebsite.com/",
                    likes: "asdfasdf"
                })
                .expect(400)
        });
    });

    describe('DELETE', () => {
        test('deleting non-existing item returns 200 and deletes nothing', async () => {
            const endpoint = `/api/blogs/asdfasdfasdf`;

            await api.delete(endpoint)
                .expect(200);

            const afterDelete = await api.get('/api/blogs');
            expect(afterDelete.body).toHaveLength(initialBlogs.length);
        });

        test('returns 400 on invalid id', async () => {
            const response = await api.get('/api/blogs');
            const id = 'asdfasdf';
            const endpoint = `/api/blogs/${id}`;

            await api.delete(endpoint)
                .expect(400);
        });

        test('deleting existing item returns 200 and deletes item', async () => {
            const response = await api.get('/api/blogs');
            const id = response.body[0].id;
            const endpoint = `/api/blogs/${id}`;

            await api.delete(endpoint)
                .expect(200);

            const afterDelete = await api.get('/api/blogs');
            expect(afterDelete.body).toHaveLength(initialBlogs.length - 1);
        });
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
