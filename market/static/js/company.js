// Data for grid items
const items = [
  { id: 1, name: "Arctic Fox", category: "animal", region: "Arctic", tags: ["mammal", "wild"] },
  { id: 2, name: "Bonsai Tree", category: "plant", region: "Asia", tags: ["ornamental", "slow-growing"] },
  { id: 3, name: "Monarch Butterfly", category: "insect", region: "Americas", tags: ["migratory", "colorful"] },
  { id: 4, name: "Snow Leopard", category: "animal", region: "Asia", tags: ["mammal", "endangered"] },
  { id: 5, name: "Venus Flytrap", category: "plant", region: "Americas", tags: ["carnivorous", "rare"] },
  { id: 6, name: "Firefly", category: "insect", region: "Americas", tags: ["bioluminescent", "nocturnal"] },
  { id: 7, name: "Red Panda", category: "animal", region: "Asia", tags: ["mammal", "endangered"] },
  { id: 8, name: "Baobab Tree", category: "plant", region: "Africa", tags: ["ancient", "iconic"] },
  { id: 9, name: "Morpho Butterfly", category: "insect", region: "Americas", tags: ["colorful", "tropical"] },
  { id: 10, name: "Arctic Wolf", category: "animal", region: "Arctic", tags: ["mammal", "predator"] },
  { id: 11, name: "Lotus", category: "plant", region: "Asia", tags: ["aquatic", "ornamental"] },
  { id: 12, name: "Praying Mantis", category: "insect", region: "Africa", tags: ["predator", "camouflage"] },
];

// ── State ──
let activeCategories = new Set();
let activeRegions    = new Set();
let searchQuery      = '';

// ── Build filter chips dynamically from data ──
const categories = [...new Set(items.map(i => i.category))];
const regions    = [...new Set(items.map(i => i.region))];

function buildChips(values, containerId, activeSet) {
const container = document.getElementById(containerId);
values.forEach(val => {
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.textContent = val;
  btn.addEventListener('click', () => {
    if (activeSet.has(val)) { activeSet.delete(val); btn.classList.remove('active'); }
    else                    { activeSet.add(val);    btn.classList.add('active');    }
    renderGrid();
  });
  container.appendChild(btn);
});
}

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

filtered.forEach((item, i) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.animationDelay = `${i * 40}ms`;
  card.innerHTML = `
    <div class="card-category">${item.category}</div>
    <div class="card-name">${item.name}</div>
    <div class="card-region">📍 ${item.region}</div>
    <div class="card-tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;
  grid.appendChild(card);
});
}

// ── Initial render ──
renderGrid();
