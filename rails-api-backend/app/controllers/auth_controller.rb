class AuthController < ApplicationController
  skip_before_action :authenticate_user, only: [:login]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def login
    user = User.find_by!(email: login_params[:email])

    if user&.authenticate(login_params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { user: user, token: token }
    else
      render json: { message: "Incorrect password" }, status: :unauthorized
    end
  end

  private

  def login_params
    params.require(:auth).permit(:email, :password)
  end

  def handle_record_not_found(_error)
    render json: { message: "User doesn't exist" }, status: :unauthorized
  end
end