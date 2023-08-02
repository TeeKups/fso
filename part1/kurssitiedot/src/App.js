import React from 'react';

const Header = (props) => {
    console.log(props.courseName);
    return (
        <h1>{props.courseName}</h1>
    );
};

const Part = (props) => {
    console.log(props);
    const part = props.part;
    return (
        <p>{part.name} {part.exercises}</p>
    );
};

const Content = (props) => {
    const parts = props.parts.map(part => {
        return(
            <React.Fragment key={part.id}>
                <Part part={part} />
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            {parts}
        </React.Fragment>
    );
};

const Total = (props) => {
    const totalExercises = props.parts.reduce((accumulator, part) => {
        return accumulator + part.exercises;
    }, 0);

    console.log(totalExercises);
    return (
        <React.Fragment>
            <p>Number of exercises: {totalExercises}</p>
        </React.Fragment>
    );
};

const App = () => {
    const courseName = 'Half Stack application development';
    const parts = [
        {id: 1, name: 'Fundamentals of React', exercises: 10},
        {id: 2, name: 'Using props to pass data', exercises: 7},
        {id: 3, name: 'State of a component', exercises: 14},
    ];

    return (
    <>
        <Header courseName={courseName} />
        <Content parts={parts} />
        <Total parts={parts} />
    </>
    );
}

export default App;
