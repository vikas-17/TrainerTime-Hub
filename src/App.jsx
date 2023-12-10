import { useState, Fragment, useEffect } from "react";
import { sampleAppointments } from "./sampledata";
import AppointmentForm from "./Form";
import Calendar from "react-calendar";

const appointmentTimeofDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

const Appointment = ({
  firstName,
  lastName,
  location,
  phoneNumber,
  note,
  startsAt,
  onDelete,
  onChange,
}) => {
  const [edit, setEdit] = useState(false);
  return (
    <div id="appointmentView">
      <h3>
        {new Date(startsAt).toDateString()}&nbsp; appointment at&nbsp;
        <time title={startsAt}>{appointmentTimeofDay(startsAt)}</time>
      </h3>
      <table>
        <tbody>
          <tr>
            <td>Client</td>
            <td
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {edit ? (
                <input
                  type="text"
                  defaultValue={firstName}
                  onChange={(e) => {
                    onChange({ firstName: e.target.value });
                  }}
                />
              ) : (
                firstName
              )}
              &nbsp;
              {edit ? (
                <input
                  type="text"
                  defaultValue={lastName}
                  onChange={(e) => {
                    onChange({ lastName: e.target.value });
                  }}
                />
              ) : (
                lastName
              )}
            </td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>
              {edit ? (
                <input
                  type="text"
                  defaultValue={phoneNumber}
                  onChange={(e) => {
                    onChange({ phoneNumber: e.target.value });
                  }}
                />
              ) : (
                phoneNumber
              )}
            </td>
          </tr>
          <tr>
            <td>Location</td>
            <td>
              {edit ? (
                <input
                  type="text"
                  defaultValue={location}
                  onChange={(e) => {
                    onChange({ location: e.target.value });
                  }}
                />
              ) : (
                location
              )}
            </td>
          </tr>
          <tr>
            <td>Service</td>
            <td>
              {edit ? (
                <select
                  name="service"
                  required
                  value={note}
                  onChange={(e) => {
                    onChange({ note: e.target.value });
                  }}
                >
                  <option value="">Select a service</option>
                  {[
                    "Cardiovascular",
                    "HIIT",
                    "Strength Training",
                    "Abs",
                    "Yoga",
                    "Lifts",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              ) : (
                note
              )}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <button
                type="button"
                onClick={() => {
                  setEdit((v) => {
                    if (v) {
                      document.getElementById("info").innerHTML =
                        "Data Save Successfully";
                      setTimeout(() => {
                        document.getElementById("info").innerHTML = "";
                      }, 2000);
                    }
                    return !v;
                  });
                }}
              >
                {edit ? "Save" : "Edit"}
              </button>
            </td>
            <td>
              <button
                type="button"
                onClick={() => {
                  onDelete();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const AppointmentsDayView = () => {
  const [appointments, setAppointment] = useState(
    () => JSON.parse(localStorage.getItem("appointments")) || sampleAppointments
  );

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const [apDate, setApDate] = useState(new Date());

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const datesToAddClassTo = appointments.map((ap) => new Date(ap.startsAt));
  const showIt = appointments.filter((val) => {
    return new Date(val.startsAt).toDateString() === apDate.toDateString();
  });
  return (
    <Fragment>
      <h1
        style={{
          gridColumnStart: "2",
          gridColumnEnd: "4",
          color: "green",
          backgroundColor: "black",
          borderRadius: "10px",
          padding: "10px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Scheduled appointment
      </h1>
      <div>
        <Calendar
          value={apDate}
          onChange={(date) => setApDate(date)}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              if (
                datesToAddClassTo.find((dDate) => {
                  return new Date(date).toDateString() === dDate.toDateString();
                })
              ) {
                return "myClassName";
              }
            }
          }}
        />
      </div>
      <div id="appointmentsDayView">
        <ol>
          {showIt.length === 0 && (
            <p>There are no Personal Training sessions scheduled for today</p>
          )}
          {showIt.map((appointment, i) => (
            <li key={i}>
              <button
                className={i === selectedAppointment ? "toggled" : ""}
                type="button"
                onClick={() => setSelectedAppointment(() => appointment)}
              >
                {appointmentTimeofDay(appointment.startsAt)}
              </button>
            </li>
          ))}
        </ol>
        {selectedAppointment ? (
          <Appointment
            {...selectedAppointment}
            onChange={(data) => {
              setAppointment((vl) =>
                vl.map((val) => {
                  if (val.startsAt === selectedAppointment.startsAt) {
                    const temp_ = {
                      ...val,
                      ...data,
                    };
                    setSelectedAppointment(temp_);
                    return temp_;
                  }
                  return val;
                })
              );
            }}
            onDelete={() => {
              setAppointment((vl) =>
                vl.filter(
                  (val) => val.startsAt !== selectedAppointment.startsAt
                )
              );
              document.getElementById("info").innerHTML =
                "Data Deleted Successfully";
              setTimeout(() => {
                document.getElementById("info").innerHTML = "";
              }, 2000);
              setSelectedAppointment(null);
            }}
          />
        ) : (
          <p>There are no Personal Training sessions scheduled for today</p>
        )}
      </div>
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
        }}
        id="info"
      ></p>
      <AppointmentForm
        onSubmit={(data) =>
          setAppointment((vl) => [
            ...vl,
            {
              ...data,            
              
            },
          ])
        }
      />
      
    </Fragment>
  );
};
export default AppointmentsDayView;
