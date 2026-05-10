const pages = Array.from(document.querySelectorAll(".page"));
const navLinks = Array.from(document.querySelectorAll("[data-page]"));
const foodList = document.getElementById("foodList");
const requestsTable = document.getElementById("requestsTable");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const accountText = document.getElementById("accountText");
const logoutButton = document.getElementById("logoutButton");
const menuToggle = document.getElementById("menuToggle");
const drawerBackdrop = document.getElementById("drawerBackdrop");
const closeDrawerButton = document.getElementById("closeDrawer");
const pageNavToggle = document.getElementById("pageNavToggle");
const pageNavBackdrop = document.getElementById("pageNavBackdrop");
const closePageNavButton = document.getElementById("closePageNav");
const supportEmailLink = document.getElementById("supportEmailLink");
const supportPhoneLink = document.getElementById("supportPhoneLink");
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");
const rememberLoginInput = document.getElementById("rememberLogin");
const registerEmailInput = document.getElementById("registerEmail");
const loginEmailSuggestion = document.getElementById("loginEmailSuggestion");
const registerEmailSuggestion = document.getElementById("registerEmailSuggestion");
const csvImportInput = document.getElementById("csvImport");
const csvExportButton = document.getElementById("csvExport");
const locationTextInput = document.getElementById("locationText");
const locationLatInput = document.getElementById("locationLat");
const locationLngInput = document.getElementById("locationLng");
const pickupPlaceInput = document.getElementById("pickupPlace");
const deliveryModeInputs = Array.from(document.querySelectorAll('input[name="deliveryMode"]'));
const directLocationFields = document.getElementById("directLocationFields");
const useCurrentLocationButton = document.getElementById("useCurrentLocation");
const openMapButton = document.getElementById("openMap");
const mapPanel = document.getElementById("mapPanel");
const mapFrame = document.getElementById("mapFrame");
const mapSearchInput = document.getElementById("mapSearch");
const mapSearchButton = document.getElementById("mapSearchButton");
const mapResizeButton = document.getElementById("mapResize");
const confirmMapLocationButton = document.getElementById("confirmMapLocation");
const mapPin = document.getElementById("mapPin");
const deliveryLocationTextInput = document.getElementById("deliveryLocationText");
const deliveryPlaceInput = document.getElementById("deliveryPlace");
const deliveryLatInput = document.getElementById("deliveryLat");
const deliveryLngInput = document.getElementById("deliveryLng");
const openDeliveryMapButton = document.getElementById("openDeliveryMap");
const deliveryMapPanel = document.getElementById("deliveryMapPanel");
const deliveryMapFrame = document.getElementById("deliveryMapFrame");
const deliveryMapSearchInput = document.getElementById("deliveryMapSearch");
const deliveryMapSearchButton = document.getElementById("deliveryMapSearchButton");
const deliveryMapResizeButton = document.getElementById("deliveryMapResize");
const confirmDeliveryMapLocationButton = document.getElementById("confirmDeliveryMapLocation");
const deliveryMapPin = document.getElementById("deliveryMapPin");
const memoryStore = {};

let selectedFoodId = 1;
let activeFilter = "all";
let currentUser = "";
let selectedPin = {
  x: 50,
  y: 50
};

let selectedDeliveryPin = {
  x: 50,
  y: 50
};

currentUser = ""; safeRemoveStorage("naamahSession");

function safeGetStorage(key) {
  try {
    return localStorage.getItem(key) ?? memoryStore[key] ?? "";
  } catch (error) {
    return memoryStore[key] ?? "";
  }
}

function safeSetStorage(key, value) {
  memoryStore[key] = value;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`${key} was saved in memory only.`);
  }
}

function safeRemoveStorage(key) {
  delete memoryStore[key];
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`${key} was removed from memory only.`);
  }
}

const defaultFoods = [
  {
    id: 1,
    provider: "مطعم الخير",
    type: "وجبات جاهزة",
    servings: 24,
    district: "الياسمين",
    deliveryMode: "center",
    locationText: "الياسمين - الرياض",
    pickupPlace: "مطعم الخير - البوابة الخلفية",
    pickupInstructions: "الوصول من الباب الخلفي والتواصل مع موظف الاستقبال.",
    locationLat: "",
    locationLng: "",
    deliveryLocationText: "توزيع عبر مركز نعمة",
    deliveryPlace: "مركز نعمة",
    deliveryLat: "",
    deliveryLng: "",
    pickupTime: "21:30",
    condition: "مغلف",
    beneficiary: "عمال",
    notes: "وجبات رز ودجاج مغلفة وجاهزة للاستلام من باب المطعم الخلفي.",
    urgent: true
  },
  {
    id: 2,
    provider: "مخبز الحارة",
    type: "مخبوزات",
    servings: 35,
    district: "النرجس",
    deliveryMode: "direct",
    locationText: "النرجس - الرياض",
    pickupPlace: "مخبز الحارة",
    pickupInstructions: "الاستلام من الكاشير قبل الإغلاق.",
    locationLat: "",
    locationLng: "",
    deliveryLocationText: "جمعية خيرية في النرجس - الرياض",
    deliveryPlace: "جمعية الحي",
    deliveryLat: "",
    deliveryLng: "",
    pickupTime: "22:15",
    condition: "طازج",
    beneficiary: "أسر محتاجة",
    notes: "كرواسون وخبز طازج من إنتاج اليوم.",
    urgent: false
  },
  {
    id: 3,
    provider: "سوق المزرعة",
    type: "فواكه وخضار",
    servings: 18,
    district: "الملقا",
    deliveryMode: "direct",
    locationText: "الملقا - الرياض",
    pickupPlace: "سوق المزرعة - منطقة التحميل",
    pickupInstructions: "الدخول من منطقة التحميل واستلام الصناديق.",
    locationLat: "",
    locationLng: "",
    deliveryLocationText: "جمعية خيرية في الملقا - الرياض",
    deliveryPlace: "مستودع الجمعية",
    deliveryLat: "",
    deliveryLng: "",
    pickupTime: "20:45",
    condition: "يحتاج تبريد",
    beneficiary: "جمعية خيرية",
    notes: "صناديق فواكه وخضار بحالة جيدة وتحتاج نقل سريع.",
    urgent: true
  }
];

