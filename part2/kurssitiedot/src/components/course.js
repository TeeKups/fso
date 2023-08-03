import React from 'react'

const Header = (props) => {
    return (
        <h1>{props.courseName}</h1>
    );
};

const Part = (props) => {
    const part = props.part;
    return (
        <p>{part.name} {part.exercises}</p>
    );
};

const Content = (props) => {
    const parts = props.parts.map(part => (
        <React.Fragment key={part.id}>
            <Part part={part} />
        </React.Fragment>
    ));

    return (
        <React.Fragment>
            {parts}
        </React.Fragment>
    );
};

const Total = (props) => {
    const totalExercises = props.parts.reduce((accumulator, part) => accumulator + part.exercises, 0);

    return (
        <p style={{fontWeight: 'bold'}}>Total number of exercises: {totalExercises}</p>
    );
};

export const Course = ({course}) => {
    return (
        <React.Fragment>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </React.Fragment>
    );
};
