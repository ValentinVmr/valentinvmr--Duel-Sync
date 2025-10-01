module.exports = () => {
    return {
        roomDto: (room) => {
            return {
                playersData: room.data,
                roomId: room.id,
                timer: room.getTimer(),
                configuration: room.getConfiguration()
            }
        }
    }
}