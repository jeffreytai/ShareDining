class Kitchen < ActiveRecord::Base

  before_validation :set_token, on: :create
  validates_presence_of :token
  validates_uniqueness_of :token

  validates :title, presence: true
  validates :rental_space, presence: true
  validates :location, presence: true
  validates :price, presence: true
  # don't validate price for testing purposes

  belongs_to :user
  has_many :reservations, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_one :availability, dependent: :destroy

  # Mount photos to kitchen
  mount_uploader :photos, PhotoUploader
  serialize :photos, JSON

  serialize :washing_station, Array
  serialize :food_preparation, Array
  serialize :cookware, Array
  serialize :storage, Array
  serialize :refrigeration, Array
  serialize :ovens_fryers, Array
  serialize :oven_equipment_and_storage, Array
  serialize :baking_and_pastry, Array
  serialize :other_equipment, Array
  serialize :other_amenities, Array

  # auto-fetch coordinates
  geocoded_by :location
  after_validation :geocode, if: ->(obj){ obj.location.present? and obj.location_changed? }

  protected
    def set_token
      self.token = rand(36**8).to_s(36) if self.new_record? and self.token.nil?
    end

end
