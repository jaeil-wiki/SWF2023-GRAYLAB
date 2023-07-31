'use client'
import Navigation from "@/components/Navigation";
import {Button, Divider, Heading, HStack, Input, Text, VStack} from "@chakra-ui/react";

export default function join() {
    return (
        <>
            <Navigation/>
            <VStack spacing='1' px={3} py={5} mt={3} alignItems={'start'}>
                <Heading size='md'>회원가입</Heading>
                <Heading size='xs' mt={3}>아이디</Heading>
                <Input type='text' placeholder='아이디를 입력해주세요.'/>
                <Heading size='xs' mt={3}>패스워드</Heading>
                <Input type='password' placeholder='패스워드를 입력해주세요.'/>
                <Heading size='xs' mt={3}>패스워드 재확인</Heading>
                <Input type='password' placeholder='패스워드를 한번 더 입력해주세요.'/>
                <Divider/>
                <Button w={'100%'} borderRadius={0} border={'0.5px gray solid'}>
                    본인인증 하기
                </Button>
                <Button w={'100%'} mt={3}>가입하기</Button>
            </VStack>
        </>
    )
}