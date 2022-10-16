import { Participant } from "./conversationType";

export const formatUsernames = (
  participants: Array<Participant>,
  myUserId: string
): string => {
  const usernames = participants
    .filter((participant) => participant.user.id != myUserId)
    .map((participant) => participant.user.username);

  return usernames.join(", ");
};