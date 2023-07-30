/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/toast'
import { useBoolean } from '@chakra-ui/hooks'

export default function UnbannedButton ({ id, bannedFunction, getFunction, URL }) {
  const [loading, setLoading] = useBoolean()
  const toast = useToast()

  async function handleUnbannedAction () {
    setLoading.on()
    await bannedFunction(id)
    await getFunction(URL)
    setLoading.off()
    toast({
      title: 'Cuenta activada',
      description: 'La cuenta ha sido restaurada',
      status: 'success',
      position: 'bottom-right',
      duration: 4000,
      isClosable: true
    })
  }

  return (
    <Button
      size='sm'
      variant='solid'
      colorScheme='messenger'
      onClick={handleUnbannedAction}
      isLoading={loading}
    >
      Activar Cuenta
    </Button>
  )
}
