"use client";

import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@lib/hooks/useLocalStorage";
import type { Order, OrderFormData, CargoType } from "@/types";

interface OrdersContextType {
  orders: Order[];
  addOrder: (orderData: OrderFormData) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
  searchOrders: (query: string) => Order[];
  filterByCargoType: (type: CargoType | "all") => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useLocalStorage<Order[]>("orders", []);

  const addOrder = useCallback(
    (orderData: OrderFormData) => {
      const newOrder: Order = {
        id: Date.now().toString(),
        sender: orderData.sender,
        receiver: orderData.receiver,
        createdAt: new Date().toISOString(),
        status: "new",
      };

      setOrders((prev) => [newOrder, ...prev]);
    },
    [setOrders],
  );

  const deleteOrder = useCallback(
    (id: string) => {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    },
    [setOrders],
  );

  const getOrder = useCallback(
    (id: string) => {
      return orders.find((order) => order.id === id);
    },
    [orders],
  );

  const searchOrders = useCallback(
    (query: string) => {
      if (!query.trim()) return orders;

      const lowercaseQuery = query.toLowerCase();
      return orders.filter(
        (order) =>
          order.receiver.name.toLowerCase().includes(lowercaseQuery) ||
          order.receiver.city.toLowerCase().includes(lowercaseQuery),
      );
    },
    [orders],
  );

  const filterByCargoType = useCallback(
    (type: CargoType | "all") => {
      if (type === "all") return orders;
      return orders.filter((order) => order.receiver.cargoType === type);
    },
    [orders],
  );

  return (
    <OrdersContext
      value={{
        orders,
        addOrder,
        deleteOrder,
        getOrder,
        searchOrders,
        filterByCargoType,
      }}
    >
      {children}
    </OrdersContext>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
