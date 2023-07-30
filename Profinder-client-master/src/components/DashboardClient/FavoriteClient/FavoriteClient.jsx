import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '@chakra-ui/react'
import { Flex, Stack } from '@chakra-ui/layout';
import SupplierCard from '../../SupplierCard/SupplierCard';
import { getFavorites } from '../../../services/redux/actions/actions'; 

export default function FavoriteClient() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites); 
  // // console.log(favorites)
  useEffect(() => {
      dispatch(getFavorites());
  }, [dispatch]);
  // console.log(favorites)
  // console.log(favorites.map((fav)=> fav.id))
  return (
    <Stack mt={12} align='center' justify='center'>
      <Flex
        position='relative'
        align='center'
        justify='center'
        mt='-40px'
        wrap='wrap'
        gap={8}
        px={4}
        py={12}
        h='100%'
        overflowY='auto' 
      >
        {favorites.length > 0  ? 
        (
          favorites.map((favorite) => (
            <SupplierCard
              key={favorite.id}
              id={favorite.id}
              name={favorite.name}
              email={favorite.email}
              image={favorite.image}
              ubication={favorite.ubication}
              professions={favorite.professions}
              rating={favorite.rating}
              // Puedes pasar más propiedades necesarias para SupplierCard
            />
          ))
        ) 
       : (
          <Text> Agrega profesionales como favoritos para verlos aquí!</Text>
        )}
      </Flex>
    </Stack>
  );
}