/* =========================================================
   Rockshake Agency — script.js
   Property data, rendering, forms, modal, nav behaviour.

   IMPORTANT FOR INTEGRATION:
   Replace WEBHOOK_URL below with your real n8n webhook URL.
   Every lead payload includes a "lead_type" field:
   "enquiry" | "viewing" | "valuation"
   ========================================================= */

const WEBHOOK_URL = "https://cele-stine.app.n8n.cloud/webhook-test/rockshake-leads";

/* ---------------------------------------------------------
   1. PROPERTY DATA
   --------------------------------------------------------- */
const PROPERTIES = [
  // ---------------- RENTALS ----------------
  {
    id: "rent-chelsea-townhouse",
    listingType: "rent",
    title: "Chelsea Townhouse",
    location: "Chelsea, London, UK",
    price: 2500,
    priceLabel: "€2,500",
    priceSuffix: "/month",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Townhouse",
    description: "A beautifully proportioned townhouse on a quiet Chelsea square, moments from the King's Road. Light-filled reception rooms open onto a private courtyard garden, with period detailing preserved throughout and a recently fitted kitchen at garden level.",
    features: ["Private courtyard garden", "Period detailing", "Recently fitted kitchen", "Close to King's Road", "Off-street parking", "Underfloor heating"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "rent-canary-wharf-apartment",
    listingType: "rent",
    title: "Canary Wharf Apartment",
    location: "Canary Wharf, London, UK",
    price: 4800,
    priceLabel: "€4,800",
    priceSuffix: "/month",
    bedrooms: 2,
    bathrooms: 2,
    propertyType: "Apartment",
    description: "A sleek high-floor apartment with far-reaching river views, set within a secure development offering concierge, gym and residents' lounge. Floor-to-ceiling glazing and an open-plan layout make this an effortless base for city living.",
    features: ["River views", "24-hour concierge", "Residents' gym", "Floor-to-ceiling glazing", "Secure parking", "Balcony"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "rent-hampstead-modern-residence",
    listingType: "rent",
    title: "Hampstead Modern Residence",
    location: "Hampstead, London, UK",
    price: 9500,
    priceLabel: "€9,500",
    priceSuffix: "/month",
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Detached House",
    description: "A striking architect-designed home moments from Hampstead Heath, combining clean modern lines with warm natural materials. Expansive glazing draws the landscaped garden into every principal room, and a lower-ground media suite adds flexible living space.",
    features: ["Steps from Hampstead Heath", "Architect-designed", "Landscaped garden", "Media / cinema room", "Home office", "Double garage"],
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "rent-richmond-park-estate",
    listingType: "rent",
    title: "Richmond Park Estate",
    location: "Richmond, London, UK",
    price: 25000,
    priceLabel: "€25,000",
    priceSuffix: "/month",
    bedrooms: 5,
    bathrooms: 4,
    propertyType: "Luxury House",
    description: "An exceptional estate bordering Richmond Park, set within mature private grounds. The house pairs grand entertaining spaces with a discreet family wing, complemented by a heated pool, tennis court and staff accommodation.",
    features: ["Borders Richmond Park", "Heated swimming pool", "Tennis court", "Staff accommodation", "Wine cellar", "Gated private drive"],
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "rent-mayfair-grand-residence",
    listingType: "rent",
    title: "Mayfair Grand Residence",
    location: "Mayfair, London, UK",
    price: 70000,
    priceLabel: "€70,000",
    priceSuffix: "/month",
    bedrooms: 6,
    bathrooms: 6,
    propertyType: "Luxury Apartment",
    description: "One of Mayfair's most distinguished addresses, this full-floor residence occupies an entire wing of a landmark building. Formal reception rooms, a private lift and staff quarters make this a rare proposition for those requiring absolute discretion and scale.",
    features: ["Private lift entrance", "Full-floor residence", "Staff quarters", "Bespoke joinery throughout", "24-hour security", "Access to private garden square"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80"
    ]
  },

  // ---------------- FOR SALE ----------------
  {
    id: "sale-manchester-city-apartment",
    listingType: "sale",
    title: "Manchester City Apartment",
    location: "Manchester, UK",
    price: 25000,
    priceLabel: "€25,000",
    priceSuffix: "",
    bedrooms: 1,
    bathrooms: 1,
    propertyType: "Apartment",
    description: "A compact, well-presented apartment in a converted mill building close to the city centre, ideal as a first purchase or investment. Exposed brickwork and large factory windows give the space real character.",
    features: ["Exposed brick interior", "Close to city centre", "Secure entry system", "Communal courtyard", "Chain-free"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "sale-leeds-family-home",
    listingType: "sale",
    title: "Leeds Family Home",
    location: "Leeds, UK",
    price: 180000,
    priceLabel: "€180,000",
    priceSuffix: "",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Semi-detached",
    description: "A well-maintained semi-detached family home on a popular residential street, within walking distance of well-regarded schools. A recently extended kitchen-diner opens onto a sunny south-facing garden.",
    features: ["South-facing garden", "Extended kitchen-diner", "Walk to local schools", "Driveway parking", "Double glazed throughout"],
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "sale-birmingham-contemporary-house",
    listingType: "sale",
    title: "Birmingham Contemporary House",
    location: "Birmingham, UK",
    price: 450000,
    priceLabel: "€450,000",
    priceSuffix: "",
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "Detached",
    description: "A contemporary detached house finished to a high specification, with an open-plan living space designed for entertaining. Underfloor heating, a home office and a landscaped rear garden complete the picture.",
    features: ["Open-plan living space", "Underfloor heating", "Home office", "Landscaped garden", "Integrated smart-home wiring"],
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "sale-surrey-country-residence",
    listingType: "sale",
    title: "Surrey Country Residence",
    location: "Surrey, UK",
    price: 1250000,
    priceLabel: "€1,250,000",
    priceSuffix: "",
    bedrooms: 5,
    bathrooms: 4,
    propertyType: "Detached",
    description: "Set within extensive private grounds on the edge of a sought-after village, this country residence offers generous family accommodation alongside a self-contained annexe, stable block and paddock.",
    features: ["Self-contained annexe", "Stable block and paddock", "Extensive private grounds", "Triple garage", "Village edge location"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=700&q=80"
    ]
  },
  {
    id: "sale-kensington-luxury-residence",
    listingType: "sale",
    title: "Kensington Luxury Residence",
    location: "Kensington, London, UK",
    price: 3000000,
    priceLabel: "€3,000,000",
    priceSuffix: "",
    bedrooms: 6,
    bathrooms: 5,
    propertyType: "Luxury House",
    description: "An immaculately restored stucco-fronted residence on one of Kensington's finest garden squares. Six storeys of considered accommodation include a lower-ground leisure suite with pool, and a private south-facing garden.",
    features: ["Private garden square access", "Lower-ground leisure suite with pool", "South-facing garden", "Original period features restored", "Lift across all floors"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80"
    ]
  }
];

// Curated featured selection (variety of rent + sale, ordered so the first renders as the lead card)
const FEATURED_IDS = [
  "sale-kensington-luxury-residence",
  "rent-hampstead-modern-residence",
  "sale-surrey-country-residence"
];

/* ---------------------------------------------------------
   2. RENDERING
   --------------------------------------------------------- */
function formatFacts(p) {
  return `${p.bedrooms} bed${p.bedrooms !== 1 ? "s" : ""} · ${p.bathrooms} bath${p.bathrooms !== 1 ? "s" : ""} · ${p.propertyType}`;
}

function propertyCardHTML(p) {
  return `
    <article class="property-card" data-property-id="${p.id}">
      <div class="property-card__media">
        <span class="property-card__tag">${p.listingType === "rent" ? "To Rent" : "For Sale"}</span>
        <img src="${p.image}" alt="${p.title}, ${p.location}" loading="lazy">
      </div>
      <div class="property-card__body">
        <p class="property-card__location">${p.location}</p>
        <h3 class="property-card__title">${p.title}</h3>
        <p class="property-card__price">${p.priceLabel}<span>${p.priceSuffix}</span></p>
        <p class="property-card__facts">${formatFacts(p)}</p>
        <div class="property-card__actions">
          <button class="btn btn--outline" data-view-property="${p.id}">View Property</button>
          <button class="btn btn--dark" data-book-viewing="${p.id}">Book Viewing</button>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(containerId, list) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = list.map(propertyCardHTML).join("");
}

function renderAll() {
  const rentals = PROPERTIES.filter(p => p.listingType === "rent");
  const sales = PROPERTIES.filter(p => p.listingType === "sale");
  const featured = FEATURED_IDS.map(id => PROPERTIES.find(p => p.id === id)).filter(Boolean);

  renderGrid("featuredGrid", featured);
  renderGrid("rentGrid", rentals);
  renderGrid("saleGrid", sales);

  populatePropertySelects();
}

function populatePropertySelects() {
  const selects = [document.getElementById("eq-property"), document.getElementById("vw-property")];
  const optionsHTML = PROPERTIES.map(p => `<option value="${p.title}">${p.title} — ${p.location}</option>`).join("");
  selects.forEach(sel => {
    if (!sel) return;
    sel.innerHTML = `<option value="">Select a property</option>${optionsHTML}`;
  });
}

/* ---------------------------------------------------------
   3. PROPERTY MODAL
   --------------------------------------------------------- */
const modal = document.getElementById("propertyModal");
let currentPropertyForModal = null;

function openModal(propertyId) {
  const p = PROPERTIES.find(pr => pr.id === propertyId);
  if (!p) return;
  currentPropertyForModal = p;

  document.getElementById("modalLocation").textContent = p.location;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalPrice").textContent = `${p.priceLabel}${p.priceSuffix}`;
  document.getElementById("modalFacts").innerHTML = `
    <li>${p.bedrooms} bedroom${p.bedrooms !== 1 ? "s" : ""}</li>
    <li>${p.bathrooms} bathroom${p.bathrooms !== 1 ? "s" : ""}</li>
    <li>${p.propertyType}</li>
  `;
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalFeatures").innerHTML = p.features.map(f => `<li>${f}</li>`).join("");

  const gallery = document.getElementById("modalGallery");
  const [main, ...rest] = p.gallery;
  gallery.innerHTML = `
    <img src="${main}" alt="${p.title} — main view">
    <div class="modal__gallery-side">
      ${rest.map(src => `<img src="${src}" alt="${p.title} — interior view">`).join("")}
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", (e) => {
  const viewBtn = e.target.closest("[data-view-property]");
  if (viewBtn) { openModal(viewBtn.dataset.viewProperty); return; }

  const bookBtn = e.target.closest("[data-book-viewing]");
  if (bookBtn) {
    const p = PROPERTIES.find(pr => pr.id === bookBtn.dataset.bookViewing);
    document.getElementById("vw-property").value = p ? p.title : "";
    document.getElementById("viewing").scrollIntoView({ behavior: "smooth" });
    return;
  }

  if (e.target.closest("[data-close-modal]")) { closeModal(); return; }

  if (e.target.closest("[data-modal-viewing]") && currentPropertyForModal) {
    document.getElementById("vw-property").value = currentPropertyForModal.title;
    closeModal();
  }
  if (e.target.closest("[data-modal-enquiry]") && currentPropertyForModal) {
    document.getElementById("eq-property").value = currentPropertyForModal.title;
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

/* ---------------------------------------------------------
   4. NAV: mobile toggle + scrolled state
   --------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

navToggle?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* ---------------------------------------------------------
   5. HERO SEARCH — buy/rent toggle + submit
   --------------------------------------------------------- */
document.querySelectorAll(".search-toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".search-toggle-btn").forEach(b => {
      b.classList.remove("is-active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
  });
});

document.getElementById("propertySearchForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const mode = document.querySelector(".search-toggle-btn.is-active")?.dataset.mode || "buy";
  const targetId = mode === "rent" ? "rent" : "buy";
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
});

/* ---------------------------------------------------------
   6. LEAD FORMS — validation, webhook submission, states
   --------------------------------------------------------- */

/**
 * Sends a lead payload to the configured n8n webhook.
 * Falls back gracefully (with a clear error) if WEBHOOK_URL
 * has not yet been configured, so the demo doesn't silently
 * pretend to succeed.
 */
async function sendLeadToWebhook(payload) {
  if (!WEBHOOK_URL || WEBHOOK_URL === "YOUR_N8N_WEBHOOK_URL") {
    throw new Error("WEBHOOK_NOT_CONFIGURED");
  }
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error(`Webhook responded with status ${response.status}`);
  }
  return response;
}

function setFormLoading(form, isLoading) {
  const btn = form.querySelector("button[type='submit']");
  if (btn) btn.classList.toggle("is-loading", isLoading);
  form.querySelectorAll("input, select, textarea, button").forEach(el => {
    if (isLoading) el.setAttribute("disabled", "disabled");
    else el.removeAttribute("disabled");
  });
}

function showStatus(statusEl, message, type) {
  statusEl.textContent = message;
  statusEl.classList.remove("is-success", "is-error");
  statusEl.classList.add(type === "success" ? "is-success" : "is-error");
  statusEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

function validateForm(form) {
  let valid = true;
  form.querySelectorAll("[required]").forEach(field => {
    const value = (field.value || "").trim();
    const invalid = !value;
    field.classList.toggle("is-invalid", invalid);
    if (invalid) valid = false;
  });
  return valid;
}

function clearInvalidOnInput(form) {
  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", () => field.classList.remove("is-invalid"));
    field.addEventListener("change", () => field.classList.remove("is-invalid"));
  });
}

