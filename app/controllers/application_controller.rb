class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authenticate!
    if signed_in?
      return true
    else
      flash[:error] = "You aren't authorized to access this page"
      redirect_to(root_path)
    end
  end

  helper_method :current_account
  def current_account
    @current_account ||= Account.find_by_id(session[:account_id])
  end

  helper_method :signed_in?
  def signed_in?
    !!current_account
  end
end
