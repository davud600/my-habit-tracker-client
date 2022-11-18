import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/";
const AMOUNT_OF_HABITS = 6; // SHOULD BE CHANGED IF AMOUNT OF HABITS CHANGES ON SERVER OR CLIENT
let initialCheckedHabits = [];
initialCheckedHabits.length = AMOUNT_OF_HABITS;
initialCheckedHabits.fill(0);

const HabitsContext = createContext();

export function useHabits() {
    return useContext(HabitsContext);
}

export default function HabitsProvider({ children }) {
    const [habits, setHabits] = useState([]);
    const [fetchedRegisteredHabits, setFetchedRegisteredHabits] = useState([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await fetch(`${API_URL}habits`);
                const data = await res.json();

                setHabits(data);
            } catch (e) {
                console.log(e);
            }
        };
        const fetchRegisteredHabits = async () => {
            try {
                const res = await fetch(`${API_URL}registered-habits`);
                const data = await res.json();

                setFetchedRegisteredHabits(data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchHabits();
        fetchRegisteredHabits();
    }, []);

    async function registerHabit(habitId, date) {
        try {
            await fetch(`${API_URL}registered-habits`, {
                method: "POST",
                headers: {
                    "Content-Type": "applicationa/json"
                },
                body: JSON.stringify({
                    habit_id: habitId,
                    date: date
                })
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function unRegisterHabit(habitId, date) {
        try {
            const res = await fetch(
                `${API_URL}registered-habits/get-registered-habit-by-habit-and-date/${habitId}/${date}`
            );
            const data = await res.json();
            const [registeredHabitToDelete] = data;

            await fetch(
                `${API_URL}registered-habits/${registeredHabitToDelete.id}`,
                {
                    method: "DELETE"
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    const value = {
        habits,
        fetchedRegisteredHabits,
        initialCheckedHabits,
        registerHabit,
        unRegisterHabit,
        AMOUNT_OF_HABITS
    };

    return (
        <HabitsContext.Provider value={value}>
            {children}
        </HabitsContext.Provider>
    );
}
