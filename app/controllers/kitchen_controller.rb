class KitchenController < ApplicationController

  # GET /kitchen/1
  # GET /kitchen/1.json
  def show
    @kitchen = Kitchen.find(params[:id])
  end

  # GET /kitchen/new
  def new
  end

  # GET /kitchen/1/edit
  def edit
  end

  # POST /kitchen
  # POST /kitchen.json
  def create
  end

  # PATCH/PUT /kitchen/1
  # PATCH/PUT /kitchen/1.json
  def update
    # respond_to do |format|
  #   if @kitchen.update_attributes(post_params)
    #     format.html { redirect_to @kitchen, notice: 'Kitchen was successfully updated.' }
    #     format.json { head :no_content }
    #   else
    #     format.html { render action: 'edit' }
    #     format.json { render json: @kitchen.errors, status :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /kitchen/1
  # DELETE /kitchen/1.json
  def destroy
  end

end
