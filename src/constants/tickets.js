export const TICKETS_OPERATIONS_HEIGHT = "12.1rem";

export const TICKET_PAYMENT_OPTIONS = [
  {
    key: "cash",
    db: "cash",
    label: { es: "Efectivo", en: "Cash" },
  },
  {
    key: "bankTransfer",
    db: "bank_transfer",
    label: { es: "Transferencia", en: "Bank Transfer" },
  },
];

export const TICKET_REQUIRED_FIELDS = ["customer", "date", "items"];

export const TICKET_DANGER_DAYS = 3;
