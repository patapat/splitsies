class TabsController < ApplicationController
  def new

  end

  def create
    @tab = Tab.new(tab_params)
    @tab.user_id = current_user.id

    if @tab.save
      render :show
    else
      flash.now[:errors] = @tab.errors.full_messages
      render :new
    end
  end

  def destroy
    @tab = Tab.find(params[:id])
    @tab.destroy
  end

  def show
    @tab = Tab.find(params[:id])
  end

  def index
    @tabs = current_user.tabs
  end

  def tab_params
    params.require(:tab).permit(:title, :date, :total_amount, :tag)
  end
end
