'use client'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Badge,
    Box,
    Button,
    Heading,
    SimpleGrid,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack
} from "@chakra-ui/react";
import {useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import Navigation from "@/components/Navigation";

export default function Home() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <Box>
            <Navigation/>
            <Box bgImage={'url(/img/bg2.png)'} bgSize={'cover'} bgRepeat={'no-repeat'}>
            <VStack bg={'rgba(0,0,0,0.6)'} w={'100vw'} minH={'760px'} p={3} justifyContent={'center'}>
                <Box h={'48px'}>
                    {/*spacer*/}
                </Box>
                <Heading size={'md'} color={'white'}>다 같이 이용하는 공공서비스 예약 프로토콜</Heading>
                <Heading color={'white'}>DA-Gotchi</Heading>
                <Badge rounded={'xl'} px={3}> Decentralized & Autonomous Reservation</Badge>
                <Box w={'100%'} bg={'white'} rounded={'md'} mt={2}>
                    <Accordion defaultIndex={[0,1,2]}>
                        <AccordionItem bg={'#04a2a1'} borderTopRadius={'md'} border={0}>
                            <AccordionButton py={3}>
                                <Box as="span" flex='1' textAlign='left' color={'white'}>
                                    1단계 | 서비스 선택
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            <AccordionPanel p={0} bg={'white'}>
                                <Tabs>
                                    <TabList>
                                        <Tab w={'20%'} px={'1'}>체육시설</Tab>
                                        <Tab w={'20%'} px={'1'}>공간시설</Tab>
                                        <Tab w={'20%'} px={'1'}>문화체험</Tab>
                                        <Tab w={'20%'} px={'1'}>교육강좌</Tab>
                                        <Tab w={'20%'} px={'1'}>진료복지</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <SimpleGrid columns={3} spacing={2}>
                                                <Box>축구장</Box>
                                                <Box>풋살장</Box>
                                                <Box>족구장</Box>
                                                <Box>야구장</Box>
                                                <Box>테니스장</Box>
                                                <Box>농구장</Box>
                                                <Box>배구장</Box>
                                                <Box>다목적경기장</Box>
                                            </SimpleGrid>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>two!</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>three!</p>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <AccordionButton py={3}>
                                <Box as="span" flex='1' textAlign='left'>
                                    2단계 | 지역 선택
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <SimpleGrid columns={3} spacing={2}>
                                    <Button>은평구</Button>
                                    <Button>서대문구</Button>
                                    <Button>종로구</Button>
                                    <Button>성북구</Button>
                                    <Button>강북구</Button>
                                    <Button>도봉구</Button>
                                    <Button>노원구</Button>
                                    <Button>마포구</Button>
                                </SimpleGrid>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem borderBottom={0}>
                            <AccordionButton py={3}>
                                <Box as="span" flex='1' textAlign='left'>
                                    3단계 | 일정 선택
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    inline
                                    style={{border: 'solid 1px blue'}}
                                />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
                <Box id={'button_area'} mt={2}>
                    <Button>예약하기</Button>
                </Box>
                <Spacer/>
            </VStack>
            </Box>
        </Box>
    )
}
