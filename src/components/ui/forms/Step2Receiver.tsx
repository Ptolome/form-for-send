'use client';

import  { FC, FormEvent, useState } from 'react';
import { z } from 'zod';
import { receiverSchema } from '@lib/schemas/validation';
import type { ReceiverInfo } from '@lib/types';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

interface Step2ReceiverProps {
  initialData: ReceiverInfo;
  senderCity: string;
  onUpdate: (data: Partial<ReceiverInfo>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];

const cargoTypeOptions = [
  { value: 'documents', label: 'Документы' },
  { value: 'fragile', label: 'Хрупкое' },
  { value: 'regular', label: 'Обычное' },
];

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
    
    try {
      const dataWithValidation = {
        ...initialData,
        _senderCity: senderCity,
      };
      
      receiverSchema.parse(initialData);

      if (initialData.city === senderCity) {
        setErrors({ city: 'Город назначения не может совпадать с городом отправления' });
        return;
      }
      
      setErrors({});
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Информация о получателе и посылке</h2>
      
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
          onChange={(e) => onUpdate({ city: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Выберите город</option>
          {CITIES.filter(city => city !== senderCity).map((city) => (
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
          onChange={(e) => onUpdate({ cargoType: e.target.value as any })}
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
        onChange={(e) => onUpdate({ weight: parseFloat(e.target.value) || 0.1 })}
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