# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(
  first_name: "Jeffrey",
  last_name: "Tai",
  email: "jeffreytai@ucla.edu",
  password: "jeffrey94",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

User.create(
  first_name: "Mahir",
  last_name: "Shah",
  email: "testuser1@gmail.com",
  password: "password",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

User.create(
  first_name: "James",
  last_name: "Kawakami",
  email: "testuser2@gmail.com",
  password: "password",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

User.create(
  first_name: "Justin",
  last_name: "Chen",
  email: "testuser3@gmail.com",
  password: "password",
  last_sign_in_at: Time.now,
  current_sign_in_at: Time.now,
  last_sign_in_ip: "::1",
  current_sign_in_ip: "::1"
)

Kitchen.create(
  title: "Mayfair",
  description: "This kitchen is located in the heart of central London just moments from Bond Street Tube station. Being in such a central location the space would suit a local restaurant or cafe in need of some extra space, catering company, or food delivery service.",
  rental_space: "Whole Kitchen",
  washing_station: [ "Washing up sink (Single compartment)", "Pre-rinse hose", "Mobile sink", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink" ],
  food_preparation: [ "Open base work top table (Double unit)", "Knife rack", "Cook's kife", "Carving fork" ],
  cookware: [ "Stock pot (Large)", "Frying pan (Small)", "Cast iron pan (Large)" ],
  storage: [ "Regency shelving stack", "Food storage containers (Large)" ],
  refrigeration: [ "Walk-in refrigerator", "Refrigerated prep table" ],
  ovens_fryers: [ "Double stack convection", "Countertop steamer", "Floor steamer", "Gas Floor Fryer" ],
  oven_equipment_and_storage: [ "Immersion fan", "Sheet pan" ],
  baking_and_pastry: [ "Dry measuring cup", "Dough scrapers" ],
  other_equipment: [ "Meat slicer" ],
  other_amenities: [ "Wifi", "Toilets" ],
  location: "54 Davies Street, London, Greater London, W1K 5HR",
  kitchen_rules_and_instructions: "None",
  availability: "All Fridays",
  price: 54,
  additional_details: "None"
)
