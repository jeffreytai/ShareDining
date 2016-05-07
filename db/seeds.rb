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
  washing_station: ["Washing up sink (Single compartment)", "Pre-rinse hose", "Mobile sink", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Knife rack", "Cook's kife", "Carving fork"],
  cookware: ["Stock pot (Large)", "Frying pan (Small)", "Cast iron pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection", "Countertop steamer", "Floor steamer", "Gas Floor Fryer"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan"],
  baking_and_pastry: ["Dry measuring cup", "Dough scrapers"],
  other_equipment: ["Meat slicer"],
  other_amenities: ["Wifi", "Toilets"],
  location: "54 Davies Street, London, Greater London, W1K 5HR",
  kitchen_rules_and_instructions: "None",
  price: 54,
  additional_details: "None"
)

Kitchen.create(
  title: "Baker's Kitchen",
  description: "This spacious kitchen is fully equipped with the professional grade baking tools needed to run a successful business.",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Single Pull-Down DownDoor)", "Hand wash sink", "Rubber service (wet) matts"],
  food_preparation: ["Work table with shelving underneath (Double unit)", "Knife rack", "Utility knives", "Pairing knife" , "Bread Knife", "Tongs", "Whisk", "Rolling pin", "Wooden spoon", "Slotted spoon", "Measuring spoon", "Spatula - large blade", "Spatula - small blade", "Ladle", "Thermometer", "Grip blade zester", "Box grater", "Conical Sieve", "Colander", "Prep Bowl (Large)", "Prep Bowl (Small)", "Strainers", "Chopping board (Plastic)", "Food processor"],
  cookware: ["Sauce pots (Large)", "Sauce pots (Medium)", "Saute pan (Large)", "Crepe pan"],
  storage: ["Sheet pan rack with caster (Large)", "Regency shelving stack", "Sheet pan", "1/4 size pan", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table", "Freezer (Double)", "Ice Machine"],
  ovens_fryers: ["Bakery depth double stack", "Portable range", "Counter top warming (Large)", "Microwave", "Sous vide machine (single unit)"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (small jug)", "Liquid measures (large jug)", "Countertop stand mixer", "Dough scrapers", "Spring form pan (Medium)", "Cake pan (Large)", "Cake pan (Small)", "Muffin pan"],
  other_equipment: ["Waffle maker", "Crepe plate"],
  other_amenities: ["Wifi", "Toilets", "Parking space (per car)"],
  location: "14 Woodside Rd, New Malden KT3 3AH, UK",
  kitchen_rules_and_instructions: "Please be respectful and do not damage the equipment we provide.",
  price: 107,
  additional_details: "None"
)

Kitchen.create(
  title: "Liverpool's Top Kitchen",
  description: "This inspiring kitchen is located in (rich part), just a block away from the nearest grocery store.",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Triple compartment)", "Pre-rinse hose", "Mobile sink", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink", "Soap dispenser", "Rubber service (wet) mats"],
  food_preparation: ["Open base work top table (Double unit)", "Knife rack", "Cook's knife", "Knife sharpener", "Carving fork", "Grill turner", "Fish splice", "Chopping board (Wooden)", "Food processor"],
  cookware: ["Stock pot (Medium)", "Sauce pots (Large)", "Frying pan (Large)", "Saute pan (Large)",  "Cast iron pan (Large)", "Asian wok", "Crepe pan"],
  storage: ["Sheet pan rack with caster (Large)", "Food storage containers (Large)"],
  refrigeration: ["Reach-In Fridge (Full)", "Refrigerated prep table", "Freezer (Single)"],
  ovens_fryers: ["Double stack convection", "Countertop steamer", "Floor steamer", "Multi-ring range top with convection oven", "Gas Floor Fryer", "Electric Griddle", "Microwave", "Souse vide machine (single unit)", "Pressure cooker"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves", "Fryer basket"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (small jug)", "Warming drawers"],
  other_equipment: ["Panini grill", "Toaster", "Crepe plate"],
  other_amenities: ["Wifi", "Toilets"],
  location: "10 Westmorland Dr, Liverpool L3 6LR, UK",
  kitchen_rules_and_instructions: "None",
  price: 75,
  additional_details: "None"
)

Kitchen.create(
  title: "Huge Kitchen w/ Island",
  description: "Clean kitchen with newly-installed double stack oven. Less than a block from farmer's market.",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: [],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "42 Niall Cl, Birmingham, West Midlands B15 3NX, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None"
)

Kitchen.create(
  title: "Brockley",
  description: "Clean kitchen with newly-installed double stack oven. Less than a block from farmer's market.",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: [],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "96 Endwell Road, London SE4, UK",
  # latitude: 51.465924,
  # longitude: -0.038353,
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None"
)

Kitchen.create(
  title: "Bethnal Green",
  description: "Clean kitchen with newly-installed double stack oven. Less than a block from farmer's market.",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: [],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "6 Gales Gardens, London E2 0EJ, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None"
)

Kitchen.create(
  title: "Hackney Wick",
  description: "Clean kitchen with newly-installed double stack oven. Less than a block from farmer's market.",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: [],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "10 Stour Rd, London E3 2NT, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None"
)
