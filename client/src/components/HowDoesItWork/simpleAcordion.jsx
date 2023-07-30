'use client'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Text,
    Container,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'

export default function SimpleAccordion({ acordionColor, textAcordionColor }) {
    return (
        <Container margin="0 auto" top="1%">
            <Accordion allowMultiple width="100%" maxW="lg" bg={acordionColor} rounded="lg">
                <AccordionItem>
                    <AccordionButton
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={4}
                        _hover={{ bg: 'gray.100' }}
                        color="gray.800">
                        <Text fontSize="md" color={textAcordionColor}>
                            ¿Cómo obtengo premium?
                        </Text>
                        <ChevronDownIcon fontSize="24px" />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Text color={textAcordionColor}>
                            Para obtener premium debes registrarte como profesional y adquirir el plan.
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={4}
                        _hover={{ bg: 'gray.100' }}
                        color="gray.800">
                        <Text fontSize="md " color={textAcordionColor}>¿Que beneficios tendré?</Text>
                        <ChevronDownIcon fontSize="24px" />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Text color={textAcordionColor}>
                            Al obtener el plan Premium, obtendrás una experiencia excepcional que hará que te destaques entre los demás. ¿Quieres conocer más de los increíbles beneficios que te esperan? ¡Regístrate ahora y descúbrelos!
                        </Text>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Container >
    )
}