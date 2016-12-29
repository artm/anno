class SessionsController < ApplicationController
  protect_from_forgery :except => [:callback]

  def create
    account = Account.find_or_create_from_auth_hash(auth_hash)
    session[:account_id] = account.id
    flash[:success] = "You're in"
    redirect_to root_path
  end

  protected
  def auth_hash
    request.env['omniauth.auth']
  end
end
