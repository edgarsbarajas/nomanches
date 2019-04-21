class Api::V1::VotesController < Api::V1::ApiController
  before_action :require_login

  def create
    vote = Vote.new(vote_params)
    vote.user = current_user

    if vote.save
      render json: vote
    else
      render json: vote.errors
    end
  end

  def update
    vote = Vote.find(params[:id])

    p "*" * 100
    p vote_params
    if current_user.id == vote.user_id
      if vote && vote.update_columns(upvote: vote_params[:upvote])
        render json: vote
      else
        render json: {
          vote: "Error updating vote"
        }, status: 400
      end
    else
      render json: {
        vote: "You are not allowed to update this vote"
      }, status: 401
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:voteable_id, :voteable_type, :upvote)
  end
end
