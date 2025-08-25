class ApplicationController < ActionController::API
  before_action :authenticate_user

  def current_user
    @current_user
  end

  private

  def authenticate_user
    header  = request.headers['Authorization']
    token   = header&.split(' ')&.last
    payload = JsonWebToken.decode(token)

    @current_user = User.find_by(id: payload['user_id']) if payload

    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end
end