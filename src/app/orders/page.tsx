"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrders } from "@/context/OrdersContext";
import { OrderCard } from "@components/orders/OrderCard";
import { OrderFilters } from "@components/orders/OrderFilters";
import { Button } from "@components/ui/Button";
import type { CargoType } from "@lib/types";

export default function OrdersPage() {
  const { searchOrders, filterByCargoType } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<CargoType | "all">("all");

  const filteredOrders = filterByCargoType(selectedType);
  const searchedOrders = searchOrders(searchQuery);

  const displayedOrders = searchQuery ? searchedOrders : filteredOrders;

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">История заявок</h1>
          <Link href="/">
            <Button>Новая заявка</Button>
          </Link>
        </div>

        <OrderFilters
          onSearch={setSearchQuery}
          onFilterType={setSelectedType}
          selectedType={selectedType}
        />

        <div className="space-y-4">
          {displayedOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Заявки не найдены</p>
          ) : (
            displayedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
