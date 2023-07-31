'use client'
import {Box, Flex, HStack, Image, Spacer} from "@chakra-ui/react";
import Link from "next/link";

export default function Navigation() {
    return (
        <>
            <HStack id='top_navigation' h={'40px'} p={2}>
                <Link href={'/'}>
                    <Image src="/img/logo_seoulsi.png" alt="Seoul Si"/>
                </Link>
                <Spacer/>
                <Link href={'/login'}><Box>로그인</Box></Link>
                <Link href={'/join'}><Box>회원가입</Box></Link>
            </HStack>
            <Flex id='bottom_navigation' bg={'#3f8ce2'} h={'60px'} alignItems={'center'} justifyContent={'center'}>
                <Image src="/img/logo_m.png" alt="DA-GOTCHI" h={'32px'}/>
            </Flex>
        </>
    )
}