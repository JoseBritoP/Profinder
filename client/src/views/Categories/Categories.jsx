/* eslint-disable react-hooks/exhaustive-deps */
import { Stack, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  cleanDetail,
  getAllSuppliers,
} from "../../services/redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import SupplierCardsContainer from "../../components/SupplierCardsContainer/SupplierCardsContainer";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import Paginator from "./../../components/Paginator/Paginator";
import styles from "./Categories.module.css";

const Categories = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const suppliers = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  const bgColor = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    dispatch(getAllSuppliers());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleSuppliers = suppliers.slice(startIndex, endIndex);

  return (
    <Stack className={styles.categoryContainer} bg={bgColor}>
      <FiltersPanel setCurrentPage={setCurrentPage} />
      <Paginator
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={Math.ceil(suppliers.length / itemsPerPage)}
      />
      <SupplierCardsContainer
        cards={visibleSuppliers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        visibleSuppliers={visibleSuppliers}
      />
    </Stack>
  );
};

export default Categories;
