const RemoveUserException = require("./remove-user.exception");
const log = require("npmlog");

module.exports = class RemoveUserUseCase {
    constructor(roomService) {
        this.roomService = roomService;
    }

    async execute({ roomId, userId }) {
        log.info(`Removing user ${userId} from room ${roomId}`);
        this.checkRequiredFields(roomId, userId);
        this.roomService.removeUser(roomId, userId);
    }

    checkRequiredFields(roomId, user) {
        if (!roomId) {
            throw new RemoveUserException(RemoveUserException.ROOM_ID_REQUIRED);
        }

        if (!user) {
            throw new RemoveUserException(RemoveUserException.USER_REQUIRED);
        }
    }
}
