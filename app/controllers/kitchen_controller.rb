class KitchenController < ApplicationController

  # GET /kitchen/1
  # GET /kitchen/1.json
  def show
    @kitchen = Kitchen.find_by(token: params[:id])
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation = Reservation.new
  end

  # TODO: more error handling and more parameters need to be added
  def filter
    @index = params[:index] ? Integer(params[:index]) : nil
    @num_results = params[:num_results] ? Integer(params[:num_results]) : nil

    if !@index.present? || !@num_results.present?
      render :nothing => true, :status => 400
      return
    end

    @filtered_kitchens = Kitchen.all[@index...@index + @num_results]
    render json: @filtered_kitchens
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
    params[:whole_kitchen] == "1" ? (@kitchen.rental_space = "Whole Kitchen") : (@kitchen.rental_space = "Shared Space")

    if @kitchen.save
      @photos = @kitchen.photos
      redirect_to kitchen_path(@kitchen.token)
      flash[:notice] = 'Kitchen was successfully added.'
    else
      respond_to do |format|
        flash[:notice] = 'Error: Kitchen was not successfully added.'
        format.html { render action: 'new' }
        format.json { render json: @kitchen.errors, status: :unprocessable_entity }
      end
    end
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
      params.require(:kitchen).permit(:user_id, :title, :description, :location, :rental_space,
                                      :kitchen_rules_and_instructions, :additional_details, :price,
                                      { washing_station: [] }, { food_preparation: [] },
                                      { food_preparation: [] }, { cookware: [] }, { storage: [] },
                                      { refrigeration: [] }, { ovens_fryers: [] },
                                      { oven_equipment_and_storage: [] }, { baking_and_pastry: [] },
                                      { other_equipment: [] }, { other_amenities: [] }, { photos: [] }
                                      # :availability
                                      )
    end

end
