import { FormStep } from '@types';

export interface FormStepState {
  steps: FormStep[];
  currentStep: number;
  direction: 'next' | 'prev';
}

export interface FormStepAction {
  onNext: () => void;
  onPrev: () => void;
  setStep: (step: number) => void;
}

export type FormStepper = FormStepState & FormStepAction;
