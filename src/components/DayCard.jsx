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
]; // this array is a temporary solution
// This data will be fetched from server and using context
const API_URL = "http://127.0.0.1:8000/api/";

export default function DayCard(props) {
    const { dateString, newMonth, isToday, registeredHabits } = props;
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
        let newCheckedHabits = [...checkedHabits];
        for (let i = 0; i < checkedHabits.length; i++) {
            for (let j = 0; j < registeredHabits.length; j++) {
                if (i === registeredHabits[j].habit_id - 1) {
                    newCheckedHabits[i] = 1;
                }
            }
        }

        setCheckedHabits(newCheckedHabits);
    }, [registeredHabits]);

    useEffect(() => {
        const amountOfCheckedHabits = checkedHabits.reduce(
            (prevValue, currValue) => prevValue + currValue
        );

        setPercentageOfHabitsCompleted(
            Math.round((amountOfCheckedHabits / totalAmountOfHabits) * 100)
        );

        // call api for post to add registered habits
        // (should skip the first 3 times its ran or check if checkedHabits changed from initial state)
        if (percentageOfHabitsCompleted === 0) {
            // call api (change API_URL to get from context)
        }

        console.log(
            `api called (test)  |  checkedHabits: ${checkedHabits}  percentageOfHabitsCompleted: ${percentageOfHabitsCompleted}`
        );
    }, [checkedHabits, totalAmountOfHabits]);

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
                                        onChange={e => {
                                            let checkedHabitsNewState = [
                                                ...checkedHabits
                                            ];

                                            checkedHabitsNewState[
                                                habit.id - 1
                                            ] =
                                                e.target.checked === true
                                                    ? 1
                                                    : 0;

                                            setCheckedHabits(
                                                checkedHabitsNewState
                                            );

                                            registerHabit(habit.id);
                                        }}
                                        checked={checkedHabits[habit.id - 1]}
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

async function registerHabit(habit_id) {
    try {
        await fetch(`${API_URL}registered-habits?habit_id=${habit_id}`, {
            method: "POST"
        });
    } catch (e) {
        console.log(e);
    }
}
