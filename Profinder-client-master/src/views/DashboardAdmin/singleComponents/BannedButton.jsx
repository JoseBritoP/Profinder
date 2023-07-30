/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/toast'
import { useBoolean } from '@chakra-ui/hooks'

export default function BannedButton ({ id, bannedFunction, getFunction, URL }) {
  const [loading, setLoading] = useBoolean()
  const toast = useToast()

  async function handleBannedAction () {
    setLoading.on()
    await bannedFunction(id)
    await getFunction(URL)
    setLoading.off()
    toast({
      title: 'Cuenta baneada',
      description: 'La cuenta ha sido desactivada',
      status: 'success',
      position: 'bottom-right',
      duration: 4000,
      isClosable: true
    })
  }

  return (
    <Button
      onClick={handleBannedAction}
      colorScheme='red'
      isLoading={loading}
    >
      Banear Cuenta
    </Button>
  )
}
