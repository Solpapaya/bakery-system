import {
  addDays,
  convertStrToDate,
  formatDate,
  getMexicoCityTodayDate,
  subtractDays,
} from "../../utils/helpers";
const today = getMexicoCityTodayDate();
const yesterday = subtractDays(today, 1);
const tomorrow = addDays(today, 1);

const fakeTickets = [
  {
    id: 513533,
    customerFullName: "Cole Palmer",
    createdAt: formatDate(yesterday, "YYYY-MM-DD"),
    deliveryDate: formatDate(yesterday, "YYYY-MM-DD"),
    status: "closed",
    total: 1502.56,
    paymentMethod: "cash",
    productCount: 3,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
    ],
  },
  {
    id: 513534,
    customerFullName: "Marcus Rashford",
    createdAt: formatDate(subtractDays(today, 3), "YYYY-MM-DD"),
    deliveryDate: formatDate(subtractDays(today, 3), "YYYY-MM-DD"),
    status: "closed",
    total: 905.67,
    paymentMethod: "card",
    productCount: 3,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
    ],
  },
  {
    id: 513535,
    customerFullName: "Lionel Messi",
    createdAt: formatDate(addDays(today, 8), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 8), "YYYY-MM-DD"),
    status: "open",
    total: 9845.56,
    paymentMethod: "cash",
    productCount: 10,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
      { name: "Nostalgia de Manzana", price: 50, quantity: 2 },
      { name: "Canasta de Durazno", price: 55, quantity: 1 },
      { name: "Chocorrol", price: 55, quantity: 1 },
      { name: "Rol de Canela", price: 55, quantity: 1 },
      { name: "Mazapan", price: 55, quantity: 1 },
    ],
  },
  {
    id: 513536,
    customerFullName: "Cristiano Ronaldo",
    createdAt: formatDate(tomorrow, "YYYY-MM-DD"),
    deliveryDate: formatDate(tomorrow, "YYYY-MM-DD"),
    status: "open",
    total: 985.56,
    paymentMethod: "cash",
    productCount: 4,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
  {
    id: 513537,
    customerFullName: "Alexis Vega",
    createdAt: formatDate(today, "YYYY-MM-DD"),
    deliveryDate: formatDate(today, "YYYY-MM-DD"),
    status: "open",
    total: 2845.56,
    paymentMethod: "cash",
    productCount: 6,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
      { name: "Nostalgia de Manzana", price: 50, quantity: 2 },
    ],
  },
  {
    id: 513538,
    customerFullName: "Romelu Lukaku",
    createdAt: formatDate(today, "YYYY-MM-DD"),
    deliveryDate: formatDate(today, "YYYY-MM-DD"),
    status: "paid",
    total: 3845.56,
    paymentMethod: "card",
    productCount: 7,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
      { name: "Canasta de Durazno", price: 55, quantity: 1 },
      { name: "Nostalgia de Manzana", price: 50, quantity: 2 },
    ],
  },
  {
    id: 513539,
    customerFullName: "Julian Brandt",
    createdAt: formatDate(tomorrow, "YYYY-MM-DD"),
    deliveryDate: formatDate(tomorrow, "YYYY-MM-DD"),
    status: "paid",
    total: 2845.56,
    paymentMethod: "card",
    productCount: 5,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      { name: "Canasta de Durazno", price: 55, quantity: 1 },
    ],
  },
  {
    id: 513540,
    customerFullName: "Justin Bieber",
    createdAt: formatDate(tomorrow, "YYYY-MM-DD"),
    deliveryDate: formatDate(tomorrow, "YYYY-MM-DD"),
    status: "open",
    total: 845.56,
    paymentMethod: "cash",
    productCount: 1,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
    ],
  },
  {
    id: 513541,
    customerFullName: "Carlos Oppenheimer",
    createdAt: formatDate(tomorrow, "YYYY-MM-DD"),
    deliveryDate: formatDate(tomorrow, "YYYY-MM-DD"),
    status: "open",
    total: 1235.52,
    paymentMethod: "card",
    productCount: 2,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
  {
    id: 513542,
    customerFullName: "Marcel Ruiz",
    createdAt: formatDate(addDays(today, 2), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 2), "YYYY-MM-DD"),
    status: "open",
    total: 2456.88,
    paymentMethod: "cash",
    productCount: 3,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
    ],
  },
  {
    id: 513543,
    customerFullName: "Jesús Gallardo",
    createdAt: formatDate(addDays(today, 2), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 2), "YYYY-MM-DD"),
    status: "open",
    total: 1256.74,
    paymentMethod: "card",
    productCount: 2,
    items: [
      {
        name: "Chocolatin",
        price: 40,
        quantity: 2,
        img: "/images/chocolatin.webp",
      },
    ],
  },
  {
    id: 513544,
    customerFullName: "Vasco Aguirre",
    createdAt: formatDate(addDays(today, 3), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 3), "YYYY-MM-DD"),
    status: "open",
    total: 2845.56,
    paymentMethod: "cash",
    productCount: 2,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
  {
    id: 513545,
    customerFullName: "Julión Álvarez",
    createdAt: formatDate(addDays(today, 4), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 4), "YYYY-MM-DD"),
    status: "open",
    total: 2845.56,
    paymentMethod: "cash",
    productCount: 2,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
  {
    id: 513546,
    customerFullName: "Checo Pérez",
    createdAt: formatDate(addDays(today, 5), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 5), "YYYY-MM-DD"),
    status: "open",
    total: 2845.56,
    paymentMethod: "card",
    productCount: 2,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
  {
    id: 513547,
    customerFullName: "Franco Romero",
    createdAt: formatDate(addDays(today, 6), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 6), "YYYY-MM-DD"),
    status: "open",
    total: 2845.56,
    paymentMethod: "card",
    productCount: 2,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
  {
    id: 513548,
    customerFullName: "David Batsuayi",
    createdAt: formatDate(addDays(today, 7), "YYYY-MM-DD"),
    deliveryDate: formatDate(addDays(today, 7), "YYYY-MM-DD"),
    status: "open",
    total: 542.56,
    paymentMethod: "",
    productCount: 2,
    items: [
      {
        name: "Croissant",
        price: 35,
        quantity: 1,
        img: "/images/croissant.jpg",
      },
      { name: "Pan Francés", price: 85, quantity: 1 },
    ],
  },
];