function getRadioValue(form, name) {
  const checked = form.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : "";
}

/** Generic submit handler shared by all three lead forms. */
function attachLeadForm({ formId, statusId, leadType, buildPayload, successMessage }) {
  const form = document.getElementById(formId);
  const statusEl = document.getElementById(statusId);
  if (!form) return;

  clearInvalidOnInput(form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.classList.remove("is-success", "is-error");

    if (!validateForm(form)) {
      showStatus(statusEl, "Please fill in all required fields before submitting.", "error");
      return;
    }

    const payload = { lead_type: leadType, ...buildPayload(form) };

    setFormLoading(form, true);
    try {
      await sendLeadToWebhook(payload);
      showStatus(statusEl, successMessage, "success");
      form.reset();
    } catch (err) {
      if (err.message === "WEBHOOK_NOT_CONFIGURED") {
        showStatus(
          statusEl,
          "This form is ready to go, but no webhook URL has been connected yet. Set WEBHOOK_URL in script.js to your n8n webhook to receive live leads.",
          "error"
        );
      } else {
        showStatus(
          statusEl,
          "Something went wrong sending your request. Please try again, or contact us directly at hello@rockshakeagency.com.",
          "error"
        );
      }
    } finally {
      setFormLoading(form, false);
    }
  });
}