const defaultRequests = [
  {
    title: "مخبوزات",
    provider: "مخبز الحارة",
    district: "النرجس",
    deliveryMode: "direct",
    locationText: "النرجس - الرياض",
    pickupPlace: "مخبز الحارة",
    deliveryLocationText: "جمعية خيرية في النرجس - الرياض",
    deliveryPlace: "جمعية الحي",
    beneficiary: "أسر محتاجة",
    status: "قيد التنسيق"
  }
];

let foods = loadCollection("naamahFoodsDB", defaultFoods);
let requests = loadCollection("naamahRequestsDB", defaultRequests);

const volunteers = [
  {
    name: "سارة العتيبي",
    district: "النرجس",
    availability: "6:00 - 9:00 مساءً",
    specialty: "استلام وتوزيع",
    tasks: 12,
    status: "متاحة"
  },
  {
    name: "نورة خالد",
    district: "الياسمين",
    availability: "7:30 - 10:30 مساءً",
    specialty: "تنسيق الطلبات",
    tasks: 8,
    status: "قيد مهمة"
  },
  {
    name: "ريم السالم",
    district: "الملقا",
    availability: "5:00 - 8:00 مساءً",
    specialty: "نقل مبرد",
    tasks: 15,
    status: "متاحة"
  }
];

