const state = {
  baseOptions: new Set(),
  eventType: "",
  detailsSaved: false
};

const baseButtons = [...document.querySelectorAll(".option-card")];
const logisticsLayer = document.getElementById("logisticsLayer");
const specificLayer = document.getElementById("specificLayer");
const summaryLayer = document.getElementById("summaryLayer");
const specificQuestions = document.getElementById("specificQuestions");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const stepText = document.getElementById("stepText");
const selectedList = document.getElementById("selectedList");
const recommendationTitle = document.getElementById("recommendationTitle");
const recommendationCopy = document.getElementById("recommendationCopy");
const minimumNote = document.getElementById("minimumNote");
const eventTypeField = document.getElementById("eventType");
const detailsDialog = document.getElementById("detailsDialog");
const requiredContact = ["contactName", "contactPhone", "contactEmail"];
const baseOptionsScroller = document.getElementById("baseOptions");
const inlineQuoteRange = document.getElementById("inlineQuoteRange");
const inlineQuoteNote = document.getElementById("inlineQuoteNote");
const activePackageCard = document.getElementById("activePackageCard");
const packageIdeas = document.getElementById("packageIdeas");
const founderDialog = document.getElementById("founderDialog");
const choiceDialog = document.getElementById("choiceDialog");
const choiceDialogTitle = document.getElementById("choiceDialogTitle");
const choiceBubbleGrid = document.getElementById("choiceBubbleGrid");
let activeChoiceField = null;

const packageCatalog = [
  {
    name: "Sound Essentials",
    tagline: "Clean PA coverage for speaking, programs, and simple room support.",
    image: "assets/gallery/gallery-lounge-sound.jpg",
    services: ["Speaker system", "Wireless microphones", "Technician"]
  },
  {
    name: "Signature DJ Party Build",
    tagline: "DJ, lighting, bass, and clean room energy for celebrations.",
    image: "assets/gallery/gallery-birthday-outdoor.png",
    services: ["DJ setup", "Subwoofer support", "Lighting", "Wireless microphones"]
  },
  {
    name: "Wedding Room Coverage",
    tagline: "Room-first speaker systems, microphones, subs, and lighting for wedding coverage.",
    image: "assets/gallery/gallery-ballroom-uplights.jpg",
    services: ["Speaker system", "Wireless microphones", "Subwoofer support", "Lighting", "Technician"]
  },
  {
    name: "Live Music Showcase Build",
    tagline: "Stage-ready coverage for bands, showcases, and performance rooms.",
    image: "assets/gallery/gallery-green-stage.jpg",
    services: ["Speaker system", "Backline", "Wireless microphones", "Technician"]
  },
  {
    name: "Outdoor Community Stage",
    tagline: "Speaker coverage, mics, and technician support for outdoor programs.",
    image: "assets/gallery/gallery-outdoor-band.jpg",
    services: ["Speaker system", "Wireless microphones", "Technician", "Subwoofer support"]
  },
  {
    name: "DJ + Live Sound Hybrid",
    tagline: "A flexible build for events that need both announcements and party playback.",
    image: "assets/gallery/gallery-dj-control.jpg",
    services: ["Speaker system", "DJ setup", "Wireless microphones", "Lighting"]
  },
  {
    name: "Full Production Build",
    tagline: "The bigger room build: sound, DJ, lights, backline, subs, and tech coverage.",
    image: "assets/gallery/gallery-hollywood-stage.jpg",
    services: ["Speaker system", "Wireless microphones", "Subwoofer support", "DJ setup", "Backline", "Lighting", "Technician"]
  }
];

const requiredLogistics = [
  "eventType",
  "venueSize",
  "guestCount",
  "speakerSystems",
  "indoorOutdoor",
  "powerAccess"
];

