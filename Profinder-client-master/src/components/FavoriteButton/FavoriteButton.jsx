import { Button } from "@chakra-ui/react";
import { StarIcon, SmallCloseIcon } from "@chakra-ui/icons";

// eslint-disable-next-line react/prop-types
const FavoriteButton = ({isFavorite,onClick,isDisabled}) => {
  const buttonIcon = isFavorite ? <SmallCloseIcon /> : <StarIcon />;
  // console.log(onClick)
  return (
    <Button onClick={onClick} colorScheme={isFavorite ? "red" : "yellow"} maxW='1rem' maxH='2rem' isDisabled={isDisabled} >
      {buttonIcon}
    </Button>
  )
};

export default FavoriteButton;