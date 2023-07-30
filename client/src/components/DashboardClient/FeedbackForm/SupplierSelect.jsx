import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  Code,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { getAllSuppliers } from "../../../services/redux/actions/actions";

const SupplierSelect = ({ onSupplierSelect }) => { // Agregamos la prop onSupplierSelect
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  // Transformando los datos de los proveedores al formato esperado por el Select
  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  // Función que se activa cuando se selecciona un proveedor
  const handleSupplierSelect = (selectedOption) => {
    setSelectedSupplier(selectedOption);
    console.log(selectedOption);
    onSupplierSelect(selectedOption ? selectedOption.value : null);
    console.log(selectedOption.value); // Pasamos el ID del proveedor a la función de devolución de llamada
  };

  return (
    <FormControl p={4}>
      <FormLabel>
        Busca por nombre el profesional que deseas valorar:
      </FormLabel>
      <Select
        options={supplierOptions}
        placeholder="Busca y selecciona un profesional..."
        isClearable
        onChange={handleSupplierSelect} // Usamos la función handleSupplierSelect
        value={selectedSupplier}
      />
    </FormControl>
  );
};

export default SupplierSelect;