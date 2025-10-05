const checkIfUserInRoom = require('../check_user_in_room');
const RollDiceUseCaseConstructor = require('./roll-dice.usecase');

RollDiceUseCaseConstructor._instance = RollDiceUseCaseConstructor._instance || new RollDiceUseCaseConstructor(checkIfUserInRoom);

module.exports = RollDiceUseCaseConstructor._instance;