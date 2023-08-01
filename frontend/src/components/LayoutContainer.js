'use client'
import {ChakraProvider} from "@chakra-ui/react";
import {createContext, useState} from "react";

export const GlobalContext = createContext({});

export default function LayoutContainer({children}) {
    const [isReserved, setIsReserved] = useState(false);
    return  (
        <ChakraProvider>
            <GlobalContext.Provider value={{
                isReserved, setIsReserved,
            }}>
            {children}
            </GlobalContext.Provider>
        </ChakraProvider>
    )
}