class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user ||= User.find_by_session_token(session[:session_token])
    end
  end

  def logged_in?
    !!current_user
  end

  def log_out
    if session[:user_id]
      session[:user_id] = nil
    else
      current_user.reset_session_token!
      session[:session_token] = nil
    end
  end

  def log_in(user)
    @current_user = user
    if session[:user_id]
      session[:user_id] = user.id
    else
      session[:session_token] = user.reset_session_token!
    end
  end

  def require_log_in
    redirect_to new_session_url unless logged_in?
  end
end
