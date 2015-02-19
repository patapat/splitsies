class SessionsController < ApplicationController

  def new
    
  end

  def create
    # @user = User.find_by_credentials(
    #   params[:user][:email],
    #   params[:user][:password]
    # )

    @user = User.from_omniauth(env["omniauth.auth"])

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
