class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [ :create ]

  def create
    user = User.new(user_params)

    if user.save
      token = JsonWebToken.encode(user_id: user.id)

      render json: user,
             serializer: UserSerializer,
             meta: { token: token },
             status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def me
    render json: @current_user, serializer: UserSerializer
  end

  private

  def user_params
    params[:user].permit(:full_name, :email, :password, :password_confirmation, :bio)
  end
end