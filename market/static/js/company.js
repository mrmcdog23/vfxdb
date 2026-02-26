// Data for grid items
const items = [
  { id: 1, name: "Arctic Fox", category: "animal", region: "Arctic", tags: ["mammal", "wild"], avatar: "freya-hewett.png", countries: ["france", "brazil", "japan", "england"] },
  { id: 2, name: "Bonsai Tree", category: "plant", region: "Asia", tags: ["ornamental", "slow-growing"], avatar: "georgia-chalkley.png", countries: [] },
  { id: 3, name: "Monarch Butterfly", category: "insect", region: "Americas", tags: ["migratory", "colorful"], countries: [] },
  { id: 4, name: "Snow Leopard", category: "animal", region: "Asia", tags: ["mammal", "endangered"], countries: [] },
  { id: 5, name: "Venus Flytrap", category: "plant", region: "Americas", tags: ["carnivorous", "rare"] , countries: [] },
  { id: 6, name: "Firefly", category: "insect", region: "Americas", tags: ["bioluminescent", "nocturnal"], countries: ["japan", "england"]},
  { id: 7, name: "Red Panda", category: "animal", region: "Asia", tags: ["mammal", "endangered"], avatar: "tom-clapp.png", countries: [] },
  { id: 8, name: "Baobab Tree", category: "plant", region: "Africa", tags: ["ancient", "iconic"] , countries: [] },
  { id: 9, name: "Morpho Butterfly", category: "insect", region: "Americas", tags: ["colorful", "tropical"] , countries: [] },
  { id: 10, name: "Arctic Wolf", category: "animal", region: "Arctic", tags: ["mammal", "predator"], countries: ["france", "brazil", "japan"], countries: [] },
  { id: 11, name: "Lotus", category: "plant", region: "Asia", tags: ["aquatic", "ornamental"], countries: [] },
  { id: 12, name: "Praying Mantis", category: "insect", region: "Africa", tags: ["predator", "camouflage"], countries: ["france"], countries: [] },
];


// ── State ──
let activeCategories = new Set();
let activeRegions    = new Set();
let searchQuery      = '';

// ── Build filter chips dynamically from data ──
const categories = [...new Set(items.map(i => i.category))];
const regions    = [...new Set(items.map(i => i.region))];
const countries = [...new Set(items.map(i => i.countries))];


function buildChips(values, containerId, activeSet) {
  const container = document.getElementById(containerId);
  values.forEach(val => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = val;
    btn.addEventListener('click', () => {
      if (activeSet.has(val))
      {
        activeSet.delete(val);
        btn.classList.remove('active');
      }
      else
      {
        activeSet.add(val);
        btn.classList.add('active');
      }
      renderGrid();
    });
    container.appendChild(btn);
  });
}

function populateCountryFilter(countries)
    {
    const all_countries = [];
    countries.forEach(item => {
        item.forEach(country => {
            if (!all_countries.includes(country))
                {
                all_countries.push(country);
                }
            });
        });
    all_countries.sort();

    const select = document.getElementById("filterCountries");
    all_countries.forEach(place => {
        const option = document.createElement("option");
        option.value = place.toLowerCase();
        option.textContent = place;
        select.appendChild(option);
    });
}

populateCountryFilter(countries);
buildChips(categories, 'category-chips', activeCategories);
buildChips(regions,    'region-chips',    activeRegions);

// ── Search input ──
document.getElementById('search').addEventListener('input', e => {
searchQuery = e.target.value.toLowerCase().trim();
renderGrid();
});

// ── Render ──
function renderGrid() {
const grid  = document.getElementById('grid');
const empty = document.getElementById('empty');

// Filter
const filtered = items.filter(item => {
  const matchCat    = activeCategories.size === 0 || activeCategories.has(item.category);
  const matchRegion = activeRegions.size    === 0 || activeRegions.has(item.region);
  const matchSearch = !searchQuery ||
    item.name.toLowerCase().includes(searchQuery) ||
    item.tags.some(t => t.toLowerCase().includes(searchQuery));
  return matchCat && matchRegion && matchSearch;
});

// Clear existing cards (keep empty state node)
[...grid.querySelectorAll('.card')].forEach(c => c.remove());

document.getElementById('count').textContent = filtered.length;

if (filtered.length === 0) {
  empty.style.display = 'block';
  return;
}
empty.style.display = 'none';



function createImageGrid(countries, perRow = 4) {
  let html = '\n';
  if (countries == undefined) {
    return html;
  }
  for (let i = 0; i < countries.length; i += perRow) {
    html += '  <div class="row">\n';
    const rowImages = countries.slice(i, i + perRow);
    rowImages.forEach((src) => {
      html += `<img width="50px" style="padding: 5px;" src="static/src/flags/${src}.svg" />\n`;
    });
    html += "  </div>\n";
  }
  return html;
}




filtered.forEach((item, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.animationDelay = `${i * 40}ms`;

  // override the avatar if undefined
  if (item.avatar == null) {
    item.avatar = "default-avatar.png";}

  flags_html = createImageGrid(item.countries);

  // build the card html
  card.innerHTML = `
    <div class="card-category">${item.category}</div>
    <div class="col">
    <img  height="150px" width="150px" src="static/src/logos/${item.avatar}">
    </div>
    <div class="card-name">${item.name}</div>
    <div class="card-region">📍 ${item.region}</div>
    ${flags_html}
    <div class="card-tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;
  grid.appendChild(card);
});
}

// ── Initial render ──
renderGrid();
