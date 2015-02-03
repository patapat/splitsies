class SessionsController < ApplicationController
  # before_filter :require_log_in

  def new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      log_in(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = ["Invalid email/password combination."]
      render :new
    end
  end

  def destroy
    log_out
    redirect_to new_session_url
  end
end
