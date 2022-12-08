import GraphSection from "./components/GraphSection";
import CalendarSection from "./components/CalendarSection";
import HabitsProvider from "./Habits";

if (window.location.href.substr(window.location.href.length - 6) !== "#today") {
    window.location.href = `${window.location.href}#today`;
}

function App() {
    return (
        <HabitsProvider>
            <div>
                {/* Temporary */}
                <div className='flex justify-center mt-5'>
                    <span className='text-5xl'>My Habit Tracker</span>
                </div>

                <GraphSection />
                <CalendarSection />
            </div>
        </HabitsProvider>
    );
}

export default App;
