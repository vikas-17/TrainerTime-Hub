const today = new Date();

const at = (hours) => today.setHours(hours, 0);

export const sampleAppointments = [
  {
    startsAt: at(9),
    firstName: "Charlie",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Yoga",
  },
  {
    startsAt: at(10),
    firstName: "Iman",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Yoga",
  },
  {
    startsAt: at(11),
    firstName: "Naomi",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Cardiovascular",
  },
  {
    startsAt: at(12),
    firstName: "George",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Cardiovascular",
  },
  {
    startsAt: at(13),
    firstName: "Alexander",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Cardiovascular",
  },
  {
    startsAt: at(14),
    firstName: "Luis",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Cardiovascular",
  },
  {
    startsAt: at(15),
    firstName: "Luc",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Yoga",
  },
  {
    startsAt: at(16),
    firstName: "Robyn",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Yoga",
  },
  {
    startsAt: new Date("2023-12-11").setHours(15, 0),
    firstName: "Axel start",
    lastName: "marry",
    phoneNumber: "72467824",
    location: "mumbai",
    note: "Yoga",
  },
];
