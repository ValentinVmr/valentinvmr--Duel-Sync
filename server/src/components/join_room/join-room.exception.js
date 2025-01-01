module.exports = class JoinRoomException extends Error {
    constructor(message) {
        super(message);
        this.name = 'JoinRoomException';
    }

    static get ROOM_ID_REQUIRED() {
        return 'Room ID is required';
    }

    static get USER_REQUIRED() {
        return 'User is required';
    }
}
