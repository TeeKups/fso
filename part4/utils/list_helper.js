const totalLikes = (blogs) => {
    const sum = blogs.reduce((acc, blog) => {
        return acc + blog.likes
    }, 0);
    return sum;
};

module.exports = {
    totalLikes,
};
