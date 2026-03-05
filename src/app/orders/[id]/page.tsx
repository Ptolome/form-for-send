"use client";

import { useParams, useRouter } from "next/navigation";
import { useOrders } from "@/context/OrdersContext";
import { OrderDetails } from "@components/orders/OrderDetails";
import { Button } from "@components/ui/Button";
import Link from "next/link";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getOrder } = useOrders();

  const order = getOrder(params.id as string);

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Заявка не найдена</h1>
          <Link href="/orders">
            <Button>Вернуться к списку</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-4">
          <Button variant="secondary" onClick={() => router.back()}>
            ← Назад
          </Button>
        </div>
        <OrderDetails order={order} />
      </div>
    </main>
  );
}
