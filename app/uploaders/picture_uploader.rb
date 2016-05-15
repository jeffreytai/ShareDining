# encoding: utf-8
require 'carrierwave/processing/mini_magick'
class ProfilePhotoUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  include Sprockets::Helpers::RailsHelper
  include Sprockets::Helpers::IsolatedHelper

  storage :grid_fs

   # Override the directory where uploaded files will be stored.
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

   # Create different versions of your uploaded files:
   version :thumb do
     process :scale => [55, 55]
   end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  def default_url
    asset_path("fallback/" + [version_name, "default-photo.png"].compact.join('_'))
  end

end
