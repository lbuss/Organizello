module Api
  class ApiController < ApplicationController
    
    
    def require_board_member!(board)
      redirect_to root_url unless board.is_member?(current_user)
    end
  end
end
