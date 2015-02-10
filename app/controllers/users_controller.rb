class UsersController < ApplicationController
  wrap_parameters(:user, include: [:email, :password])

  def new
    render json: {}
  end

end