function applyFilter(key, value, data, filters) {
  let filteredData = data;

  switch (key) {
    case "search":
      filteredData = filteredData.filter((data) =>
        data.customerFullName.toLowerCase().includes(value.toLowerCase())
      );
      break;
    case "start":
      if (Object.keys(filters).includes("end")) {
        filteredData = filteredData.filter(
          (data) =>
            convertStrToDate(value).getTime() <=
            convertStrToDate(data.deliveryDate).getTime()
        );
      } else {
        filteredData = filteredData.filter(
          (data) =>
            convertStrToDate(value).getTime() ===
            convertStrToDate(data.deliveryDate).getTime()
        );
      }
      break;
    case "end":
      filteredData = filteredData.filter(
        (data) =>
          convertStrToDate(data.deliveryDate).getTime() <=
          convertStrToDate(value).getTime()
      );
      break;
    case "status":
      if (value !== "all")
        filteredData = filteredData.filter((data) => data.status === value);
      break;
    case "sort": {
      const sortValues = Object.fromEntries(
        value.split(",").map((sortValue) => sortValue.split("."))
      );

      filteredData.sort((a, b) => {
        let comparison = 0;
        for (const sortKey in sortValues) {
          const valA = a[sortKey];
          const valB = b[sortKey];

          // console.log(`
          // valA: ${valA},
          // valB: ${valB},
          // sortKey: ${sortKey},
          //   `);

          const isAsc = sortValues[sortKey] === "asc";

          if (["total", "productCount"].includes(sortKey)) {
            comparison = valA - valB;
            comparison = isAsc ? comparison : -comparison;
            if (comparison !== 0) return comparison;
          } else if (sortKey === "customerFullName") {
            comparison = valA.localeCompare(valB);
            comparison = isAsc ? comparison : -comparison;
            if (comparison !== 0) return comparison;
          } else if (sortKey === "deliveryDate") {
            const dateValA = convertStrToDate(valA);
            const dateValB = convertStrToDate(valB);
            comparison = dateValA - dateValB;
            comparison = isAsc ? comparison : -comparison;
            if (comparison !== 0) return comparison;
          }
        }
      });

      break;
    }
    case "dateShortcut":
      break;
    default:
      console.error(`No filter with key '${key}'`);
      break;
  }

  return filteredData;
}

export function useTicketsData(searchParams) {
  const filters = Object.fromEntries(
    [...searchParams.entries()].map((entry) => [entry[0], entry[1]])
  );

  // "status" will be the last filter to apply
  if (Object.keys(filters).includes("status")) {
    const statusValue = filters.status;
    delete filters.status;
    filters.status = statusValue;
  }

  let filteredTicketsWithAllStatus = fakeTickets;
  let filteredTickets = fakeTickets;
  for (const key in filters) {
    if (key === "status") {
      // Copy the tickets after applying "status" filter
      // in order to get the count of tickets per status
      // with all the filters (except "status") applied
      filteredTicketsWithAllStatus = filteredTickets;
      filteredTickets = applyFilter(
        key,
        filters[key],
        filteredTickets,
        filters
      );
    } else {
      filteredTickets = applyFilter(
        key,
        filters[key],
        filteredTickets,
        filters
      );
      filteredTicketsWithAllStatus = filteredTickets;
    }
  }
  // If there is no 'sort' filter, then the default sort is
  // ASC by 'deliveryDate'
  if (!Object.keys(filters).includes("sort")) {
    filteredTicketsWithAllStatus = applyFilter(
      "sort",
      "deliveryDate.asc",
      filteredTicketsWithAllStatus,
      {}
    );
  }
  // console.log(filteredTickets);
  // console.log(filteredTicketsWithAllStatus);

  const statusCounts = filteredTicketsWithAllStatus.reduce(
    (acc, data) => {
      if (acc[data.status]) acc[data.status] += 1;
      else acc[data.status] = 1;
      acc["all"] += 1;
      return acc;
    },
    { all: 0 }
  );
  // console.log(statusCounts);

  return { filteredTickets, statusCounts };
}

export function getTicket(id) {
  const ticket = { ...fakeTickets.find((ticket) => ticket.id === id) };
  return ticket;
}
