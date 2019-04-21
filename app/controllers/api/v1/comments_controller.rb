class Api::V1::CommentsController < Api::V1::ApiController
  before_action :require_login

  def create
    comment = Comment.new(comment_params)
    comment.user = current_user

    if comment.save
      render json: comment
    else
      render json: {
        comment: "Error posting comment"
      }, status: 400
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:value, :commentable_id, :commentable_type)
  end
end
