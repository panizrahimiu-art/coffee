const flavors = {
  coffee: [
    {name:"Black Sesame", desc:"Nutty espresso, toasted sesame, cold milk.", price:7, emoji:"🫘", notes:["toasted","cacao","nutty"]},
    {name:"Brown Sugar", desc:"Dark sugar, vanilla, espresso and soft cream.", price:7, emoji:"🍯", notes:["caramel","vanilla","round"]},
    {name:"Salted Caramel", desc:"Sea salt, caramel cream and a deep roast.", price:8, emoji:"🧂", notes:["salty","sweet","deep"]},
    {name:"Cardamom", desc:"Green cardamom, milk and bright espresso.", price:8, emoji:"🌿", notes:["spiced","green","silky"]},
    {name:"Cinnamon", desc:"Warm cinnamon, brown sugar and cold espresso.", price:7, emoji:"🍂", notes:["warm","sweet","spice"]},
    {name:"Dark Mocha", desc:"Cacao, espresso and cold milk with a dark finish.", price:8, emoji:"🍫", notes:["cocoa","dark","smooth"]}
  ],
  matcha: [
    {name:"Uji Cloud", desc:"Ceremonial matcha, cold milk and a soft finish.", price:8, emoji:"🍵", notes:["umami","soft","green"]},
    {name:"Yuzu Matcha", desc:"Bright yuzu, stone-ground matcha and milk.", price:9, emoji:"🍋", notes:["citrus","bright","fresh"]},
    {name:"Black Sesame", desc:"Toasted sesame cream over vivid matcha.", price:9, emoji:"🫘", notes:["nutty","roasted","earthy"]},
    {name:"Strawberry", desc:"Jammy strawberry, matcha and cold milk.", price:9, emoji:"🍓", notes:["berry","sweet","green"]},
    {name:"Vanilla Matcha", desc:"Vanilla bean, ceremonial matcha and silk.", price:8, emoji:"🌱", notes:["vanilla","soft","creamy"]},
    {name:"Coconut", desc:"Cold coconut milk, matcha and a clean finish.", price:9, emoji:"🥥", notes:["coconut","clean","creamy"]}
  ]
};

let state = {
  theme: "coffee",
  index: 0,
  bag: []
};

const body = document.body;
const heroFlavor = document.getElementById("heroFlavor");
const heroDesc = document.getElementById("heroFlavorDesc");
const heroPrice = document.getElementById("heroPrice");
const heroCounter = document.getElementById("heroCounter");
const heroWheel = document.getElementById("heroWheel");
const progressDots = document.getElementById("progressDots");
const menuGrid = document.getElementById("menuGrid");
const drink = document.getElementById("drink");
const bagCount = document.getElementById("bagCount");
const bagDrawer = document.getElementById("bagDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const bagItems = document.getElementById("bagItems");
const bagTotal = document.getElementById("bagTotal");
const themeLabel = document.getElementById("themeLabel");

function currentFlavors() {
  return flavors[state.theme];
}

function setTheme(theme) {
  state.theme = theme;
  body.dataset.theme = theme;
  themeLabel.textContent = theme === "coffee" ? "midori" : "kuro";
  state.index = 0;
  renderAll();
}

function renderAll() {
  renderHero();
  renderMenu();
  renderMarquee();
  renderBag();
  lucide.createIcons();
}

function renderHero() {
  const list = currentFlavors();
  const item = list[state.index];
  heroFlavor.textContent = item.name;
  heroDesc.textContent = item.desc;
  heroPrice.textContent = "$" + item.price;
  heroCounter.textContent = `${String(state.index + 1).padStart(2,"0")} / ${String(list.length).padStart(2,"0")}`;

  progressDots.innerHTML = list.map((_,i) =>
    `<span class="progress-dot ${i===state.index ? "active":""}"></span>`
  ).join("");

  heroWheel.innerHTML = list.map((f,i) => {
    const angle = (i / list.length) * Math.PI * 2 - Math.PI/2;
    const r = 300;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const scale = i === state.index ? 1.15 : .9;
    return `<button class="ingredient-tile" data-index="${i}"
      style="left:calc(50% + ${x}px - 46px);top:calc(50% + ${y}px - 46px);transform:scale(${scale});"
      aria-label="${f.name}">${f.emoji}</button>`;
  }).join("");

  heroWheel.querySelectorAll(".ingredient-tile").forEach(btn => {
    btn.addEventListener("click", () => selectFlavor(Number(btn.dataset.index)));
  });

  drink.style.background = state.theme === "coffee"
    ? `linear-gradient(#${["6d3e24","795039","8a4f2b","6a4930","70402b","4a2719"][state.index]}, #27150e 70%)`
    : `linear-gradient(#${["6f8e42","829e4e","6d8443","a4a15a","79964e","5b773b"][state.index]}, #273818 70%)`;
}

function selectFlavor(index) {
  const list = currentFlavors();
  state.index = (index + list.length) % list.length;
  renderHero();
  lucide.createIcons();
}

function renderMenu() {
  const list = currentFlavors();
  menuGrid.innerHTML = list.map((f,i) => `
    <article class="flavor-card reveal">
      <div class="card-photo">
        <div class="ingredient-mini">${f.emoji}</div>
        <div class="price-pill">$${f.price}</div>
        <div class="emoji">${f.emoji}</div>
      </div>
      <div class="card-body">
        <h3>${f.name}</h3>
        <p>${f.desc}</p>
        <div class="notes">${f.notes.map(n => `<span class="note">${n}</span>`).join("")}</div>
        <button class="add-btn" data-add="${i}">
          <span>add to bag</span>
          <i data-lucide="plus"></i>
        </button>
      </div>
    </article>
  `).join("");

  menuGrid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = list[Number(btn.dataset.add)];
      addToBag(item);
      btn.classList.add("added");
      btn.innerHTML = `<span>added</span><i data-lucide="check"></i>`;
      lucide.createIcons();
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = `<span>add to bag</span><i data-lucide="plus"></i>`;
        lucide.createIcons();
      }, 1000);
    });
  });
  observeReveals();
}

