'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOrders } from '../../context/OrdersContext';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import type { Order } from '../../lib/types';

interface OrderCardProps {
  order: Order;
}

const statusLabels: Record<string, string> = {
  new: 'Новая',
  processing: 'В обработке',
  delivered: 'Доставлено',
};

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  processing: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800',
};

const cargoTypeLabels: Record<string, string> = {
  documents: 'Документы',
  fragile: 'Хрупкое',
  regular: 'Обычное',
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { deleteOrder } = useOrders();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteOrder(order.id);
    setIsDeleteDialogOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
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