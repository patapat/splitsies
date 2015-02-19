class SessionsController < ApplicationController

  def new

  end

  def create
    if env["omniauth.auth"]
      @user = User.from_omniauth(env["omniauth.auth"])
    else
      @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
      )
    end

    if @user
      log_in(@user)
      redirect_to root_url
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
