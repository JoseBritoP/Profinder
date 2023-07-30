import { Button, HStack } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const Paginator = ({ currentPage, setCurrentPage, totalPages }) => {
  // Limitar la cantidad de botones
  const maxButtons = 50;
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons));
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  const nextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) return;
    setCurrentPage(nextPage);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const prevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 1) return;
    setCurrentPage(prevPage);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const generatePageButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key="prev"
        onClick={prevPage}
        disabled={currentPage === 1}
        colorScheme="teal"
        leftIcon={<ChevronLeftIcon />}
      ></Button>
    );

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      buttons.push(
        <Button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          colorScheme={currentPage === pageNumber ? "teal" : "gray"}
        >
          {pageNumber}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        onClick={nextPage}
        disabled={currentPage === totalPages}
        colorScheme="teal"
        rightIcon={<ChevronRightIcon />}
      ></Button>
    );

    return buttons;
  };

  return (
    <HStack
      spacing={2}
      mt={4}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      {generatePageButtons()}
    </HStack>
  );
};
export default Paginator;
