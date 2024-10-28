import {type PlayerModel} from '../models';

export const isPlayerShipsAlive = (player: PlayerModel): boolean => {
  return player.shipsStatus.filter(ship => ship.status === 'alive').length > 0;
};
