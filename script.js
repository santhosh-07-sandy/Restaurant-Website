// === Menu Data ===
const menuItems = {
  breakfast: [
    { name: 'Idli Sambar', price: 40, img: 'images/idli.jpg' },
    { name: 'Dosa', price: 50, img: 'images/dosa.jpg' },
    { name: 'Pongal', price: 45, img: 'images/pongal.jpg' },
    { name: 'Upma', price: 35, img: 'images/upma.jpg' },
    { name: 'Poori Masala', price: 60, img:'images/Poori.jpg' },
    { name: 'Appam', price: 55, img: 'images/appam.jpg' },
    { name: 'Vada', price: 20, img: 'images/vada.jpg' },
    { name: 'Kesari', price: 25, img: 'images/kesari.jpg' },
    { name: 'Tea', price: 15, img: 'images/tea.jpg' },
    { name: 'Coffee', price: 20, img: 'images/coffee.jpg' }
  ],
  lunch: [
    { name: 'Veg Meals', price: 100, img: 'images/meals.jpg' },
    { name: 'Chicken Biryani', price: 180, img: 'images/biryani.jpg' },
    { name: 'Fish Curry', price: 150, img: 'images/fish.jpg' },
    { name: 'Paneer Butter Masala', price: 160, img: 'images/paneer.jpg' },
    { name: 'Tandoori Roti', price: 30, img: 'images/roti.jpg' },
    { name: 'Curd Rice', price: 60, img: 'images/curd-rice.jpg' },
    { name: 'MuttonCurry ', price: 220, img: 'images/mutton.jpg' },
    { name: 'Fried Rice', price: 90, img: 'images/fried-rice.jpg' },
    { name: 'Butter Naan', price: 40, img: 'images/naan.jpg' },
    { name: 'Lassi', price: 40, img: 'images/lassi.jpg' }
  ],
  dinner: [
    { name: 'Chapati Kurma', price: 70, img: 'images/chapati.jpg' },
    { name: 'Parotta', price: 60, img: 'images/parotta.jpg' },
    { name: 'Veg Noodles', price: 80, img: 'images/noodles.jpg' },
    { name: 'Egg Fried Rice', price: 100, img: 'images/egg-fried.jpg' },
    { name: 'Gobi Manchurian', price: 90, img: 'images/gobi.jpg' },
    { name: 'Kothu Parotta', price: 120, img: 'images/kothu.jpg' },
    { name: 'Chicken Lollipop', price: 150, img: 'images/lollipop.jpg' },
    { name: 'Veg Sandwich', price: 50, img: 'images/sandwich.jpg' },
    { name: 'Milkshake', price: 70, img: 'images/milkshake.jpg' },
    { name: 'Ice Cream', price: 60, img: 'images/icecream.jpg' }
  ]
};

const menuGrid = document.getElementById("menu-grid");
const billList = document.getElementById("bill-list");
const totalAmount = document.getElementById("total-amount");
const discountEl = document.getElementById("discount");
const gstEl = document.getElementById("gst");
const grandTotalEl = document.getElementById("grand-total");

let cart = [];

function showItems(category) {
  menuGrid.innerHTML = "";
  menuItems[category].forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart('${item.name}', ${item.price})">Add to Bill</button>
    `;
    menuGrid.appendChild(card);
  });
}

function addToCart(name, price) {
  const item = { name, price };
  cart.push(item);
  updateBill();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateBill();
}

// ----------------Mobile nav
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  menu.classList.toggle("show");

  const isVisible = menu.classList.contains("show");
  menuIcon.style.display = isVisible ? "none" : "inline";
  closeIcon.style.display = isVisible ? "inline" : "none";
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menu-icon");
  const closeIcon = document.getElementById("close-icon");

  menu.classList.remove("show");
  menuIcon.style.display = "inline";
  closeIcon.style.display = "none";
}


function updateBill() {
  billList.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    billList.appendChild(li);
  });

  const discount = total * 0.1;
  const gst = (total - discount) * 0.05;
  const grand = total - discount + gst;

  totalAmount.textContent = total.toFixed(2);
  discountEl.textContent = discount.toFixed(2);
  gstEl.textContent = gst.toFixed(2);
  grandTotalEl.textContent = grand.toFixed(2);
}

// === Star Rating ===
document.querySelectorAll(".stars i").forEach((star, index, stars) => {
  star.addEventListener("click", () => {
    stars.forEach((s, i) => {
      s.classList.toggle("active", i <= index);
    });
  });
});

// === Scroll to Top ===
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
};
scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
