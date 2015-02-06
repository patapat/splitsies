module Api
  class UsersController < ApplicationController
    before_action :require_log_in, only: [:show]

    def new
      render json: {}
    end

    def index
      @users = User.all
      render json: @users
    end

    def create
      @user = User.new(user_params)

      if @user.save
        log_in(@user)
        render json: {}
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: {}
      end
    end

    def show
      @user = User.find(params[:id])
      @tabs = current_user.tabs
      render :show
    end

    private
    def user_params
      params.require(:user).permit(:email, :password)
    end
  end
end
