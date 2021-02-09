import consumer from './consumer'

function ticTacToeChannel(roomId) {
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

    received(data) {
      // Called when there's incoming data on the websocket for this channel
    }
  })
}

export default ticTacToeChannel
