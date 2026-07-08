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
    services: ["Speaker system", "Wireless microphones", "Subwoofer support", "DJ setup", "Backline", "Live band coverage", "Lighting", "Technician"]
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

const djPlayTimeQuestion = {
  label: "How many hours will the DJ play?",
  name: "djPlayHours",
  type: "select",
  options: ["Not sure yet", "Up to 2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7+ hours"]
};

function shouldAskDjPlayHours(type) {
  return type === "Wedding" || type === "DJ / Private Party" || state.baseOptions.has("DJ setup");
}

function includesQuestionNamed(questions, name) {
  return questions.some((question) => question.name === name);
}

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
    const scroller = horizontalScrollerFor(field);
    const left = scroller ? Number(field.dataset.scrollLeftBeforeChoice || scroller.scrollLeft || 0) : 0;
    pulseElement(label);
    updateProgress();
    if (scroller) holdScrollerPosition(scroller, left, 1000);
  });
  label.appendChild(field);
  enhanceChoiceSelect(field);
  return label;
}

function pulseElement(element) {
  if (!element) return;

  // Mobile horizontal cards were shaking because the tap pulse animation
  // fought against the scroll-wheel transform. Keep the selection
  // instant on small screens and let the selected color carry the feedback.
  const isSmallScreen = window.matchMedia("(max-width: 720px)").matches;
  element.classList.remove("field-pulse", "just-selected");
  if (isSmallScreen) return;

  void element.offsetWidth;
  element.classList.add(element.classList.contains("option-card") ? "just-selected" : "field-pulse");
}

