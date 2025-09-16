import {
  HiOutlineUserCircle,
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineCube,
} from "react-icons/hi2";

export const SORT_OPTIONS = [
  {
    key: "customerFullName",
    label: { es: "Nombre cliente", en: "Customer name", fr: "nom client" },
    icon: HiOutlineUserCircle,
  },
  {
    key: "deliveryDate",
    label: { es: "Fecha de entrega" },
    icon: HiOutlineCalendarDays,
  },
  {
    key: "total",
    label: { es: "Precio total" },
    icon: HiOutlineCurrencyDollar,
  },
  {
    key: "productCount",
    label: { es: "Número de productos" },
    icon: HiOutlineCube,
  },
];
