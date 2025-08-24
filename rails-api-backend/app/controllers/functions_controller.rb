class FunctionsController < ApplicationController
  before_action :authenticate_user
  before_action :set_function, only: [:show, :update, :destroy]

  def index
    render json: @current_user.functions
  end

  def show
    render json: @function
  end

  def create
    function = @current_user.functions.build(function_params)
    if function.save
      render json: function, status: :created
    else
      render json: { errors: function.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @function.update(function_params)
      render json: @function
    else
      render json: { errors: @function.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @function.destroy
    head :no_content
  end

  private

  def set_function
    @function = @current_user.functions.find(params[:id])
  end

  def function_params
    params.require(:function).permit(:name, :code, parameters: {})
  end
end
