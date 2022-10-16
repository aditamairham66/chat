import { Avatar, Box, Flex, Menu, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GoPrimitiveDot } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { Conversation } from '../../../utils/conversationType'
import { formatUsernames } from '../../../utils/function';
import { formatRelative } from "date-fns";
import enUS from "date-fns/locale/en-US";

const formatRelativeLocale = {
    lastWeek: "eeee",
    yesterday: "'Yesterday",
    today: "p",
    other: "MM/dd/yy",
}

interface Props {
    userId: string
    chat: Conversation
    onClick: () => void
    hasSeenLatestMessage?: boolean
    selectChatID?: string
    onEditConversation?: () => void
    onDeleteConversation?: (option: string) => void
    onLeaveConversation?: (conversation: Conversation) => void
}
const ConversationItem:React.FC<Props> = ({
    userId,
    chat,
    onClick,
    hasSeenLatestMessage,
    selectChatID,
    onEditConversation,
    onDeleteConversation,
    onLeaveConversation,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const showMenu = onEditConversation && onDeleteConversation && onLeaveConversation

  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
        onClick();
    } else if (event.type === "contextmenu") {
        event.preventDefault();
        setMenuOpen(true);
    }
  }

  return (
    <Stack
        position="relative"
        direction="row"
        align="center"
        justify="space-between"
        p={4}
        cursor="pointer"
        borderRadius={4}
        bg={
             chat.id === selectChatID ? "whiteAlpha.200" : "none"
        }
        _hover={{ bg: "whiteAlpha.200" }}
        onClick={handleClick}
        onContextMenu={handleClick}
    >
        {showMenu && (
            <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
                <MenuList bg="#2d2d2d">
                    <MenuItem
                        icon={<AiOutlineEdit fontSize={20} />}
                        onClick={(event) => {
                            event.stopPropagation()
                            onEditConversation()
                        }}
                    >
                        Edit
                    </MenuItem>
                    {chat.conversationParticipant.length > 2 ? (
                        <MenuItem
                            icon={<BiLogOut fontSize={20} />}
                            onClick={(event) => {
                                event.stopPropagation()
                                onLeaveConversation(chat)
                            }}
                        >
                            Leave
                        </MenuItem>
                    ) : (
                        <MenuItem
                            icon={<MdDeleteOutline fontSize={20} />}
                            onClick={(event) => {
                                event.stopPropagation()
                                onDeleteConversation(chat.id)
                            }}
                        >
                            Delete
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
        )}

        <Flex position="absolute" left="-6px">
            {hasSeenLatestMessage === false && (
                <GoPrimitiveDot fontSize={18} color="#6B46C1" />
            )}
        </Flex>

        <Avatar />
        
        <Flex justify="space-between" width="80%" height="100%">
            <Flex direction="column" width="70%" height="100%">
                <Text
                    fontWeight={600}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    { formatUsernames(chat.conversationParticipant, userId) }
                </Text>

                {chat.lastMessage && (
                    <Box>
                        <Text
                            color="whiteAlpha.700"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                        >
                            {chat.lastMessage.body}
                        </Text>
                    </Box>
                )}
            </Flex>    
            <Text color="whiteAlpha.700" textAlign="right" position='absolute' right={4}>
                {formatRelative(new Date(chat.updatedAt), new Date(), {
                    locale: {
                    ...enUS,
                    formatRelative: (token) =>
                        formatRelativeLocale[token as keyof typeof formatRelativeLocale],
                    },
                })}
            </Text>
        </Flex>
    </Stack>
  )
}

export default ConversationItem