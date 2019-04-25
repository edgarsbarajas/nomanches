class Api::V1::SessionsController < Api::V1::ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    if user = User.valid_login?(params[:email], params[:password])
      allow_token_to_be_used_only_once_for(user)
      render json: user
    else
      render json: {
        login: 'incorrect e-mail and/or password'
      }, status: 401
    end
  end

  def destroy
    logout
  end

  private
  def logout
    current_user.invalidate_auth_token
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_auth_token
  end
end
