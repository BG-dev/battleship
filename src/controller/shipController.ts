import {games} from '../store/games';
import {type PlayerModel, type addShipsData, type IncomingClientMessage} from '../models';
import {gameTurn, startGame} from './gameController';

export const addShipsHandler = (incomingClientMessage: IncomingClientMessage): void => {
  const data = JSON.parse(incomingClientMessage.data);
  const {gameId, ships, indexPlayer} = data as addShipsData;
  const player: PlayerModel = {
    playerId: indexPlayer,
    ships,
    shipsStatus: [],
  };

  games.addPlayerToGame(gameId, player);
  const game = games.getGames().find(item => item.gameId === gameId);
  if (game != null && game.players.length === 2) {
    const startGamePlayer = game.players[Math.round(Math.random())];
    if (startGamePlayer == null) return;
    startGame(gameId);
    gameTurn(gameId, startGamePlayer.playerId);
  }
};
