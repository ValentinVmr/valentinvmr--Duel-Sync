const JoinRoomException = require("./join-room.exception");

module.exports = class JoinRoomUseCase {

    constructor(roomManager){
        this.roomManager = roomManager;
    }

    execute({ roomId, user }) {
        this.checkRequiredFields(roomId, user);

        this.roomManager.createRoom(roomId);
        this.roomManager.addUser(roomId, user);

        return this.roomManager.getRoom(roomId);
    }

    checkRequiredFields(roomId, user) {
        if (!roomId) {
            throw new JoinRoomException(JoinRoomException.ROOM_ID_REQUIRED);
        }

        if (!user) {
            throw new JoinRoomException(JoinRoomException.USER_REQUIRED);
        }
    }
}
