class KitchenController < ApplicationController

  # GET /kitchen/1
  # GET /kitchen/1.json
  def show
    @kitchen = Kitchen.find_by(token: params[:id])
  end

  # GET /kitchen/new
  def new
    @kitchen = Kitchen.new
  end

  # GET /kitchen/1/edit
  def edit
  end

  # POST /kitchen
  # POST /kitchen.json
  def create
    @kitchen = Kitchen.new(kitchen_params)
    if @kitchen.save
      redirect_to @kitchen
      flash[:notice] = 'Kitchen was successfully added.'
    else
      format.html { render :new }
      format.json { render json: @kitchen.errors, status: :unprocessable_entity }
    end

    # if @kitchen.save
    #   redirect_to root_url
    #   flash[:notice] = "Successfully created kitchen!"
    # else
    #   render action: 'new'
    # end
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

  private
    def kitchen_params
      params.require(:kitchen).permit(:title, :description, :location, :rental_space, :kitchen_rules_and_instructions,
                                      :additional_details, :price,
                                      { washing_station: [] }, { food_preparation: [] },
                                      { food_preparation: [] }, { cookware: [] }, { storage: [] },
                                      { refrigeration: [] }, { ovens_fryers: [] },
                                      { oven_equipment_and_storage: [] }, { baking_and_pastry: [] },
                                      { other_equipment: [] }, { other_amenities: [] }
                                      # :availability
                                      )
    end

end
