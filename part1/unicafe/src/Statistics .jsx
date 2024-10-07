
import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, sum }) => {
    
    const average = sum ? (good - bad) / sum : 0;
    const positivePercentage = sum ? (good / sum) * 100 : 0;

    return (
        <div>
            {sum !== 0 ? (
                <div>
                    <h2>statistics</h2>
                    <table>
                        <tbody>
                            <StatisticLine text="good" value={good}></StatisticLine>
                            <StatisticLine text="neutral" value={neutral}></StatisticLine>
                            <StatisticLine text="bad" value={bad}></StatisticLine>
                            <StatisticLine text="all" value={sum}></StatisticLine>
                            <StatisticLine text="average" value={average}></StatisticLine>
                            <StatisticLine text="positive" value={positivePercentage + "%"}></StatisticLine>
                        </tbody>
                    </table>
                </div>

            ) : <p>No feedback given</p>}

        </div>
    )
}

export default Statistics