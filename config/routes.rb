Rails.application.routes.draw do
  get "/tic-tac-toe", to: "tic_tac_toe#games"
end
