class Api::V1::WordsController < Api::V1::ApiController
  before_action :require_login, only: [:create]

  def index
    if !current_user
      words = Word.all.as_json(include: {
        comments: {
          include: :comments
        },
        votes: {}
      })

      render json: words
    else
      # include the user id in the votes portion
      words = Word.all.as_json(include: {
        comments: {
          include: :comments
        },
        votes: {
          only: [:user_id, :upvote]
        }
      })

      render json: words
    end
  end

  def create
    word = current_user.words.new(word_params)

    if word.save
      render json: word
    else
      render json: word.errors, status: 400
    end
  end

  private
  def word_params
    params.require(:word).permit(:word, :definition, :example, :comments_count)
  end
end
