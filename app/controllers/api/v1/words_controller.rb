class Api::V1::WordsController < Api::V1::ApiController
  before_action :require_login

  def create
    word = current_user.words.new(word_params)

    if word.save
      render json: word
    else
      render json: word.errors
    end
  end

  private
  def word_params
    params.require(:word).permit(:word, :definition, :example)
  end
end
