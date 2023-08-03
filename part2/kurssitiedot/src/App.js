import React from 'react';
import { Course } from './components/course';
import { v4 as uuid } from 'uuid';

const getCourses = () => [
    {
        name: 'Half Stack application development',
        id: uuid(),
        parts: [
            {id: uuid(), name: 'Fundamentals of React', exercises: 10},
            {id: uuid(), name: 'Using props to pass data', exercises: 7},
            {id: uuid(), name: 'State of a component', exercises: 14},
        ]
    },
    {
        name: 'Foo course',
        id: uuid(),
        parts: [
            {id: uuid(), name: 'Fundamentals of Foo', exercises: 20},
            {id: uuid(), name: 'Advanced topics in Foo', exercises: 10},
            {id: uuid(), name: 'Foo project', exercises: 1},
        ]
    },
    {
        name: 'Bar course',
        id: uuid(),
        parts: [
            {id: uuid(), name: 'Introduction to Bar', exercises: 10},
            {id: uuid(), name: 'Getting confident with Bar', exercises: 50},
            {id: uuid(), name: 'Mastering Bar', exercises: 1},
            {id: uuid(), name: 'Bar demola project', exercises: 1},
        ]
    },
];

export const App = () => {
    const courses = getCourses();
    return (
        courses.map((courseInfo) => <Course key={courseInfo.id} course={courseInfo} />)
    );
}
