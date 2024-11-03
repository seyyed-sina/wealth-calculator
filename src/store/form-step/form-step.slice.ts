import { StateCreator } from 'zustand';

import { FormStep as IFormStep } from '@types';

import { FormStepper, FormStepState } from './form-step.types';

const steps: IFormStep[] = [
  {
    id: 0,
    name: 'دارایی ها',
  },
  {
    id: 1,
    name: 'بدهی ها',
  },
  {
    id: 2,
    name: 'محاسبات',
  },
];

const initialState: FormStepState = {
  steps,
  currentStep: 0,
  direction: 'next',
};

export const createFormStepSlice: StateCreator<FormStepper> = (set) => ({
  ...initialState,
  onNext: () =>
    set((state) => {
      const nextStep = state.currentStep + 1;
      return {
        currentStep: nextStep < state.steps.length ? nextStep : state.steps.length - 1,
        direction: 'next',
      };
    }),
  onPrev: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
      direction: 'prev',
    })),
  setStep: (step) => set(() => ({ currentStep: step })),
});
