class Api::V1::WordsController < Api::V1::ApiController
  before_action :require_login, only: [:create]

  def index
    words = Word.all.as_json(include: {
      comments: {
        include: :comments
      },
      votes: {
        only: [:id, :user_id, :upvote]
      },
      user: {
        only: [:username]
      }
    })

    render json: words
  end

  def create
    word = current_user.words.new(word_params)

    if word.save
      render json: word
    else
      render json: word.errors.messages, status: 400
    end
  end

  private
  def word_params
    params.require(:word).permit(:word, :definition, :example, :comments_count)
  end
end
