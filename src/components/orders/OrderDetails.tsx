"use client";

import { FC } from "react";
import type { Order } from "@/types";
import formatDate from "@/lib/utils/formData";
import { cargoTypeLabels, statusColors, statusLabels } from "./const/data";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">
          Детали заявки #{order.id.slice(-6)}
        </h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
        >
          {statusLabels[order.status]}
        </span>
      </div>

      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold mb-3">
            Информация об отправителе
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Имя</dt>
              <dd className="text-base font-medium">{order.sender.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Телефон</dt>
              <dd className="text-base font-medium">{order.sender.phone}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Город отправления</dt>
              <dd className="text-base font-medium">{order.sender.city}</dd>
            </div>
          </dl>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold mb-3">
            Информация о получателе
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Имя</dt>
              <dd className="text-base font-medium">{order.receiver.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Город назначения</dt>
              <dd className="text-base font-medium">{order.receiver.city}</dd>
            </div>
          </dl>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold mb-3">Информация о посылке</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Тип груза</dt>
              <dd className="text-base font-medium">
                {cargoTypeLabels[order.receiver.cargoType]}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Вес</dt>
              <dd className="text-base font-medium">
                {order.receiver.weight} кг
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">
            Дополнительная информация
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Дата создания</dt>
              <dd className="text-base font-medium">
                {formatDate(order.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">ID заявки</dt>
              <dd className="text-base font-medium text-gray-600">
                {order.id}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