const eventQuestions = {
  "Wedding": [
    {
      label: "Wedding minimum acknowledged",
      name: "weddingMinimum",
      type: "select",
      options: ["Yes, I understand weddings start at $1,000", "I need a smaller non-wedding event quote"]
    },
    {
      label: "How many separate sound areas?",
      name: "weddingSoundAreas",
      type: "select",
      options: ["1 area", "2 areas", "3 areas", "4+ areas", "Not sure"]
    },
    {
      label: "Main reception room size",
      name: "receptionRoomSize",
      type: "select",
      options: ["Small room", "Midsize room", "Large ballroom", "Outdoor tent", "Not sure"]
    },
    {
      label: "Ceremony sound system needed?",
      name: "ceremonySystem",
      type: "select",
      options: ["Yes, separate system", "Yes, same room/system", "No", "Not sure"]
    },
    {
      label: "Reception sound system needed?",
      name: "receptionSystem",
      type: "select",
      options: ["Yes", "No", "Not sure"]
    },
    {
      label: "Outdoor coverage needed?",
      name: "weddingOutdoorCoverage",
      type: "select",
      options: ["No", "Ceremony only", "Reception only", "Both", "Not sure"]
    },
    {
      label: "Wireless microphones needed",
      name: "weddingMics",
      type: "select",
      options: ["1", "2", "3-4", "5+", "Not sure"]
    },
    {
      label: "Subwoofers for dancing?",
      name: "weddingSubs",
      type: "select",
      options: ["Yes", "No", "Maybe", "Recommend based on room"]
    },
    {
      label: "Uplighting needed?",
      name: "weddingUplighting",
      type: "select",
      options: ["Yes", "No", "Maybe"]
    },
    {
      label: "Venue has house sound?",
      name: "houseSound",
      type: "select",
      options: ["No", "Yes, but we may need support", "Not sure"]
    }
  ],
  "DJ / Private Party": [
    {
      label: "Party type",
      name: "partyType",
      type: "select",
      options: ["Birthday", "Graduation", "Corporate party", "School event", "Private party", "Other"]
    },
    {
      label: "Music format",
      name: "musicFormat",
      type: "select",
      options: ["Clean only", "Mixed clean/explicit OK", "Family friendly", "Not sure"]
    },
    {
      label: "Dance floor lighting",
      name: "danceLighting",
      type: "select",
      options: ["Yes", "No", "Maybe"]
    },
    {
      label: "Uplights",
      name: "uplights",
      type: "select",
      options: ["No", "6 uplights", "12 uplights", "Recommend based on room"]
    },
    {
      label: "Announcements or MC support",
      name: "mcSupport",
      type: "select",
      options: ["Yes", "No", "Maybe"]
    },
    {
      label: "Bass level",
      name: "bassLevel",
      type: "select",
      options: ["Light background music", "Dance party", "Heavy bass preferred", "Venue restricted"]
    }
  ],
  "Band / Backline": [
    {
      label: "Band size",
      name: "bandSize",
      type: "select",
      options: ["Solo", "Duo", "3-piece", "4-piece", "5-piece", "6+"]
    },
    {
      label: "Drum kit preference",
      name: "drumKit",
      type: "select",
      options: [
        "No drum kit needed",
        "Gretsch Renown Maple: 10, 12, 14, 20, 22",
        "Mapex Saturn Pro: 10, 12, 14, 22",
        "Taye Studio Maple: 10, 12, 14, 18",
        "Gretsch USA Maple bop kit: 10, 13, 16",
        "Match rider as close as possible"
      ]
    },
    {
      label: "Kick drum size preference",
      name: "kickPreference",
      type: "select",
      options: ["18 inch", "20 inch", "22 inch", "No preference", "Rider will specify"]
    },
    {
      label: "Snare preference",
      name: "snarePreference",
      type: "select",
      options: [
        "No snare needed",
        "Gretsch maple stave 14x6.5",
        "Pearl maple free floater 14x6",
        "Pearl Masters maple 14x6.5",
        "Mapex Saturn Pro 14x5",
        "Pork Pie maple 14x6.5",
        "Mapex Black Panther 13x5",
        "Gretsch Blackhawk 12x5",
        "Tama metal snare 12x5",
        "LP micro snare 8 inch",
        "Rider will specify"
      ]
    },
    {
      label: "Cymbal needs",
      name: "cymbalNeeds",
      type: "select",
      options: [
        "Basic hats, crash, ride setup",
        "Splashes: 8 or 10 inch",
        "Crashes: 16, 17, 18, 19, or 20 inch",
        "Ride: 20 or 22 inch dry",
        "Ride: 20 or 22 inch brilliant",
        "Zildjian / Meinl / Bosphorus / Paiste preference",
        "Rider will specify"
      ]
    },
    {
      label: "Playback or trigger pads",
      name: "triggerPads",
      type: "select",
      options: ["No", "SPD-SX style pad requested", "3-4 trigger pads requested", "Not sure"]
    },
    {
      label: "Monitor mixes",
      name: "monitorMixes",
      type: "select",
      options: ["None", "1-2 mixes", "3-4 mixes", "5+ mixes", "Not sure"]
    },
    {
      label: "Input list / stage plot",
      name: "inputList",
      type: "select",
      options: ["Already available", "Can provide later", "Need help building one"]
    },
    {
      label: "Need JP to source missing rider items?",
      name: "sourceRiderItems",
      type: "select",
      options: ["Yes", "No", "Maybe after rider review"]
    }
  ],
  "Corporate": [
    {
      label: "Event format",
      name: "corporateFormat",
      type: "select",
      options: ["Meeting", "Panel", "Awards", "Conference", "Fundraiser", "Mixer", "Other"]
    },
    {
      label: "Presenter microphones",
      name: "presenterMics",
      type: "select",
      options: ["1", "2", "3-4", "5+", "Not sure"]
    },
    {
      label: "Lavalier microphone needed?",
      name: "lavalier",
      type: "select",
      options: ["Yes", "No", "Maybe"]
    },
    {
      label: "Music playback",
      name: "corporatePlayback",
      type: "select",
      options: ["Walk-in music", "Award stingers", "Background only", "No music", "Not sure"]
    },
    {
      label: "Recording or livestream support",
      name: "recordingSupport",
      type: "select",
      options: ["No", "Recording", "Livestream", "Both", "Not sure"]
    }
  ],
  "Church": [
    {
      label: "Service or event type",
      name: "churchType",
      type: "select",
      options: ["Worship service", "Conference", "Youth event", "Outdoor service", "Community outreach", "Other"]
    },
    {
      label: "Live music involved?",
      name: "churchLiveMusic",
      type: "select",
      options: ["Yes", "No", "Maybe"]
    },
    {
      label: "Speaking microphones",
      name: "churchSpeakingMics",
      type: "select",
      options: ["1", "2", "3-4", "5+", "Not sure"]
    },
    {
      label: "Playback tracks",
      name: "churchTracks",
      type: "select",
      options: ["Yes", "No", "Maybe"]
    },
    {
      label: "Outdoor coverage",
      name: "churchOutdoor",
      type: "select",
      options: ["No", "Small outdoor area", "Wide outdoor area", "Not sure"]
    }
  ],
  "Community / Nonprofit": [
    {
      label: "Program type",
      name: "communityType",
      type: "select",
      options: ["Festival-style", "Awards", "Panel", "Fundraiser", "Youth event", "Workshop", "Other"]
    },
    {
      label: "Speaking microphones",
      name: "communityMics",
      type: "select",
      options: ["1", "2", "3-4", "5+", "Not sure"]
    },
    {
      label: "Music or performance involved?",
      name: "communityPerformance",
      type: "select",
      options: ["DJ only", "Live band", "Tracks", "Speaking only", "Mixed program"]
    },
    {
      label: "Multiple areas or stages?",
      name: "communityAreas",
      type: "select",
      options: ["1 area", "2 areas", "3+ areas", "Not sure"]
    }
  ],
  "School Event": [
    {
      label: "School event type",
      name: "schoolType",
      type: "select",
      options: ["Dance", "Graduation", "Assembly", "Performance", "Fundraiser", "Other"]
    },
    {
      label: "Clean music required?",
      name: "schoolCleanMusic",
      type: "select",
      options: ["Yes", "No", "Not sure"]
    },
    {
      label: "Microphones for staff/students",
      name: "schoolMics",
      type: "select",
      options: ["1", "2", "3-4", "5+", "Not sure"]
    },
    {
      label: "Need lighting?",
      name: "schoolLighting",
      type: "select",
      options: ["No", "Party lighting", "Uplights", "Both", "Not sure"]
    }
  ],
  "Other": [
    {
      label: "Closest service need",
      name: "otherNeed",
      type: "select",
      options: ["Speaking event", "DJ event", "Live music", "Wedding-style coverage", "Backline", "Not sure"]
    },
    {
      label: "Need JP to recommend the full setup?",
      name: "recommendFullSetup",
      type: "select",
      options: ["Yes", "No", "Maybe after a call"]
    }
  ]
};

