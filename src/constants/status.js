import {
  HiOutlineBookmarkSquare,
  HiOutlineBookmark,
  HiOutlineBookmarkSlash,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

export const STATUS_OPTIONS = [
  {
    key: "all",
    label: { es: "Todos", en: "All", fr: "Tous" },
    icon: HiOutlineBookmarkSquare,
  },
  {
    key: "open",
    label: { es: "Abierto" },
    icon: HiOutlineBookmark,
  },
  {
    key: "paid",
    label: { es: "Pagado" },
    icon: HiOutlineCurrencyDollar,
  },
  {
    key: "closed",
    label: { es: "Cerrado" },
    icon: HiOutlineBookmarkSlash,
  },
];
