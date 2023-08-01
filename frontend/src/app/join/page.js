'use client'
import Navigation from "@/components/Navigation";
import {
    Button,
    Divider,
    Heading,
    Input,
    Image,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack, useDisclosure, useToast
} from "@chakra-ui/react";
import {useState} from "react";
import Link from "next/link";

export default function join() {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [hasKyc, setHasKyc] = useState(false);

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
                <Button w={'100%'} borderRadius={0} border={'0.5px gray solid'} isDisabled={hasKyc} onClick={onOpen}>
                    {hasKyc ? '본인인증 완료' : '본인인증 하기'}
                </Button>
                <Button w={'100%'} mt={3} isDisabled={!hasKyc}>
                    <Link href={'/login'} onClick={() => {
                        toast({
                        title: '회원가입이 완료되었습니다.',
                        description: "로그인 후 예약서비스 이용이 가능합니다.",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })}}>
                    {hasKyc ? '가입하기' : '본인인증을 완료해주세요'}
                    </Link>
                </Button>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent maxW={'96vw'}>
                    <ModalHeader>본인인증</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody p={0} onClick={() => {
                        setHasKyc(true);
                        onClose()
                    }}>
                        <Image src={'/img/kyc.png'}></Image>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}