module.exports = class TossCoinUseCase {

    constructor(checkIfUserInRoom) {
        this.checkIfUserInRoom = checkIfUserInRoom;
    }

    execute({roomId, userId}) {
        this.checkIfUserInRoom.execute({roomId, userId});
        const tossResult = Math.random() < 0.5 ? 'heads' : 'tails';
        return {tossResult};
    }
}