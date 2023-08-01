'use client'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Badge,
    Box,
    Button, Divider,
    Heading, HStack,
    SimpleGrid,
    Spacer, Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure, useToast,
    VStack
} from "@chakra-ui/react";
import {useContext, useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import Navigation from "@/components/Navigation";
import {GlobalContext} from "@/components/LayoutContainer";

export default function Home() {
    const placeMap = {
        "체육시설": ['배드민턴장', '풋살장', '농구장', '테니스장', '야구장', '축구장', '탁구장', '당구장', '볼링장', '골프장', '수영장', '체육관', '기타'],
        "공간시설": ['회의실', '강당', '강의실', '연습실', '연수원', '세미나실', '스튜디오', '공연장', '기타'],
        "문화체험": ['미술관', '박물관', '도서관', '문화원', '문화센터', '문화체험관', '기타'],
        "교육강좌": ['어학원', '학원', '교습소', '기타'],
        "진료복지": ['병원', '의원', '약국', '기타'],
    }
    const placeAvailableAreas = {
        "배드민턴장": ["성동구", "광진구", "서초구"],
        "축구장": ["강서구", "구로구", "마포구", "영등포구", "용산구", "동작구", "서초구", "성동구", "강남구", "광진구", "송파구", "강동구"],
        "테니스장": ["강서구", "구로구", "마포구", "용산구", "동작구", "성북구", "동대문구", "성동구", "강남구", "송파구", "강동구"],
    }
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGym, setSelectedGym] = useState(null);
    const [accordionIndex, setAccordionIndex] = useState([0]);

    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = useRef()
    const {setIsReserved} = useContext(GlobalContext)
    const toast = useToast()

    useEffect(() => {
        if (selectedArea && selectedGym) {
            setAccordionIndex([2])
        } else if (selectedPlace) {
            setAccordionIndex([1])
        } else {
            setAccordionIndex([0])
        }
    }, [selectedPlace, selectedArea, selectedGym]);

    console.log(selectedArea, accordionIndex)
    return (
        <Box>
            <Navigation/>
            <Box bgImage={'url(/img/bg2.png)'} bgSize={'cover'} bgRepeat={'no-repeat'}>
                <VStack bg={'rgba(0,0,0,0.6)'} w={'100vw'} minH={'760px'} p={3} justifyContent={'center'}>
                    <Box h={'20px'}/> {/*spacer*/}
                    <Heading size={'md'} color={'white'}>다 같이 이용하는 공공서비스</Heading>
                    <Heading color={'white'}>DA-Gotchi</Heading>
                    <Badge rounded={'xl'} px={3}>Decentralized & Autonomous Reservation</Badge>
                    <Box w={'100%'} bg={'white'} rounded={'md'} mt={2}>
                        <Accordion index={accordionIndex}>
                            <AccordionItem bg={'#04a2a1'} borderTopRadius={'md'} border={0}>
                                <AccordionButton py={3} onClick={() => setAccordionIndex([0])}>
                                    <Box as="span" flex='1' textAlign='left' color={'white'}>
                                        1단계 | 서비스 선택 {selectedPlace && `> ${selectedPlace}`}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                                <AccordionPanel p={0} bg={'white'}>
                                    <Tabs>
                                        <TabList>
                                            {
                                                Object.keys(placeMap).map((placeKey) => (
                                                    <Tab key={placeKey} w={'20%'} px={'1'}>{placeKey}</Tab>))
                                            }
                                        </TabList>
                                        <TabPanels>
                                            {Object.values(placeMap).map((places, idx) => (
                                                <TabPanel key={idx}>
                                                    <SimpleGrid columns={3} spacing={2}>
                                                        {
                                                            places.map((place) => (
                                                                <Box key={place} onClick={() => setSelectedPlace(place)}
                                                                     fontWeight={selectedPlace === place ? 'bold' : 'normal'}
                                                                     color={selectedPlace === place ? 'teal' : 'black.600'}>{place}</Box>
                                                            ))
                                                        }
                                                    </SimpleGrid>
                                                </TabPanel>
                                            ))}
                                        </TabPanels>
                                    </Tabs>
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionButton py={3} onClick={() => setAccordionIndex([1])}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        2단계 | 지역 선택 {selectedArea && `> ${selectedArea} ${selectedGym ? `> ${selectedGym}`: ''}`}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <SimpleGrid columns={3} spacing={2}>
                                        {selectedPlace && placeAvailableAreas[selectedPlace] && placeAvailableAreas[selectedPlace].map((area) => (
                                            <Button key={area} onClick={() => setSelectedArea(area)}
                                                    colorScheme={'teal'}
                                                    variant={selectedArea === area ? 'solid' : 'outline'}>{area}</Button>
                                        ))}
                                    </SimpleGrid>
                                    {!selectedPlace && <Badge fontSize={'sm'}>이용하실 서비스를 먼저 선택해주세요</Badge>}
                                    {selectedArea && (
                                        <>
                                            <Divider my={2}/>
                                            <HStack>
                                                <Badge>4/5</Badge>
                                                <Text>장평테니스장 5번 코트</Text>
                                                <Spacer/>
                                                <Button onClick={() => setSelectedGym('장평테니스장')}>선택</Button>
                                            </HStack>
                                        </>
                                    )}
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem borderBottom={0}>
                                <AccordionButton py={3} onClick={() => setAccordionIndex([2])}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        3단계 | 일정 선택 {selectedDate && `> ${selectedDate.toLocaleDateString()}`}
                                    </Box>
                                    <AccordionIcon/>
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    {
                                        selectedArea && (
                                            <DatePicker
                                                selected={selectedDate || new Date()}
                                                onChange={(date) => setSelectedDate(date)}
                                                inline
                                                style={{border: 'solid 1px blue'}}
                                            />
                                        )
                                    }
                                    {!selectedPlace && <Badge fontSize={'sm'}>이용하실 서비스와 지역을 먼저 선택해주세요.</Badge>}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                    <Box id={'button_area'} mt={2}>
                        <Button onClick={onOpen}>예약하기</Button>
                    </Box>
                    <Spacer/>
                </VStack>
            </Box>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay/>

                <AlertDialogContent mx={5}>
                    <AlertDialogHeader>예약 신청내용 확인</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody>
                        <Text>아래 내용으로 예약을 신청하시겠습니까?</Text>
                        <Divider my={2}/>
                        <Text>서비스 : {selectedPlace}</Text>
                        <Text>지역 : {selectedArea}</Text>
                        <Text>시설 : {selectedGym}</Text>
                        <Text>일정 : {selectedDate && selectedDate.toLocaleDateString()}</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='teal' ml={3} onClick={() => {
                            setIsReserved(true)
                            toast({
                                title: '예약 신청 성공',
                                description: "예약신청이 완료되었습니다. 예약내역은 'MyPage'에서 확인하실 수 있습니다.",
                                status: 'success',
                                duration: 5000,
                                isClosable: true,
                            })
                            onClose()
                        }}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    )
}
