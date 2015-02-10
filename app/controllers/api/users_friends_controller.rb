module Api
  class UsersFriendsController < ApplicationController
    def index
      @users_friends = current_user.friends
      render :index
    end

    def show
      @users_friend = UsersFriend.find(params[:id])
    end

    def create
      @users_friend = UsersFriend.new(users_friend_params)

      if @users_friend.save
        render json: @users_friend
      else
        render json: {}
      end
    end

    def destroy
      @users_friend = UsersFriend.find(params[:id])
      @users_friend.destroy
      render json: {}
    end

    private
    def users_friend_params
      params.require(:users_friend).permit(:user_id, :friend_id)
    end
  end
end
