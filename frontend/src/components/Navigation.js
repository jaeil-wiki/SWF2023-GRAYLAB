'use client'
import {Box, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import Link from "next/link";
import {useState} from "react";

export default function Navigation() {
    const searchParams = new URLSearchParams(window.location.search);
    const [isLoggedIn, setIsLoggedIn] = useState(searchParams.get('isLoggedIn') === 'true' || false);
    console.log(isLoggedIn);
    return (
        <>
            <HStack id='top_navigation' h={'40px'} p={2}>
                <Image src="/img/logo_seoulsi.png" alt="Seoul Si"/>
                <Spacer/>
                {
                    isLoggedIn ?
                        <Link href={'/my?isLoggedIn=true'}><Box>MyPage</Box></Link> :
                        <>
                            <Link href={'/login'}><Box>로그인</Box></Link>
                            <Link href={'/join'}><Box mr={1}>회원가입</Box></Link>
                        </>
                }

            </HStack>
            <Flex id='bottom_navigation' bg={'#3f8ce2'} h={'60px'} alignItems={'center'} justifyContent={'center'}>
                <Link href={`/?isLoggedIn=${isLoggedIn}`}>
                    <HStack>
                    <Image src="/img/logo_dagotchi.png" alt="DA-GOTCHI" h={'32px'}/>
                        <Text color={'white'}>{' '}X{' '}</Text>
                    <Image src="/img/logo_m.png" alt="DA-GOTCHI" h={'32px'}/>
                    </HStack>
                </Link>
            </Flex>
        </>
    )
}