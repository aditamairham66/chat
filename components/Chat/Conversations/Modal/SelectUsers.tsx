import React from 'react'
import { SearchUser } from '../../../../utils/userType'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Flex, Icon, Stack, Text } from '@chakra-ui/react';

interface Props {
    users: SearchUser[]
    deleteUsers: (option: string) => void
}
const SelectUsers:React.FC<Props> = ({
    users,
    deleteUsers,
}) => {
  return (
    <Flex mt={8} gap='10px' flexWrap='wrap'>
        {users.map((row, i) => (
            <Stack
                key={row.id}
                direction='row'
                align='center'
                bg='whiteAlpha.200'
                borderRadius={4}
                p={2}
            >
                <Text>{row.username}</Text>
                <Icon 
                    as={IoIosCloseCircleOutline}
                    size={20}
                    cursor='pointer'
                    onClick={() => deleteUsers(row.id)}
                />
            </Stack>
        ))}
    </Flex>
  )
}

export default SelectUsers