function showPage(pageId) {
  if (!currentUser && !["login", "register"].includes(pageId)) {
    pageId = "login";
  }

  pages.forEach((page) => page.classList.toggle("active", page.id === pageId));
  navLinks.forEach((link) => {
    if (link.classList.contains("nav-link")) {
      link.classList.toggle("active", link.dataset.page === pageId);
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (pageId === "impact") drawImpactChart();
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  safeSetStorage("naamahTheme", theme);
  if (themeLabel) themeLabel.textContent = theme === "dark" ? "Dark Mode" : "Light Mode";
  if (themeToggle) {
    themeToggle.checked = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
  persistDatabaseSnapshot();
}

function updateAccountText() {
  document.body.classList.toggle("is-authenticated", Boolean(currentUser));
  if (!currentUser) {
    closeDrawer();
    closePageNav();
  }
  accountText.textContent = currentUser ? `مسجل الدخول: ${currentUser}` : "لم يتم تسجيل الدخول بعد.";
}

function openDrawer() {
  if (!currentUser) return;
  document.body.classList.add("drawer-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  document.body.classList.remove("drawer-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function toggleDrawer() {
  if (document.body.classList.contains("drawer-open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
}

function openPageNav() {
  if (!currentUser) return;
  document.body.classList.add("page-nav-open");
  pageNavToggle?.setAttribute("aria-expanded", "true");
}

function closePageNav() {
  document.body.classList.remove("page-nav-open");
  pageNavToggle?.setAttribute("aria-expanded", "false");
}

function togglePageNav() {
  if (document.body.classList.contains("page-nav-open")) {
    closePageNav();
  } else {
    openPageNav();
  }
}

function loadRememberedLogin() {
  const rememberedLogin = safeGetStorage("naamahRememberLogin");
  if (!rememberedLogin) {
    const firstSavedUser = getUsersDatabase()[0];
    if (firstSavedUser) {
      loginEmailInput.value = firstSavedUser.email || "";
      loginPasswordInput.value = firstSavedUser.password ? decodeURIComponent(firstSavedUser.password) : "";
      rememberLoginInput.checked = true;
    }
    return;
  }

  try {
    const parsedLogin = JSON.parse(rememberedLogin);
    loginEmailInput.value = parsedLogin.email || "";
    loginPasswordInput.value = parsedLogin.password ? decodeURIComponent(parsedLogin.password) : "";
    rememberLoginInput.checked = true;
  } catch (error) {
    safeRemoveStorage("naamahRememberLogin");
  }
}

function rememberCurrentLoginChoice(email, password) {
  if (rememberLoginInput.checked) {
    safeSetStorage(
      "naamahRememberLogin",
      JSON.stringify({
        email,
        password: encodeURIComponent(password)
      })
    );
  } else {
    safeRemoveStorage("naamahRememberLogin");
  }
}

function saveRememberedLogin(email, password) {
  safeSetStorage(
    "naamahRememberLogin",
    JSON.stringify({
      email,
      password: encodeURIComponent(password)
    })
  );
  rememberLoginInput.checked = true;
  persistDatabaseSnapshot();
}

function getGmailSuggestion(value) {
  const cleanedValue = value.trim().replace(/\s+/g, "");
  if (!cleanedValue) return "";
  if (cleanedValue.includes("@")) {
    const [name, domain = ""] = cleanedValue.split("@");
    if (!name) return "";
    if ("gmail.com".startsWith(domain.toLowerCase())) {
      return `${name}@gmail.com`;
    }
    return "";
  }

  return `${cleanedValue}@gmail.com`;
}

function setupEmailSuggestion(input, button) {
  function updateSuggestion() {
    const suggestion = getGmailSuggestion(input.value);
    if (suggestion && suggestion !== input.value.trim()) {
      button.textContent = `استخدم ${suggestion}`;
      button.dataset.value = suggestion;
      button.classList.add("show");
    } else {
      button.textContent = "";
      button.dataset.value = "";
      button.classList.remove("show");
    }
  }

  input.addEventListener("input", updateSuggestion);
  button.addEventListener("click", () => {
    input.value = button.dataset.value;
    updateSuggestion();
    input.focus();
  });
}

function getUsersDatabase() {
  try {
    const savedUsers = JSON.parse(safeGetStorage("naamahUsersDB") || "[]");
    return Array.isArray(savedUsers) ? savedUsers : [];
  } catch (error) {
    safeRemoveStorage("naamahUsersDB");
    return [];
  }
}

function loadCollection(key, fallback) {
  try {
    const savedItems = JSON.parse(safeGetStorage(key) || "null");
    return Array.isArray(savedItems) ? savedItems : [...fallback];
  } catch (error) {
    return [...fallback];
  }
}

function saveCollection(key, items) {
  safeSetStorage(key, JSON.stringify(items));
  persistDatabaseSnapshot();
}

function persistDatabaseSnapshot() {
  const snapshot = {
    users: getUsersDatabase(),
    foods,
    requests,
    settings: {
      theme: safeGetStorage("naamahTheme") || "dark",
      rememberedLogin: safeGetStorage("naamahRememberLogin") || "",
      currentSession: safeGetStorage("naamahSession") || ""
    },
    updatedAt: new Date().toISOString()
  };

  safeSetStorage("naamahDatabase", JSON.stringify(snapshot));
}

function saveUserToDatabase(email, password) {
  const users = getUsersDatabase();
  const savedPassword = encodeURIComponent(password);
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    existingUser.password = savedPassword;
    existingUser.name = document.getElementById("registerName")?.value.trim() || existingUser.name || email;
    existingUser.updatedAt = new Date().toISOString();
  } else {
    users.push({
      email,
      name: document.getElementById("registerName")?.value.trim() || email,
      password: savedPassword,
      createdAt: new Date().toISOString()
    });
  }

  safeSetStorage("naamahUsersDB", JSON.stringify(users));
  persistDatabaseSnapshot();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function formatPickupTime(value) {
  if (!value) return "";

  // Keep one consistent format across the whole website: 12-hour time + AM/PM.
  const normalizedValue = String(value)
    .trim()
    .replace("صباحًا", "AM")
    .replace("مساءً", "PM");

  const match = normalizedValue.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return normalizedValue;

  let hours = Number(match[1]);
  const minutes = match[2];
  let period = match[3]?.toUpperCase();

  if (!period) {
    period = hours >= 12 ? "PM" : "AM";
  }

  if (hours > 12) {
    hours -= 12;
  }

  if (hours === 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${period}`;
}

function getFoodMapQuery(food) {
  if (food?.locationLat && food?.locationLng) {
    return `${food.locationLat},${food.locationLng}`;
  }
  return encodeURIComponent(food?.locationText || food?.district || "Riyadh");
}

function getDeliveryMapQuery(food) {
  if (food?.deliveryLat && food?.deliveryLng) {
    return `${food.deliveryLat},${food.deliveryLng}`;
  }
  return encodeURIComponent(food?.deliveryLocationText || food?.district || "Riyadh");
}

function openGoogleMaps(query) {
  const finalQuery = query || locationTextInput.value.trim() || document.getElementById("district").value.trim() || "Riyadh";
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(finalQuery)}`, "_blank", "noopener");
}

function updateEmbeddedMap(query) {
  const finalQuery = query || locationTextInput.value.trim() || document.getElementById("district").value.trim() || "Riyadh";
  mapSearchInput.value = finalQuery;
  mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(finalQuery)}&output=embed`;
  setMapPinPosition(50, 50);
}

function showEmbeddedMap(query) {
  mapPanel.classList.add("show");
  updateEmbeddedMap(query);
}

function updateDeliveryEmbeddedMap(query) {
  const finalQuery = query || deliveryLocationTextInput.value.trim() || document.getElementById("district").value.trim() || "Riyadh";
  deliveryMapSearchInput.value = finalQuery;
  deliveryMapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(finalQuery)}&output=embed`;
  setDeliveryMapPinPosition(50, 50);
}

function showDeliveryEmbeddedMap(query) {
  deliveryMapPanel.classList.add("show");
  updateDeliveryEmbeddedMap(query);
}

function getDeliveryModeLabel(value) {
  return value === "center" ? "نعمة يستلم من موقعي ويوزع" : "توصيل مباشر لمكان محدد";
}

function getSelectedDeliveryMode() {
  return deliveryModeInputs.find((input) => input.checked)?.value || "center";
}

function setSelectedDeliveryMode(value) {
  deliveryModeInputs.forEach((input) => {
    input.checked = input.value === value;
  });
}

function updateDeliveryModeView() {
  const isDirect = getSelectedDeliveryMode() === "direct";
  directLocationFields.classList.toggle("hidden", !isDirect);

  if (!isDirect) {
    deliveryMapPanel.classList.remove("show", "expanded");
    deliveryMapResizeButton.textContent = "تكبير";
    deliveryLocationTextInput.value = "نعمة تتولى التوزيع";
    deliveryPlaceInput.value = "مركز نعمة";
    deliveryLatInput.value = "";
    deliveryLngInput.value = "";
  } else if (deliveryLocationTextInput.value === "نعمة تتولى التوزيع" || deliveryLocationTextInput.value === "توزيع عبر مركز نعمة") {
    deliveryLocationTextInput.value = "";
    deliveryPlaceInput.value = "";
  }
}

function setMapPinPosition(x, y) {
  selectedPin = {
    x: Math.min(94, Math.max(6, x)),
    y: Math.min(94, Math.max(8, y))
  };
  mapPin.style.left = `${selectedPin.x}%`;
  mapPin.style.top = `${selectedPin.y}%`;
}

function setDeliveryMapPinPosition(x, y) {
  selectedDeliveryPin = {
    x: Math.min(94, Math.max(6, x)),
    y: Math.min(94, Math.max(8, y))
  };
  deliveryMapPin.style.left = `${selectedDeliveryPin.x}%`;
  deliveryMapPin.style.top = `${selectedDeliveryPin.y}%`;
}

function startPinDrag(event) {
  event.preventDefault();
  const wrapper = mapPin.closest(".map-frame-wrap");

  function movePin(pointerEvent) {
    const point = pointerEvent.touches ? pointerEvent.touches[0] : pointerEvent;
    const rect = wrapper.getBoundingClientRect();
    const x = ((point.clientX - rect.left) / rect.width) * 100;
    const y = ((point.clientY - rect.top) / rect.height) * 100;
    setMapPinPosition(x, y);
  }

  function stopDrag() {
    window.removeEventListener("mousemove", movePin);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", movePin);
    window.removeEventListener("touchend", stopDrag);
  }

  window.addEventListener("mousemove", movePin);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", movePin, { passive: false });
  window.addEventListener("touchend", stopDrag);
}


function startDeliveryPinDrag(event) {
  event.preventDefault();
  const wrapper = deliveryMapPin.closest(".map-frame-wrap");

  function movePin(pointerEvent) {
    const point = pointerEvent.touches ? pointerEvent.touches[0] : pointerEvent;
    const rect = wrapper.getBoundingClientRect();
    const x = ((point.clientX - rect.left) / rect.width) * 100;
    const y = ((point.clientY - rect.top) / rect.height) * 100;
    setDeliveryMapPinPosition(x, y);
  }

  function stopDrag() {
    window.removeEventListener("mousemove", movePin);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchmove", movePin);
    window.removeEventListener("touchend", stopDrag);
  }

  window.addEventListener("mousemove", movePin);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchmove", movePin, { passive: false });
  window.addEventListener("touchend", stopDrag);
}

function renderFoods() {
  const visibleFoods = activeFilter === "all" ? foods : foods.filter((food) => food.type === activeFilter);

  foodList.innerHTML = visibleFoods
    .map(
      (food) => `
        <article class="food-card">
          <header>
            <div>
              <h2>${food.type}</h2>
              <p>${food.provider}</p>
            </div>
            <span class="status ${food.urgent ? "urgent" : "available"}">${food.urgent ? "عاجل" : "متاح"}</span>
          </header>
          <div class="food-meta">
            <span><b>الحصص</b><strong>${food.servings}</strong></span>
            <span><b>الحي</b><strong>${food.district}</strong></span>
            <span><b>موقع الاستلام</b><strong>${food.locationText || food.district}</strong></span>
            <span><b>التوزيع</b><strong>${getDeliveryModeLabel(food.deliveryMode)}</strong></span>
            <span><b>موقع التسليم</b><strong>${food.deliveryLocationText || "توزيع عبر مركز نعمة"}</strong></span>
            <span><b>مكان الاستلام</b><strong>${food.pickupPlace || "غير محدد"}</strong></span>
            <span><b>الفئة</b><strong>${food.beneficiary || "غير محدد"}</strong></span>
            <span><b>الاستلام</b><strong>${formatPickupTime(food.pickupTime)}</strong></span>
          </div>
          <button class="card-button" type="button" data-details="${food.id}">عرض التفاصيل</button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-details]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedFoodId = Number(button.dataset.details);
      renderDetails();
      showPage("details");
    });
  });
}

function renderDetails() {
  const food = foods.find((item) => item.id === selectedFoodId) || foods[0];
  document.getElementById("detailTitle").textContent = food.type;
  document.getElementById("detailMeta").textContent = `${food.provider} - ${food.district}`;
  document.getElementById("detailServings").textContent = food.servings;
  document.getElementById("detailDistrict").textContent = food.district;
  document.getElementById("detailLocation").innerHTML = `<a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${getFoodMapQuery(food)}" target="_blank" rel="noopener">${food.locationText || food.district}</a>`;
  document.getElementById("detailPickupPlace").textContent = food.pickupPlace || "غير محدد";
  document.getElementById("detailDeliveryMode").textContent = getDeliveryModeLabel(food.deliveryMode);
  document.getElementById("detailDeliveryLocation").innerHTML =
    food.deliveryMode === "direct"
      ? `<a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${getDeliveryMapQuery(food)}" target="_blank" rel="noopener">${food.deliveryLocationText || "غير محدد"}</a>`
      : "مركز نعمة يتولى التوزيع";
  document.getElementById("detailDeliveryPlace").textContent =
    food.deliveryMode === "direct" ? (food.deliveryPlace || "غير محدد") : "مركز نعمة";
  document.getElementById("detailTime").textContent = formatPickupTime(food.pickupTime);
  document.getElementById("detailCondition").textContent = food.condition;
  document.getElementById("detailBeneficiary").textContent = food.beneficiary || "غير محدد";
  document.getElementById("detailNotes").textContent = food.notes;
  document.getElementById("detailPickupInstructions").textContent = food.pickupInstructions ? `تعليمات الاستلام: ${food.pickupInstructions}` : "";
}

function renderRequests() {
  if (requests.length === 0) {
    requestsTable.innerHTML = `<tr><td colspan="6">لا توجد طلبات حتى الآن.</td></tr>`;
    return;
  }

  requestsTable.innerHTML = requests
    .map(
      (request) => `
        <tr>
          <td>${request.title}</td>
          <td>${request.provider}</td>
          <td>${request.district}</td>
          <td>${request.beneficiary || "غير محدد"}</td>
          <td>${getDeliveryModeLabel(request.deliveryMode)}</td>
          <td><span class="status requested">${request.status}</span></td>
        </tr>
      `
    )
    .join("");
}

function renderVolunteerDashboard() {
  const totalServings = foods.reduce((sum, food) => sum + Number(food.servings), 0);
  document.getElementById("openTasks").textContent = foods.length;
  document.getElementById("totalServings").textContent = totalServings;
  document.getElementById("activeRequests").textContent = requests.length;

  document.getElementById("volunteerCards").innerHTML = volunteers
    .map(
      (volunteer) => `
        <article class="volunteer-card">
          <div class="avatar">${volunteer.name.charAt(0)}</div>
          <div>
            <h2>${volunteer.name}</h2>
            <p>${volunteer.specialty}</p>
          </div>
          <ul>
            <li><span>الحي</span><strong>${volunteer.district}</strong></li>
            <li><span>التوفر</span><strong>${volunteer.availability}</strong></li>
            <li><span>المهام</span><strong>${volunteer.tasks}</strong></li>
          </ul>
          <span class="status ${volunteer.status === "متاحة" ? "available" : "urgent"}">${volunteer.status}</span>
        </article>
      `
    )
    .join("");

  document.getElementById("volunteerTimeline").innerHTML = foods
    .map(
      (food) => `
        <article class="timeline-item">
          <div>
            <strong>${food.provider}</strong>
            <span>${food.type} - ${food.district}</span>
          </div>
          <span class="status ${food.urgent ? "urgent" : "available"}">${formatPickupTime(food.pickupTime)}</span>
        </article>
      `
    )
    .join("");
}

function renderImpactNumbers() {
  const savedMeals = foods.reduce((sum, food) => sum + Number(food.servings), 0) + requests.length * 8;
  const providers = new Set(foods.map((food) => food.provider));
  const districts = new Set(foods.map((food) => food.district));

  document.getElementById("savedMeals").textContent = savedMeals;
  document.getElementById("providersCount").textContent = providers.size;
  document.getElementById("districtsCount").textContent = districts.size;
  renderImpactAnalysis();
}

function drawImpactChart() {
  const chart = document.getElementById("impactChart");
  const counts = foods.reduce((result, food) => {
    result[food.type] = (result[food.type] || 0) + food.servings;
    return result;
  }, {});
  const entries = Object.entries(counts);
  const total = entries.reduce((sum, entry) => sum + entry[1], 0);
  const colors = ["#8a4fff", "#ff8fc7", "#b98cff", "#c95b8e", "#ffc6df"];

  if (total === 0) {
    chart.innerHTML = `<p class="empty-chart">لا توجد بيانات كافية للرسم</p>`;
    return;
  }

  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const slices = entries
    .map(([label, value], index) => {
      const dash = (value / total) * circumference;
      const slice = `
        <circle
          class="donut-slice"
          r="${radius}"
          cx="120"
          cy="120"
          fill="transparent"
          stroke="${colors[index % colors.length]}"
          stroke-width="38"
          stroke-dasharray="${dash} ${circumference - dash}"
          stroke-dashoffset="${-offset}"
          data-label="${label}"
          data-value="${value}"
        />
      `;
      offset += dash;
      return slice;
    })
    .join("");

  const legend = entries
    .map(([label, value], index) => {
    const percentage = Math.round((value / total) * 100);
      return `
        <button class="legend-row" type="button" data-type="${label}">
          <span style="background:${colors[index % colors.length]}"></span>
          <strong>${label}</strong>
          <em>${value} حصة - ${percentage}%</em>
        </button>
      `;
    })
    .join("");

  chart.innerHTML = `
    <div class="donut-wrap">
      <svg class="donut-svg" viewBox="0 0 240 240" role="img" aria-label="توزيع الفوائض حسب النوع">
        <circle r="${radius}" cx="120" cy="120" fill="transparent" stroke="rgba(255,255,255,0.08)" stroke-width="38"></circle>
        <g transform="rotate(-90 120 120)">${slices}</g>
      </svg>
      <div class="donut-center">
        <strong>${total}</strong>
        <span>حصة</span>
      </div>
    </div>
    <div class="chart-legend">${legend}</div>
  `;

  document.querySelectorAll(".legend-row").forEach((row) => {
    row.addEventListener("click", () => {
      activeFilter = row.dataset.type;
      document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("active"));
      renderFoods();
      showPage("list");
    });
  });
}

function renderImpactAnalysis() {
  const totalServings = foods.reduce((sum, food) => sum + Number(food.servings), 0);
  const typeTotals = foods.reduce((result, food) => {
    result[food.type] = (result[food.type] || 0) + Number(food.servings);
    return result;
  }, {});
  const districtTotals = foods.reduce((result, food) => {
    result[food.district] = (result[food.district] || 0) + 1;
    return result;
  }, {});
  const topType = Object.entries(typeTotals).sort((a, b) => b[1] - a[1])[0] || ["لا يوجد", 0];
  const topDistrict = Object.entries(districtTotals).sort((a, b) => b[1] - a[1])[0] || ["لا يوجد", 0];
  const urgentCount = foods.filter((food) => food.urgent).length;
  const requestRate = foods.length ? Math.round((requests.length / foods.length) * 100) : 0;
  const beneficiaryTotals = foods.reduce((result, food) => {
    const beneficiary = food.beneficiary || "غير محدد";
    result[beneficiary] = (result[beneficiary] || 0) + Number(food.servings);
    return result;
  }, {});
  const topBeneficiary = Object.entries(beneficiaryTotals).sort((a, b) => b[1] - a[1])[0] || ["لا يوجد", 0];

  document.getElementById("impactAnalysis").innerHTML = `
    <article>
      <span>أكثر نوع توفرًا</span>
      <strong>${topType[0]}</strong>
      <p>${topType[1]} حصة من أصل ${totalServings}</p>
    </article>
    <article>
      <span>أكثر حي نشاطًا</span>
      <strong>${topDistrict[0]}</strong>
      <p>${topDistrict[1]} فوائض مخزنة</p>
    </article>
    <article>
      <span>الفوائض العاجلة</span>
      <strong>${urgentCount}</strong>
      <p>تحتاج متابعة أسرع</p>
    </article>
    <article>
      <span>نسبة الطلبات</span>
      <strong>${requestRate}%</strong>
      <p>${requests.length} طلب من ${foods.length} فائض</p>
    </article>
    <article>
      <span>أكثر فئة مستفيدة</span>
      <strong>${topBeneficiary[0]}</strong>
      <p>${topBeneficiary[1]} حصة موجهة لها</p>
    </article>
  `;

  document.getElementById("impactDataTable").innerHTML = `
    <table>
      <thead>
        <tr>
          <th>النوع</th>
          <th>الجهة</th>
          <th>الحي</th>
          <th>الفئة المستفيدة</th>
          <th>الحصص</th>
        </tr>
      </thead>
      <tbody>
        ${foods
          .map(
            (food) => `
              <tr>
                <td>${food.type}</td>
                <td>${food.provider}</td>
                <td>${food.district}</td>
                <td>${food.beneficiary || "غير محدد"}</td>
                <td>${food.servings}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function refreshAll() {
  renderFoods();
  renderDetails();
  renderRequests();
  renderVolunteerDashboard();
  renderImpactNumbers();
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    showPage(link.dataset.page);
    closeDrawer();
    closePageNav();
  });
});

document.querySelectorAll(".drawer-link[data-page]").forEach((link) => {
  link.addEventListener("click", () => {
    showPage(link.dataset.page);
    closeDrawer();
  });
});

menuToggle.addEventListener("click", toggleDrawer);
drawerBackdrop.addEventListener("click", closeDrawer);
closeDrawerButton.addEventListener("click", closeDrawer);
pageNavToggle?.addEventListener("click", togglePageNav);
pageNavBackdrop?.addEventListener("click", closePageNav);
closePageNavButton?.addEventListener("click", closePageNav);

supportEmailLink.addEventListener("click", () => {
  showToast("سيتم فتح تطبيق البريد لإرسال رسالة للدعم.");
});

supportPhoneLink.addEventListener("click", () => {
  showToast("سيتم فتح الاتصال إذا كان الجهاز يدعم المكالمات.");
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = registerEmailInput.value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
    showToast("اكتب الاسم والبريد وكلمة المرور أولًا.");
    return;
  }

  saveUserToDatabase(email, password);
  saveRememberedLogin(email, password);
    loginEmailInput.value = email;
    loginPasswordInput.value = password;
  event.target.reset();
  showToast("تم حفظ المستخدم. جرّب تسجيل الدخول الآن.");
  showPage("login");
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value;

  if (!email || !password) {
    showToast("اكتب البريد وكلمة المرور أولًا.");
    return;
  }

  const savedUser = getUsersDatabase().find((user) => user.email === email);

  if (!savedUser) {
    showToast("البريد الإلكتروني غير مسجل.");
    return;
  }

  if (savedUser.password !== encodeURIComponent(password)) {
    showToast("كلمة المرور غير صحيحة.");
    return;
  }

  currentUser = savedUser.name || email;
  rememberCurrentLoginChoice(email, password);

  safeSetStorage("naamahSession", currentUser);
  persistDatabaseSnapshot();
  updateAccountText();
  showToast("تم تسجيل الدخول بنجاح.");
  showPage("home");
});

if (logoutButton) {
  logoutButton.onclick = () => {
    currentUser = "";
    safeRemoveStorage("naamahSession");
    persistDatabaseSnapshot();
    updateAccountText();
    showToast("تم تسجيل الخروج.");
    showPage("login");
    location.reload();
  };
}

themeToggle.addEventListener("change", () => {
  const nextTheme = themeToggle.checked ? "dark" : "light";
  applyTheme(nextTheme);
  showToast(nextTheme === "dark" ? "تم تفعيل الوضع الداكن." : "تم تفعيل الوضع الفاتح.");
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderFoods();
  });
});

deliveryModeInputs.forEach((input) => input.addEventListener("change", updateDeliveryModeView));

document.getElementById("foodForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const newFood = {
    id: Date.now(),
    provider: document.getElementById("provider").value.trim(),
    type: document.getElementById("foodType").value,
    servings: Number(document.getElementById("servings").value),
    district: document.getElementById("district").value.trim(),
    deliveryMode: getSelectedDeliveryMode(),
    locationText: locationTextInput.value.trim() || document.getElementById("district").value.trim(),
    locationLat: locationLatInput.value,
    locationLng: locationLngInput.value,
    pickupPlace: pickupPlaceInput.value.trim(),
    deliveryLocationText: getSelectedDeliveryMode() === "direct" ? deliveryLocationTextInput.value.trim() : "توزيع عبر مركز نعمة",
    deliveryPlace: getSelectedDeliveryMode() === "direct" ? deliveryPlaceInput.value.trim() : "مركز نعمة",
    deliveryLat: getSelectedDeliveryMode() === "direct" ? deliveryLatInput.value : "",
    deliveryLng: getSelectedDeliveryMode() === "direct" ? deliveryLngInput.value : "",
    pickupTime: document.getElementById("pickupTime").value,
    condition: document.getElementById("condition").value,
    beneficiary: document.getElementById("beneficiary").value,
    notes: document.getElementById("notes").value.trim() || "لا توجد ملاحظات إضافية.",
    pickupInstructions: document.getElementById("pickupInstructions").value.trim(),
    urgent: false,
    createdAt: new Date().toISOString()
  };

  if (!newFood.locationText || !newFood.pickupPlace) {
    showToast("حددي موقع الاستلام واسم مكان الاستلام أولًا.");
    return;
  }

  if (newFood.deliveryMode === "direct" && (!newFood.deliveryLocationText || !newFood.deliveryPlace)) {
    showToast("حددي موقع التسليم واسم مكان التسليم.");
    return;
  }

  foods.unshift(newFood);
  saveCollection("naamahFoodsDB", foods);
  selectedFoodId = newFood.id;
  event.target.reset();
  document.getElementById("servings").value = 10;
  setSelectedDeliveryMode("center");
  updateDeliveryModeView();
  refreshAll();
  showToast("تم نشر الفائض بنجاح.");
  showPage("list");
});

