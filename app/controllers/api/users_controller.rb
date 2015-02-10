module Api
  class UsersController < ApplicationController
    before_action :require_log_in, only: [:show]
    wrap_parameters(:user, include: [:email, :password])

    def new
      render json: {}
    end

    def index
      @users = User.all
      render :index
    end

    def create
      @user = User.new(user_params)

      if @user.save
        log_in(@user)
        render json: {}
      else
        flash.now[:errors] = @user.errors.full_messages
        render json: @user.errors.full_messages, status: 422
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


{
  email: 'ned',
  friends: [
    {
      email: 'david'
    },
    {
      email: 'jack'
    }
  ]
}