const backlineAddOnQuestions = [
  {
    label: "Available drum kit options",
    name: "availableDrumKit",
    type: "select",
    options: [
      "No drum kit needed",
      "Gretsch Renown Maple: 10, 12, 14, 20, 22",
      "Mapex Saturn Pro: 10, 12, 14, 22",
      "Taye Studio Maple: 10, 12, 14, 18",
      "Gretsch USA Maple bop kit: 10, 13, 16",
      "Match rider as close as possible"
    ]
  },
  {
    label: "Available snare options",
    name: "availableSnare",
    type: "select",
    options: [
      "No snare needed",
      "Gretsch maple stave 14x6.5",
      "Pearl maple free floater 14x6",
      "Pearl Masters maple 14x6.5",
      "Mapex Saturn Pro 14x5",
      "Pork Pie maple 14x6.5",
      "Mapex Black Panther 13x5",
      "Gretsch Blackhawk 12x5",
      "Tama metal snare 12x5",
      "LP micro snare 8 inch",
      "Match rider as close as possible"
    ]
  },
  {
    label: "Cymbal request",
    name: "availableCymbals",
    type: "select",
    options: [
      "Basic hats, crash, ride setup",
      "Splashes: 8 or 10 inch",
      "Crashes: 16, 17, 18, 19, or 20 inch",
      "Ride: 20 or 22 inch dry",
      "Ride: 20 or 22 inch brilliant",
      "Zildjian / Meinl / Bosphorus / Paiste preference",
      "Rider will specify"
    ]
  },
  {
    label: "Playback / trigger pad request",
    name: "availableTriggers",
    type: "select",
    options: [
      "No playback pad needed",
      "SPD-SX style pad requested",
      "3-4 trigger pads requested",
      "Interested, but need JP to confirm availability",
      "Rider will specify"
    ]
  },
  {
    label: "If the rider asks for something unavailable",
    name: "riderSourcing",
    type: "select",
    options: [
      "Use closest available match",
      "Ask other drummers for a closer match",
      "Client will provide missing items",
      "Review after rider is sent"
    ]
  }
];

function revealLayer(layer) {
  layer.hidden = false;
  requestAnimationFrame(() => layer.classList.add("is-active"));
}

function hideLayer(layer) {
  layer.hidden = true;
  layer.classList.remove("is-active");
}

function makeField(question) {
  const label = document.createElement("label");
  label.textContent = question.label;

  const field = document.createElement("select");
  field.name = question.name;
  field.dataset.specific = "true";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Choose one";
  field.appendChild(placeholder);

  question.options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    field.appendChild(option);
  });

  field.addEventListener("change", () => {
    pulseElement(label);
    updateProgress();
  });
  label.appendChild(field);
  enhanceChoiceSelect(field);
  return label;
}

