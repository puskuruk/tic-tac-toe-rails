class TicTacToeChannel < ApplicationCable::Channel
  def subscribed
    stream_from current_room
  end

  private

  def current_room
    "tic_tac_toe_channel_#{params[:room_id]}"
  end
end
