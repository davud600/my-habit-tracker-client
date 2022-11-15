import React from "react";
import DayCard from "./DayCard";

const currYear = 2022;
const dateObj = new Date();
const dates = [];

monthsLoop: for (let m = 1; m <= 12; m++) {
    let monthDays;

    switch (m) {
        case 1:
            monthDays = 31;
            break;
        case 2:
            monthDays = new Date(currYear, 1, 29).getDate() === 29 ? 29 : 28;
            break;
        case 3:
            monthDays = 31;
            break;
        case 4:
            monthDays = 30;
            break;
        case 5:
            monthDays = 31;
            break;
        case 6:
            monthDays = 30;
            break;
        case 7:
            monthDays = 31;
            break;
        case 8:
            monthDays = 31;
            break;
        case 9:
            monthDays = 30;
            break;
        case 10:
            monthDays = 31;
            break;
        case 11:
            monthDays = 30;
            break;
        case 12:
            monthDays = 31;
            break;
    }

    daysLoop: for (let d = 1; d <= monthDays; d++) {
        let isToday =
            dateObj.getDate() == d &&
            dateObj.getFullYear() == currYear &&
            dateObj.getMonth() + 1 == m;

        dates.push({
            day: d,
            month: m,
            year: currYear
        });

        if (isToday) break monthsLoop;
    }
}

export default function CalendarSection() {
    let prevMonth;

    return (
        <section className='calendar-section'>
            <div className='calendar-container'>
                {dates.map((date, index) => {
                    let newMonth = false;
                    let isToday =
                        dateObj.getDate() == date.day &&
                        dateObj.getFullYear() == date.year &&
                        dateObj.getMonth() + 1 == date.month;

                    if (prevMonth != date.month) {
                        prevMonth = date.month;
                        newMonth = true;
                    }

                    return (
                        <DayCard
                            key={index}
                            dateString={`${date.year}-${date.month}-${date.day}Z`}
                            newMonth={newMonth}
                            isToday={isToday}
                        />
                    );
                })}
            </div>
        </section>
    );
}
