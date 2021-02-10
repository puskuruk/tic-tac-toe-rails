import consumer from './consumer'

function ticTacToeChannel(roomId, methods) {
  return consumer.subscriptions.create({
    room_id: roomId,
    channel: "TicTacToeChannel"
  }, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received({payload, action}) {
      methods[action](payload)
    },

    restartGame() {
      this.perform('restart_game')
    },

    joinGame(player){
      this.perform('user_joined', { player });
    },

    userPlayed(columns, sign, player) {
      this.perform('move', { columns, sign, player });
    }
  })
}

export default ticTacToeChannel
