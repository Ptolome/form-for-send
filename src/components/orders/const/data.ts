const statusLabels: Record<string, string> = {
  new: "Новая",
  processing: "В обработке",
  delivered: "Доставлено",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  processing: "bg-yellow-100 text-yellow-800",
  delivered: "bg-green-100 text-green-800",
};

const cargoTypeLabels: Record<string, string> = {
  documents: "Документы",
  fragile: "Хрупкое",
  regular: "Обычное",
};

const cargoTypeOptions = [
  { value: "all", label: "Все типы" },
  { value: "documents", label: "Документы" },
  { value: "fragile", label: "Хрупкое" },
  { value: "regular", label: "Обычное" },
];

export { statusLabels, statusColors, cargoTypeLabels, cargoTypeOptions };