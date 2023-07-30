/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { ButtonGroup } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Flex, SimpleGrid } from '@chakra-ui/layout'
import { useClientDash } from '../../../services/zustand/useClientDash'
import { CLIENT } from '../constants'
import NoPhoto from '../../../assets/defaultImages/sinfoto.webp'
import BannedButton from './BannedButton'
import UnbannedButton from './UnbannedButton'

export default function UserRegister ({ id, name, email, image, softDelete }) {
  const {
    getClients,
    postBannedClient,
    postUnbannedClient
  } = useClientDash(state => state)

  const bgElement = useColorModeValue('white', 'gray.800')

  return (
    <Flex // Elemento tabla
      direction={{
        base: 'row',
        md: 'column'
      }}
      bg={bgElement}
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
        <Flex>
          {email}
        </Flex>
        <Flex
          justify={{
            md: 'end'
          }}
        >
          <ButtonGroup variant='solid' size='sm' spacing={3}>
            {
              (softDelete === true)
                ? <UnbannedButton
                    id={id}
                    bannedFunction={postUnbannedClient}
                    getFunction={getClients}
                    URL={CLIENT.GET_CLIENTS}
                  />
                : (softDelete === false || softDelete === null)
                    ? <BannedButton
                        id={id}
                        bannedFunction={postBannedClient}
                        getFunction={getClients}
                        URL={CLIENT.GET_CLIENTS}
                      />
                    : null
            }
          </ButtonGroup>
        </Flex>
      </SimpleGrid>
    </Flex>
  )
}
