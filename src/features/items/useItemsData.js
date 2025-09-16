import { convertStrToCurrency } from "../../utils/helpers";

const fakeItems = [
  {
    id: 1,
    name: "Chocolatin",
    price: 40,
    cost: 8,
    categories: ["Favoritos"],
    img: "/images/chocolatin.webp",
  },
  {
    id: 2,
    name: "Croissant",
    price: 35,
    cost: 5,
    categories: ["Favoritos"],
    img: "/images/croissant.jpg",
  },
  {
    id: 3,
    name: "Pan Francés",
    price: 85,
    cost: 20,
    categories: ["Favoritos"],
    img: "/images/pan_frances.jpeg",
  },
  {
    id: 4,
    name: "Nostalgia de Manzana",
    price: 50,
    cost: 10,
    categories: ["Temporada"],
    img: "/images/nostalgia_manzana.jpg",
  },
  {
    id: 5,
    name: "Bolillo",
    price: 40,
    cost: 5,
    categories: [],
    img: "/images/bolillo.webp",
  },
  {
    id: 6,
    name: "Canasta de Durazno",
    price: 55,
    cost: 8,
    categories: ["Temporada"],
    img: "/images/canasta_durazno.jpeg",
  },
  {
    id: 7,
    name: "Negrito",
    price: 55,
    cost: 8,
    categories: [],
    img: "",
  },
  {
    id: 8,
    name: "Chocorrol",
    price: 55,
    cost: 8,
    categories: [],
    img: "",
  },
  {
    id: 9,
    name: "Chapata",
    price: 55,
    cost: 8,
    categories: [],
    img: "",
  },
  {
    id: 10,
    name: "Baguette",
    price: 55,
    cost: 8,
    categories: ["Temporada"],
    img: "/images/baguette.png",
  },
  {
    id: 11,
    name: "Rol de Canela",
    price: 55,
    cost: 12,
    categories: ["Favoritos"],
    img: "",
  },
  {
    id: 12,
    name: "Mazapan",
    price: 55,
    cost: 5,
    categories: ["Fiesta"],
    img: "",
  },
  {
    id: 13,
    name: "Chocoflan",
    price: 12,
    cost: 1,
    categories: ["Fiesta"],
    img: "",
  },
  {
    id: 14,
    name: "Hotcake",
    price: 42,
    cost: 10,
    categories: ["Desayuno"],
    img: "",
  },
  {
    id: 15,
    name: "Buñuelo",
    price: 35,
    cost: 15,
    categories: ["Navidad"],
    img: "",
  },
  {
    id: 16,
    name: "Rol Glaseado",
    price: 52,
    cost: 15,
    categories: [""],
    img: "",
  },
  {
    id: 17,
    name: "Waffle",
    price: 42,
    cost: 10,
    categories: ["Desayuno"],
    img: "",
  },
];

fakeItems.sort((a, b) => {
  let comparison = 0;
  const valA = a["name"];
  const valB = b["name"];

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

export function useItemsData(search, dropdown) {
  if (!search && dropdown === "Todos los productos") return fakeItems;

  // Instead of this logic use useQuery
  let filteredItems = fakeItems;
  if (search) {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filteredItems = filteredItems.filter((item) =>
      item.categories.includes(dropdown)
    );
  }
  // console.log(filteredItems);

  return filteredItems;
}

export function getItem(id) {
  // Elements returned by filter point to the same obj memory. So,
  // when price or cost are modified, the element in fakeItems
  // is also changed.
  // const item = fakeItems.filter((item) => item.id === id)[0];

  // This makes a copy of the found element. When price or cost are
  // changed, fakeItems element suffers no change.
  const item = { ...fakeItems.find((item) => item.id === id) };
  if (Object.keys(item).length === 0) return null;
  item.price = convertStrToCurrency(item.price);
  item.cost = convertStrToCurrency(item.cost);
  return item;
}

export function getCategories() {
  const categories = fakeItems.reduce((acc, item) => {
    item.categories.forEach((category) => acc.add(category));
    return acc;
  }, new Set());

  categories.delete("");
  // console.log(categories);

  return [...categories];
}
