class TicTacToeChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_room
  end

  def user_joined(payload)
    player = payload['player']
    ActionCable.server.broadcast(current_room, {payload: player, action: 'playerJoined'})
  end

  def move(payload)
    player =  payload['player']
    columns = payload['columns']
    sign = payload['sign']

    ActionCable.server.broadcast(current_room, {payload: {updatedColumns: columns, player: player, nextSign: next_sign(sign)}, action: 'setOpponentsMove'})

    is_current_user_win(columns, sign)
  end

  def restart_game
    ActionCable.server.broadcast(current_room, {action: 'restartGame'})
  end

  def is_current_user_win(currentPositions, sign, currentIndexes: Array.new(9).fill(0))
    return ActionCable.server.broadcast(current_room, {payload: {status: 'withdraw', sign: sign}, action: 'finishTheGame'}) if currentPositions.compact.length == 9

    currentPositions.each_with_index do |currentPosition, currentPositionIndex|
      next unless currentPosition == sign

      winningPositions.each_with_index do |winningPosition, index|
          currentPositionIndex == winningPosition[currentIndexes[index]] ?
            currentIndexes[index] += 1
              :
                currentIndexes[index] = 0

          ActionCable.server.broadcast(current_room, {payload: {status: 'win', sign: sign}, action: 'finishTheGame'}) if currentIndexes[index] == 3
      end
    end
  end

  private

  def current_room
    "tic_tac_toe_channel_#{params[:room_id]}"
  end

  def winningPositions
    [
      [0,1,2],
      [3,4,5],
      [6,7,8],

      [0,4,8],
      [2,4,6],

      [0,3,6],
      [1,4,7],
      [2,5,8],
    ]
  end

  def next_sign(current_sign)
    current_sign == 'X' ? 'O' : 'X'
  end
end
