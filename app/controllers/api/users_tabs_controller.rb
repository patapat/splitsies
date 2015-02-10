module Api
  class UsersTabsController < ApplicationController
    def index
      @users_tabs = current_user.users_tabs #relationship :amount_owed, :paid
      @owed_tabs = current_user.owed_tabs #actual tabs :title, :date, :total_amount, :tag
      render :index
    end

    def show
      @users_tab = UsersTab.find(params[:id])
    end

    def create
      @users_tab = UsersTab.new(users_tab_params)

      if @users_tab.save
        render json: @users_tab
      else
        render json: {}
      end
    end

    def update
      @users_tab = UsersTab.find(params[:id])

      if @tab.update(tab_params)
        render json: @tab
      else
        flash.now[:errors] = @tab.errors.full_messages
        render :edit
      end
    end


    def destroy
      @users_tab = UsersTab.find(params[:id])
      @users_tab.destroy
      render json: {}
    end

    private
    def users_tab_params
      params.require(:users_tab).permit(:user_id, :tab_id, :amount_owed, :paid)
    end
  end
end
