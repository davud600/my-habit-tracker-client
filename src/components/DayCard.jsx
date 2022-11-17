import React, { useEffect, useState } from "react";
import { useHabits } from "../Habits";

export default function DayCard(props) {
    const { dateString, newMonth, isToday, registeredHabits } = props;
    const {
        habits,
        initialCheckedHabits,
        registerHabit,
        unRegisterHabit,
        AMOUNT_OF_HABITS
    } = useHabits();
    const date = new Date(dateString);

    const [checkedHabits, setCheckedHabits] = useState(initialCheckedHabits);
    const [percentageOfHabitsCompleted, setPercentageOfHabitsCompleted] =
        useState(0);

    useEffect(() => {
        let newCheckedHabits = [...checkedHabits];
        for (let i = 0; i < checkedHabits.length; i++)
            for (let j = 0; j < registeredHabits.length; j++)
                if (i === registeredHabits[j].habit_id - 1)
                    newCheckedHabits[i] = 1;

        setCheckedHabits(newCheckedHabits);
    }, [registeredHabits]);

    useEffect(() => {
        const amountOfCheckedHabits = checkedHabits.reduce(
            (prevValue, currValue) => prevValue + currValue,
            0
        );

        setPercentageOfHabitsCompleted(
            Math.round((amountOfCheckedHabits / AMOUNT_OF_HABITS) * 100)
        );
    }, [checkedHabits, AMOUNT_OF_HABITS]);

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

                                            if (e.target.checked) {
                                                checkedHabitsNewState[
                                                    habit.id - 1
                                                ] = 1;
                                                registerHabit(
                                                    habit.id,
                                                    dateString
                                                );
                                            } else {
                                                checkedHabitsNewState[
                                                    habit.id - 1
                                                ] = 0;

                                                unRegisterHabit(
                                                    habit.id,
                                                    dateString
                                                );
                                            }

                                            setCheckedHabits(
                                                checkedHabitsNewState
                                            );
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
