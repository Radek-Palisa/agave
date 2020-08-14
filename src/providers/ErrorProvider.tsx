import React, { createContext, useState, useContext } from 'react';

type ErrorContextState = {
  title?: string;
  message?: string;
  additionalInfo?: string;
} | null;

const ErrorContext = createContext<
  [ErrorContextState, React.Dispatch<React.SetStateAction<ErrorContextState>>]
>([null, state => state]);

export const useError = () => useContext(ErrorContext);

type Props = {
  children: React.ReactNode;
};

export default function ErrorProvider({ children }: Props) {
  const state = useState<ErrorContextState>(null);
  return <ErrorContext.Provider value={state}>{children}</ErrorContext.Provider>;
}
