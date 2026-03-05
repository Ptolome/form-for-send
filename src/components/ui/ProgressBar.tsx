import type { Step } from "@lib/types";
import { FC } from "react";

interface ProgressBarProps {
  currentStep: Step;
  steps: string[];
}

export const ProgressBar: FC<ProgressBarProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="hidden sm:flex items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium
                    ${isCompleted ? "bg-blue-600 text-white" : ""}
                    ${isActive ? "bg-blue-600 text-white ring-4 ring-blue-100" : ""}
                    ${!isActive && !isCompleted ? "bg-gray-200 text-gray-600" : ""}
                  `}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <span
                  className={`
                    mt-2 text-sm whitespace-nowrap
                    ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}
                  `}
                >
                  {step}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    h-1 flex-1 mx-4
                    ${stepNumber < currentStep ? "bg-blue-600" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="sm:hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Шаг {currentStep} из {steps.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {steps[currentStep - 1]}
          </span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`
                flex-1 h-2 rounded-full transition-all duration-300
                ${index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-200"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
