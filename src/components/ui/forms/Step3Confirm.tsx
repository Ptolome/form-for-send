"use client";

import { FC, FormEvent, useState } from "react";
import type { OrderFormData } from "@/types";
import { Button } from "@components/ui/Button";
import { cargoTypeLabels } from "./const/data";

interface Step3ConfirmProps {
  formData: OrderFormData;
  onPrev: () => void;
  onSubmit: () => void;
}

export const Step3Confirm: FC<Step3ConfirmProps> = ({
  formData,
  onPrev,
  onSubmit,
}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isAgreed) {
      alert("Пожалуйста, подтвердите согласие с условиями");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    onSubmit();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Подтверждение заявки</h2>

      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Отправитель</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-500">Имя:</span>
            <span>{formData.sender.name}</span>
            <span className="text-gray-500">Телефон:</span>
            <span>{formData.sender.phone}</span>
            <span className="text-gray-500">Город:</span>
            <span>{formData.sender.city}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-700 mb-2">
            Получатель и посылка
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-gray-500">Имя:</span>
            <span>{formData.receiver.name}</span>
            <span className="text-gray-500">Город:</span>
            <span>{formData.receiver.city}</span>
            <span className="text-gray-500">Тип груза:</span>
            <span>{cargoTypeLabels[formData.receiver.cargoType]}</span>
            <span className="text-gray-500">Вес:</span>
            <span>{formData.receiver.weight} кг</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agreement"
          checked={isAgreed}
          onChange={(e) => setIsAgreed(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="agreement" className="text-sm text-gray-700">
          Я согласен с условиями обработки заявки
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="secondary" onClick={onPrev}>
          Назад
        </Button>
        <Button
          type="submit"
          disabled={!isAgreed || isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Отправка..." : "Отправить заявку"}
        </Button>
      </div>
    </form>
  );
};