function pulseElement(element) {
  element.classList.remove("field-pulse", "just-selected");
  void element.offsetWidth;
  element.classList.add(element.classList.contains("option-card") ? "just-selected" : "field-pulse");
}

function openChoiceDialog(field) {
  if (!field || field.options.length <= 1) return;
  if (choiceDialog.open) return;

  activeChoiceField = field;
  const label = field.closest("label");
  const labelText = label ? label.childNodes[0].textContent.trim() : "Select an option";
  choiceDialogTitle.textContent = labelText;
  choiceBubbleGrid.innerHTML = "";

  [...field.options].forEach((option) => {
    if (!option.value) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-bubble";
    button.textContent = option.textContent;
    button.classList.toggle("is-selected", field.value === option.value);
    button.addEventListener("click", () => {
      activeChoiceField.value = option.value;
      activeChoiceField.dispatchEvent(new Event("change", { bubbles: true }));

      if (typeof choiceDialog.close === "function") {
        choiceDialog.close();
      } else {
        choiceDialog.removeAttribute("open");
      }
    });
    choiceBubbleGrid.appendChild(button);
  });

  if (typeof choiceDialog.showModal === "function") {
    choiceDialog.showModal();
  } else {
    choiceDialog.setAttribute("open", "");
  }
}

function enhanceChoiceSelect(field) {
  if (!field || field.dataset.choiceEnhanced === "true") return;
  field.dataset.choiceEnhanced = "true";
  field.classList.add("choice-select");

  field.addEventListener("mousedown", (event) => {
    event.preventDefault();
    openChoiceDialog(field);
  });

  field.addEventListener("click", (event) => {
    event.preventDefault();
    openChoiceDialog(field);
  });

  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openChoiceDialog(field);
    }
  });
}

function renderSpecificQuestions(type) {
  specificQuestions.innerHTML = "";
  let questions = eventQuestions[type] || [];

  if (state.baseOptions.has("Backline") && type !== "Band / Backline") {
    questions = [...questions, ...backlineAddOnQuestions];
  }

  questions.forEach((question) => {
    specificQuestions.appendChild(makeField(question));
  });

  if (questions.length) {
    revealLayer(specificLayer);
    requestAnimationFrame(refreshPinwheels);
  } else {
    hideLayer(specificLayer);
  }
}

function getAnsweredSpecificCount() {
  return [...specificQuestions.querySelectorAll("select")].filter((field) => field.value).length;
}

function getTotalSpecificCount() {
  return specificQuestions.querySelectorAll("select").length;
}

function getAnsweredLogisticsCount() {
  return requiredLogistics.filter((name) => {
    const field = document.querySelector(`[name="${name}"]`);
    return field && field.value;
  }).length;
}

function getAnsweredContactCount() {
  return requiredContact.filter((name) => {
    const field = document.querySelector(`[name="${name}"]`);
    return field && field.value.trim();
  }).length;
}

function getCompletion() {
  const baseDone = state.baseOptions.size > 0 ? 1 : 0;
  const logisticsAnswered = getAnsweredLogisticsCount();
  const contactAnswered = getAnsweredContactCount();
  const specificTotal = getTotalSpecificCount();
  const specificAnswered = getAnsweredSpecificCount();
  const total = 1 + requiredLogistics.length + Math.max(specificTotal, 1) + requiredContact.length;
  const answered = baseDone + logisticsAnswered + specificAnswered + contactAnswered;
  return Math.min(100, Math.round((answered / total) * 100));
}

function parseTimeChoice(value) {
  if (!value || value.includes("TBD") || value.includes("Not sure")) return null;

  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i);
  if (!match) return null;

  let hour = Number(match[1]);
  const minute = Number(match[2] || 0);
  const period = match[3] ? match[3].toUpperCase() : "";

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  if (hour > 23 || minute > 59) return null;
  return hour * 60 + minute;
}

function getEventHours() {
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  const startTotal = parseTimeChoice(start);
  let endTotal = parseTimeChoice(end);

  if (startTotal === null || endTotal === null) return 3;
  if (endTotal <= startTotal) endTotal += 24 * 60;

  const hours = (endTotal - startTotal) / 60;
  return Math.max(1, Math.round(hours * 2) / 2);
}

