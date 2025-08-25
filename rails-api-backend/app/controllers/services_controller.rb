class ServicesController < ApplicationController
  before_action :set_service, only: [:show, :update, :destroy, :run]

  # GET /services
  def index
    @services = current_user.services
    render json: @services
  end

  # GET /services/:id
  def show
    render json: @service
  end

  # POST /services
  def create
    @service = current_user.services.build(service_params)

    if @service.save
      render json: @service, status: :created
    else
      render json: { errors: @service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /services/:id
  def update
    if @service.update(service_params)
      render json: @service
    else
      render json: { errors: @service.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /services/:id
  def destroy
    @service.destroy
    head :no_content
  end

  # POST /services/:id/run
  def run
    begin
      # Create a sandboxed binding
      sandbox = binding

      # Execute the code
      result = eval(@service.code, sandbox)

      render json: { result: result }
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  private

  def set_service
    @service = current_user.services.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Service not found" }, status: :not_found
  end

  def service_params
    params.require(:service).permit(:name, :description, :code)
  end
end
