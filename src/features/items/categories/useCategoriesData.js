const fakeCategories = [
  {
    id: 1,
    name: "Favoritos",
    count: 5,
    items: [
      {
        id: 1,
        name: "Chocolatin",
        price: 40,
        img: "/images/chocolatin.webp",
      },
      {
        id: 2,
        name: "Croissant",
        price: 35,
        img: "/images/croissant.jpg",
      },
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 2,
    name: "Temporada",
    count: 5,
    items: [
      {
        id: 11,
        name: "Rol Canela",
        price: 55,
        img: "",
      },
      {
        id: 12,
        name: "Mazapan",
        price: 55,
        img: "",
      },
      {
        id: 13,
        name: "Chocoflan",
        price: 12,
        img: "",
      },
      {
        id: 14,
        name: "Hotcake",
        price: 42,
        img: "",
      },
      {
        id: 15,
        name: "Buñuelo",
        price: 35,
        img: "",
      },
    ],
  },
  {
    id: 3,
    name: "Fiesta",
    count: 2,
    items: [
      {
        id: 7,
        name: "Negrito",
        price: 55,
        img: "",
      },
      {
        id: 8,
        name: "Chocorrol",
        price: 55,
        img: "",
      },
      {
        id: 9,
        name: "Chapata",
        price: 55,
        img: "",
      },
    ],
  },
  {
    id: 4,
    name: "Desayuno",
    count: 2,
    items: [
      {
        id: 14,
        name: "Hotcake",
        price: 42,
        img: "",
      },
      {
        id: 17,
        name: "Waffle",
        price: 42,
        img: "",
      },
    ],
  },
  {
    id: 5,
    name: "Navidad",
    count: 2,
    items: [
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 6,
    name: "Happy Season",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 7,
    name: "Halloween",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 8,
    name: "Independencia México",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 9,
    name: "Verano",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 10,
    name: "Invierno",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 11,
    name: "Otoño",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 12,
    name: "Universo",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
  {
    id: 14,
    name: "Mundial",
    count: 3,
    items: [
      {
        id: 3,
        name: "Pan Francés",
        price: 85,
        img: "/images/pan_frances.jpeg",
      },
      {
        id: 4,
        name: "Nostalgia de Manzana",
        price: 50,
        img: "/images/nostalgia_manzana.jpg",
      },
      {
        id: 6,
        name: "Canasta de Durazno",
        price: 55,
        img: "/images/canasta_durazno.jpeg",
      },
    ],
  },
];

fakeCategories.sort((a, b) => {
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

export function getCategories(search) {
  let categories = fakeCategories;

  if (search && search !== "") {
    categories = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  // console.log(categories);

  return categories;
}

export function getCategoryField(id, field) {
  const category = { ...fakeCategories.find((category) => category.id === id) };

  if (field === "items") {
    let items = {};
    for (let i = 0; i < category.items.length; i++) {
      items[category.items[i].name] = {
        img: category.items[i].img,
        // price: category.items[i].price,
      };
    }

    return items;
  }

  return category[field];
}
