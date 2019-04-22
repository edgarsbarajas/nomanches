class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password)
  end
end
