class Picture

  include Mongoid::Document
  include Mongoid::Paperclip

  embedded_in :kitchen, :inverse_of => :pictures

  has_mongoid_attached_file :attachment

end
