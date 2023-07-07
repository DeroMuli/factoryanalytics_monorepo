import React, { createContext, useContext } from "react";

const MockedContext = createContext(false);

export const IsMocked = () => {
  const isMocked = useContext(MockedContext);
  return isMocked;
};

const MockedorTestProvider = ({
  children,
  isMocked,
}: {
  children: React.ReactNode;
  isMocked: boolean;
}) => {
  return (
    <MockedContext.Provider value={isMocked}>{children}</MockedContext.Provider>
  );
};

export default MockedorTestProvider;
