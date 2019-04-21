class Api::V1::SessionsController < Api::V1::ApiController
  skip_before_action :require_login, only: [:create], raise: false

  def create
    p "*" * 100
    if user = User.valid_login?(params[:email], params[:password])
      p "before allow_token_to_be_used_only_once_for"
      allow_token_to_be_used_only_once_for(user)
      send_auth_token_for_valid_login_of(user)
    else
      render_unauthorized("Error with your login or password")
    end
  end

  def destroy
    # logout
    user = User.find_by(auth_token: request.headers["Authorization"])
    user.invalidate_auth_token
  end

  private
  def send_auth_token_for_valid_login_of(user)
    render json: { auth_token: user.auth_token }
  end

  def allow_token_to_be_used_only_once_for(user)
    user.regenerate_auth_token
  end

  def logout
    current_user.invalidate_auth_token
  end
end