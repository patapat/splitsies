
module Api
  class TabsController < ApplicationController
    def new
      render json: {}
    end

    def create
      @tab = Tab.new(tab_params)
      @tab.user_id = current_user.id

      if @tab.save
        render json: @tab
      else
        render json: @tab.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @tab = Tab.find(params[:id])
      @tab.destroy
      render json: {}
    end

    def show
      @tab = Tab.find(params[:id])

      if current_user.tabs.include?(@tab)
        render :show
      else
        render json: ["You are not an owner or participant of this tab."]
      end
    end

    def index
      @tabs = current_user.tabs
      render json: @tabs
    end

    # def edit
    #   @tab = Tab.find(params[:id])
    # end
    #
    # def update
    #   @tab = Tab.find(params[:id])
    #
    #   if @tab.update(tab_params)
    #     redirect_to user_tabs_url(current_user)
    #   else
    #     flash.now[:errors] = @tab.errors.full_messages
    #     render :edit
    #   end
    # end

    private
    def tab_params
      params.require(:tab).permit(:title, :date, :total_amount, :tag)
    end
  end
end
