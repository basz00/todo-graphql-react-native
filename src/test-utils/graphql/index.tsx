import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";
import { ReactNode } from "react";

export const createMockGraphQLWrapper = (
  mockedProviderProps: MockedProviderProps
) => {
  return ({ children }: { children: ReactNode }) => (
    <MockedProvider {...mockedProviderProps}>{children}</MockedProvider>
  );
};
