/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { ButtonGroup } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, SimpleGrid } from '@chakra-ui/layout'
import { useProfesionalDash } from '../../../services/zustand/useProfesionalDash'
import { URL } from '../constants'
import NoPhoto from '../../../assets/defaultImages/sinfoto.webp'
import ActivePremiumButton from './ActivePremiumButton'
import RemovePremiumButton from './RemovePremiumButton'
import BannedButton from './BannedButton'
import UnbannedButton from './UnbannedButton'

export default function UserRegister ({ id, name, email, image, active, softDelete }) {
  const bgColor = useColorModeValue('white', 'gray.800')

  const {
    getProfesional,
    postBannedProfesional,
    postUnbannedProfesional
  } = useProfesionalDash(state => state)

  return (
    <Flex // Elemento tabla
      direction={{
        base: 'row',
        md: 'column'
      }}
      bg={bgColor}
      key={id}
    >
      <SimpleGrid // Renglon tabla
        spacingY={3}
        columns={{
          base: 1,
          md: 3,
          lg: 4
        }}
        w='full'
        py={2}
        px={10}
      >
        {
        image
          ? <Avatar
              name='Dan Abrahmov'
              src={image ?? null}
            />
          : <Avatar
              name='Dan Abrahmov'
              src={NoPhoto}
            />
      }

        <span>{name}</span>
        <Flex
          noOfLines={1}
        >
          {email}
        </Flex>
        <Flex
          justify={{
            md: 'end'
          }}
        >
          <ButtonGroup variant='solid' size='sm' spacing={3}>
            {
              (active === true)
                ? <RemovePremiumButton id={id} />
                : (active === false || active === null)
                    ? <ActivePremiumButton id={id} />
                    : null
            }
            {
              (softDelete === true)
                ? <UnbannedButton
                    id={id}
                    bannedFunction={postUnbannedProfesional}
                    getFunction={getProfesional}
                    URL={URL.GET_PROFESIONAL}
                  />
                : (softDelete === false || softDelete === null)
                    ? <BannedButton
                        id={id}
                        bannedFunction={postBannedProfesional}
                        getFunction={getProfesional}
                        URL={URL.GET_PROFESIONAL}
                      />
                    : null
            }
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
    </Flex>
  )
}
