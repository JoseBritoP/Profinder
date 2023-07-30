/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/toast'
import { useBoolean } from '@chakra-ui/hooks'
import { useProfesionalDash } from '../../../services/zustand/useProfesionalDash'
import { URL } from '../constants'

export default function RemovPremiumButton ({ id }) {
  const [loading, setLoading] = useBoolean()
  const toast = useToast()
  const {
    postRemovePremium,
    getProfesional
  } = useProfesionalDash()

  async function handleActivePremium () {
    setLoading.on()
    await postRemovePremium(id)
    await getProfesional(URL.GET_PROFESIONAL)
    setLoading.off()
    toast({
      title: 'Premium desactivado',
      description: 'La cuenta ahora tiene el plan basico',
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
      colorScheme='pink'
      onClick={handleActivePremium}
      isLoading={loading}
    >
      Quitar Premium
    </Button>
  )
}
