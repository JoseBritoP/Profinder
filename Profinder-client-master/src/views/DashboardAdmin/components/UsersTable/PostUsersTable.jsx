/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, Suspense } from 'react'
import { Flex } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Spinner } from '@chakra-ui/spinner'
const PostRegister = lazy(() => import('../../singleComponents/PostRegister'))
const NoResults = lazy(() => import('../../../../singleComponents/NoResults'))

export default function PostUsersTable ({ posts }) {
  const bgColor = useColorModeValue('gray.100', 'gray.900')

  return (
    <Flex // container principal
      bg={bgColor}
      wrap='wrap'
      p='1rem'
      gap={5}
      w='full'
      alignItems='center'
      justifyContent='center'
    >
      {
        (posts.length !== 0)
          ? (
              posts.map(({ id, title, image, content, softDelete }) => {
                return (
                  <Suspense key={id} fallback={<Skeleton startColor='gray.200' height='150px' />}>
                    <PostRegister
                      key={id}
                      title={title}
                      image={image}
                      content={content}
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
    </Flex>
  )
}
