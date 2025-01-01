const Room = require("../../domain/room");
const log = require("npmlog");

module.exports = class InMemoryRoomManager {
    constructor() {
        this.rooms = new Map();
    }

    createRoom(roomId) {
        if (this.roomExists(roomId)) {
            return;
        }

        this.rooms.set(roomId.slugged(), new Room(roomId?.slugged()));
        log.info(`Room ${roomId} created`);
    }

    getRoom(roomId) {
        return this.rooms.get(roomId?.slugged());
    }

    update(roomId, room) {
        this.rooms.set(roomId.toLowerCase(), room);
    }

    deleteRoom(roomId) {
        if (!this.roomExists(roomId.slugged())) {
            return;
        }

        this.rooms.delete(roomId.slugged());
    }

    addUser(roomId, user) {
        if (!this.roomExists(roomId)) {
            throw new Error(`Room ${roomId} does not exist`);
        }

        const room = this.rooms.get(roomId.slugged());
        room.addUser(user);
    }

    removeUser(roomId, userId) {
        if (!this.roomExists(roomId)) {
            throw new Error(`Room ${roomId} does not exist`);
        }

        const room = this.rooms.get(roomId.slugged());
        room.removeUser(userId);
        log.info(`User ${userId} removed from room ${roomId}`);

        if (room.isEmpty()) {
            log.info(`Room ${roomId} is empty. Deleting room`);
            this.deleteRoom(roomId);
        }
    }

    roomExists(roomId) {
        return this.rooms.has(roomId.slugged());
    }
}
