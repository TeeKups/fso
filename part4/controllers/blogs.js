const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});

    response.json(blogs);
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    response.json(blog);
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    const result = await blog.save();

    response.status(201).json(result);
})

blogsRouter.put('/:id', async (request, response, next) => {
    if ( ! await Blog.exists({_id: request.params.id}) ) {
        response.status(404).end();
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, {
        returnDocument: 'after',
    });

    response.status(200).json(result);
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id);

    response.status(200).end();
})

module.exports = blogsRouter;
