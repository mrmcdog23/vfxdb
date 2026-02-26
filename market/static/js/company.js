// Data for grid items
const cards = [
  { id: 1,
  name: "Super Spline Studios",
  category: "2016",
  hq: "Leamington Spa",
  avatar: "supersplinestudios.png",
  tags: ["animation"],
  countries: ["england"],
  webpage: "https://www.supersplinestudios.com/"
  },
  { id: 2,
  name: "Brown Bag Films",
  category: "1994",
  hq: "Dublin",
  avatar: "brown_bag_films.png",
  tags: ["animation"],
  countries: ["ireland", "canada"],
  webpage: "https://www.brownbagfilms.com/"
  },
  { id: 3,
  name: "Golden Wolf",
  category: "2013",
  hq: "London",
  avatar: "golden_wolf.png",
  tags: ["animation"],
  countries: ["england"]
  },
  { id: 4,
  name: "Dneg",
  category: "1988",
  hq: "London",
  avatar: "dneg.png",
  tags: ["vfx", "animation", "previs"],
  countries: ["england", "spain", "usa", "australia", "canada", "india"],
  webpage: "https://www.dneg.com"
  },
  { id: 5,
  name: "Framestore",
  category: "1983",
  hq: "London",
  avatar: "framestore.png",
  tags: ["vfx", "animation", "previs", "editing"],
  countries: ["england", "usa", "australia", "canada", "india"],
  webpage: "https://www.framestore.com"
  },
  { id: 6,
  name: "Covert",
  category: "2016",
  hq: "London",
  avatar: "covert.png",
  tags: ["vfx"],
  countries: ["england"],
  webpage: "https://www.wearecovert.com"
  },
  { id: 7,
  name: "No8",
  category: "2022",
  hq: "London",
  avatar: "no8.png",
  tags: ["vfx", "editing"],
  countries: ["england"],
  webpage: "https://www.no8london.com"
  },
  { id: 8,
  name: "Red Knuckles",
  category: "2014",
  hq: "London",
  avatar: "redknuckles.png",
  tags: ["vfx"],
  countries: ["england"],
  webpage: "https://www.redknuckles.co.uk"
  },
  { id: 9,
  name: "Flying Bark Productions",
  category: "2004",
  hq: "Sydney",
  avatar: "flyingbark.png",
  tags: ["vfx"],
  countries: ["australia", "spain"],
  webpage: "https://www.flyingbark.com.au"
  },
  { id: 10,
  name: "The Third Floor",
  category: "2005",
  hq: "Los Angeles",
  avatar: "thethirdfloor.png",
  tags: ["previs"],
  countries: ["usa", "china", "england"],
  webpage: "https://www.thethirdfloorinc.com"
  },
  { id: 11,
  name: "Skydance Animation",
  category: "2015",
  hq: "Los Angeles",
  avatar: "skydance.png",
  tags: ["animation", "post-production"],
  countries: ["spain", "usa"],
  webpage: "https://www.skydance.com"
  },
];
const items = cards.sort((a, b) => a.name.localeCompare(b.name));

// ── State ──
let activeTags = new Set();
let activeHQs    = new Set();
let searchQuery      = '';

// ── Build filter chips dynamically from data ──
const categories = [...new Set(items.map(i => i.category))];
const headquarters = [...new Set(items.map(i => i.hq))];
const countries = [...new Set(items.map(i => i.countries))];
const all_tags = [...new Set(items.map(i => i.tags))];

const filterCountries = document.getElementById("filterCountries");

function buildCompanyTypeFilters(values, containerId, activeSet) {
    // build the list of countries from the set
    const tags_list = [];
    all_tags.forEach(tags => {
        tags.forEach(tag => {
            if (!tags_list.includes(tag)) {
                tags_list.push(tag);}
            });
        });
    tags_list.sort();


  const container = document.getElementById(containerId);
  tags_list.forEach(val => {
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

// get a list of all countries and sort it
// then add to the select filter box
function populateCountryFilter(countries)
    {

    // build the list of countries from the set
    const all_countries = ["all"];
    countries.forEach(item => {
        item.forEach(country => {
            if (!all_countries.includes(country)) {
                all_countries.push(country);}
            });
        });
    all_countries.sort();

    // add all the countries to the combo box
    all_countries.forEach(place => {
        const option = document.createElement("option");
        option.value = place.toLowerCase();
        option.textContent = place;
        filterCountries.appendChild(option);
    });
}

populateCountryFilter(countries);
buildCompanyTypeFilters(categories, 'category-chips', activeTags);

// ── Search input ──
document.getElementById('search').addEventListener('input', e => {
searchQuery = e.target.value.toLowerCase().trim();
renderGrid();
});

// connect the countries filter
filterCountries.addEventListener('change', renderGrid);

// ── Render ──
function renderGrid() {
    const grid  = document.getElementById('grid');
    const empty = document.getElementById('empty');
    console.log(activeTags)
    // Filter
    const filtered = items.filter(item => {
      const filterCountry = filterCountries.value;
      const matchCountry = filterCountry === 'all' || item.countries.includes(filterCountry);

      // check for matching categories
      activeCompanyType = false;
      for (const tag of item.tags) {
        if (activeTags.has(tag))
        {
           activeCompanyType = true;
           break;
        }
      };
      console.log(activeCompanyType)

      const matchCat    = activeTags.size === 0 || activeCompanyType;
      const matchRegion = activeHQs.size    === 0 || activeHQs.has(item.hq);
      const matchSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchCat && matchRegion && matchSearch && matchCountry;
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
    <div class="card-name">${item.name}</div>
    <img  height="150px" width="150px" src="static/src/logos/${item.avatar}">
    <div class="card-category">${item.category}</div>
    <div class="card-hq">📍 ${item.hq}</div>
    <div class="card-website"><a href=${item.webpage}>${item.webpage}</a></div>
    ${flags_html}
    <div class="card-tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;
  grid.appendChild(card);
});
}

// ── Initial render ──
renderGrid();
