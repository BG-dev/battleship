import {type IncomingClientMessage} from 'models';
import {type WebSocket as WSWebSocket} from 'ws';
import {users} from '../store/users';
import {updateRooms} from './roomController';
import {updateWinners} from './winnerController';
import {getResponseMessage} from '../utils/response-message';

export const regHandler = (
  ws: WSWebSocket,
  incomingClientMessage: IncomingClientMessage,
  wsKey: string,
): void => {
  const data = JSON.parse(incomingClientMessage.data);
  const userName = data.name as string;
  const userPassword = data.password as string;

  try {
    const user = users.getUser(userName, userPassword, wsKey);
    const responseData = JSON.stringify({
      name: user?.name,
      index: user?.index,
      error: false,
      errorText: '',
    });
    ws.send(getResponseMessage('reg', responseData));
    updateRooms();
    updateWinners();
  } catch (error) {
    const responseData = JSON.stringify({
      name: userName,
      index: '',
      error: true,
      errorText: error instanceof Error ? error.message : 'Unknown error',
    });
    ws.send(getResponseMessage('reg', responseData));
  }
};
