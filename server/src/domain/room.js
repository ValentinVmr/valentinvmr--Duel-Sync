module.exports = class Room {
    constructor(id) {
        this.id = id;
        this.users = [];
        this.data = {
            player1: {
                name: "Player1",
                lifepoints: 8000,
            },
            player2: {
                name: "Player2",
                lifepoints: 8000,
            },
            timer: 40 * 60, // 40 minutes in seconds
            configuration: {
                startingLifePoints: 8000,
                initialTimer: 40 * 60,
            }
        }
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }

    isUserInRoom(userId) {
        return this.users.some(user => user.id === userId);
    }

    isEmpty() {
        return this.users.length === 0;
    }

    addLifePoints(playerId, amount) {
        this.data[playerId].lifepoints += amount;
    }

    removeLifePoints(playerId, amount) {
        this.data[playerId].lifepoints -= amount;

        if (this.data[playerId].lifepoints < 0) {
            this.data[playerId].lifepoints = 0;
        }
    }

    getPlayersData() {
        return this.data;
    }

    getTimer() {
        return this.data.timer;
    }

    getConfiguration() {
        return this.data.configuration;
    }

    resetTimer() {
        this.data.timer = this.data.configuration.initialTimer;
    }

    resetLifePoints() {
        this.data.player1.lifepoints = this.data.configuration.startingLifePoints;
        this.data.player2.lifepoints = this.data.configuration.startingLifePoints;
    }

    resetRoom() {
        this.resetLifePoints();
        this.resetTimer();
        return this;
    }

    tickTimer() {
        if (this.data.timer > 0) {
            this.data.timer -= 1;
        }
    }
}
