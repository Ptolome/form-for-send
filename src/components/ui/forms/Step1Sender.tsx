'use client';

import { FC, FormEvent, useState } from 'react';
import { senderSchema } from '@lib/schemas/validation';
import type { SenderInfo } from '@lib/types';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { z } from 'zod';

interface Step1SenderProps {
  initialData: SenderInfo;
  onUpdate: (data: Partial<SenderInfo>) => void;
  onNext: () => void;
}

const CITIES = ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'];

export const Step1Sender: FC<Step1SenderProps> = ({
  initialData,
  onUpdate,
  onNext,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    try {
      senderSchema.parse(initialData);
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
      <h2 className="text-xl font-semibold mb-6">Информация об отправителе</h2>
      
      <Input
        label="Имя"
        value={initialData.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        error={errors.name}
        required
      />
      
      <Input
        label="Телефон"
        value={initialData.phone}
        onChange={(e) => onUpdate({ phone: e.target.value })}
        placeholder="+71234567890"
        error={errors.phone}
        required
      />
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Город отправления
        </label>
        <select
          value={initialData.city}
          onChange={(e) => onUpdate({ city: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Выберите город</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit">Далее</Button>
      </div>
    </form>
  );
};