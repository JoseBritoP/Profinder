/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Flex, Heading, Stack } from '@chakra-ui/layout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useColorModeValue } from '@chakra-ui/react'
import { Doughnut } from 'react-chartjs-2'
import { useEffect } from 'react'
import { useProfesionalDash } from '../../../../services/zustand/useProfesionalDash'
import { getActualDate } from '../../constants'
import UsersTable from '../UsersTable/UsersTable'
import Statistic from '../../singleComponents/Statistic'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ProfesionalManagement () {
  const txtColor = useColorModeValue('gray.600', 'gray.100')

  const date = getActualDate()
  const {
    profesional,
    profesionalActive,
    profesionalBanned,
    profesionalPremium,
    profesionalPremiumActive,
    profesionalPremiumBanned
  } = useProfesionalDash(state => state.countsGraphic)
  const {
    getCountsGraphic
  } = useProfesionalDash(state => state)

  const data = {
    labels: [
      'Activos',
      'Baneados',
      'Premium Activos',
      'Premium Baneados'
    ],
    datasets: [{
      label: 'Total',
      data: [130, 8, 54, 6],
      backgroundColor: [
        '#48BB78',
        '#A0AEC0',
        '#805AD5',
        '#FAF089'
      ],
      hoverOffset: 4
    }]
  }

  useEffect(() => {
    getCountsGraphic()
  }, [profesional])

  return (
    <Container maxW='7xl'>
      <Stack
        align='center'
        justify='center'
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 10 }}
        direction={{
          base: 'column',
          md: 'column',
          lg: 'row'
        }}
      >
        <Stack // Contenedor stats
          flex={1}
          spacing={{ base: 5, md: 10 }}
          width={{ base: '100%', md: '50%' }}
          mt={{
            base: '-60px',
            md: '-20px'
          }}
        >
          <Heading
            size='lg'
            color={txtColor}
          >
            Profesionales
          </Heading>
          <Stack // bloque de stats
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Statistic
              label='Totales'
              number={profesional}
              helpText={date}
            />
            <Statistic
              label='Activos'
              number={profesionalActive}
              helpText={date}
            />
            <Statistic
              label='Baneados'
              number={profesionalBanned}
              helpText={date}
            />
          </Stack>
          <Heading
            size='lg'
            color={txtColor}
          >
            Profesionales Premium
          </Heading>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Statistic
              label='Totales'
              number={profesionalPremium}
              helpText={date}
            />
            <Statistic
              label='Activos'
              number={profesionalPremiumActive}
              helpText={date}
            />
            <Statistic
              label='Baneados'
              number={profesionalPremiumBanned}
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
              width: '400px',
              height: '400px'
            }}
          />
        </Flex>
      </Stack>
      <Heading
        color={txtColor}
      >
        Gestion de profesionales
      </Heading>
      <UsersTable />
    </Container>
  )
}
