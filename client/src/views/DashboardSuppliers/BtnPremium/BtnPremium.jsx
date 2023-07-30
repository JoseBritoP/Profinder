import { Box, Button, useBreakpointValue } from "@chakra-ui/react";
import { useSessionState } from "../../../services/zustand/useSession";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const BtnPremium = () => {
  const user = useSessionState((state) => state.session);
  const profesionales = useSelector((state) => state.profesionales);
  const filteredActive = profesionales.filter((post) => post.id === user.id);

  // aca veo si hay usuario logueado
  const userExists = filteredActive.length > 0;
  // aca me quedo con la propiedad active
  const isActive = userExists && filteredActive[0].active;

  // responsive
  const fontSize = useBreakpointValue({ base: "16px", md: "20px", lg: "24px" });
  const paddingY = useBreakpointValue({ base: 2, md: 3, lg: 4 });

  return (
    <Box>
      {userExists && (
        <Box
          bg={isActive ? "green" : "steal"}
          color="white"
          p={3}
          mb={3}
          borderRadius="10px"
          fontSize={fontSize}
        >
          {!isActive ? (
            <Button
              as={Link}
              to="/dashboardSuppliers/pasarela"
              colorScheme="blue"
              leftIcon={<StarIcon />}

            >
              Obtén Plan Premium
            </Button>
          ) : (
            "Eres Premium"
          )}
        </Box>
      )}
    </Box>
  );
};

export default BtnPremium;
