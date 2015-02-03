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
    redirect_to user_tabs_url(current_user)
  end

  def show
    @tab = Tab.find(params[:id])
  end

  def index
    @tabs = current_user.tabs
  end

  def edit
    @tab = Tab.find(params[:id])
  end

  def update
    @tab = Tab.find(params[:id])

    if @tab.update(tab_params)
      redirect_to user_tabs_url(current_user)
    else
      flash.now[:errors] = @tab.errors.full_messages
      render :edit
    end
  end
  private
  def tab_params
    params.require(:tab).permit(:title, :date, :total_amount, :tag)
  end
end
