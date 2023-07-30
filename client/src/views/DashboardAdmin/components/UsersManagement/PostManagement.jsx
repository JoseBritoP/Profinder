/* eslint-disable react-hooks/exhaustive-deps */
import { Heading, Stack } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import { useEffect } from 'react'
import { usePostDash } from '../../../../services/zustand/usePostDash'
import PostUsersTable from '../UsersTable/PostUsersTable'

export default function PostManagement () {
  const txtColor = useColorModeValue('gray.600', 'gray.100')
  const {
    postsActive,
    postsDeleted,
    getPostsActive,
    getPostsDeleted
  } = usePostDash(state => state)

  useEffect(() => {
    getPostsActive()
    getPostsDeleted()
  }, [])

  return (
    <Stack>
      <Heading
        color={txtColor}
        mb='2rem'
      >
        Gestion de posteos
      </Heading>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Posteos Activos</Tab>
          <Tab>Posteos Borrados</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PostUsersTable posts={postsActive} />
          </TabPanel>
          <TabPanel>
            <PostUsersTable posts={postsDeleted} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