function renderMarquee() {
  const names = currentFlavors().map(f => f.name);
  const content = [...names,...names,...names].map(n =>
    `<span>${n}<i></i></span>`
  ).join("");
  document.getElementById("marqueeTrack").innerHTML = content;
}

function addToBag(item) {
  state.bag.push({...item, id: crypto.randomUUID ? crypto.randomUUID() : Date.now()+Math.random()});
  bagCount.textContent = state.bag.length;
  bagCount.classList.remove("bump");
  void bagCount.offsetWidth;
  bagCount.classList.add("bump");
  renderBag();
}

function removeFromBag(id) {
  state.bag = state.bag.filter(x => x.id !== id);
  bagCount.textContent = state.bag.length;
  renderBag();
}

function renderBag() {
  if (!state.bag.length) {
    bagItems.innerHTML = `<div style="padding:20px 0;opacity:.5;font-size:12px;">Your bag is still empty.</div>`;
    bagTotal.textContent = "$0";
    return;
  }
  bagItems.innerHTML = state.bag.map(item => `
    <div class="bag-item">
      <div class="bag-thumb"></div>
      <div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <div>
        <strong>$${item.price}</strong>
        <button class="remove-item" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button>
      </div>
    </div>
  `).join("");
  const total = state.bag.reduce((sum,item) => sum + item.price, 0);
  bagTotal.textContent = "$" + total;
  bagItems.querySelectorAll("[data-remove]").forEach(btn =>
    btn.addEventListener("click", () => removeFromBag(btn.dataset.remove))
  );
}

function openBag() {
  bagDrawer.classList.add("open");
  drawerBackdrop.classList.add("show");
  bagDrawer.setAttribute("aria-hidden","false");
}
function closeBag() {
  bagDrawer.classList.remove("open");
  drawerBackdrop.classList.remove("show");
  bagDrawer.setAttribute("aria-hidden","true");
}

document.getElementById("themeToggle").addEventListener("click", () => {
  setTheme(state.theme === "coffee" ? "matcha" : "coffee");
});
document.getElementById("shuffleBtn").addEventListener("click", () => {
  selectFlavor(Math.floor(Math.random() * currentFlavors().length));
});
document.getElementById("menuShuffle").addEventListener("click", () => {
  selectFlavor(Math.floor(Math.random() * currentFlavors().length));
  document.getElementById("top").scrollIntoView({behavior:"smooth"});
});
document.getElementById("heroAdd").addEventListener("click", () => addToBag(currentFlavors()[state.index]));
document.getElementById("bagBtn").addEventListener("click", openBag);
document.getElementById("closeBag").addEventListener("click", closeBag);
drawerBackdrop.addEventListener("click", closeBag);

document.getElementById("motionBtn").addEventListener("click", e => {
  const paused = body.classList.toggle("motion-paused");
  e.currentTarget.setAttribute("aria-pressed", String(paused));
  e.currentTarget.innerHTML = `<i data-lucide="${paused ? "play" : "pause"}"></i>`;
  lucide.createIcons();
});

document.getElementById("joinForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!e.currentTarget.reportValidity()) return;
  e.currentTarget.style.display = "none";
  document.getElementById("successCard").classList.add("show");
});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") selectFlavor(state.index + 1);
  if (e.key === "ArrowLeft") selectFlavor(state.index - 1);
  if (e.key === "Escape") closeBag();
});

let wheelStartY = null;
window.addEventListener("wheel", e => {
  if (Math.abs(e.deltaY) < 8) return;
  if (!document.querySelector(".hero-stage")) return;
  if (window.scrollY < window.innerHeight * .8) {
    if (e.deltaY > 0) selectFlavor(state.index + 1);
    else if (e.deltaY < 0) selectFlavor(state.index - 1);
  }
}, {passive:true});

let touchStartY = null;
heroWheel.addEventListener("touchstart", e => touchStartY = e.touches[0].clientY, {passive:true});
heroWheel.addEventListener("touchend", e => {
  if (touchStartY == null) return;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dy) > 30) selectFlavor(state.index + (dy < 0 ? 1 : -1));
  touchStartY = null;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}
observeReveals();
renderAll();
