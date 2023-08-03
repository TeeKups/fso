import {
    Fragment,
    useState
} from 'react';

const Button = ({text, action}) => {
    return(
        <button type='button' onClick={action}>{text}</button>
    );
};

const StatisticLine = ({label, fn}) => (
    <tr>
        <td>{label}</td>
        <td>{fn()}</td>
    </tr>
);

const Statistics = ({statistics}) => {
    const getTotal = () => {
        let sum = 0;
        for (const key in statistics) {
            sum += statistics[key].value;
        };
        return sum;
    }

    const getMean = () => {
        let sum = 0;
        for (const key in statistics) {
            sum += statistics[key].weight*statistics[key].value;
        };
        return sum / getTotal();
    };

    const getPositivePercentage = () => (100 * statistics.good.value / getTotal()) + "%";

    const lines = [
        {key: 0, label: 'Good', fn: () => statistics.good.value},
        {key: 1, label: 'Neutral', fn: () => statistics.neutral.value},
        {key: 2, label: 'Bad', fn: () => statistics.bad.value},
        {key: 3, label: 'Total', fn: () => getTotal()},
        {key: 4, label: 'Average', fn: () => getMean()},
        {key: 5, label: 'Positive', fn: () => getPositivePercentage()},
    ];

    return (getTotal() === 0)
        ? <div>No statistics given.</div>
        : (
            <table>
                <tbody>
                    {lines.map(line => <StatisticLine key={line.key} label={line.label} fn={line.fn}/>)}
                </tbody>
            </table>
        );
};

const App = () => {

    const [goodState, setGood] = useState(0);
    const [neutralState, setNeutral] = useState(0);
    const [badState, setBad] = useState(0);

    const feedback = {
        good: {value: goodState, weight: 1},
        neutral: {value: neutralState, weight: 0},
        bad: {value: badState, weight: -1},
    };

    return (
    <Fragment>
        <h1>Give feedback</h1>
        <Button text={'good'} action={() => setGood(feedback.good.value+1)}/>
        <Button text={'neutral'} action={() => setNeutral(feedback.neutral.value+1)}/>
        <Button text={'bad'} action={() => setBad(feedback.bad.value+1)}/>

        <h1>Statistics</h1>
        <Statistics statistics={feedback}/>
    </Fragment>
    );
};

export default App;
