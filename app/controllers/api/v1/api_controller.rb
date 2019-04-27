class Api::V1::ApiController < ApplicationController
  def require_login
    authenticate_token || render_unauthorized("Access denied")
  end

  def current_user
    @current_user ||= authenticate_token
  end

  private
  def render_unauthorized(message)
    render json: {
      unauthorized: message
    }, status: 401
  end

  def authenticate_token
    return authenticate_with_http_token do |token, options|
      User.find_by(auth_token: token)
    end
  end
end
