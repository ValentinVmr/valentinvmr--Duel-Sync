module.exports = class RemoveUserException extends Error {
    constructor(message) {
        super(message);
        this.name = 'RemoveUserException';
    }

    static get ROOM_ID_REQUIRED() {
        return 'Room ID is required';
    }

    static get USER_REQUIRED() {
        return 'User is required';
    }
}
