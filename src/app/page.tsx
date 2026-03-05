'use client';

import { useFormStepper } from '../lib/hooks/useFormStepper';
import { useOrders } from '../context/OrdersContext';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Step1Sender } from '@components/ui/forms/Step1Sender';
import { Step2Receiver } from '@components/ui/forms/Step2Receiver';
import { Step3Confirm } from '@components/ui/forms/Step3Confirm';

import { useRouter } from 'next/navigation';

const STEPS = ['Отправитель', 'Получатель', 'Подтверждение'];

export default function Home() {
  const router = useRouter();
  const { currentStep, formData, updateSender, updateReceiver, goToNextStep, goToPrevStep, resetForm } = useFormStepper();
  const { addOrder } = useOrders();

  const handleSubmit = () => {
    addOrder(formData);
    resetForm();
    router.push('/orders');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProgressBar currentStep={currentStep} steps={STEPS} />
          
          {currentStep === 1 && (
            <Step1Sender
              initialData={formData.sender}
              onUpdate={updateSender}
              onNext={goToNextStep}
            />
          )}
          
          {currentStep === 2 && (
            <Step2Receiver
              initialData={formData.receiver}
              senderCity={formData.sender.city}
              onUpdate={updateReceiver}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}
          
          {currentStep === 3 && (
            <Step3Confirm
              formData={formData}
              onPrev={goToPrevStep}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </main>
  );
}