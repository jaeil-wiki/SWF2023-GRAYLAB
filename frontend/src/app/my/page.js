'use client'
import Navigation from "@/components/Navigation";
import {
    Avatar, Badge,
    Box,
    Button,
    Card,
    Divider,
    Heading,
    HStack, Image,
    Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Stack,
    Text, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {useContext} from "react";
import {GlobalContext} from "@/components/LayoutContainer";

export default function my() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isReserved} = useContext(GlobalContext);
    return (
        <>
            <Navigation/>
            <VStack spacing='1' px={3} py={5} mt={3} alignItems={'start'}>
                <Heading size='md'>마이페이지</Heading>
                <Box alignSelf={'center'} textAlign={'center'}>
                    <Avatar size='xl' name='복순' src='/img/boksoon.png'/>
                    <Heading size='sm' mt={3}>83세김복순할머니</Heading>
                </Box>
                <Input type='text' value={'boksoon1940 (본인인증 완료)'} disabled={true}/>
                <Divider my={2}/>
                <Heading size='sm'>신청한 예약</Heading>
                <Stack direction={'column'} w={'100%'}>
                    {isReserved &&
                        <Card w={'100%'} bg={'#f8f8f8'} p={'2'}>
                            <HStack>
                                <Text as={'b'}>(평일)장평테니스장</Text>
                                <Spacer/>
                                <Badge colorScheme={'orange'} size={'md'}>예약신청</Badge>
                            </HStack>
                            <Divider my={1}/>
                            <Box mb={1} color={'gray'}> 예약날짜 : 2023-08-30 09:00 ~ 11:00 </Box>
                            <Box mb={1} color={'gray'}> 당첨자공개 : 2023-08-06 11:00 </Box>
                            <Box mb={1} color={'gray'} fontWeight={"bold"}> 나의 당첨 확률 : 8 % (참여인원 : 6) </Box>
                            <HStack>
                                <Button flex={1}>신청취소</Button>
                            </HStack>
                        </Card>
                    }
                    <Card w={'100%'} bg={'#f8f8f8'} p={'2'}>
                        <HStack>
                            <Text as={'b'}>(평일)장평테니스장</Text>
                            <Spacer/>
                            <Badge colorScheme={'green'} size={'md'}>예약당첨</Badge>
                        </HStack>
                        <Divider my={1}/>
                        <Box mb={1} color={'gray'}> 예약날짜 : 2023-08-09 09:00 ~ 11:00 </Box>
                        <Box mb={1} fontWeight={"bold"}> 나의 당첨 확률 : 28.57% (참여인원 : 10) </Box>
                        <HStack>
                            <Button flex={1} onClick={onOpen}>예약확인</Button>
                            <Button flex={1}>예약취소</Button>
                        </HStack>
                    </Card>
                </Stack>
                <Divider my={2}/>
                <Heading size='sm'>이전 예약</Heading>
                <Stack direction={'column'} w={'100%'}>
                    <Card w={'100%'} bg={'#f8f8f8'} p={'2'}>
                        <HStack>
                            <Text as={'b'}>(평일)장평테니스장</Text>
                            <Spacer/>
                            <Badge colorScheme={'red'} size={'md'}>예약낙첨</Badge>
                        </HStack>
                        <Divider my={1}/>
                        <Box mb={1} color={'gray'}> 예약날짜 : 2023-07-19 09:00 ~ 11:00 </Box>
                        <Box mb={1} fontWeight={"bold"}> 나의 당첨 확률 : 20% (참여인원 : 13) </Box>
                    </Card>
                    <Card w={'100%'} bg={'#f8f8f8'} p={'2'}>
                        <HStack>
                            <Text as={'b'}>(평일)장평테니스장</Text>
                            <Spacer/>
                            <Badge colorScheme={'red'} size={'md'}>예약낙첨</Badge>
                        </HStack>
                        <Divider my={1}/>
                        <Box mb={1} color={'gray'}> 예약날짜 : 2023-07-12 09:00 ~ 11:00 </Box>
                        <Box mb={1} fontWeight={"bold"}> 나의 당첨 확률 : 18.18% (참여인원 : 10) </Box>
                    </Card>
                    <Card w={'100%'} bg={'#f8f8f8'} p={'2'}>
                        <HStack>
                            <Text as={'b'}>(평일)장평테니스장</Text>
                            <Spacer/>
                            <Badge colorScheme={'red'} size={'md'}>예약낙첨</Badge>
                        </HStack>
                        <Divider my={1}/>
                        <Box mb={1} color={'gray'}> 예약날짜 : 2023-06-07 09:00 ~ 11:00 </Box>
                        <Box mb={1} fontWeight={"bold"}> 나의 당첨 확률 : 10% (참여인원 : 10) </Box>
                    </Card>
                </Stack>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent maxW={'90vw'}>
                    <ModalHeader>예약확인</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody p={0} onClick={() => {
                        onClose()
                    }}>
                        <Divider mb={5}/>
                        <Image src={'/img/qr_ex.png'} w={'70%'} mx={'auto'} mb={5} py={5}></Image>
                        <Divider/>
                        <Box p={3} textAlign={'center'} fontWeight={'bold'}>
                            시설 이용 시 QR코드를 제시해주세요.
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}