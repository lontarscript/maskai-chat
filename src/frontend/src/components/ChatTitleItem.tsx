import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import {
    Box,
    Text,
    HStack,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
    forwardRef,
} from '@chakra-ui/react';
import {
    ChatIcon,
    EditIcon,
    DeleteIcon,
    CloseIcon,
    CheckIcon,
} from '@chakra-ui/icons';
import { ChatTitleItemProps } from '../Interfaces';

export default function ChatTitleItem(props: ChatTitleItemProps) {
    // @ts-ignore
    const [isEditMode, setEditMode] = useState(0);
    // @ts-ignore
    const [titleText, setTitleText] = useState(props.title);
    const chatTitleInputRef = useRef<HTMLInputElement>(null);

    const openEditMode = () => {
        setEditMode(1);
    };

    const applyEditAction = (searchDOMInput?: boolean) => {
        if (searchDOMInput) {
            const currentText = document.querySelector(
                `input#inputEdit${props.id}`
            ) as HTMLInputElement;
            setTitleText(currentText.value);
            props.onSave(props.id, currentText.value);
        }
        setEditMode(0);
    };

    const changeTitleText = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTitleText(e.currentTarget.value);
            props.onSave(props.id, e.currentTarget.value);
            applyEditAction();
        }
    };

    useEffect(() => {
        if (chatTitleInputRef.current) {
            chatTitleInputRef.current.focus();
        }
    });

    const InputMode = forwardRef((props, ref) => (
        <InputGroup size={'md'}>
            <Input
                ref={ref}
                pr={'5rem'}
                onKeyDown={changeTitleText}
                focusBorderColor={useColorModeValue('green.400', 'green.400')}
                {...props}
            ></Input>
            <InputRightElement pr={'2.5rem'}>
                <HStack>
                    <Button onClick={() => applyEditAction(true)} size={'xs'}>
                        <CheckIcon></CheckIcon>
                    </Button>
                    <Button onClick={() => setEditMode(0)} size={'xs'}>
                        <CloseIcon></CloseIcon>
                    </Button>
                </HStack>
            </InputRightElement>
        </InputGroup>
    ));

    return (
        <Box
            p={'1rem'}
            bg={useColorModeValue(
                props.isActive ? 'gray.200' : 'white',
                props.isActive ? 'black' : 'gray.800'
            )}
            _hover={{
                bg: useColorModeValue(
                    props.isActive ? 'gray.200' : 'gray.100',
                    props.isActive ? 'black' : 'gray.900'
                ),
                cursor: 'pointer',
            }}
            key={props.id}
            onMouseLeave={() => {
                setEditMode(0);
            }}
            onClick={isEditMode ? undefined : props.onSelect}
        >
            {isEditMode ? (
                <InputMode
                    ref={chatTitleInputRef}
                    id={`inputEdit${props.id}`}
                    defaultValue={titleText}
                ></InputMode>
            ) : (
                <Flex justifyContent={'space-between'}>
                    <HStack>
                        <ChatIcon></ChatIcon>
                        <Text fontSize={'lg'}>
                            {titleText.length > 18
                                ? titleText.slice(0, 18) + '...'
                                : titleText}
                        </Text>
                    </HStack>
                    <HStack
                        style={{ display: props.isActive ? undefined : 'none' }}
                    >
                        <Button onClick={openEditMode} size={'xs'}>
                            <EditIcon></EditIcon>
                        </Button>
                        <Button
                            size={'xs'}
                            onClick={props.onDeleteConfirmation}
                        >
                            <DeleteIcon></DeleteIcon>
                        </Button>
                    </HStack>
                </Flex>
            )}
        </Box>
    );
}
``;
