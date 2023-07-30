/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, lazy, Suspense } from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, SimpleGrid, Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Spinner } from '@chakra-ui/spinner'
import { CLIENT } from '../../constants'
import { useClientDash } from '../../../../services/zustand/useClientDash'
const FiltersClient = lazy(() => import('../FiltersDashboard/FiltersClient'))
const UserRegisterClient = lazy(() => import('../../singleComponents/UserRegisterClient'))
const NoResults = lazy(() => import('../../../../singleComponents/NoResults'))

export default function UsersTable () {
  const {
    client,
    getClients,
    countResults,
    getCountsGraphic
  } = useClientDash(state => state)

  const bgElement = useColorModeValue('white', 'gray.800')
  const txtColor = useColorModeValue('gray.600', 'gray.100')
  const bgAccent = useColorModeValue('gray.100', 'gray.700')

  useEffect(() => {
    getClients(CLIENT.GET_CLIENTS)
  }, [])

  useEffect(() => {
    countResults(client.length)
    getCountsGraphic()
  }, [client])

  return (
    <Flex // Container tabla
      w='full'
      alignItems='center'
      justifyContent='center'
    >
      <Stack // Tabla
        direction={{
          base: 'column'
        }}
        w='full'
        bg={bgElement}
        shadow='lg'
      >
        <Suspense fallback={<Skeleton startColor='gray.200' height='80px' />}>
          <FiltersClient />
        </Suspense>
        <SimpleGrid // Encabezado tabla
          spacingY={3}
          columns={{
            base: 1,
            md: 4
          }}
          w={{
            base: 120,
            md: 'full'
          }}
          textTransform='uppercase'
          bg={bgAccent}
          color={txtColor}
          py={{
            base: 1,
            md: 4
          }}
          px={{
            base: 2,
            md: 10
          }}
          visibility={{
            base: 'hidden',
            md: 'visible'
          }}
          fontSize='md'
        >
          <span>Foto</span>
          <span>Nombre</span>
          <span>correo electronico</span>
        </SimpleGrid>
        {
            (client.length !== 0)
              ? (
                  client.map(({ id, name, email, image, active, softDelete }) => {
                    return (
                      <Suspense key={id} fallback={<Skeleton startColor='gra.200' height='40px' />}>
                        <UserRegisterClient
                          key={id}
                          id={id}
                          name={name}
                          email={email}
                          image={image}
                          active={active}
                          softDelete={softDelete}
                        />
                      </Suspense>
                    )
                  })
                )
              : (
                <Suspense fallback={<Spinner />}>
                  <NoResults />
                </Suspense>
                )
          }
      </Stack>
    </Flex>
  )
}
