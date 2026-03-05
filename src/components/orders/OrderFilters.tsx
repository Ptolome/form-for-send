'use client';

import React, { useState, useEffect, FC } from 'react';
import { Input } from '@components/ui/Input';
import type { CargoType } from '@lib/types';

interface OrderFiltersProps {
  onSearch: (query: string) => void;
  onFilterType: (type: CargoType | 'all') => void;
  selectedType: CargoType | 'all';
}

const cargoTypeOptions = [
  { value: 'all', label: 'Все типы' },
  { value: 'documents', label: 'Документы' },
  { value: 'fragile', label: 'Хрупкое' },
  { value: 'regular', label: 'Обычное' },
];

export const OrderFilters: FC<OrderFiltersProps> = ({
  onSearch,
  onFilterType,
  selectedType,
}) => {
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchInput);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, onSearch]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Поиск по имени получателя или городу..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="sm:w-48">
          <select
            value={selectedType}
            onChange={(e) => onFilterType(e.target.value as CargoType | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {cargoTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        Введите минимум 2 символа для поиска
      </div>
    </div>
  );
};