document.getElementById("requestButton").addEventListener("click", () => {
  const food = foods.find((item) => item.id === selectedFoodId);
  if (!food) return;

  requests.unshift({
    id: Date.now(),
    foodId: food.id,
    title: food.type,
    provider: food.provider,
    district: food.district,
    locationText: food.locationText || food.district,
    pickupPlace: food.pickupPlace || "غير محدد",
    deliveryMode: food.deliveryMode || "center",
    deliveryLocationText: food.deliveryLocationText || "توزيع عبر مركز نعمة",
    deliveryPlace: food.deliveryPlace || "مركز نعمة",
    beneficiary: food.beneficiary || "غير محدد",
    status: "قيد التنسيق",
    createdAt: new Date().toISOString()
  });
  saveCollection("naamahRequestsDB", requests);

  refreshAll();
  showToast("تم إنشاء طلب الاستلام.");
  showPage("requests");
});

function escapeCsv(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function exportFoodsToCsv() {
  const headers = ["id", "type", "provider", "district", "beneficiary", "servings", "pickupTime", "condition"];
  const rows = foods.map((food) => headers.map((header) => escapeCsv(food[header])).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "naamah-foods.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("تم تصدير ملف CSV يفتح في Excel.");
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;

  for (const char of line) {
    if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result.map((value) => value.trim());
}

function importFoodsFromCsv(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const lines = String(reader.result || "").split(/\r?\n/).filter(Boolean);
    const importedRows = lines.slice(1).map(parseCsvLine);
    const importedFoods = importedRows
      .map((row) => ({
        id: Number(row[0]) || Date.now() + Math.random(),
        type: row[1] || "وجبات جاهزة",
        provider: row[2] || "جهة غير محددة",
        district: row[3] || "غير محدد",
        beneficiary: row[4] || "غير محدد",
        servings: Math.max(1, Number(row[5]) || 1),
        pickupTime: row[6] || "20:00",
        condition: row[7] || "طازج",
        deliveryMode: "center",
        deliveryLocationText: "توزيع عبر مركز نعمة",
        deliveryPlace: "مركز نعمة",
        notes: "تم الاستيراد من ملف CSV.",
        urgent: false,
        createdAt: new Date().toISOString()
      }))
      .filter((food) => food.type && food.provider);

    if (importedFoods.length === 0) {
      showToast("ملف CSV لا يحتوي على بيانات صالحة.");
      return;
    }

    foods = importedFoods;
    selectedFoodId = foods[0].id;
    saveCollection("naamahFoodsDB", foods);
    refreshAll();
    drawImpactChart();
    showToast("تم استيراد البيانات وتحديث التحليل.");
  });
  reader.readAsText(file);
}

if (csvExportButton) {
  csvExportButton.addEventListener("click", exportFoodsToCsv);
}

if (csvImportInput) {
  csvImportInput.addEventListener("change", () => {
    const file = csvImportInput.files[0];
    if (file) importFoodsFromCsv(file);
    csvImportInput.value = "";
  });
}

useCurrentLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showToast("المتصفح لا يدعم تحديد الموقع.");
    return;
  }

  showToast("سيطلب المتصفح إذن الوصول للموقع.");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(6);
      const lng = position.coords.longitude.toFixed(6);
      locationLatInput.value = lat;
      locationLngInput.value = lng;
      locationTextInput.value = `استلام من موقعي الحالي (${lat}, ${lng})`;
      showEmbeddedMap(`${lat},${lng}`);
      showToast("تم تحديد الموقع بعد الموافقة.");
    },
    () => {
      showToast("لم يتم السماح بالوصول للموقع.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
});

