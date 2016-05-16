class PicturesController < ApplicationController
  def index
  end

  def new
  end

  def show
  	@id = params[:id]
  	@picture = Picture.find(@id)
  end

  def create
  	@picture = Picture.new(params[:picture])
	if @picture.save
		redirect_to :action => :show, :id => @picture.id
	end
  end
end
