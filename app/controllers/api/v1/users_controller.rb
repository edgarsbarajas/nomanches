class Api::V1::UsersController < Api::V1::ApiController
  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors, status: 400
    end
  end

  def show
    user = User.find_by(auth_token: params[:auth_token])

    if user
      render json: user
    else
      render json: { user: "Could not find user with that auth token" }, status: 400
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :email, :password)
  end
end