function openChoiceDialog(field) {
  if (!field || field.options.length <= 1) return;
  if (choiceDialog.open) return;

  const openingScroller = horizontalScrollerFor(field);
  if (openingScroller) field.dataset.scrollLeftBeforeChoice = String(openingScroller.scrollLeft);

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
      const activeField = activeChoiceField;
      const scroller = horizontalScrollerFor(activeField);
      const preservedScrollPositions = rememberHorizontalScrollPositions();
      const focusedLeft = scroller ? Number(activeField.dataset.scrollLeftBeforeChoice || scroller.scrollLeft || 0) : 0;

      activeField.value = option.value;
      activeField.dispatchEvent(new Event("change", { bubbles: true }));
      activeField.blur();

      if (typeof choiceDialog.close === "function") {
        choiceDialog.close();
      } else {
        choiceDialog.removeAttribute("open");
      }

      if (scroller) preservedScrollPositions.push([scroller, focusedLeft]);
      lockHorizontalScrollPositions(preservedScrollPositions, 1200);
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

  if (shouldAskDjPlayHours(type) && !includesQuestionNamed(questions, "djPlayHours")) {
    questions = [...questions, djPlayTimeQuestion];
  }

  if (state.baseOptions.has("Backline") && type !== "Band / Backline") {
    questions = [...questions, ...backlineAddOnQuestions];
  }

  questions.forEach((question) => {
    specificQuestions.appendChild(makeField(question));
  });

  if (questions.length) {
    revealLayer(specificLayer);
    initVisibleScrollBars();
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

function getDjPlayHours(type) {
  const field = document.querySelector('[name="djPlayHours"]');
  const value = field ? field.value : "";

  if (value === "Up to 2 hours") return 2;
  if (value === "3 hours") return 3;
  if (value === "4 hours") return 4;
  if (value === "5 hours") return 5;
  if (value === "6 hours") return 6;
  if (value === "7+ hours") return 7;

  return type === "Wedding" ? 4 : PRICING.djMinimumHours;
}

function getDjPlayHoursLabel(type) {
  const field = document.querySelector('[name="djPlayHours"]');
  return field && field.value ? field.value : (type === "Wedding" ? "Not sure yet / included up to 4 hours" : "Not sure yet / 3-hour minimum");
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

const PRICING = {
  minimumQuote: 450,
  churchTechOnly: 200,
  basicSoundPackage: 450,
  additionalSpeakerSystem: 300,
  standaloneWirelessMicrophone: 75,
  additionalWirelessMicrophone: 30,
  includedWirelessMicsPerPackage: 1,
  subwoofer: 200,
  djBaseRate: 300,
  djIncludedHours: 4,
  djExtraHourlyAfterFour: 100,
  djMinimumHours: 3,
  backline: 250,
  liveBandCoverage: 250,
  lighting: 250,
  playback: 75,
  technicianDayRate: 200,
  weddingMinimum: 1000,
  weddingIncludedDjHours: 4,
  internalQuoteProtectionRate: 0.15
};

function selectedOnly(...options) {
  if (state.baseOptions.size !== options.length) return false;
  return options.every((option) => state.baseOptions.has(option));
}

function requestedSpeakerSystemCount(type, venueSize, speakerSystems, indoorOutdoor) {
  let count = 0;

  if (state.baseOptions.has("Speaker system") || state.baseOptions.has("DJ setup") || type === "Wedding") {
    count = 1;
  }

  if (speakerSystems.startsWith("1 main")) count = Math.max(count, 1);
  if (speakerSystems.startsWith("2 systems")) count = Math.max(count, 2);
  if (speakerSystems.startsWith("3 systems")) count = Math.max(count, 3);
  if (indoorOutdoor === "Both") count = Math.max(count, 2);
  if (venueSize.includes("Large room")) count = Math.max(count, 2);
  if (venueSize.includes("Outdoor wide")) count = Math.max(count, 3);
  if (venueSize.includes("Multiple rooms")) count = Math.max(count, 3);

  return count;
}

function micCountFromValue(value) {
  if (!value) return 0;
  if (/5\+/.test(value)) return 5;
  if (/3-4/.test(value)) return 4;
  const match = String(value).match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function requestedWirelessMicCount(type) {
  const specificNames = [
    "weddingMics",
    "presenterMics",
    "churchSpeakingMics",
    "communityMics",
    "schoolMics"
  ];

  let count = 0;
  specificNames.forEach((name) => {
    const field = document.querySelector(`[name="${name}"]`);
    if (field) count = Math.max(count, micCountFromValue(field.value));
  });

  if (state.baseOptions.has("Wireless microphones")) count = Math.max(count, 1);
  if (state.baseOptions.has("DJ setup")) count = Math.max(count, PRICING.includedWirelessMicsPerPackage);
  if (type === "Wedding") count = Math.max(count, PRICING.includedWirelessMicsPerPackage);

  return count;
}

function hasPackageWithIncludedWireless(type) {
  return state.baseOptions.has("Speaker system") || state.baseOptions.has("DJ setup") || type === "Wedding";
}

function includedWirelessMicCount(type) {
  return hasPackageWithIncludedWireless(type) ? PRICING.includedWirelessMicsPerPackage : 0;
}

function isChurchTechnicianOnly(type) {
  return type === "Church" && selectedOnly("Technician");
}

function quoteDisplayText(quote) {
  if (!quote || (!quote.low && !quote.high)) return "$0";
  if (quote.low === quote.high) return money(quote.low);
  return `${money(quote.low)} - ${money(quote.high)}`;
}

function calculateTemporaryQuote() {
  const items = [];
  const type = eventTypeField.value;
  const venueSize = document.getElementById("venueSize").value;
  const guestCount = document.getElementById("guestCount").value;
  const speakerSystems = document.getElementById("speakerSystems").value;
  const indoorOutdoor = document.getElementById("indoorOutdoor").value;
  const hours = getEventHours();
  const djPlayHours = getDjPlayHours(type);
  const billableDjHours = Math.max(PRICING.djMinimumHours, djPlayHours);
  const speakerSystemCount = requestedSpeakerSystemCount(type, venueSize, speakerSystems, indoorOutdoor);
  const requestedMics = requestedWirelessMicCount(type);
  const includedMics = includedWirelessMicCount(type);
  const additionalMics = Math.max(0, requestedMics - includedMics);
  const liveBandCoverageSelected = state.baseOptions.has("Live band coverage");
  let subtotal = 0;

  if (state.baseOptions.size === 0) {
    return {
      low: 0,
      high: 0,
      items: ["Choose at least one service box to generate a temporary estimate."],
      note: "Click the boxes above to start your quote."
    };
  }

  if (isChurchTechnicianOnly(type)) {
    return {
      low: PRICING.churchTechOnly,
      high: PRICING.churchTechOnly,
      items: ["Church on-site technician service: $200 per service"],
      note: "Church technician-only support is priced as a simple $200 per-service option."
    };
  }

  if (type === "Wedding") {
    subtotal += PRICING.weddingMinimum;
    items.push("Wedding production minimum: $1,000 (includes DJ coverage up to 4 hours, 1 speaker system, 1 wireless mic, party lights, and event operation)");
    if (state.baseOptions.has("DJ setup")) {
      items.push("DJ setup selected: included in the wedding minimum, no separate DJ package charge");
    }

    items.push(`Wedding DJ play time: ${getDjPlayHoursLabel(type)} (included up to 4 hours)`);

    if (djPlayHours > PRICING.weddingIncludedDjHours) {
      const extraHours = djPlayHours - PRICING.weddingIncludedDjHours;
      const extraDj = extraHours * PRICING.djExtraHourlyAfterFour;
      subtotal += extraDj;
      items.push(`Additional wedding DJ play time beyond 4 hours: ${extraHours} hr x $100/hr = ${money(extraDj)}`);
    }

    if (speakerSystemCount > 1) {
      const extraSystems = speakerSystemCount - 1;
      const extraSystemCost = extraSystems * PRICING.additionalSpeakerSystem;
      subtotal += extraSystemCost;
      items.push(`Additional speaker system / zone support: ${extraSystems} x $300 = ${money(extraSystemCost)}`);
    }
  } else if (state.baseOptions.has("DJ setup")) {
    const extraDjHours = Math.max(0, djPlayHours - PRICING.djIncludedHours);
    const djTotal = PRICING.djBaseRate + extraDjHours * PRICING.djExtraHourlyAfterFour;
    subtotal += djTotal;
    items.push(`DJ play time: ${getDjPlayHoursLabel(type)}`);
    if (extraDjHours > 0) {
      items.push(`DJ service package: $300 up to 4 hours + ${extraDjHours} extra hr x $100/hr = ${money(djTotal)} (includes 1 speaker system, 1 wireless mic, party lights, and on-site technician)`);
    } else {
      items.push(`DJ service package: $300 up to 4 hours (includes 1 speaker system, 1 wireless mic, party lights, and on-site technician)`);
    }

    if (speakerSystemCount > 1) {
      const extraSystems = speakerSystemCount - 1;
      const extraSystemCost = extraSystems * PRICING.additionalSpeakerSystem;
      subtotal += extraSystemCost;
      items.push(`Additional speaker system / zone support: ${extraSystems} x $300 = ${money(extraSystemCost)}`);
    }
  } else if (speakerSystemCount > 0 || state.baseOptions.has("Speaker system")) {
    const systems = Math.max(1, speakerSystemCount);
    const soundTotal = PRICING.basicSoundPackage + Math.max(0, systems - 1) * PRICING.additionalSpeakerSystem;
    subtotal += soundTotal;
    items.push(`Basic sound package: $450 (2-3 hr, 1 speaker system, 1 wireless mic)`);

    if (systems > 1) {
      items.push(`Additional speaker system / zone support: ${systems - 1} x $300 = ${money((systems - 1) * PRICING.additionalSpeakerSystem)}`);
    }
  }

  if (includedMics > 0 && (state.baseOptions.has("Wireless microphones") || requestedMics > 0)) {
    items.push(`Wireless microphone support included (${includedMics} included)`);
  }

  if (additionalMics > 0) {
    const micTotal = additionalMics * PRICING.additionalWirelessMicrophone;
    subtotal += micTotal;
    items.push(`Additional wireless microphones: ${additionalMics} x $30 flat = ${money(micTotal)}`);
  } else if (state.baseOptions.has("Wireless microphones") && includedMics === 0) {
    const standaloneMics = Math.max(1, requestedMics);
    const micTotal = standaloneMics * PRICING.standaloneWirelessMicrophone;
    subtotal += micTotal;
    items.push(`Wireless microphones alone: ${standaloneMics} x $75 flat = ${money(micTotal)}`);
  }

  if (state.baseOptions.has("Subwoofer support")) {
    subtotal += PRICING.subwoofer;
    items.push("Subwoofer support: $200 flat");
  }

  if (state.baseOptions.has("Backline")) {
    subtotal += PRICING.backline;
    items.push("Backline / rider support starting allowance: $250 flat");
  }

  if (liveBandCoverageSelected) {
    subtotal += PRICING.liveBandCoverage;
    items.push("Live band coverage + cables/mics add-on: $250 flat");

    if (!state.baseOptions.has("DJ setup") && type !== "Wedding" && !state.baseOptions.has("Technician")) {
      subtotal += PRICING.technicianDayRate;
      items.push("Required on-site technician for live band coverage: $200 flat");
    } else if (state.baseOptions.has("DJ setup") || type === "Wedding") {
      items.push("Required technician for live band coverage is already included with DJ / wedding coverage");
    }
  }

  if (state.baseOptions.has("Lighting")) {
    if (type === "Wedding") {
      items.push("Party lighting included in wedding minimum");
    } else if (state.baseOptions.has("DJ setup")) {
      items.push("Party lights included with DJ setup");
    } else {
      subtotal += PRICING.lighting;
      items.push("Event lighting / party lights: $250 flat");
    }
  }

  if (state.baseOptions.has("Playback triggers")) {
    subtotal += PRICING.playback;
    items.push("Playback / trigger support: $75 flat");
  }

  if (state.baseOptions.has("Technician")) {
    if (state.baseOptions.has("DJ setup") || type === "Wedding") {
      items.push("On-site technician included with DJ / wedding coverage");
    } else {
      subtotal += PRICING.technicianDayRate;
      items.push("On-site technician day/service rate: $200 flat");
    }
  }

  if (guestCount === "200+") {
    items.push("200+ guests: JP should manually review final coverage before confirming price.");
  }

  if (subtotal > 0 && subtotal < PRICING.minimumQuote) {
    subtotal = PRICING.minimumQuote;
    items.push("Minimum quote applied: $450");
  }

  if (subtotal === 0) {
    subtotal = PRICING.minimumQuote;
    items.push("Minimum quote applied: $450");
  }

  const internalProtection = Math.round(subtotal * PRICING.internalQuoteProtectionRate);
  if (internalProtection > 0) {
    subtotal += internalProtection;
  }

  return {
    low: subtotal,
    high: subtotal,
    items,
    note: "This is a starting estimate. Final pricing may adjust after JP confirms venue access, exact timing, rider needs, live band coverage, and coverage zones. Please plan for at least 2 hours of setup before the event and 2 hours of tear down after the event."
  };
}

function updateQuotePreview() {
  const quote = calculateTemporaryQuote();
  const rangeText = quoteDisplayText(quote);

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
  // Suggested setup/package cards removed from the quote view.
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
  if (eventType === "Wedding" || state.baseOptions.has("DJ setup")) summaryItems.push(`DJ play time: ${getDjPlayHoursLabel(eventType)}`);

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
    recommendationTitle.textContent = "Start your quote above.";
    recommendationCopy.textContent = "Click one or more service boxes to begin. Then scroll sideways through the questions so JP can price the room correctly.";
    return;
  }

  if (!type || !systems || !size) {
    recommendationTitle.textContent = "Keep building your quote.";
    recommendationCopy.textContent = "Add the event type, venue size, and speaker-system count next. Exact date and time can stay TBD.";
    return;
  }

  recommendationTitle.textContent = "Quote details captured.";
  recommendationCopy.textContent = "JP will review your selected services, room details, timing, and contact info before confirming the final quote.";

  if (type === "Wedding") {
    minimumNote.textContent = "Wedding events start at $1,000.";
  }
}

function rememberHorizontalScrollPositions() {
  return [baseOptionsScroller, document.querySelector("#logisticsLayer .field-grid"), specificQuestions]
    .filter(Boolean)
    .map((scroller) => [scroller, scroller.scrollLeft]);
}

function restoreHorizontalScrollPositions(positions) {
  positions.forEach(([scroller, left]) => {
    if (!scroller) return;
    scroller.scrollLeft = left;
  });
}

function horizontalScrollerFor(element) {
  if (!element || !element.closest) return null;
  return element.closest(".option-grid, #logisticsLayer .field-grid, #specificQuestions");
}

function lockHorizontalScrollPositions(positions, duration = 900) {
  const cappedDuration = Math.min(duration, 140);
  const start = performance.now();
  function tick(now) {
    restoreHorizontalScrollPositions(positions);
    if (now - start < cappedDuration) requestAnimationFrame(tick);
  }
  restoreHorizontalScrollPositions(positions);
  requestAnimationFrame(tick);
  setTimeout(() => restoreHorizontalScrollPositions(positions), 0);
  setTimeout(() => restoreHorizontalScrollPositions(positions), cappedDuration + 60);
}

function holdScrollerPosition(scroller, left, duration = 260) {
  if (!scroller) return;
  const cappedDuration = Math.min(duration, 120);
  const start = performance.now();
  function tick(now) {
    scroller.scrollLeft = left;
    if (now - start < cappedDuration) {
      requestAnimationFrame(tick);
    }
  }
  scroller.scrollLeft = left;
  requestAnimationFrame(tick);
  setTimeout(() => { scroller.scrollLeft = left; }, 0);
  setTimeout(() => { scroller.scrollLeft = left; }, cappedDuration + 50);
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
  const preservedScrollPositions = rememberHorizontalScrollPositions();
  const completion = getCompletion();
  progressFill.style.width = `${completion}%`;
  progressText.textContent = `${completion}% complete`;
  updateStepText(completion);
  updateSelectedList();
  updateRecommendation();
  updateQuotePreview();

  if (state.baseOptions.size > 0) {
    revealLayer(logisticsLayer);
  } else {
    hideLayer(logisticsLayer);
    hideLayer(specificLayer);
    hideLayer(summaryLayer);
    lockHorizontalScrollPositions(preservedScrollPositions, 450);
    return;
  }

  if (eventTypeField.value) {
    revealLayer(summaryLayer);
  } else {
    hideLayer(summaryLayer);
  }

  lockHorizontalScrollPositions(preservedScrollPositions, 450);
  requestAnimationFrame(refreshPinwheels);
}

baseButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    button.dataset.scrollLeftBeforeSelect = baseOptionsScroller ? String(baseOptionsScroller.scrollLeft) : "0";
  });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const option = button.dataset.option;
    const preservedScrollPositions = rememberHorizontalScrollPositions();
    const baseScrollLeft = Number(button.dataset.scrollLeftBeforeSelect || (baseOptionsScroller ? baseOptionsScroller.scrollLeft : 0));

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

    button.blur();
    updateProgress();
    if (baseOptionsScroller) preservedScrollPositions.push([baseOptionsScroller, baseScrollLeft]);
    lockHorizontalScrollPositions(preservedScrollPositions, 120);
    requestAnimationFrame(refreshPinwheels);
    button.blur();
  });
});

