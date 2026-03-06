"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useOrders } from "../../context/OrdersContext";
import { Dialog } from "@components/ui/Dialog";
import { Button } from "@components/ui/Button";
import formatDate from "@/lib/utils/formData";
import type { Order } from "@/types";
import { cargoTypeLabels, statusColors, statusLabels } from "./const/data";


interface OrderCardProps {
  order: Order;
}


export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { deleteOrder } = useOrders();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteOrder(order.id);
    setIsDeleteDialogOpen(false);
  };


  return (
    <>
      <Link href={`/orders/${order.id}`}>
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">От:</span>
                <span>{order.sender.city}</span>
                <span className="text-gray-400">→</span>
                <span className="font-medium">Куда:</span>
                <span>{order.receiver.city}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>Отправитель: {order.sender.name}</span>
                <span>Получатель: {order.receiver.name}</span>
                <span>Тип: {cargoTypeLabels[order.receiver.cargoType]}</span>
                <span>Вес: {order.receiver.weight} кг</span>
              </div>

              <div className="mt-2 text-xs text-gray-400">
                {formatDate(order.createdAt)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
              >
                {statusLabels[order.status]}
              </span>

              <Button
                variant="danger"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
              >
                Удалить
              </Button>
            </div>
          </div>
        </div>
      </Link>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Удаление заявки"
        message="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </>
  );
};
