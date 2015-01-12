module Api
  class BoardMembershipsController < ApiController
    def new
    end
    
    def create
      #should be a security check making sure current_user.id == board.user_id or is a board member
      
      @membership = BoardMembership.new(membership_params)
      if @membership.save
        render json: @membership
      else
        render json: @membership.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @vote = current_user.votes.find(params[:id])
      @vote.try(:destroy)
      render json: {}
    end

    def index
      #should return top votes
      @votes = Vote.all
      render json: @votes
    end

    private

    def membership_params
      params.require(:board_membership).permit(:board_id, :user_id)
    end
  end
end
