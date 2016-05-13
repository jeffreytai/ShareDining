class KitchenController < ApplicationController

  # GET /kitchen/1
  # GET /kitchen/1.json
  def show
    @kitchen = Kitchen.find_by(token: params[:id])
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation = Reservation.new
  end

  # TODO: filter out any information that is not relevant for the results page,
  #   TODO: ie SELECT price, name, image[0], lat, long, shared, size
  # GET /api/v1/kitchens
  # Returns a JSON array of relevant kitchens
  # GET parameters are as follows:
  # {Integer} index (required) - the starting index of relevant results to return
  # {Integer} num_results (required) - the number of relevant results to return
  # {String} location (required) - the location string
  # {String} type_of_kitchen - the type of kitchens to be returned. Values may include [any, whole, shared]
  # {String} size_of_kitchen  - the size of the kitchens to be returned. Values may include [any, large, small]
  def filter
    @index = params[:index] ? Integer(params[:index]) : nil
    @num_results = params[:num_results] ? Integer(params[:num_results]) : nil
    @location = params[:location]
    @type = params[:type_of_kitchen]
    @size = params[:size_of_kitchen]
    @sort = params[:sort_kitchens]

    if !@index.present? || !@num_results.present? || !@location.present? || !@type.present? || !@size.present? || !@sort.present?
      render :nothing => true, :status => 400
      return
    end

    @nearbyKitchens = Kitchen.near(@location, 15)

    if @type.present? && @type != 'any'
      if @type == 'whole'
        @nearbyKitchens = @nearbyKitchens.select { |kitchen| kitchen.rental_space == 'Whole Kitchen' }
      elsif @type == 'shared'
        @nearbyKitchens = @nearbyKitchens.select { |kitchen| kitchen.rental_space == 'Shared Space' }
      end
    end

    if @size.present? && @size != 'any'
      # Change so that if there are no results in filtered_kitchens, do a search for the entire kitchen list
      @nearbyKitchens = @nearbyKitchens.select { |kitchen| kitchen.size.downcase == @size }
    end

    # Sort orders
    if @sort.present? && @sort != 'best_match'
      if @sort == 'price_low_to_high'
        @nearbyKitchens = @nearbyKitchens.sort_by &:price
      elsif @sort == 'price_high_to_low'
        @nearbyKitchens = (@nearbyKitchens.sort_by &:price).reverse!
      elsif @sort == 'newest_created'
        @nearbyKitchens = (@nearbyKitchens.sort_by &:created_at).reverse!
      end
    end

    # limit number of filtered kitchens to specified num_results
    if @nearbyKitchens.size <= @num_results
      @filtered_kitchens = @nearbyKitchens
    else
      @filtered_kitchens = @nearbyKitchens[@index...@index + @num_results]
    end


    render json: @filtered_kitchens
  end

  # GET /kitchen/new
  def new
    @kitchen = Kitchen.new
    @availability = Availability.new
  end

  # GET /kitchen/1/edit
  def edit
  end

  # POST /kitchen
  # POST /kitchen.json
  def create
    @kitchen = Kitchen.new(kitchen_params)
    @availability = Availability.new(availability_params)
    params[:whole_kitchen] == "1" ? (@kitchen.rental_space = "Whole Kitchen") : (@kitchen.rental_space = "Shared Space")

    if @kitchen.save
      @availability.kitchen_id = @kitchen.id
      puts @availability.kitchen_id
      @availability.save
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
                                      )
    end

    def availability_params
      params.require(:availability).permit(:sunday_start_time, :sunday_end_time, :monday_start_time,
                                          :monday_end_time, :tuesday_start_time, :tuesday_end_time,
                                          :wednesday_start_time, :wednesday_end_time, :thursday_start_time,
                                          :thursday_end_time, :friday_start_time, :friday_end_time,
                                          :saturday_start_time, :saturday_end_time
                                          )
    end

end
