import React, { useEffect, useState } from "react";

const habits = [
    {
        id: 1,
        name: "Read (10 pages)"
    },
    {
        id: 2,
        name: "Meditate (10 min)"
    },
    {
        id: 3,
        name: "Study (2 hours)"
    },
    {
        id: 4,
        name: "Exercise"
    },
    {
        id: 5,
        name: "Take Supplements"
    }
]; // This data will be fetched from server api, this array is a temporary solution
const baseUrl = "http://127.0.0.1:8000/api/";

export default function DayCard(props) {
    const { dateString, newMonth, isToday } = props;
    const date = new Date(dateString);

    const totalAmountOfHabits = habits.length;
    let initialCheckedHabitsState = [];
    for (let i = 0; i < totalAmountOfHabits; i++) {
        initialCheckedHabitsState[i] = 0;
    }

    const [checkedHabits, setCheckedHabits] = useState(
        initialCheckedHabitsState
    );
    const [percentageOfHabitsCompleted, setPercentageOfHabitsCompleted] =
        useState(0);

    useEffect(() => {
        // api calls
        // const fetchApi = async () => {
        //     try {
        //         const res = await fetch(
        //             `${baseUrl}registered-habits?date=${date}`
        //         );
        //         const data = await res.json();

        //         console.log({ data });
        //     } catch (e) {
        //         console.log(e);
        //     }
        // };

        // fetchApi();

        const amountOfCheckedHabits = checkedHabits.reduce(
            (prevValue, currValue) => prevValue + currValue,
            0
        );

        setPercentageOfHabitsCompleted(
            Math.round((amountOfCheckedHabits / totalAmountOfHabits) * 100)
        );
    }, [checkedHabits]);

    return (
        <div className='day-card' id={isToday ? "today" : ""}>
            <div className='text-end mb-2 text-2xl'>
                {newMonth && (
                    <span className='day-card-label'>
                        {date.toLocaleString("default", { month: "short" })}
                        &nbsp;&nbsp;
                    </span>
                )}
                {isToday ? (
                    <span
                        className='day-card-label'
                        style={{
                            backgroundColor: "red"
                        }}>
                        {date.getDate()}
                    </span>
                ) : (
                    <span>{date.getDate()}</span>
                )}
            </div>

            <div className='habit-card'>
                <div className='flex flex-row gap-3 mb-2'>
                    <span className='text-lg'>
                        {percentageOfHabitsCompleted}%
                    </span>
                    <span>--------</span>
                </div>

                <ul className='text-lg'>
                    {habits.map(habit => (
                        <li key={habit.id}>
                            <div className='habit-info'>
                                <span>
                                    <input
                                        type='checkbox'
                                        name={habit.name}
                                        id={habit.id}
                                        value={checkedHabits[habit.id - 1]}
                                        onChange={e => {
                                            let checkedHabitsNewState =
                                                checkedHabits.slice();

                                            checkedHabitsNewState[
                                                habit.id - 1
                                            ] = e.target.value == 1 ? 0 : 1;

                                            setCheckedHabits(
                                                checkedHabitsNewState
                                            );
                                        }}
                                    />
                                </span>
                                <span>{habit.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
