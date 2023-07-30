/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'

export default function DropdownMenu ({ titleMenu, menuItems, onClick }) {
  const colorMenuItem = useColorModeValue('gray.800', 'gra.300')
  return (
    <Menu >
      <MenuButton
      borderWidth="1px"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        bg={useColorModeValue('gray.100', 'gray.800')}
      >
        {titleMenu || 'Sin titulo'}
      </MenuButton>
      <MenuList>
        {
          (menuItems)
            ? (
                menuItems.map(({ name }) => {
                  return (
                    <MenuItem
                      key={name}
                      name={name}
                      color={colorMenuItem}
                      onClick={onClick}
                    >{name}
                    </MenuItem>
                  )
                })
              )
            : (
              <MenuItem color='gray.800'>Sin items</MenuItem>
              )
        }
      </MenuList>
    </Menu>
  )
}
