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
    @sort = params[:sort_kitchens]

    if !@index.present? || !@num_results.present? || !@location.present? || !@type.present? || !@sort.present?
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

    # if @size.present? && @size != 'any'
    #   # Change so that if there are no results in filtered_kitchens, do a search for the entire kitchen list
    #   @nearbyKitchens = @nearbyKitchens.select { |kitchen| kitchen.size.downcase == @size }
    # end

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
    params[:whole_kitchen] == "1" ? (@kitchen.rental_space = "Whole Kitchen") : (@kitchen.rental_space = "Shared Space")

    @availability = Availability.new

    @sunday_availability = params[:sunday_availability]
    @monday_availability = params[:monday_availability]
    @tuesday_availability = params[:tuesday_availability]
    @wednesday_availability = params[:wednesday_availability]
    @thursday_availability = params[:thursday_availability]
    @friday_availability = params[:friday_availability]
    @saturday_availability = params[:saturday_availability]

    if @kitchen.save
      @availability.kitchen_id = @kitchen.id
      parse_availability
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
                                      :cancellation_policy,
                                      { washing_station: [] }, { food_preparation: [] },
                                      { food_preparation: [] }, { cookware: [] }, { storage: [] },
                                      { refrigeration: [] }, { ovens_fryers: [] },
                                      { oven_equipment_and_storage: [] }, { baking_and_pastry: [] },
                                      { other_equipment: [] }, { other_amenities: [] }, { photos: [] }
                                      )
    end

    def parse_availability
      @sunday_time = @sunday_availability.split(',')
      if @sunday_time[0] == '0' && @sunday_time[1] == '0'
        @availability.sunday_start_time = nil
        @availability.sunday_end_time = nil
      else
        @availability.sunday_start_time = @sunday_time[0].to_i
        @availability.sunday_end_time = @sunday_time[1].to_i
      end

      @monday_time = @monday_availability.split(',')
      if @monday_time[0] == '0' && @monday_time[1] == '0'
        @availability.monday_start_time = nil
        @availability.monday_end_time = nil
      else
        @availability.monday_start_time = @monday_time[0].to_i
        @availability.monday_end_time = @monday_time[1].to_i
      end

      @tuesday_time = @tuesday_availability.split(',')
      if @tuesday_time[0] == '0' && @tuesday_time[1] == '0'
        @availability.tuesday_start_time = nil
        @availability.tuesday_end_time = nil
      else
        @availability.tuesday_start_time = @tuesday_time[0].to_i
        @availability.tuesday_end_time = @tuesday_time[1].to_i
      end

      @wednesday_time = @wednesday_availability.split(',')
      if @wednesday_time[0] == '0' && @wednesday_time[1] == '0'
        @availability.wednesday_start_time = nil
        @availability.wednesday_end_time = nil
      else
        @availability.wednesday_start_time = @wednesday_time[0].to_i
        @availability.wednesday_end_time = @wednesday_time[1].to_i
      end

      @thursday_time = @thursday_availability.split(',')
      if @thursday_time[0] == '0' && @thursday_time[1] == '0'
        @availability.thursday_start_time = nil
        @availability.thursday_end_time = nil
      else
        @availability.thursday_start_time = @thursday_time[0].to_i
        @availability.thursday_end_time = @thursday_time[1].to_i
      end

      @friday_time = @friday_availability.split(',')
      if @friday_time[0] == '0' && @friday_time[1] == '0'
        @availability.friday_start_time = nil
        @availability.friday_end_time = nil
      else
        @availability.friday_start_time = @friday_time[0].to_i
        @availability.friday_end_time = @friday_time[1].to_i
      end

      @saturday_time = @saturday_availability.split(',')
      if @saturday_time[0] == '0' && @saturday_time[1] == '0'
        @availability.saturday_start_time = nil
        @availability.saturday_end_time = nil
      else
        @availability.saturday_start_time = @saturday_time[0].to_i
        @availability.saturday_end_time = @saturday_time[1].to_i
      end
    end

end
