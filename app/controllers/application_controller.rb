class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    # @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_out
    session[:user_id] = nil
    # current_user.reset_session_token!
    # session[:session_token] = nil
  end

  def log_in(user)
    @current_user = user
    session[:user_id] = user.id
    # session[:session_token] = user.reset_session_token!
  end

  def require_log_in
    redirect_to new_session_url unless logged_in?
  end
end
