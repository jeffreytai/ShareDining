require 'time'

class KitchenController < ApplicationController

  # GET /kitchen/1
  # GET /kitchen/1.json
  def show
    @kitchen = Kitchen.find_by(token: params[:id])
    @censored_address = ('' == @kitchen.location.partition(',').last) ? @kitchen.location : @kitchen.location.partition(',').last
    @reservation = Reservation.new

    @availability = Availability.find_by kitchen_id: @kitchen.id

    # Need ajax call: when user selects date, the time ranges should be the kitchen's available hours
    @day = Date.today.strftime("%A").downcase

    @reviews = Review.where(kitchen_id: @kitchen.id)
    ratings = @reviews.map(&:rating)
    @avg_rating = ratings.inject(0.0) { |sum, el| sum + el } / ratings.length
  end

  # TODO: filter out any information that is not relevant for the results page,
  # TODO: ie SELECT price, name, image[0], lat, long, shared, size
  # GET /api/v1/kitchens
  # Returns a JSON array of relevant kitchens
  # GET parameters are as follows:
  # {Integer} index (required) - the starting index of relevant results to return
  # {Integer} num_results (required) - the number of relevant results to return
  # {String} location (required) - the location string
  # {String} type_of_kitchen - the type of kitchens to be returned. Values may include [any, whole, shared]
  # {String} size_of_kitchen  - the size of the kitchens to be returned. Values may include [any, large, small]
  def filter
    @start_date = params[:start_date]
    @index = params[:index] ? Integer(params[:index]) : nil
    @num_results = params[:num_results] ? Integer(params[:num_results]) : nil
    @location = params[:location]
    @type = params[:type_of_kitchen]
    @sort = params[:sort_kitchens]

    if !@start_date.present? || !@index.present? || !@num_results.present? || !@location.present? || !@type.present? || !@sort.present?
      render :nothing => true, :status => 400
      return
    end

    if @start_date.present?
      day = Time.parse(@start_date).strftime("%A").downcase
      @available_kitchens = Kitchen.joins(:availability).where("#{day} is not null")
      @nearbyKitchens = @available_kitchens.near(@location, 15)
    end

    # Filter between Whole Kitchen and Shared Space
    if @type.present? && @type != 'any'
      if @type == 'whole'
        @nearbyKitchens = @nearbyKitchens.select { |kitchen| kitchen.rental_space == 'Whole Kitchen' }
      elsif @type == 'shared'
        @nearbyKitchens = @nearbyKitchens.select { |kitchen| kitchen.rental_space == 'Shared Space' }
      end
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
    params[:whole_kitchen] == "1" ? (@kitchen.rental_space = "Whole Kitchen") : (@kitchen.rental_space = "Shared Space")

    @availability = Availability.new

    if @kitchen.save
      @availability.kitchen_id = @kitchen.id

      parse_availability
      @availability.save

      @photos = @kitchen.photos

      UserMailer.new_kitchen_email(User.find_by(id: @kitchen.user_id), @kitchen).deliver_now

      redirect_to kitchen_path(@kitchen.token)
      flash[:notice] = 'Kitchen was successfully added.'
    else
      respond_to do |format|
        if !params[:kitchen][:title].present?
          flash[:notice]='Error: Kitchen title is required'
	elsif !params[:kitchen][:description].present?
	  flash[:notice]='Error: Kitchen description is required'
 	elsif !params[:kitchen][:location].present?
	  flash[:notice]='Error: Kitchen location is required'
      	elsif !params[:kitchen][:price].present?
	  flash[:notice]='Error: Kitchen price is required'
	else
          flash[:notice] = 'Error: Kitchen was not successfully added.'
        end
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
      # Assigns availability attribute in format such as [3, 6], both digits are strings
      @sunday_availability = params[:sunday_availability]
      @monday_availability = params[:monday_availability]
      @tuesday_availability = params[:tuesday_availability]
      @wednesday_availability = params[:wednesday_availability]
      @thursday_availability = params[:thursday_availability]
      @friday_availability = params[:friday_availability]
      @saturday_availability = params[:saturday_availability]

      @sunday_time = @sunday_availability.split(',')
      @availability.sunday = (@sunday_time[0] == '0' && @sunday_time[1] == '0') ? nil : [@sunday_time[0], @sunday_time[1]]

      @monday_time = @monday_availability.split(',')
      @availability.monday = (@monday_time[0] == '0' && @monday_time[1] == '0') ? nil : [@monday_time[0], @monday_time[1]]

      @tuesday_time = @tuesday_availability.split(',')
      @availability.tuesday = (@tuesday_time[0] == '0' && @tuesday_time[1] == '0') ? nil : [@tuesday_time[0], @tuesday_time[1]]

      @wednesday_time = @wednesday_availability.split(',')
      @availability.wednesday = (@wednesday_time[0] == '0' && @wednesday_time[1] == '0') ? nil : [@wednesday_time[0], @wednesday_time[1]]

      @thursday_time = @thursday_availability.split(',')
      @availability.thursday = (@thursday_time[0] == '0' && @thursday_time[1] == '0') ? nil : [@thursday_time[0], @thursday_time[1]]

      @friday_time = @friday_availability.split(',')
      @availability.friday = (@friday_time[0] == '0' && @friday_time[1] == '0') ? nil : [@friday_time[0], @friday_time[1]]

      @saturday_time = @saturday_availability.split(',')
      @availability.saturday = (@saturday_time[0] == '0' && @saturday_time[1] == '0') ? nil : [@saturday_time[0], @saturday_time[1]]
    end

end
