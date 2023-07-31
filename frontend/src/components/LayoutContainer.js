'use client'
import {ChakraProvider} from "@chakra-ui/react";

export default function LayoutContainer({children}) {
    return  (
        <ChakraProvider>
            {children}
        </ChakraProvider>
    )
}