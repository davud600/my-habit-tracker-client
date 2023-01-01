import React, { useEffect, useState } from "react";
import { useHabits } from "../Habits";
import { Line, PolarArea } from "react-chartjs-2";
import { dates } from "../dates";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
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

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: "Habits Time Graph"
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

const polarAreaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: "Habits Frequency Rate %"
        }
    },
    scales: {
        r: {
            ticks: {
                display: false
            },
            grid: {
                color: "rgba(180, 180, 180, 0.2)"
            },
            pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                    size: 17
                }
            }
        }
    }
};

export default function GraphSection() {
    const { fetchedRegisteredHabits, habits } = useHabits();

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

    const habitsRates = habits.map(habit => {
        // Count how many times this habit has been registered in total
        // Calculate completion rate = total / days
        let habitTimesRegistered = 0;
        let totalDays = dates.length;
        fetchedRegisteredHabits.forEach(registeredHabit => {
            if (registeredHabit.habit_id === habit.id) habitTimesRegistered++;
        });
        const completionRate = Math.round(
            (habitTimesRegistered / totalDays) * 100
        );

        return completionRate;
    });

    const chartDataInitialState = {
        labels: Data.map(data => data.date),
        datasets: [
            {
                fill: true,
                label: "Habits Completed",
                data: Data.map(data => data.numOfHabitsCompleted),
                backgroundColor: "rgba(255, 50, 50, 0.25)",
                borderColor: "rgba(200, 35, 35, 0.5)",
                borderWidth: 3
            }
        ]
    };
    const polarAreaDataInitialState = {
        labels: habits.map(habit => habit.name),
        datasets: [
            {
                fill: true,
                label: "Habit Frequency",
                data: habitsRates,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 0.75)",
                    "rgba(54, 162, 235, 0.75)",
                    "rgba(255, 206, 86, 0.75)",
                    "rgba(75, 192, 192, 0.75)",
                    "rgba(153, 102, 255, 0.75)",
                    "rgba(255, 159, 64, 0.75)"
                ],
                borderWidth: 2
            }
        ]
    };

    const [chartData, setChartData] = useState(chartDataInitialState);
    const [polarAreaData, setPolarAreaData] = useState(
        polarAreaDataInitialState
    );

    useEffect(() => {
        setChartData(chartDataInitialState);
        setPolarAreaData(polarAreaDataInitialState);
    }, [fetchedRegisteredHabits]);

    return (
        <section className='graph-section'>
            <div className='polar-area-chart-container mb-12 mt-5'>
                <PolarArea
                    className='polar-area-chart'
                    options={polarAreaOptions}
                    data={polarAreaData}
                />
            </div>
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
