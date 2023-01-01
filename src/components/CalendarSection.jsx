import React from "react";
import { useHabits } from "../Habits";
import DayCard from "./DayCard";
import { dates, dateObj } from "../dates";

export default function CalendarSection() {
    const { fetchedRegisteredHabits } = useHabits();

    let prevMonth;

    return (
        <section className='calendar-section'>
            <div className='calendar-container'>
                {dates.map((date, index) => {
                    let newMonth = false;
                    let isToday =
                        dateObj.getDate() === date.day &&
                        dateObj.getFullYear() === date.year &&
                        dateObj.getMonth() + 1 === date.month;

                    if (prevMonth !== date.month) {
                        prevMonth = date.month;
                        newMonth = true;
                    }

                    // filter fetchedRegisteredData to get the data
                    // for the date currently in the loop
                    const registeredHabitsOfDate =
                        fetchedRegisteredHabits.filter(registeredHabitDate => {
                            const registeredHabitDateObj = new Date(
                                registeredHabitDate.date
                            );

                            return (
                                registeredHabitDateObj.getDate() === date.day &&
                                registeredHabitDateObj.getFullYear() ===
                                    date.year &&
                                registeredHabitDateObj.getMonth() + 1 ===
                                    date.month
                            );
                        });

                    return (
                        <DayCard
                            key={index}
                            dateString={`${date.year}-${date.month}-${date.day}Z`}
                            newMonth={newMonth}
                            isToday={isToday}
                            registeredHabits={registeredHabitsOfDate}
                        />
                    );
                })}
            </div>
        </section>
    );
}