openMapButton.addEventListener("click", () => {
  if (locationLatInput.value && locationLngInput.value) {
    showEmbeddedMap(`${locationLatInput.value},${locationLngInput.value}`);
    return;
  }

  showEmbeddedMap();
});

mapSearchButton.addEventListener("click", () => {
  updateEmbeddedMap(mapSearchInput.value.trim());
});

document.querySelectorAll("[data-map-chip]").forEach((button) => {
  button.addEventListener("click", () => {
    const district = document.getElementById("district").value.trim();
    const query = district ? `${button.dataset.mapChip} ${district}` : button.dataset.mapChip;
    updateEmbeddedMap(query);
  });
});

mapSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    updateEmbeddedMap(mapSearchInput.value.trim());
  }
});

mapResizeButton.addEventListener("click", () => {
  mapPanel.classList.toggle("expanded");
  mapResizeButton.textContent = mapPanel.classList.contains("expanded") ? "تصغير" : "تكبير";
});

confirmMapLocationButton.addEventListener("click", () => {
  const selectedLocation = mapSearchInput.value.trim() || locationTextInput.value.trim() || document.getElementById("district").value.trim();
  locationTextInput.value = `استلام من: ${selectedLocation} - دبوس (${Math.round(selectedPin.x)}%, ${Math.round(selectedPin.y)}%)`;
  mapPanel.classList.remove("expanded");
  mapResizeButton.textContent = "تكبير";
  showToast("تم تأكيد الموقع عند الدبوس.");
});


