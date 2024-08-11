// src/__mocks__/MockAuthProvider.tsx

import React, { ReactNode } from "react";
import {
  AuthContext,
  AuthContextType,
} from "../components/contexts/AuthContext";

interface MockAuthProviderProps {
  children: ReactNode;
  mockValue: AuthContextType;
}

const MockAuthProvider: React.FC<MockAuthProviderProps> = ({
  children,
  mockValue,
}) => {
  return (
    <AuthContext.Provider value={mockValue}>{children}</AuthContext.Provider>
  );
};

export default MockAuthProvider;
