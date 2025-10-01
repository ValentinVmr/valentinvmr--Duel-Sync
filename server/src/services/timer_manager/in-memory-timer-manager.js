module.exports = class InMemoryTimerManager {
    constructor() {
        this.timers = new Map();
    }

    startTimer(roomId, duration, onTick, onComplete) {
        if (this.timers.has(roomId)) {
            throw new Error('Timer already running for this room');
        }

        let remainingTime = duration;

        const intervalId = setInterval(() => {
            remainingTime -= 1;
            if (remainingTime < 0) {
                clearInterval(intervalId);
                this.timers.delete(roomId);
                onComplete();
            } else {
                onTick(remainingTime);
            }
        }, 1000);

        this.timers.set(roomId, intervalId);
    }

    stopTimer(roomId) {
        if (!this.timers.has(roomId)) {
            throw new Error('No timer running for this room');
        }

        clearInterval(this.timers.get(roomId));
        this.timers.delete(roomId);
    }

    isTimerRunning(roomId) {
        return this.timers.has(roomId);
    }
}