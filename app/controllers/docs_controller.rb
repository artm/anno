class DocsController < ApplicationController
  def index
    @docs = Anno::DocList.for(current_account)
  end

  def new
    @doc = Doc.new
  end

  def edit
    @doc = Doc.find(params[:id])
  end

  def create
    doc = Anno::CreateDoc.from(params[:doc].to_hash)
    redirect_to edit_doc_url(doc)
  end

  def update
    doc = Doc.find(params[:id])
    if params[:doc].present?
      doc.update(doc_update_params)
      redirect_to :edit_doc
    elsif params[:diff].present?
      Anno::PatchDoc.call(doc, params[:diff].to_hash)
      render json: {status: "ok"}
    end
  end

  private

  def doc_update_params
    params.require(:doc).permit(:title, :language, :text)
  end
end
