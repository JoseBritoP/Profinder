/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, lazy, Suspense } from 'react'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, SimpleGrid, Stack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Spinner } from '@chakra-ui/spinner'
import { URL } from '../../constants'
import { useProfesionalDash } from '../../../../services/zustand/useProfesionalDash'
const FiltersDashboard = lazy(() => import('../FiltersDashboard/FiltersDashboard'))
const NoResults = lazy(() => import('../../../../singleComponents/NoResults.jsx'))
const UserRegister = lazy(() => import('../../singleComponents/UserRegister'))

export default function UsersTable () {
  const bgColor = useColorModeValue('white', 'gray.800')
  const bgAccent = useColorModeValue('gray.100', 'gray.700')
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  const {
    profesional,
    getProfesional,
    countResults,
    getCountsGraphic
  } = useProfesionalDash(state => state)

  useEffect(() => {
    getProfesional(URL.GET_PROFESIONAL)
  }, [])

  useEffect(() => {
    countResults(profesional.length)
    getCountsGraphic()
  }, [profesional])

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
        bg={bgColor}
        shadow='lg'
      >
        <Suspense fallback={<Skeleton startColor='gray.200' height='80px' />}>
          <FiltersDashboard />
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
          (profesional.length !== 0)
            ? (
                profesional.map(({ id, name, email, image, active, softDelete }) => {
                  return (
                    <Suspense key={id} fallback={<Skeleton startColor='gray.200' height='40px' />}>
                      <UserRegister
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
      </Stack>)
    </Flex>
  )
}
