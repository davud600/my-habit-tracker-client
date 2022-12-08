import React, { useEffect, useState } from "react";
import { useHabits } from "../Habits";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const currYear = 2022;
const dateObj = new Date();
const dates = [];

monthsLoop: for (let m = 11; m <= 12; m++) {
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
        default:
            break;
    }

    // This is because we started at nov 16
    let initialD = 1;
    if (m === 11) initialD = 16;

    for (let d = initialD; d <= monthDays; d++) {
        let isToday =
            dateObj.getDate() === d &&
            dateObj.getFullYear() === currYear &&
            dateObj.getMonth() + 1 === m;

        dates.push({
            day: d,
            month: m,
            year: currYear
        });

        if (isToday) break monthsLoop;
    }
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: "Habits Chart"
        }
    },
    scales: {
        x: {
            grid: {
                color: "rgba(180, 180, 180, 0.2)"
            }
        },
        y: {
            grid: {
                color: "rgba(180, 180, 180, 0.2)"
            }
        }
    }
};

export default function GraphSection() {
    const { fetchedRegisteredHabits } = useHabits();

    let prevMonth;
    const Data = dates.map(date => {
        let newMonth = false;

        if (prevMonth !== date.month) {
            prevMonth = date.month;
            newMonth = true;
        }

        // filter fetchedRegisteredData to get the data
        // for the date currently in the loop
        const registeredHabitsOfDate = fetchedRegisteredHabits.filter(
            registeredHabitDate => {
                const registeredHabitDateObj = new Date(
                    registeredHabitDate.date
                );

                return (
                    registeredHabitDateObj.getDate() === date.day &&
                    registeredHabitDateObj.getFullYear() === date.year &&
                    registeredHabitDateObj.getMonth() + 1 === date.month
                );
            }
        );

        let labelDay = date.day;

        if (newMonth) {
            const dateObjForCurrDay = new Date(
                `${date.year}-${date.month}-${date.day}Z`
            );

            labelDay = `${dateObjForCurrDay.toLocaleString("default", {
                month: "short"
            })} ${date.day}`;
        }

        return {
            date: labelDay,
            numOfHabitsCompleted: registeredHabitsOfDate.length
        };
    });

    const [chartData, setChartData] = useState({
        labels: Data.map(data => data.date),
        datasets: [
            {
                fill: true,
                label: "Habits Completed",
                data: Data.map(data => data.numOfHabitsCompleted),
                backgroundColor: "rgba(255, 50, 50, 0.3)",
                borderColor: "rgba(255, 35, 35, 0.6)",
                borderWidth: 3
            }
        ]
    });

    useEffect(() => {
        setChartData({
            labels: Data.map(data => data.date),
            datasets: [
                {
                    fill: true,
                    label: "Habits Completed",
                    data: Data.map(data => data.numOfHabitsCompleted),
                    backgroundColor: "rgba(255, 50, 50, 0.3)",
                    borderColor: "rgba(255, 35, 35, 0.6)",
                    borderWidth: 3
                }
            ]
        });
    }, [fetchedRegisteredHabits, Data]);

    return (
        <section className='graph-section'>
            <div className='graph-container'>
                <Line
                    className='line-chart'
                    options={options}
                    data={chartData}
                />
            </div>
        </section>
    );
}
