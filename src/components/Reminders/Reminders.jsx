import './Reminders.css';
import { Link } from 'react-router-dom';

function Reminders() {
  return (
    <div className="Reminders">
      <div className="RemindersMain">

        {/* macOS window */}
        <div className="RemindersWindow">

          {/* top bar */}
          <div className="RemindersWindowBar">
            <div
              className="mac-btn"
              onClick={() => console.log("Clicked macOS button")}
            ></div>

            <div className="TableHeader">
              <div className="Col col-reminder">Reminder</div>
              <div className="Col col-subject">Subject</div>
              <div className="Col col-date">Due date</div>
              <div className="Col col-priority">Priority</div>
            </div>
          </div>

          {/* content */}
          <div className="RemindersWindowContent">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className={`Row ${i % 2 === 0 ? "even" : "odd"}`}>
                <div className="RowCircle"></div>
                <span className="RowNumber">{i + 1}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Reminders;