function money(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

function roundUpToNearest(amount, nearest = 25) {
  return Math.ceil(amount / nearest) * nearest;
}

function calculateTemporaryQuote() {
  const items = [];
  const type = eventTypeField.value;
  const venueSize = document.getElementById("venueSize").value;
  const guestCount = document.getElementById("guestCount").value;
  const speakerSystems = document.getElementById("speakerSystems").value;
  const indoorOutdoor = document.getElementById("indoorOutdoor").value;
  const hours = getEventHours();
  let subtotal = 0;

  if (state.baseOptions.has("Speaker system")) {
    subtotal += 450;
    items.push("Speaker/sound equipment rental: $450");
  }

  if (state.baseOptions.has("Wireless microphones")) {
    subtotal += 75;
    items.push("Wireless microphone support: $75");
  }

  if (state.baseOptions.has("Subwoofer support")) {
    subtotal += 200;
    items.push("Subwoofer support: $200");
  }

  if (state.baseOptions.has("DJ setup")) {
    const billableHours = Math.max(3, hours);
    const djTotal = billableHours * 300;
    subtotal += djTotal;
    items.push(`DJ services: ${billableHours} hr x $300/hr = ${money(djTotal)}`);
  }

  if (state.baseOptions.has("Backline")) {
    subtotal += 250;
    items.push("Backline planning/rider support placeholder: $250");
  }

  if (state.baseOptions.has("Lighting")) {
    subtotal += 250;
    items.push("DJ/event lighting allowance: $250");
  }

  if (state.baseOptions.has("Playback triggers")) {
    subtotal += 75;
    items.push("Playback/trigger support placeholder: $75");
  }

  if (state.baseOptions.has("Technician")) {
    subtotal += 150;
    items.push("On-site technician allowance: $150");
  }

  if (state.baseOptions.size > 0) {
    subtotal += 100;
    items.push("Setup fee: $100");
  }

  if (speakerSystems.startsWith("2 systems")) {
    subtotal += 300;
    items.push("Second speaker system allowance: $300");
  } else if (speakerSystems.startsWith("3 systems")) {
    subtotal += 600;
    items.push("Multiple-zone speaker allowance: $600");
  }

  if (venueSize.includes("Large room")) {
    subtotal += 150;
    items.push("Large-room coverage allowance: $150");
  }

  if (venueSize.includes("Outdoor wide")) {
    subtotal += 200;
    items.push("Wide outdoor coverage allowance: $200");
  }

  if (indoorOutdoor === "Both") {
    subtotal += 150;
    items.push("Indoor/outdoor transition allowance: $150");
  }

  if (guestCount === "200+") {
    subtotal += 250;
    items.push("200+ guest coverage allowance: $250");
  }

  if (type === "Wedding" && subtotal > 0 && subtotal < 1000) {
    subtotal = 1000;
    items.push("Wedding production minimum applied: $1,000");
  }

  if (subtotal === 0) {
    return {
      low: 0,
      high: 0,
      items: ["Choose at least one service layer to generate a temporary estimate."],
      note: "Choose services to see a working quote range."
    };
  }

  const low = roundUpToNearest(subtotal * 1.2);
  const high = roundUpToNearest(subtotal * 1.25);

  return {
    low,
    high,
    items,
    note: "Pricing is a helpful starting point and may change after JP confirms the full event details. Please plan for at least 2 hours of setup before the event and 2 hours of tear down after the event. Ask about current specials when you submit your request."
  };
}

function updateQuotePreview() {
  const quote = calculateTemporaryQuote();
  const rangeText = `${money(quote.low)} - ${money(quote.high)}`;

  inlineQuoteRange.textContent = rangeText;
  inlineQuoteNote.textContent = quote.note;
}

function scorePackage(pkg) {
  const selected = [...state.baseOptions];
  if (!selected.length) return 0;
  return pkg.services.reduce((score, service) => score + (state.baseOptions.has(service) ? 1 : 0), 0);
}

function getBestPackage() {
  const type = eventTypeField.value;
  const selected = [...state.baseOptions];

  if (!selected.length) {
    return {
      name: "Build Your Own Event",
      tagline: "Choose services to create a custom package recommendation.",
      image: "assets/gallery/gallery-hollywood-stage.jpg",
      services: []
    };
  }

  if (type === "Wedding") return packageCatalog.find((pkg) => pkg.name === "Wedding Room Coverage");
  if (selected.length >= 6) return packageCatalog.find((pkg) => pkg.name === "Full Production Build");
  if (state.baseOptions.has("DJ setup") && state.baseOptions.has("Lighting")) return packageCatalog.find((pkg) => pkg.name === "Signature DJ Party Build");
  if (state.baseOptions.has("Backline")) return packageCatalog.find((pkg) => pkg.name === "Live Music Showcase Build");
  if (state.baseOptions.has("DJ setup") && state.baseOptions.has("Speaker system")) return packageCatalog.find((pkg) => pkg.name === "DJ + Live Sound Hybrid");

  return [...packageCatalog].sort((a, b) => scorePackage(b) - scorePackage(a))[0];
}

function renderPackageRecommendations() {
  const best = getBestPackage();
  const sortedPackages = [...packageCatalog].sort((a, b) => scorePackage(b) - scorePackage(a));

  activePackageCard.innerHTML = `
    <img src="${best.image}" alt="">
    <div>
      <strong>${best.name}</strong>
      <p>${best.tagline}</p>
    </div>
  `;

  packageIdeas.innerHTML = "";
  sortedPackages.slice(0, 6).forEach((pkg) => {
    const card = document.createElement("article");
    card.className = "package-idea-card";
    card.innerHTML = `
      <img src="${pkg.image}" alt="">
      <div>
        <strong>${pkg.name}</strong>
        <span>${pkg.services.join(" + ")}</span>
      </div>
    `;
    packageIdeas.appendChild(card);
  });

  requestAnimationFrame(refreshPinwheels);
}

function updateSelectedList() {
  selectedList.innerHTML = "";
  const valueFor = (id) => document.getElementById(id).value;
  const baseItems = [...state.baseOptions];
  const summaryItems = [];
  const hours = getEventHours();

  if (baseItems.length) {
    summaryItems.push(`Production layers (${baseItems.length}): ${baseItems.join(", ")}`);
  }

  const eventType = valueFor("eventType");
  const eventDate = valueFor("eventDate");
  const startTime = valueFor("startTime");
  const endTime = valueFor("endTime");
  const venue = valueFor("venue");
  const venueSize = valueFor("venueSize");
  const guestCount = valueFor("guestCount");
  const speakerSystems = valueFor("speakerSystems");
  const indoorOutdoor = valueFor("indoorOutdoor");
  const powerAccess = valueFor("powerAccess");

  if (eventType) summaryItems.push(`Event type: ${eventType}`);
  if (eventDate) summaryItems.push(`Event date: ${eventDate}`);
  if (startTime || endTime) summaryItems.push(`Event time window: ${startTime || "TBD"} - ${endTime || "TBD"} (${hours} hr pricing estimate if exact)`);
  summaryItems.push("Production timing note: plan for at least 2 hours of setup before event start and 2 hours of tear down after event end.");
  if (venue) summaryItems.push(`Venue/location: ${venue}`);
  if (venueSize) summaryItems.push(`Venue size: ${venueSize}`);
  if (guestCount) summaryItems.push(`Guest count: ${guestCount}`);
  if (speakerSystems) summaryItems.push(`Speaker systems requested: ${speakerSystems}`);
  if (indoorOutdoor) summaryItems.push(`Coverage type: ${indoorOutdoor}`);
  if (powerAccess) summaryItems.push(`Power access: ${powerAccess}`);
  if (state.baseOptions.has("DJ setup")) summaryItems.push(`DJ service hours priced from: ${Math.max(3, hours)} hr`);

  [...specificQuestions.querySelectorAll("label")].forEach((label) => {
    const field = label.querySelector("select");
    if (!field || !field.value) return;
    const labelText = label.childNodes[0].textContent.trim();
    summaryItems.push(`${labelText}: ${field.value}`);
  });

  summaryItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    selectedList.appendChild(li);
  });

  if (!selectedList.children.length) {
    const li = document.createElement("li");
    li.textContent = "Choose at least one base layer to start.";
    selectedList.appendChild(li);
  }
}

