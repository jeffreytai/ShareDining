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
  'Ovens/Fryers': {
    'Convection': [
      'Double stack convection',
      'Single deck convection',
      'Bakery depth double stack'
    ],
    'Combination': [
      'Electric combination oven',
      'Gas combination oven'
    ],
    'Steam': [
      'Countertop steamer',
      'Floor steamer',
    ],
    'Ranges': [
      'Multi-ring range top with standard electric oven',
      'Multi-ring range top with convection oven',
      'Range with space saver over',
      'Range with storage space underneath',
      'Range with griddle',
      'Portable range',
      'Countertop electric range'
    ],
    'Fryers': [
      'Gas Floor Fryer',
      'Electric Counter top Fryer'
    ],
    'Warming': [
      'Counter top warming (Large)',
      'Counter top warming (Small)'
    ],
    'Sous vide': [
      'Sous vide machine (single unit)',
      'Sous vide machine (double unit)'
    ],
    'Other': [
      'Induction',
      'Electric Griddle',
      'Microwave',
      'Rice cooker',
      'Pressure cooker'
    ]
  },
  'Oven Equipment & Storage': [
    'Immersion fan',
    'Sheet pan',
    'Oven gloves',
    'Fryer basket'
  ],
  'Baking & Pastry': [
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
}, sectionKeys = [
  'washing_station',
  'food_preparation',
  'cookware',
  'storage',
  'refrigeration',
  'ovens_fryers',
  'oven_equipment_and_storage',
  'baking_and_pastry',
  'other_equipment',
  'other_amenities'
];


function dashReplace(str) {
  return str.toLowerCase().replace(/[-&]/g, ' ').replace(/ +/g, '-').replace(/[()/&]/g, '');
}

function htmlEntities(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function htmlText(tag, attr = {}, inner) {
  var attrs = Object.keys(attr).map((key) => `${key}="${attr[key]}"`).join(' ');

  if (inner) {
    return `<${tag} ${attrs}>${inner}</${tag}>`;
  } else {
    return `<${tag} ${attrs}>`;
  }
}

function checkboxFieldListItem(el, bigSectionSnakeCase) {
  var elNameDashed = dashReplace(el);

  return htmlText('li', { 'class': 'checkbox-fieldset-list-item' },
    `<%= check_box_tag 'kitchen[${bigSectionSnakeCase}][]', "${el}", @kitchen.${bigSectionSnakeCase}.include?("${el}"), id: "${elNameDashed}", class: "inventory-fieldlist-checkbox" %>
    <label for="${elNameDashed}">${htmlEntities(el)}</label>
    <input type="number" value="1" aria-label="${el} Quantity" step="1" min="1" class="inventory-quantity-input">`)
}

function generateInventoryHtml() {
  return Object.keys(kitchenInventoryList).map((bigSectionName, idx) => {
    var bigTitle = htmlText('legend', { 'class': 'fieldset-title' }, htmlEntities(bigSectionName)),
      element = kitchenInventoryList[bigSectionName],
      finalInner = bigTitle,
      bigTitleDashed = dashReplace(bigSectionName),
      bigSectionSnakeCase = sectionKeys[idx];

    if (Array.isArray(element)) {
      finalInner += htmlText('fieldset', { 'class': 'checkbox-fieldset' }, htmlText('ul', { 'class': 'checkbox-field-list' }, element.map((el) => checkboxFieldListItem(el, bigSectionSnakeCase)).join('\n')));
    } else {
      finalInner += Object.keys(element).map((sectionTitle) => {
        var inventoryArray = element[sectionTitle],
          elNameDashed = dashReplace(sectionTitle),
          sectionInner = htmlText('legend', { 'class': 'checkbox-fieldset-title' }, htmlEntities(sectionTitle)) +
            htmlText('ul', { 'class': 'checkbox-field-list' }, inventoryArray.map((el) => checkboxFieldListItem(el, bigSectionSnakeCase)).join('\n'));

        return htmlText('fieldset', { 'class': 'checkbox-fieldset' }, sectionInner);
      }).join('\n');
    }

    return htmlText('fieldset', { 'class': 'fieldset', 'id': bigTitleDashed }, finalInner);
  }).join('\n');
}

function generateMenuHtml() {
  return Object.keys(kitchenInventoryList).map(title => {
    var titleClass = dashReplace(title),
      linkHtml = htmlText('a', { 'class': 'kitchen-new-menu-link', 'href': `#${titleClass}` }, htmlEntities(title));

    return htmlText('li', { 'class': 'kitchen-new-side-menu-el' }, linkHtml);
  }).join('\n');
}
