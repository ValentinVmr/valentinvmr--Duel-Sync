const TossCoinUseCaseConstructor = require('./toss-coin.usecase');
const checkIfUserInRoom = require('../../components/check_user_in_room');

TossCoinUseCaseConstructor._instance = TossCoinUseCaseConstructor._instance || new TossCoinUseCaseConstructor(checkIfUserInRoom);

module.exports = TossCoinUseCaseConstructor._instance;