function updateRecommendation() {
  const type = eventTypeField.value;
  const systems = document.getElementById("speakerSystems").value;
  const size = document.getElementById("venueSize").value;

  minimumNote.textContent = "";

  if (!state.baseOptions.size) {
    recommendationTitle.textContent = "Start with your base layer.";
    recommendationCopy.textContent = "Choose sound, microphones, DJ, backline, lighting, or technician support first.";
    return;
  }

  if (!type || !systems || !size) {
    recommendationTitle.textContent = "Base layer selected.";
    recommendationCopy.textContent = "Add the event type, venue size, and speaker-system count so JP can quote the right coverage.";
    return;
  }

  if (type === "Wedding") {
    recommendationTitle.textContent = "Wedding production build";
    recommendationCopy.textContent = "This should be quoted around coverage zones first: ceremony, reception, outdoor areas, overflow, and the number of speaker systems required.";
    minimumNote.textContent = "Wedding builds start at $1,000.";
    return;
  }

  if (type === "Band / Backline") {
    recommendationTitle.textContent = "Band and backline build";
    recommendationCopy.textContent = "This request should be reviewed against the input list, rider, kit preference, snare needs, cymbal needs, and monitor requirements.";
    return;
  }

  if (type === "DJ / Private Party") {
    recommendationTitle.textContent = "DJ event build";
    recommendationCopy.textContent = "This build should center on main PA coverage, subwoofer support, lighting, clean/explicit music needs, and MC announcements.";
    return;
  }

  recommendationTitle.textContent = `${type} event build`;
  recommendationCopy.textContent = "This build should be quoted from the room size, speaking needs, music playback, technician support, and number of coverage zones.";
}

function updateStepText(completion) {
  if (!state.baseOptions.size) {
    stepText.textContent = "Base layer";
    return;
  }

  if (getAnsweredLogisticsCount() < requiredLogistics.length) {
    stepText.textContent = "Event type, venue and speaker systems";
    return;
  }

  if (getTotalSpecificCount() && getAnsweredSpecificCount() < getTotalSpecificCount()) {
    stepText.textContent = "Event-specific details";
    return;
  }

  if (getAnsweredContactCount() < requiredContact.length) {
    stepText.textContent = "Contact info required";
    return;
  }

  stepText.textContent = completion >= 100 ? "Ready to submit" : "Review";
}

function updateProgress() {
  const completion = getCompletion();
  progressFill.style.width = `${completion}%`;
  progressText.textContent = `${completion}% complete`;
  updateStepText(completion);
  updateSelectedList();
  updateRecommendation();
  updateQuotePreview();
  renderPackageRecommendations();
  requestAnimationFrame(refreshPinwheels);
  queueLayerScrollHints();

  if (state.baseOptions.size > 0) {
    revealLayer(logisticsLayer);
  } else {
    hideLayer(logisticsLayer);
    hideLayer(specificLayer);
    hideLayer(summaryLayer);
    return;
  }

  if (eventTypeField.value) {
    revealLayer(summaryLayer);
  } else {
    hideLayer(summaryLayer);
  }
}

baseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const option = button.dataset.option;

    if (state.baseOptions.has(option)) {
      state.baseOptions.delete(option);
      button.classList.remove("is-selected");
    } else {
      state.baseOptions.add(option);
      button.classList.add("is-selected");
      pulseElement(button);
    }

    if (eventTypeField.value) {
      renderSpecificQuestions(eventTypeField.value);
    }

    updateProgress();
  });
});

document.querySelectorAll("#logisticsLayer input, #logisticsLayer select").forEach((field) => {
  field.addEventListener("input", updateProgress);
  field.addEventListener("change", () => {
    pulseElement(field.closest("label"));
    updateProgress();
  });
});

document.querySelectorAll("#summaryLayer input").forEach((field) => {
  field.addEventListener("input", updateProgress);
  field.addEventListener("change", () => {
    pulseElement(field.closest("label"));
    updateProgress();
  });
});

function applyPinwheel(scroller, selector) {
  if (!scroller) return;
  const items = [...scroller.querySelectorAll(selector)];
  if (!items.length) return;

  if (window.matchMedia("(max-width: 720px)").matches) {
    items.forEach((item) => {
      item.style.transform = "";
      item.style.opacity = "";
    });
    return;
  }

  const center = scroller.getBoundingClientRect().left + scroller.clientWidth / 2;

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = (itemCenter - center) / Math.max(scroller.clientWidth / 2, 1);
    const clamped = Math.max(-1, Math.min(1, distance));
    const scale = 1 - Math.abs(clamped) * 0.11;
    const lift = Math.abs(clamped) * 12;
    const rotate = clamped * -11;
    item.style.transform = `perspective(900px) rotateY(${rotate}deg) translateY(${lift}px) scale(${scale})`;
    item.style.opacity = `${1 - Math.abs(clamped) * 0.28}`;
  });
}

function refreshPinwheels() {
  applyPinwheel(baseOptionsScroller, ".option-card");
  applyPinwheel(document.querySelector("#logisticsLayer .field-grid"), "label");
  applyPinwheel(specificQuestions, "label");
  applyPinwheel(packageIdeas, ".package-idea-card");
}

[baseOptionsScroller, document.querySelector("#logisticsLayer .field-grid"), specificQuestions, packageIdeas].forEach((scroller) => {
  if (!scroller) return;
  scroller.addEventListener("scroll", () => requestAnimationFrame(refreshPinwheels));
  scroller.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    scroller.scrollBy({
      left: event.deltaY,
      behavior: "smooth"
    });
  }, { passive: false });
});


const layerScene = document.querySelector(".apple-scroll");
const layerCards = [...document.querySelectorAll(".apple-scroll .scroll-card")];
let layerFadeRaf = null;

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function fadeBetween(progress, start, end) {
  if (end === start) return progress >= end ? 1 : 0;
  return clamp((progress - start) / (end - start));
}

function setLayerCardVisual(card, opacity) {
  card.style.opacity = opacity.toFixed(3);
  const scale = 0.992 + opacity * 0.008;
  card.style.transform = `translate(-50%, -50%) scale(${scale})`;
  card.classList.toggle("is-fade-active", opacity > 0.55);
}

function updateLayerFades() {
  layerFadeRaf = null;
  if (!layerScene || !layerCards.length) return;

  const rect = layerScene.getBoundingClientRect();
  const scrollable = Math.max(rect.height - window.innerHeight, 1);
  const progress = clamp(-rect.top / scrollable);

  const opacities = [
    1 - fadeBetween(progress, 0.24, 0.38),
    Math.min(fadeBetween(progress, 0.27, 0.42), 1 - fadeBetween(progress, 0.58, 0.72)),
    fadeBetween(progress, 0.62, 0.78)
  ];

  layerCards.forEach((card, index) => setLayerCardVisual(card, opacities[index] ?? 0));
}

function requestLayerFadeUpdate() {
  if (layerFadeRaf) return;
  layerFadeRaf = window.requestAnimationFrame(updateLayerFades);
}

window.addEventListener("scroll", requestLayerFadeUpdate, { passive: true });
window.addEventListener("resize", requestLayerFadeUpdate);
requestLayerFadeUpdate();

const scrollHintState = new WeakMap();

function hasHorizontalOverflow(scroller) {
  return scroller && scroller.scrollWidth > scroller.clientWidth + 12;
}

