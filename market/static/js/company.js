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

// Get the grid container
const grid = document.getElementById("grid");

// Loop through items and build grid cards
items.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("grid-item");

  card.innerHTML = `
    <div class="icon">${item.id}</div>
    <div class="label">${item.name}</div>
    <div class="number">${item.category} in stock</div>
  `;

  grid.appendChild(card);
});