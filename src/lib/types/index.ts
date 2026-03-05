export type CargoType = 'documents' | 'fragile' | 'regular';

export type OrderStatus = 'new' | 'processing' | 'delivered';

export interface SenderInfo {
  name: string;
  phone: string;
  city: string;
}

export interface ReceiverInfo {
  name: string;
  city: string;
  cargoType: CargoType;
  weight: number;
}

export interface Order {
  id: string;
  sender: SenderInfo;
  receiver: ReceiverInfo;
  createdAt: string;
  status: OrderStatus;
}

export interface OrderFormData {
  sender: SenderInfo;
  receiver: ReceiverInfo;
}

export type Step = 1 | 2 | 3;