function previewHorizontalScroll(scroller, key = "default") {
  if (!hasHorizontalOverflow(scroller)) return;
  if (scrollHintState.get(scroller) === key) return;
  scrollHintState.set(scroller, key);

  const startLeft = scroller.scrollLeft;
  const maxShift = Math.min(68, Math.max(36, scroller.clientWidth * 0.14));
  const targetLeft = Math.min(scroller.scrollWidth - scroller.clientWidth, startLeft + maxShift);
  if (targetLeft <= startLeft + 4) return;

  scroller.classList.add("scroll-preview");
  window.setTimeout(() => {
    if (state.baseOptions.size) return;
    scroller.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, 180);
  window.setTimeout(() => {
    if (state.baseOptions.size) return;
    scroller.scrollTo({ left: startLeft, behavior: "smooth" });
  }, 850);
  window.setTimeout(() => scroller.classList.remove("scroll-preview"), 1450);
}

function queueLayerScrollHints() {
  if (!state.baseOptions.size) {
    window.setTimeout(() => previewHorizontalScroll(baseOptionsScroller, "base-empty"), 500);
  }
}

document.querySelectorAll("#eventBuilder select").forEach(enhanceChoiceSelect);
window.addEventListener("resize", () => requestAnimationFrame(refreshPinwheels));

eventTypeField.addEventListener("change", () => {
  state.eventType = eventTypeField.value;
  renderSpecificQuestions(state.eventType);
  updateProgress();
});

document.getElementById("openDetails").addEventListener("click", () => {
  if (typeof detailsDialog.showModal === "function") {
    detailsDialog.showModal();
  } else {
    detailsDialog.setAttribute("open", "");
  }
});

document.getElementById("saveDetails").addEventListener("click", () => {
  state.detailsSaved = true;
  detailsDialog.close();
  updateProgress();
});


document.getElementById("openFounder").addEventListener("click", () => {
  if (typeof founderDialog.showModal === "function") {
    founderDialog.showModal();
  } else {
    founderDialog.setAttribute("open", "");
  }
});

const gallerySlides = [...document.querySelectorAll(".carousel-slide")];
const galleryDots = document.getElementById("galleryDots");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
let galleryIndex = 0;
let galleryTimer;
let touchStartX = 0;

function buildGalleryDots() {
  if (!galleryDots) return;

  gallerySlides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-dot";
    button.setAttribute("aria-label", `Show gallery image ${index + 1}`);
    button.addEventListener("click", () => {
      showGallerySlide(index);
      restartGalleryTimer();
    });
    galleryDots.appendChild(button);
  });
}

function showGallerySlide(nextIndex) {
  if (!gallerySlides.length) return;

  const previousIndex = galleryIndex;
  const normalizedIndex = (nextIndex + gallerySlides.length) % gallerySlides.length;
  const movingForward = normalizedIndex >= previousIndex || (previousIndex === gallerySlides.length - 1 && normalizedIndex === 0);
  galleryIndex = normalizedIndex;

  gallerySlides.forEach((slide, index) => {
    slide.classList.remove("is-active", "is-left");

    if (index === galleryIndex) {
      slide.classList.add("is-active");
    } else if (index === previousIndex && movingForward) {
      slide.classList.add("is-left");
    }
  });

  [...galleryDots.children].forEach((dot, index) => {
    dot.classList.toggle("is-active", index === galleryIndex);
    dot.setAttribute("aria-current", index === galleryIndex ? "true" : "false");
  });
}

function nextGallerySlide() {
  showGallerySlide(galleryIndex + 1);
}

function previousGallerySlide() {
  showGallerySlide(galleryIndex - 1);
}

function restartGalleryTimer() {
  clearInterval(galleryTimer);
  galleryTimer = setInterval(nextGallerySlide, 5200);
}

if (gallerySlides.length) {
  buildGalleryDots();
  showGallerySlide(0);
  restartGalleryTimer();

  galleryNext.addEventListener("click", () => {
    nextGallerySlide();
    restartGalleryTimer();
  });

  galleryPrev.addEventListener("click", () => {
    previousGallerySlide();
    restartGalleryTimer();
  });

  document.getElementById("portfolioCarousel").addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  document.getElementById("portfolioCarousel").addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) > 40) {
      distance > 0 ? nextGallerySlide() : previousGallerySlide();
      restartGalleryTimer();
    }
  });
}

document.getElementById("eventBuilder").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const request = {
    createdAt: new Date().toISOString(),
    baseOptions: [...state.baseOptions],
    detailsSaved: state.detailsSaved,
    contact: {
      name: document.getElementById("contactName").value,
      phone: document.getElementById("contactPhone").value,
      email: document.getElementById("contactEmail").value
    },
    fields: Object.fromEntries(formData.entries()),
    temporaryQuote: calculateTemporaryQuote(),
    optionalDetails: {
      clientName: document.getElementById("clientName").value,
      clientEmail: document.getElementById("clientEmail").value,
      clientPhone: document.getElementById("clientPhone").value,
      budgetRange: document.getElementById("budgetRange").value,
      hasRider: document.getElementById("hasRider").value,
      loadInNotes: document.getElementById("loadInNotes").value,
      extraNotes: document.getElementById("extraNotes").value
    },
    status: "New"
  };

  const saved = JSON.parse(localStorage.getItem("jpEventBuildRequests") || "[]");
  saved.push(request);
  localStorage.setItem("jpEventBuildRequests", JSON.stringify(saved));

  recommendationTitle.textContent = "Build request saved.";
  recommendationCopy.textContent = "Demo mode saved this request in the browser. Supabase can replace this with live lead storage and email alerts.";
  minimumNote.textContent = "";
});

updateProgress();
window.setTimeout(queueLayerScrollHints, 700);
