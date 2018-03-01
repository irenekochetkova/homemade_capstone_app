class UsersController < ApplicationController
  def create
    user = User.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      image_url: params[:image_url],
      phone_number: params[:phone_number],
      zipcode: params[:zipcode],
      password_digest: params[:password_digest],
      password_confirmation: params[:password_confirmation],
      provider: params[:provider]
      )
    if user.save
      render json: {massage: "User create successfully", status: :create}
    else
      render json: {errors: user.errors.full_messages, status: :bad_request}
    end
  end
end
