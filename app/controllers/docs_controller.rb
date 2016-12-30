class DocsController < ApplicationController
  def index
    @docs = Anno::DocList.for(current_account)
  end
end
