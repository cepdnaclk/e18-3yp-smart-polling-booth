import { v4 as uuid } from "uuid";

export const customers = [
  {
    id: uuid(),
    address: {
      country: "Sri Lanka",
      state: "Southern Province",
      city: "Matara",
      street: "Galle Rd",
    },
    avatarUrl: "/static/images/avatars/avatar_3.png",
    createdAt: 1555016400000,
    email: "hirushi@email.com",
    name: "Hirushi Devindi",
    phone: "+94 70 45 8720",
  },

  {
    id: uuid(),
    address: {
      country: "Sri Lanka",
      state: "Southern Province",
      city: "Deniyaya",
      street: "Deniyaya Rd",
    },
    avatarUrl: "/static/images/avatars/avatar_3.png",
    createdAt: 1555016400000,
    email: "kushan@email.com",
    name: "Kushan Manahara",
    phone: "+94 70 63 5792",
  },

  {
    id: uuid(),
    address: {
      country: "Sri Lanka",
      state: "Central Province",
      city: "Kandy",
      street: "Colombo Rd",
    },
    avatarUrl: "/static/images/avatars/avatar_3.png",
    createdAt: 1555016400000,
    email: "dhananjaya@email.com",
    name: "Dhananjaya Weerasinghe",
    phone: "+94 75 23 3975",
  },
];
