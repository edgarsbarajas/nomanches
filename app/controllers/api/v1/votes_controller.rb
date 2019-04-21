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

  private
  def vote_params
    params.require(:vote).permit(:voteable_id, :voteable_type, :upvote)
  end
end
