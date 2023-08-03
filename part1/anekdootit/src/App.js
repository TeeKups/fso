import { useState, Fragment } from 'react';

// Realistically these would come from a database or something
const getAnecdotes = () => [
    {votes: 0, text: 'If it hurts, do it more often.'},
    {votes: 0, text: 'Adding manpower to a late software project makes it later!'},
    {votes: 0, text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'},
    {votes: 0, text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'},
    {votes: 0, text: 'Premature optimization is the root of all evil.'},
    {votes: 0, text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'},
    {votes: 0, text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'},
    {votes: 0, text: 'The only way to go fast, is to go well. '},
];

const getRandomInt = (max) => Math.floor(Math.random()*max);

const Button = ({text, fn}) => <button type='button' onClick={fn}>{text}</button>

const App = () => {

    const [anecdotes, setAnecdotes] = useState(getAnecdotes());
    const [selected, setSelected] = useState(0);
    const [highestVoted, setHighestVoted] = useState(0);

    const showRandomAnecdote = () => {
        setSelected(getRandomInt(anecdotes.length));
    };

    const voteSelected = () => {
        const newAnecdotes = anecdotes.map((val, idx) => (idx === selected)
            ? ({ ...val, votes: val.votes+1})
            : val
        );
        setAnecdotes(newAnecdotes);

        const votesArray = Object.values(newAnecdotes).map((val) => val.votes);
        setHighestVoted(votesArray.indexOf(Math.max(...votesArray)));
    };

    return (<Fragment>
        <p>{anecdotes[selected].text}</p>
        <div>{anecdotes[selected].votes} votes</div>
        <Button text={'Vote'} fn={voteSelected}/>
        <Button text={'Show random anecdote'} fn={showRandomAnecdote}/>
        <h1>Highest voted anecdote</h1>
        <div>with {anecdotes[highestVoted].votes} votes</div>
        <p>{anecdotes[highestVoted].text}</p>
    </Fragment>);
};

export default App;
