/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Flex, Heading, Stack } from '@chakra-ui/layout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useEffect } from 'react'
import { getActualDate } from '../../constants'
import { useClientDash } from '../../../../services/zustand/useClientDash'
import Statistic from '../../singleComponents/Statistic'
import ClientUsersTable from '../UsersTable/ClientUsersTable'
import { useColorModeValue } from '@chakra-ui/react'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ClientManagement () {
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  const date = getActualDate()
  const {
    clients,
    clientsActive,
    clientsBanned
  } = useClientDash(state => state.numbers)
  const { getCountsGraphic } = useClientDash(state => state)

  const data = {
    labels: [
      'Activos',
      'Baneados'
    ],
    datasets: [{
      label: 'Total',
      data: [122, 8],
      backgroundColor: [
        '#48BB78',
        '#A0AEC0'
      ],
      hoverOffset: 4
    }]
  }

  useEffect(() => {
    getCountsGraphic()
  }, [clients])

  return (
    <Container maxW='7xl'>
      <Stack
        align='center'
        justify='center'
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack // Contenedor stats
          flex={1}
          spacing={{ base: 5, md: 10 }}
          width={{ base: '100%', md: '50%' }}
        >
          <Heading
            size='lg'
            color={txtColor}
          >
            Clientes
          </Heading>
          <Stack // bloque de stats
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Statistic
              label='Totales'
              number={clients}
              helpText={date}
            />
            <Statistic
              label='Activos'
              number={clientsActive}
              helpText={date}
            />
            <Statistic
              label='Baneados'
              number={clientsBanned}
              helpText={date}
            />
          </Stack>
        </Stack>
        <Flex // contenedor tabla
          flex={1}
          direction='column'
          justify='center'
          align='center'
          position='relative'
          w='full'
        >
          <Doughnut
            data={data}
            style={{
              width: '370px',
              height: '370px'
            }}
          />
        </Flex>
      </Stack>
      <Heading
        color={txtColor}
      >
        Gestion de clientes
      </Heading>
      <ClientUsersTable />
    </Container>
  )
}
