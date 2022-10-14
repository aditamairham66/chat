import { Avatar, Button, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { SearchUser } from '../../../../utils/userType'

interface Props {
    users: SearchUser[]
    addUsers: (option: SearchUser) => void
}
const ListUsers:React.FC<Props> = ({
    users,
    addUsers,
}) => {
  return (
    <>
        {users.length == 0 ? (
            <Flex mt={6} justify='center'>
                <Text>Usersname not found</Text>
            </Flex>
        ) : (
            <Stack mt={6}>
                {users.map((row, i) => (
                    <Stack
                        key={i}
                        direction='row'
                        align='center'
                        spacing={4}
                        py={2}
                        px={4}
                        borderRadius={4}
                        _hover={{ bg: 'whiteAlpha.200' }}
                    >
                        <Avatar/>
                        <Flex justify='space-between' align='center' width='100%'>
                            <Text color='whiteAlpha.700'>{row.username}</Text>
                            <Button 
                                bg='brand.100'
                                _hover={{ bg: 'brand.100' }}
                                onClick={() => addUsers(row)}
                            >Select</Button>
                        </Flex>
                    </Stack>
                ))}
            </Stack>
        )}
    </>
  )
}

export default ListUsers