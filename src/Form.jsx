import { useState, useEffect } from "react";

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([startTime])
    .reduce((acc, _, i) => acc.concat([startTime + i * increment]));

const dailyTimeSlots = (gymOpensAt, gymClosesAt) => {
  const totalSlots = (gymClosesAt - gymOpensAt) * 2;
  const startTime = new Date().setHours(gymOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return timeIncrements(totalSlots, startTime, increment);
};

const weeklyDateValues = (startDate) => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0);
  const increment = 24 * 60 * 60 * 1000;
  return timeIncrements(7, midnight, increment);
};

const toShortDate = (timestamp) => {
  const [day, , dayOfMonth] = new Date(timestamp).toDateString().split(" ");
  return `${day} ${dayOfMonth}`;
};

const toTimeValue = (timestamp) =>
  new Date(timestamp).toTimeString().substring(0, 5);

const TimeSlotTable = ({ gymOpensAt, gymClosesAt, today, onChange }) => {
  const dates = weeklyDateValues(today);
  const timeSlots = dailyTimeSlots(gymOpensAt, gymClosesAt);
  return (
    <table id="time-slots">
      <thead>
        <tr>
          <th />
          {dates.map((d) => (
            <th key={d}>{toShortDate(d)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeSlot) => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
            {dates.map((date) => (
              <td key={date}>
                <input
                  type="radio"
                  name="timeSlot"
                  required
                  value={timeSlot}
                  onChange={() => {
                    const date_ = new Date(date);
                    const time_ = new Date(timeSlot);
                    var datetime = new Date(
                      date_.getFullYear(),
                      date_.getMonth(),
                      date_.getDate(),
                      time_.getHours(),
                      time_.getMinutes(),
                      time_.getSeconds()
                    );
                    onChange(datetime);
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  gymOpensAt,
  gymClosesAt,
  today,
}) => {
  const [appointment, setAppointment] = useState({ note: "" });

  const handleServiceChange = ({ target: { value } }) =>
    setAppointment((appo) => ({
      ...appo,
      note: value,
    }));

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  return (
    <form
      id="appointment"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Data Add Successfully");
        onSubmit(appointment);
        event.target.reset();
        setAppointment(() => ({ note: "" }));
      }}
    >
      <h1
        style={{
          gridColumnStart: "2",
          gridColumnEnd: "4",
          color: "orange",
          backgroundColor: "black",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Schedule Client appointment
      </h1>
      <label htmlFor="service">Gym service</label>
      <select
        name="service"
        id="service"
        value={appointment.note}
        required
        onChange={handleServiceChange}
      >
        <option value="">Select a service</option>
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <TimeSlotTable
        gymOpensAt={gymOpensAt}
        gymClosesAt={gymClosesAt}
        today={today}
        onChange={(timeSlot) => {
          setAppointment((appo) => ({
            ...appo,
            startsAt: timeSlot,
          }));
        }}
      />
      <div id="btn_submit">
        <label htmlFor="firstName">
          First name
          <input
            type="text"
            required
            id="firstName"
            name="firstName"
            onChange={(event) => {
              setAppointment((appo) => ({
                ...appo,
                firstName: event.target.value,
              }));
            }}
          />
        </label>
        <label htmlFor="lastName">
          Last name
          <input
            type="text"
            required
            id="lastName"
            name="lastName"
            onChange={(event) => {
              setAppointment((appo) => ({
                ...appo,
                lastName: event.target.value,
              }));
            }}
          />
        </label>
        <label htmlFor="phoneNumber">
          Phone number
          <input
            type="text"
            required
            id="phoneNumber"
            name="phoneNumber"
            onChange={(event) => {
              setAppointment((appo) => ({
                ...appo,
                phoneNumber: event.target.value,
              }));
            }}
          />
        </label>
        <label htmlFor="location">
          location
          <input
            type="text"
            required
            id="location"
            name="location"
            onChange={(event) => {
              setAppointment((appo) => ({
                ...appo,
                location: event.target.value,
              }));
            }}
          />
        </label>
        <input type="submit" value="Add" />
        <p
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      </div>
    </form>
  );
};

AppointmentForm.defaultProps = {
  today: new Date(),
  gymOpensAt: 9,
  gymClosesAt: 19,
  service: "",
  onSubmit: () => {},
  selectableServices: [
    "Cardiovascular",
    "HIIT",
    "Strength Training",
    "Abs",
    "Yoga",
    "Lifts",
  ],
};
export default AppointmentForm;
