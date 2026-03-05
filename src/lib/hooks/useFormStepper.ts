import { useState } from "react";
import type { Step, OrderFormData } from "../types";

const initialFormData: OrderFormData = {
  sender: {
    name: "",
    phone: "",
    city: "",
  },
  receiver: {
    name: "",
    city: "",
    cargoType: "regular",
    weight: 0.1,
  },
};

export function useFormStepper() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<OrderFormData>(initialFormData);

  const updateSender = (data: Partial<OrderFormData["sender"]>) => {
    setFormData((prev) => ({
      ...prev,
      sender: { ...prev.sender, ...data },
    }));
  };

  const updateReceiver = (data: Partial<OrderFormData["receiver"]>) => {
    setFormData((prev) => ({
      ...prev,
      receiver: { ...prev.receiver, ...data },
    }));
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return {
    currentStep,
    formData,
    updateSender,
    updateReceiver,
    goToNextStep,
    goToPrevStep,
    resetForm,
  };
}
