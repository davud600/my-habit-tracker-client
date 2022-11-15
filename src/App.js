import GraphSection from "./components/GraphSection";
import CalendarSection from "./components/CalendarSection";

if (window.location.href.substr(window.location.href.length - 6) !== "#today") {
    window.location.href = `${window.location.href}#today`;
}

function App() {
    return (
        <div>
            {/* Temporary */}
            <div className='flex justify-center mt-10 mb-10'>
                <span className='text-6xl'>My Habit Tracker</span>
            </div>

            <GraphSection />
            <CalendarSection />
        </div>
    );
}

export default App;
