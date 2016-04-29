var kitchenInventoryList = {
  'Washing (Wet) station': {
    'Sinks': [
      'Washing up sink (Single compartment)',
      'Washing up sink (Double compartment)',
      'Washing up sink (Triple compartment)',
      'Pre-rinse hose',
      'Mobile sink'
    ],
    'Dishwasher': [
      'Dishwasher (Single Pull-Down DownDoor)',
      'Dishwasher (Double Pull-Down DownDoor)',
      'Dishwasher (Under Counter)',
      'Conveyor Dishwasher',
      'Glass washer'
    ],
    'Other': [
      'Drainboard',
      'Hand wash sink',
      'Soap dispenser',
      'Instant hand sanitizer',
      'Rubber service (wet) matts'
    ]
  },
  'Food Preparation Equipment & Utensils': {
    'Prep station / work table': [
      'Open base work top table (Double unit)',
      'Open base work top table (Single unit)',
      'Work table with shelving underneath (Double unit)',
      'Work table with shelving underneath (Single unit)',
      'Work table with cabinet underneath (Double unit)',
      'Work table with cabinet underneath (Single unit)'
    ],
    'Knives': [
      'Knife rack',
      "Cook's knife",
      'Utility knives',
      'Paring knife',
      'Bread knife',
      'Boning knife',
      'Meat cleaver',
      'Knife sharpener',
      'Carving fork'
    ],
    'Utensils': [
      'Tongs',
      'Whisk',
      'Rolling pin',
      'Wooden spoon',
      'Slotted spoon',
      'Measuring spoon',
      'Spatula - large blade',
      'Spatula – small blade',
      'Ladle',
      'Grill turner',
      'Fish splice',
      'Thermometer',
      'Grip blade zester',
      'Box grater'
    ],
    'Bowls & Sieves': [
      'Conical Sieve',
      'Sieve',
      'Colander',
      'Prep Bowl (Large)',
      'Prep Bowl (Small)',
      'Strainers'
    ],
    'Other': [
      'Chopping board (Plastic)',
      'Chopping board (Wooden)',
      'Food processor'
    ]
  },
  'Cookware': [
    'Stock pot (Large)',
    'Stock pot (Medium)',
    'Sauce pots (Large)',
    'Sauce pots (Small)',
    'Frying pan (Large)',
    'Frying pan (Small)',
    'Sauté pan (Large)',
    'Sauté pan (Small)',
    'Cast iron pan (Large)',
    'Cast iron pan (Small)',
    'Copper sauce pot (Large)',
    'Copper sauce pot (Small)',
    'Asian wok',
    'Crepe pan'
  ],
  'Storage': {
    'Food Storage Pans': [
      'Sheet pan rack with caster (Large)',
      'Sheet pan rack with caster (Small)',
      'Regency shelving stack',
      'Sheet pan',
      '1/2 Long pan',
      'Full size pan',
      'Half size pan',
      '1/3 size pan',
      '1/4 size pan',
      '1/6 size pan',
      '1/9 size pan'
    ],

    'Food storage containers': [
      'Food storage containers (Large)',
      'Food storage containers (Small)'
    ]
  },
  'Refrigeration': [
    'Walk-in refrigerator',
    'Reach-In fridge (Full)',
    'Low fridge (under counter)',
    'Refrigerated prep table',
    'Freezer (Double)',
    'Freezer (Single)',
    'Ice Machine'
  ],
  'Ovens/Fryers': [
    'Ovens',
    'Convection',
    'Double stack convection',
    'Single deck convection',
    'Bakery depth double stack',
    'Combination',
    'Electric combination oven',
    'Gas combination oven',
    'Steam',
    'Countertop steamer',
    'Floor steamer',
    'Ranges',
    'Multi-ring range top with standard electric oven',
    'Multi-ring range top with convection oven',
    'Range with space saver over',
    'Range with storage space underneath',
    'Range with griddle',
    'Portable range',
    'Countertop electric range',
    'Fryers',
    'Gas Floor Fryer',
    'Electric Counter top Fryer',
    'Induction',
    'Electric Griddle',
    'Warming',
    'Counter top warming (Large)',
    'Counter top warming (Small)',
    'Microwave',
    'Sous vide',
    'Sous vide machine (single unit)',
    'Sous vide machine (double unit)',
    'Rice cooker',
    'Pressure cooker'
  ],
  'Oven Equipment &amp; Storage': [
    'Immersion fan',
    'Sheet pan',
    'Oven gloves',
    'Fryer basket'
  ],
  'Baking &amp; Pastry': [
    'Dry measuring cup',
    'Liquid measures (small jug)',
    'Liquid measures (large jug)',
    'Countertop stand mixer',
    'Rotary sifter',
    'Dough scrapers',
    'Spring form pan (Large)',
    'Spring form pan (Medium)',
    'Spring form pan (Small)',
    'Cake pan (Large)',
    'Cake pan (Small)',
    'Muffin pan',
    'Proofing drawers',
    'Warming drawers'
  ],
  'Other Equipment': [
    'Meat slicer',
    'Panini grill',
    'Toaster',
    'Waffle maker',
    'Crepe plate'
  ],
  'Other Amenities': [
    'Wifi',
    'Toilets',
    'Parking space (per car)',
    'Office space',
    'Wheelchair accessible'
  ]
};

function htmlText(tag, attr = {}, inner) {
  var attrs = Object.keys(attr).map((key) => `${key}="${attr[key]}"`).join(',');

  if (inner) {
    return `<${tag} ${attrs}>${inner}</${tag}>`;
  } else {
    return `<${tag} ${attrs}>`;
  }
}

function checkboxFieldListItem(el) {
  var elNameDashed = el.replace(/ /g, '-').replace(/[()]/g, '').toLowerCase();

  return htmlText('li', { 'class': 'checkbox-fieldset-list-item' },
    `<%= f.check_box :washing_station, id: "${elNameDashed}", class: "inventory-fieldlist-checkbox" %>
    <label for="${elNameDashed}">${el}</label>
    <input type="number" value="1" aria-label="${el} Quantity" step="1" min="1" class="inventory-quantity-input">`)
}

Object.keys(kitchenInventoryList).map((bigSectionName) => {
  var bigTitle = htmlText('legend', { 'class': 'fieldset-title' }, bigSectionName),
    element = kitchenInventoryList[bigSectionName],
    finalInner = bigTitle;

  if (Array.isArray(element)) {
    finalInner += htmlText('fieldset', { 'class': 'checkbox-fieldset' }, htmlText('ul', { 'class': 'checkbox-field-list' }, element.map(checkboxFieldListItem).join('\n')));
  } else {
    finalInner += Object.keys(element).map((sectionTitle) => {
      var inventoryArray = element[sectionTitle],
        sectionInner = htmlText('legend', { 'class': 'checkbox-fieldset-title' }, sectionTitle) +
          htmlText('ul', { 'class': 'checkbox-field-list' }, inventoryArray.map(checkboxFieldListItem).join('\n'));

      return htmlText('fieldset', { 'class': 'checkbox-fieldset' }, sectionInner);
    }).join('\n');
  }

  return htmlText('fieldset', { 'class': 'fieldset' }, finalInner);
}).join('\n');