openDeliveryMapButton.addEventListener("click", () => {
  if (deliveryLatInput.value && deliveryLngInput.value) {
    showDeliveryEmbeddedMap(`${deliveryLatInput.value},${deliveryLngInput.value}`);
    return;
  }

  showDeliveryEmbeddedMap();
});

deliveryMapSearchButton.addEventListener("click", () => {
  updateDeliveryEmbeddedMap(deliveryMapSearchInput.value.trim());
});

document.querySelectorAll("[data-delivery-map-chip]").forEach((button) => {
  button.addEventListener("click", () => {
    const district = document.getElementById("district").value.trim();
    const query = district ? `${button.dataset.deliveryMapChip} ${district}` : button.dataset.deliveryMapChip;
    updateDeliveryEmbeddedMap(query);
  });
});

deliveryMapSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    updateDeliveryEmbeddedMap(deliveryMapSearchInput.value.trim());
  }
});

deliveryMapResizeButton.addEventListener("click", () => {
  deliveryMapPanel.classList.toggle("expanded");
  deliveryMapResizeButton.textContent = deliveryMapPanel.classList.contains("expanded") ? "تصغير" : "تكبير";
});

confirmDeliveryMapLocationButton.addEventListener("click", () => {
  const selectedLocation = deliveryMapSearchInput.value.trim() || deliveryLocationTextInput.value.trim() || document.getElementById("district").value.trim();
  deliveryLocationTextInput.value = `تسليم إلى: ${selectedLocation} - دبوس (${Math.round(selectedDeliveryPin.x)}%, ${Math.round(selectedDeliveryPin.y)}%)`;
  deliveryMapPanel.classList.remove("expanded");
  deliveryMapResizeButton.textContent = "تكبير";
  showToast("تم تأكيد موقع التسليم عند الدبوس.");
});

deliveryMapPin.addEventListener("mousedown", startDeliveryPinDrag);
deliveryMapPin.addEventListener("touchstart", startDeliveryPinDrag, { passive: false });

mapPin.addEventListener("mousedown", startPinDrag);
mapPin.addEventListener("touchstart", startPinDrag, { passive: false });

let savedTheme = "dark";
savedTheme = safeGetStorage("naamahTheme") || "dark";

applyTheme(savedTheme);
loadRememberedLogin();
setupEmailSuggestion(loginEmailInput, loginEmailSuggestion);
setupEmailSuggestion(registerEmailInput, registerEmailSuggestion);
updateAccountText();
updateDeliveryModeView();
saveCollection("naamahFoodsDB", foods);
saveCollection("naamahRequestsDB", requests);
refreshAll();
showPage(currentUser ? "home" : "login");


window.addEventListener("load", () => {
  const appLoader = document.getElementById("appLoader");
  if (appLoader) {
    setTimeout(() => appLoader.classList.add("hide"), 350);
  }
});
