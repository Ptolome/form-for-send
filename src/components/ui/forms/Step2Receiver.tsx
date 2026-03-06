"use client";

import { FC, FormEvent, useState } from "react";
import { receiverSchema } from "./schemas/validation";
import type { CargoType, ReceiverInfo } from "@/types";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { cargoTypeOptions, CITIES } from "./const/data";

interface Step2ReceiverProps {
  initialData: ReceiverInfo;
  senderCity: string;
  onUpdate: (data: Partial<ReceiverInfo>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Receiver: FC<Step2ReceiverProps> = ({
  initialData,
  senderCity,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (initialData.city === senderCity) {
      setErrors({
        city: "Город назначения не может совпадать с городом отправления",
      });
      return;
    }

    const result = receiverSchema.safeParse(initialData);

    if (result.success) {
      setErrors({});
      onNext();
    } else {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(newErrors);
    }
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ city: e.target.value });
    if (errors.city) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.city;
        return newErrors;
      });
    }
  };

  const handleCargoTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ cargoType: e.target.value as CargoType });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onUpdate({ weight: isNaN(value) ? 0.1 : Math.max(0.1, Math.min(30, value)) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">
        Информация о получателе и посылке
      </h2>

      <Input
        label="Имя получателя"
        value={initialData.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        error={errors.name}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Город назначения
        </label>
        <select
          value={initialData.city}
          onChange={handleCityChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Выберите город</option>
          {CITIES.filter((city) => city !== senderCity).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Тип груза
        </label>
        <select
          value={initialData.cargoType}
          onChange={handleCargoTypeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {cargoTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Вес (кг)"
        type="number"
        step="0.1"
        min="0.1"
        max="30"
        value={initialData.weight}
        onChange={handleWeightChange}
        error={errors.weight}
        required
      />

      <div className="flex justify-between pt-4">
        <Button type="button" variant="secondary" onClick={onPrev}>
          Назад
        </Button>
        <Button type="submit">Далее</Button>
      </div>
    </form>
  );
};