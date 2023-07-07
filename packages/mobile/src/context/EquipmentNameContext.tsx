import React, { createContext, useContext } from "react";

const EquipemtNameContext = createContext<string>("");

export const getEquipemntName = () => {
  const equipmentname = useContext(EquipemtNameContext);
  return equipmentname;
};

const EquipmentNameProvider = ({
  children,
  equipmentname,
}: {
  children: React.ReactNode;
  equipmentname: string;
}) => {
  return (
    <EquipemtNameContext.Provider value={equipmentname}>
      {children}
    </EquipemtNameContext.Provider>
  );
};

export default EquipmentNameProvider;
