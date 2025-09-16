const fakeCustomers = [
  { id: 1, fullName: "Lionel Messi" },
  { id: 2, fullName: "Mohammed Salah" },
  { id: 3, fullName: "Kevin de Bruyne" },
  { id: 4, fullName: "Thibaut Cortouis" },
  { id: 5, fullName: "Carlos Vela" },
  { id: 6, fullName: "Alexis Vega" },
  { id: 7, fullName: "Jesús Angulo" },
  { id: 8, fullName: "Rafael Márquez" },
  { id: 9, fullName: "Pedro Sola" },
  { id: 10, fullName: "Stephen Curry" },
  { id: 11, fullName: "Michael Jordan" },
  { id: 12, fullName: "Max Verstappen" },
  { id: 13, fullName: "Benito Ocasio" },
  { id: 14, fullName: "Tyler the Creator" },
];

fakeCustomers.sort((a, b) => {
  let comparison = 0;
  const valA = a["fullName"];
  const valB = b["fullName"];

  // console.log(`
  // valA: ${valA},
  // valB: ${valB},
  // sortKey: ${sortKey},
  //   `);

  const isAsc = true;
  comparison = valA.localeCompare(valB);
  comparison = isAsc ? comparison : -comparison;
  if (comparison !== 0) return comparison;
});

export function useCustomers(searchedCustomer) {
  if (!searchedCustomer) return fakeCustomers;

  // Instead of this line we have to use useQuery
  let filteredCustomers = fakeCustomers;
  filteredCustomers = filteredCustomers.filter((data) =>
    data.fullName.toLowerCase().includes(searchedCustomer.toLowerCase())
  );
  // console.log(filteredCustomers);

  return filteredCustomers;
}
