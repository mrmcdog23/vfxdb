// Data for grid items
const items = [
  { icon: "🍎", label: "Apples",   count: 34 },
  { icon: "🍌", label: "Bananas",  count: 12 },
  { icon: "🍇", label: "Grapes",   count: 56 },
  { icon: "🍊", label: "Oranges",  count: 23 },
  { icon: "🍓", label: "Strawberries", count: 89 },
  { icon: "🍉", label: "Watermelon",   count: 7  },
  { icon: "🥝", label: "Kiwi",     count: 41 },
  { icon: "🍋", label: "Lemons",   count: 15 },
  { icon: "🍊", label: "Oranges",  count: 23 },
  { icon: "🍓", label: "Strawberries", count: 89 },
  { icon: "🍉", label: "Watermelon",   count: 7  },
  { icon: "🥝", label: "Kiwi",     count: 41 },
  { icon: "🍋", label: "Lemons",   count: 15 },
];

// Get the grid container
const grid = document.getElementById("grid");

// Loop through items and build grid cards
items.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("grid-item");

  card.innerHTML = `
    <div class="icon">${item.icon}</div>
    <div class="label">${item.label}</div>
    <div class="number">${item.count} in stock</div>
  `;

  grid.appendChild(card);
});