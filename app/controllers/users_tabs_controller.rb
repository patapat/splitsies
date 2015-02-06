class UsersTabsController < ApplicationController
  def create
    @users_tab = UsersTab.new(users_tab_params)

    if @users_tab.save
      render json: @users_tab
    else
      render json: {}
    end
  end

  def destroy
    @users_tab = UsersTab.find(params[:id])
    @users_tab.destroy
    render json: {}
  end

  private
  def users_tab_params
    params.require(:users_tab).permit(:user_id, :tab_id)
  end
end
