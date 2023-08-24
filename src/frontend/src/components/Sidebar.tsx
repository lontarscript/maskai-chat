import { useContext, useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Button,
    HStack,
    useColorModeValue,
    useMediaQuery,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { SidebarMobileContext, ChatContentContext } from '../Contexts';
import { ChatLoadingState } from '../Interfaces';
import ChatTitleItems from './ChatTitleList';
import SidebarActionBottom from './SidebarActionBottom';

export default function Sidebar() {
    // Chat Context
    // @ts-ignore
    const { updateChatKey, updateChatLoadingState, updateChatConversation } =
        useContext(ChatContentContext);
    const [isDekstopView] = useMediaQuery('(min-width: 768px)');
    const [newChatMode, setNewChatMode] = useState<boolean>(false);

    const triggerNewChatMode = () => {
        updateChatKey('');
        updateChatLoadingState(ChatLoadingState.NOT_INIT);
        updateChatConversation([]);
        setNewChatMode(true);
    };

    // Sidebar Mobile Context
    // @ts-ignore
    const [isActiveSidebarMobile] = useContext(SidebarMobileContext);

    useEffect(() => {
        if (newChatMode) {
            const textAreaId = '#chatMessageTextArea';
            document.querySelector<HTMLTextAreaElement>(textAreaId)!.focus();
            document.querySelector<HTMLTextAreaElement>(textAreaId)!.value = '';
            setNewChatMode(false);
        }
    }, [newChatMode]);

    return (
        <Box
            bg={useColorModeValue('white', 'gray.800')}
            h={'full'}
            w={{ base: 'full', md: '20rem' }}
            maxW={{ md: '20rem' }}
            style={{
                display:
                    !isActiveSidebarMobile && !isDekstopView
                        ? 'none'
                        : undefined,
            }}
        >
            <Flex flexDirection={'column'} h={'full'}>
                <Box p={'1rem'}>
                    <HStack>
                        <Button
                            id="newChatButton"
                            onClick={triggerNewChatMode}
                            leftIcon={<PlusSquareIcon />}
                            colorScheme={'green'}
                            w={'full'}
                        >
                            New Chat
                        </Button>
                    </HStack>
                </Box>
                <ChatTitleItems></ChatTitleItems>
                <SidebarActionBottom></SidebarActionBottom>
            </Flex>
        </Box>
    );
}
