module.exports = () => {
    return {
        roomDto: (room) => {
            return {
                playersData: room.data,
                roomId: room.id,
                timer: room.getTimer(),
                configuration: room.getConfiguration()
            }
        },
        playersDataDto: (room) => {
            return {
                player1: room.data.player1,
                player2: room.data.player2,
            }
        }
    }
}