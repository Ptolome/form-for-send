import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { OrdersProvider } from '../context/OrdersContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Доставка - Оформление заявок',
  description: 'Сервис для оформления заявок на доставку',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <OrdersProvider>
          {children}
        </OrdersProvider>
      </body>
    </html>
  );
}