document.querySelectorAll("#logisticsLayer input, #logisticsLayer select").forEach((field) => {
  field.addEventListener("input", updateProgress);
  field.addEventListener("change", () => {
    const scroller = horizontalScrollerFor(field);
    const left = scroller ? Number(field.dataset.scrollLeftBeforeChoice || scroller.scrollLeft || 0) : 0;
    pulseElement(field.closest("label"));
    updateProgress();
    if (scroller) holdScrollerPosition(scroller, left, 1000);
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

  const center = scroller.scrollLeft + scroller.clientWidth / 2;
  const isSmallScreen = window.matchMedia("(max-width: 720px)").matches;

  items.forEach((item) => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const distance = (itemCenter - center) / Math.max(scroller.clientWidth / 2, 1);
    const clamped = Math.max(-1, Math.min(1, distance));
    const closeness = 1 - Math.abs(clamped);

    const scale = isSmallScreen
      ? Number((0.975 + closeness * 0.035).toFixed(3))
      : Number((0.955 + closeness * 0.065).toFixed(3));
    const lift = isSmallScreen ? 0 : Number((Math.abs(clamped) * 6).toFixed(2));
    const rotate = isSmallScreen ? 0 : Number((clamped * -4).toFixed(2));
    const opacity = isSmallScreen
      ? Number((0.86 + closeness * 0.14).toFixed(3))
      : Number((0.78 + closeness * 0.22).toFixed(3));

    item.style.transform = `perspective(900px) rotateY(${rotate}deg) translate3d(0, ${lift}px, 0) scale(${scale})`;
    item.style.opacity = `${opacity}`;
  });
}

function refreshPinwheels() {
  applyPinwheel(baseOptionsScroller, ".option-card");
  applyPinwheel(document.querySelector("#logisticsLayer .field-grid"), "label");
  applyPinwheel(specificQuestions, "label");
}

let pinwheelFrame = null;
function scheduleRefreshPinwheels() {
  if (pinwheelFrame) return;
  pinwheelFrame = requestAnimationFrame(() => {
    pinwheelFrame = null;
    refreshPinwheels();
  });
}

const horizontalScrollers = [baseOptionsScroller, document.querySelector("#logisticsLayer .field-grid"), specificQuestions].filter(Boolean);
horizontalScrollers.forEach((scroller) => {
  scroller.addEventListener("scroll", scheduleRefreshPinwheels);
  scroller.addEventListener("wheel", (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    scroller.scrollLeft += event.deltaY;
  }, { passive: false });
});



document.querySelectorAll("#eventBuilder select").forEach(enhanceChoiceSelect);
window.addEventListener("resize", scheduleRefreshPinwheels);

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

const signinPreview = document.getElementById("signinPreview");
if (signinPreview) {
  signinPreview.addEventListener("click", () => {
    signinPreview.textContent = "Customer accounts coming soon";
    signinPreview.setAttribute("aria-live", "polite");
  });
}

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

const jpSubmissionInbox = "jpeventproduction@gmail.com";

function cleanValue(value) {
  return String(value || "").trim();
}

function fieldValue(id) {
  const field = document.getElementById(id);
  return field ? cleanValue(field.value) : "";
}

function prettyDateTime(value) {
  if (!value) return "Not provided yet";
  return value;
}

function readableLabel(name) {
  const map = {
    eventType: "Event type",
    eventDate: "Event date",
    startTime: "Start time",
    endTime: "End time",
    venue: "Venue / location",
    venueSize: "Venue size",
    guestCount: "Guest count",
    speakerSystems: "Speaker systems",
    indoorOutdoor: "Indoor / outdoor",
    powerAccess: "Power access",
    contactName: "Contact name",
    contactPhone: "Contact phone",
    contactEmail: "Contact email"
  };

  if (map[name]) return map[name];

  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function collectSpecificAnswersForEmail() {
  return [...specificQuestions.querySelectorAll("label")]
    .map((label) => {
      const field = label.querySelector("select");
      if (!field || !field.value) return null;
      const labelText = label.childNodes[0].textContent.trim();
      return { label: labelText, value: field.value };
    })
    .filter(Boolean);
}

function buildRequestObject(eventTarget) {
  const formData = new FormData(eventTarget);

  return {
    createdAt: new Date().toISOString(),
    baseOptions: [...state.baseOptions],
    detailsSaved: state.detailsSaved,
    contact: {
      name: fieldValue("contactName"),
      phone: fieldValue("contactPhone"),
      email: fieldValue("contactEmail")
    },
    fields: Object.fromEntries(formData.entries()),
    temporaryQuote: calculateTemporaryQuote(),
    optionalDetails: {
      clientName: fieldValue("clientName"),
      clientEmail: fieldValue("clientEmail"),
      clientPhone: fieldValue("clientPhone"),
      budgetRange: fieldValue("budgetRange"),
      hasRider: fieldValue("hasRider"),
      loadInNotes: fieldValue("loadInNotes"),
      extraNotes: fieldValue("extraNotes")
    },
    status: "New"
  };
}

function detailLine(label, value) {
  const cleaned = cleanValue(value);
  return `${label}: ${cleaned || "Not provided yet"}`;
}

function formatEmailBody(request) {
  const fields = request.fields || {};
  const quote = request.temporaryQuote || {};
  const optional = request.optionalDetails || {};
  const specificAnswers = collectSpecificAnswersForEmail();
  const quoteItems = Array.isArray(quote.items) ? quote.items : [];

  const lines = [
    "JP EVENT PRODUCTION — BUILD REQUEST",
    "Live Sound Audio, DJ and Backline",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "NEW WEBSITE SUBMISSION",
    detailLine("Submitted", new Date(request.createdAt).toLocaleString()),
    detailLine("Status", request.status),
    "",
    "CLIENT CONTACT",
    detailLine("Name", request.contact.name),
    detailLine("Phone", request.contact.phone),
    detailLine("Email", request.contact.email),
    "",
    "EVENT SNAPSHOT",
    detailLine("Event type", fields.eventType),
    detailLine("Event date", prettyDateTime(fields.eventDate)),
    detailLine("Start time", prettyDateTime(fields.startTime)),
    detailLine("End time", prettyDateTime(fields.endTime)),
    detailLine("Venue / location", fields.venue),
    detailLine("Guest count", fields.guestCount),
    detailLine("Venue size", fields.venueSize),
    detailLine("Indoor / outdoor", fields.indoorOutdoor),
    detailLine("Power access", fields.powerAccess),
    detailLine("Speaker systems", fields.speakerSystems),
    "",
    "PRODUCTION LAYERS SELECTED",
    request.baseOptions.length ? request.baseOptions.map((item) => `• ${item}`).join("\n") : "No production layers selected.",
    "",
    "TEMPORARY QUOTE RANGE",
    quoteDisplayText(quote),
    quote.note || "Final pricing should be confirmed after reviewing the full event details.",
    "",
    "QUOTE BREAKDOWN",
    quoteItems.length ? quoteItems.map((item) => `• ${item}`).join("\n") : "No quote breakdown available.",
    "",
    "SETUP / TEAR-DOWN EXPECTATION",
    "Please plan for at least 2 hours before the event start time for setup and at least 2 hours after the event end time for tear-down.",
    "",
    "EVENT-SPECIFIC ANSWERS",
    specificAnswers.length ? specificAnswers.map((item) => `• ${item.label}: ${item.value}`).join("\n") : "No event-specific answers provided yet.",
    "",
    "OPTIONAL DETAILS",
    detailLine("Alternate contact name", optional.clientName),
    detailLine("Alternate contact email", optional.clientEmail),
    detailLine("Alternate contact phone", optional.clientPhone),
    detailLine("Budget range", optional.budgetRange),
    detailLine("Stage plot / rider", optional.hasRider),
    detailLine("Load-in / parking notes", optional.loadInNotes),
    "Additional notes:",
    optional.extraNotes || "None provided.",
    "",
    "STAFF NEXT STEPS",
    "1. Review event scope, venue needs, timing, and coverage zones.",
    "2. Confirm any unclear details with the client.",
    "3. Send the official quote and booking agreement.",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "Generated from the JP Event Production website."
  ];

  return lines.join("\n");
}

function makeEmailSubject(request) {
  const name = request.contact.name || "New Client";
  const type = request.fields.eventType || "Event";
  const date = request.fields.eventDate || "Date TBD";
  return `New Build Request: ${name} — ${type} — ${date}`;
}

function openSubmissionEmail(request) {
  const subject = makeEmailSubject(request);
  const body = formatEmailBody(request);
  const mailtoUrl = `mailto:${jpSubmissionInbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const emailLink = document.createElement("a");
  emailLink.href = mailtoUrl;
  emailLink.style.display = "none";
  document.body.appendChild(emailLink);
  emailLink.click();
  emailLink.remove();
}

function saveRequestLocally(request) {
  const saved = JSON.parse(localStorage.getItem("jpEventBuildRequests") || "[]");
  saved.push(request);
  localStorage.setItem("jpEventBuildRequests", JSON.stringify(saved));
}

function markEmailSubmissionComplete() {
  recommendationTitle.textContent = "Build request email prepared.";
  recommendationCopy.textContent = "Your email app should open with a complete JP Event Production request already addressed to jpeventproduction@gmail.com. Please press Send so JP receives the request.";
  minimumNote.textContent = "The request is also saved in this browser as a backup.";
}

document.getElementById("eventBuilder").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!event.currentTarget.reportValidity()) return;

  const request = buildRequestObject(event.currentTarget);
  saveRequestLocally(request);
  openSubmissionEmail(request);
  markEmailSubmissionComplete();
});

function attachVisibleScrollBar(scroller) {
  if (!scroller || scroller.dataset.visibleScrollBar === "true") return;
  scroller.dataset.visibleScrollBar = "true";

  const bar = document.createElement("div");
  bar.className = "visible-scrollbar";
  bar.setAttribute("aria-hidden", "true");
  const thumb = document.createElement("span");
  thumb.className = "visible-scrollbar-thumb";
  bar.appendChild(thumb);
  scroller.insertAdjacentElement("afterend", bar);

  let dragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  function updateThumb() {
    const maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const trackWidth = Math.max(bar.clientWidth, 1);
    const ratio = scroller.scrollWidth > 0 ? scroller.clientWidth / scroller.scrollWidth : 1;
    const thumbWidth = Math.max(44, Math.min(trackWidth, trackWidth * ratio));
    const maxThumbLeft = Math.max(trackWidth - thumbWidth, 0);
    const thumbLeft = maxScroll ? (scroller.scrollLeft / maxScroll) * maxThumbLeft : 0;

    thumb.style.width = `${thumbWidth}px`;
    thumb.style.transform = `translateX(${thumbLeft}px)`;
    bar.classList.toggle("is-disabled", maxScroll <= 2);
  }

  scroller.addEventListener("scroll", updateThumb, { passive: true });
  window.addEventListener("resize", updateThumb);

  bar.addEventListener("pointerdown", (event) => {
    const maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    if (!maxScroll) return;

    if (event.target !== thumb) {
      const rect = bar.getBoundingClientRect();
      const clickRatio = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(rect.width, 1)));
      scroller.scrollLeft = clickRatio * maxScroll;
      updateThumb();
      return;
    }

    dragging = true;
    startX = event.clientX;
    startScrollLeft = scroller.scrollLeft;
    thumb.setPointerCapture(event.pointerId);
    thumb.classList.add("is-dragging");
  });

  thumb.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const maxScroll = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
    const trackWidth = Math.max(bar.clientWidth, 1);
    const thumbWidth = Math.max(44, Math.min(trackWidth, trackWidth * (scroller.clientWidth / scroller.scrollWidth)));
    const maxThumbLeft = Math.max(trackWidth - thumbWidth, 1);
    const delta = event.clientX - startX;
    scroller.scrollLeft = startScrollLeft + (delta / maxThumbLeft) * maxScroll;
    updateThumb();
  });

  thumb.addEventListener("pointerup", (event) => {
    dragging = false;
    thumb.classList.remove("is-dragging");
    try { thumb.releasePointerCapture(event.pointerId); } catch (error) {}
  });

  requestAnimationFrame(updateThumb);
  setTimeout(updateThumb, 300);
}

function initVisibleScrollBars() {
  [baseOptionsScroller, document.querySelector("#logisticsLayer .field-grid"), specificQuestions]
    .filter(Boolean)
    .forEach(attachVisibleScrollBar);
}

const pricingShortcut = document.querySelector(".pricing-shortcut");
const transparentPricingGuide = document.getElementById("transparentPricingGuide");
if (pricingShortcut && transparentPricingGuide) {
  pricingShortcut.addEventListener("click", (event) => {
    event.preventDefault();
    transparentPricingGuide.open = true;
    transparentPricingGuide.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

initVisibleScrollBars();

updateProgress();
