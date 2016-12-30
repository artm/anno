class PagesController < ApplicationController
  def front
    redirect_to docs_path if signed_in?
  end
end
