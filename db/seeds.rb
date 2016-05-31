User.create(
  first_name: "Jeffrey",
  last_name: "Tai",
  email: "jeffreytai@ucla.edu",
  password: "password",
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
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'limited'
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
  additional_details: "None",
  user_id: 2,
  cancellation_policy: 'flexible'
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
  additional_details: "None",
  user_id: 3,
  cancellation_policy: 'strict'
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
  other_equipment: ["Panini grill"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "42 Niall Cl, Birmingham, West Midlands B15 3NX, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None",
  user_id: 4,
  cancellation_policy: 'limited'
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
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "96 Endwell Road, London SE4, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'strict'
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
  other_equipment: ["Panini grill"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "6 Gales Gardens, London E2 0EJ, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None",
  user_id: 2,
  cancellation_policy: 'strict'
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
  other_equipment: ["Panini grill"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "10 Stour Rd, London E3 2NT, UK",
  kitchen_rules_and_instructions: "None",
  price: 40,
  additional_details: "None",
  user_id: 3,
  cancellation_policy: 'flexible'
)

Kitchen.create(
  title: "The Meringue Girls",
  description: "Located in Hackney this kitchen space has been recently developed to the highest of standards. Currently owned by the Meringue Girls, the space has many potential uses such as running cooking classes, photo shoots or for food production.",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Hackney E8 4TS",
  kitchen_rules_and_instructions: "None",
  price: 115,
  additional_details: "None",
  user_id: 4,
  cancellation_policy: 'limited'
)

Kitchen.create(
  title: "Twickenham",
  description: "This is a fully functional commercial kitchen that was previously used full time by a  catering company. As well as the kitchen space there is a dining area to the front of the property that serves well for testing food with an audience or hosting a supper club. The kitchen itself is finished to a high standard with all the equipment you could need to start in the food business.",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Twickenham TW2 6QE UK",
  kitchen_rules_and_instructions: "None",
  price: 15,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'limited'
)
#
Kitchen.create(
  title: "London Fields",
  description: "This spacious tunnel arch kitchen space in East London has been fitted to the highest of standards. Located just a one minute walk from London fields overground station it is in a prime location, with good access to the city and central. The kitchen is currently run by a confectionery business that have some excess space so are looking for a trusted tenant to share.",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "London Greater London E8 3PH",
  kitchen_rules_and_instructions: "None",
  price: 85,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'strict'
)

Kitchen.create(
  title: "Whipps Cross",
  description: "No description",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Lea Bridge Road London Greater London E17 9DW",
  kitchen_rules_and_instructions: "None",
  price: 10,
  additional_details: "None",
  user_id: 4,
  cancellation_policy: 'strict'
)

Kitchen.create(
  title: "Stratford",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Portway London Greater London E15 3QN",
  kitchen_rules_and_instructions: "None",
  price: 62,
  additional_details: "None",
  user_id: 4,
  cancellation_policy: 'flexible'
)

Kitchen.create(
  title: "Brixton",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Upper Tulse Hill London Greater London",
  kitchen_rules_and_instructions: "None",
  price: 57,
  additional_details: "None",
  user_id: 3,
  cancellation_policy: 'flexible'
)

Kitchen.create(
  title: "Mitcham",
  description: "N/A",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Mitcham Road Croydon Greater London CR0 3RU",
  kitchen_rules_and_instructions: "None",
  price: 57,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'limited'
)

Kitchen.create(
  title: "Sutton",
  description: "N/A",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Sutton Greater London SM3 9HG",
  kitchen_rules_and_instructions: "None",
  price: 57,
  additional_details: "None",
  user_id: 2,
  cancellation_policy: 'flexible'
)

Kitchen.create(
  title: "Bexleyheath",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Watling Street Bexleyheath Greater London DA6 7QQ",
  kitchen_rules_and_instructions: "None",
  price: 10,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'strict'
)

Kitchen.create(
  title: "Balham",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Balham High Road London Greater London SW17 7BQ",
  kitchen_rules_and_instructions: "None",
  price: 50,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'strict'
)

Kitchen.create(
  title: "Blackheath",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "London Greater London SE3 0QZ",
  kitchen_rules_and_instructions: "None",
  price: 50,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'strict'
)

Kitchen.create(
  title: "Catford",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Bromley Road London Greater London SE6 2RH",
  kitchen_rules_and_instructions: "None",
  price: 405,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'limited'
)

Kitchen.create(
  title: "Southfields",
  description: "N/A",
  rental_space: "Whole Kitchen",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Merton Road London Greater London",
  kitchen_rules_and_instructions: "None",
  price: 405,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'flexible'
)

Kitchen.create(
  title: "Ewell",
  description: "N/A",
  rental_space: "Shared Space",
  washing_station: ["Washing up sink (Double compartment)", "Pre-rinse hose", "Drainboard", "Dishwasher (Under Counter)", "Hand wash sink"],
  food_preparation: ["Open base work top table (Double unit)", "Work table with cabinet underneath (Double unit)", "Knife rack", "Colander", "Prep Bowl (Large)"],
  cookware: ["Stock pot (Large)", "Frying pan (Large)"],
  storage: ["Regency shelving stack", "Food storage containers (Large)"],
  refrigeration: ["Walk-in refrigerator", "Refrigerated prep table"],
  ovens_fryers: ["Double stack convection"],
  oven_equipment_and_storage: ["Immersion fan", "Sheet pan", "Oven gloves"],
  baking_and_pastry: ["Dry measuring cup", "Liquid measures (Small jug)", "Proofing drawers"],
  other_equipment: ["Toaster"],
  other_amenities: ["Wifi", "Toilets", "Office space", "Wheelchair accessible"],
  location: "Epsom England",
  kitchen_rules_and_instructions: "None",
  price: 435,
  additional_details: "None",
  user_id: 1,
  cancellation_policy: 'limited'
)

Availability.create(
  kitchen_id: 1,
  sunday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 2,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 3,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 4,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 5,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 6,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 7,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 8,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 9,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 10,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 11,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 12,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 13,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 14,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 15,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 16,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 17,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 18,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 19,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 20,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Availability.create(
  kitchen_id: 21,
  sunday: ["1", "23"],
  monday: ["1", "23"],
  tuesday: ["1", "23"],
  wednesday: ["1", "23"],
  thursday: ["1", "23"],
  friday: ["1", "23"],
  saturday: ["1", "23"]
)

Review.create(
  kitchen_id: 1,
  user_id: 2,
  comment: "I really enjoyed using the Mayfair kitchen. It was clean, simple, and very large. Affordable as well! I used the kitchen to bake an order of 300 cookies and the double commercial Wolf oven was great! I will definitely be back to use the Mayfair kitchen!",
  rating: 4.0
)

Review.create(
  kitchen_id: 1,
  user_id: 3,
  comment: "The Mayfair kitchen was great for me and my team of 5 chefs. I used the kitchen to prep for an upcoming 5 course dinner and kitchen had everything I needed! The space was very large and clean. Will go back again!",
  rating: 3.0
)

Review.create(
  kitchen_id: 1,
  user_id: 4,
  comment: "My team and I used the Mayfair kitchen to prep for an upcoming service for about 20. The space had everything I needed, from knives to cookware. The double Wolf oven was a big help! The only complaint I have, is that the kitchen did not have a stand mixer—I needed to bring my own. Otherwise, I loved everything about it!",
  rating: 5.0
)

# Review.create(
#   kitchen_id: 1,
#   user_id: 5,
#   comment: "We enjoyed our accommodations. We were really only there to sleep. It was very clean and perfect for our two night stay near Arenal volcano. We arrived very late and appreciate the communication of the owner. She left our keys for us outside the place and the light on. The housekeeping was very thorough. Thank you!!",
#  rating: 2.0
# )