attachLeadForm({
  formId: "enquiryForm",
  statusId: "enquiryStatus",
  leadType: "enquiry",
  successMessage: "Thank you. Your enquiry has been received. A member of the Rockshake Agency team will be in touch shortly.",
  buildPayload: (form) => ({
    first_name: form.first_name.value.trim(),
    last_name: form.last_name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    property: form.property.value,
    enquiry_type: form.enquiry_type.value,
    message: form.message.value.trim(),
    preferred_contact: getRadioValue(form, "preferred_contact")
  })
});

attachLeadForm({
  formId: "viewingForm",
  statusId: "viewingStatus",
  leadType: "viewing",
  successMessage: "Your viewing request has been received. We'll confirm the available time with you shortly.",
  buildPayload: (form) => ({
    first_name: form.first_name.value.trim(),
    last_name: form.last_name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    property: form.property.value,
    preferred_date: form.preferred_date.value,
    preferred_time: form.preferred_time.value,
    alternative_date: form.alternative_date.value,
    alternative_time: form.alternative_time.value,
    preferred_contact: getRadioValue(form, "preferred_contact"),
    message: form.message.value.trim()
  })
});

attachLeadForm({
  formId: "valuationForm",
  statusId: "valuationStatus",
  leadType: "valuation",
  successMessage: "Thank you. Your valuation request has been received. Our team will review your details and contact you shortly.",
  buildPayload: (form) => ({
    first_name: form.first_name.value.trim(),
    last_name: form.last_name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    property_address: form.property_address.value.trim(),
    property_type: form.property_type.value,
    bedrooms: Number(form.bedrooms.value || 0),
    bathrooms: Number(form.bathrooms.value || 0),
    estimated_value: form.estimated_value.value.trim(),
    selling_timeline: getRadioValue(form, "selling_timeline"),
    message: form.message.value.trim()
  })
});

/* ---------------------------------------------------------
   7. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", renderAll);