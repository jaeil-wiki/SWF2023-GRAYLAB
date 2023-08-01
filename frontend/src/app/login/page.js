'use client'
import Navigation from "@/components/Navigation";
import {Button, Heading, HStack, Input, Text, VStack} from "@chakra-ui/react";
import {useContext} from "react";
import {GlobalContext} from "@/components/LayoutContainer";
import {redirect} from "next/navigation";

export default function Login() {
    const {setIsLoggedIn} = useContext(GlobalContext);
    const handleLogin = () => {
        window.location.replace('/?isLoggedIn=true')
    }
    return (
        <>
            <Navigation/>
            <VStack spacing='1' px={3} py={5} mt={3} alignItems={'start'}>
                <Heading size='md'>로그인</Heading>
                <Heading size='xs' mt={3}>아이디</Heading>
                <Input type='text' placeholder='아이디를 입력해주세요.'/>
                <Heading size='xs' mt={3}>패스워드</Heading>
                <Input type='password' placeholder='아이디를 입력해주세요.'/>
                <Button w={'100%'} mt={3} onClick={() => handleLogin()}>로그인</Button>
            </VStack>
            <HStack justifyContent={'center'} color={'gray'}>
                <Text as='u'>회원가입</Text>
                <Text as='u'>비밀번호 찾기</Text>
            </HStack>
        </>
    )

}