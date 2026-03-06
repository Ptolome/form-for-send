const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Новосибирск",
  "Екатеринбург",
];

const cargoTypeOptions = [
  { value: "documents", label: "Документы" },
  { value: "fragile", label: "Хрупкое" },
  { value: "regular", label: "Обычное" },
];

const cargoTypeLabels: Record<string, string> = {
  documents: "Документы",
  fragile: "Хрупкое",
  regular: "Обычное",
};

export { CITIES, cargoTypeOptions, cargoTypeLabels };