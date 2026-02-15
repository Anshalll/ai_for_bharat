/* ============================================================
   API CONFIGURATION
   ============================================================ */
const API_URL = 'http://13.201.19.252:5000/get_data';

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const langs = {
  hi: {
    code: "हिन्दी",
    english: "Hindi",
    location: "लखनौ, उत्तर प्रदेश",
    heroLabel: "🚀 भारत के लिए AI",
    heroTitle: "हर फसल के लिए<br/><em>स्मार्ट दाम</em>",
    heroSub: "AI द्वारा लाइव फसल दाम और 7-दिन का पूर्वानुमान — किसानों को सबसे अच्छी मंडी खोजने में मदद।",
    onion: "प्याज़",
    potato: "आलू",
    wheat: "गेहूँ",
    tomato: "टमाटर",
    rice: "चावल",
    vegetable: "सब्जी",
    grain: "अनाज",
    recommendedMarket: "सुझाई गई मंडी",
    avgPrice: "औसत दाम (7 दिन)",
    perQuintal: "प्रति कुंटल",
    forecast7Days: "📊 7-दिन का पूर्वानुमान",
    viewForecast: "देखें",
    hideForecast: "छिपाएं",
    priceRange: "दाम सीमा",
    predictedPrice: "अनुमानित दाम",
    lower: "कम",
    upper: "ज़्यादा",
    chooseLang: "भाषा चुनें",
    loading: "डेटा लोड हो रहा है...",
    error: "डेटा लोड करने में त्रुटि",
    checkConnection: "कृपया अपना इंटरनेट कनेक्शन जांचें",
    disclaimer: "कीमतें सार्वजनिक रूप से उपलब्ध डेटा के आधार पर सलाहकार पूर्वानुमान हैं। वास्तविक बाजार कीमतें भिन्न हो सकती हैं।",
    project: "AI for Bharat – Crop Price & Market Advisor"
  },
  en: {
    code: "English",
    english: "English",
    location: "Lucknow, Uttar Pradesh",
    heroLabel: "🚀 AI for Bharat",
    heroTitle: "Smart prices<br/>for <em>every harvest</em>",
    heroSub: "Live crop rates with 7-day AI forecasts — helping farmers find the best markets.",
    onion: "Onion",
    potato: "Potato",
    wheat: "Wheat",
    tomato: "Tomato",
    rice: "Rice",
    vegetable: "Vegetable",
    grain: "Grain",
    recommendedMarket: "Recommended Market",
    avgPrice: "Average Price (7 days)",
    perQuintal: "per quintal",
    forecast7Days: "📊 7-Day Forecast",
    viewForecast: "View",
    hideForecast: "Hide",
    priceRange: "Price Range",
    predictedPrice: "Predicted Price",
    lower: "Low",
    upper: "High",
    chooseLang: "Choose Language",
    loading: "Loading data...",
    error: "Error loading data",
    checkConnection: "Please check your internet connection",
    disclaimer: "Prices are advisory predictions based on publicly available data. Actual market prices may vary.",
    project: "AI for Bharat – Crop Price & Market Advisor"
  },
  mr: {
    code: "मराठी",
    english: "Marathi",
    location: "लखनौ, उत्तरक्षेत्र",
    heroLabel: "🚀 भारतसाठी AI",
    heroTitle: "प्रत्येक पिकासाठी<br/><em>स्मार्ट दाम</em>",
    heroSub: "AI द्वारे लाइव पिकाचे दाम आणि 7-दिवसांचा अंदाज — शेतकरींना सर्वोत्तम मंडी शोधण्यास मदत.",
    onion: "कांदा",
    potato: "बटाटा",
    wheat: "गव्हाचा",
    tomato: "टोमॅटो",
    rice: "तांदूळ",
    vegetable: "भाजी",
    grain: "धान्य",
    recommendedMarket: "शिफारस केलेली मंडी",
    avgPrice: "सरासरी किंमत (7 दिवस)",
    perQuintal: "प्रति क्विंटल",
    forecast7Days: "📊 7-दिवसांचा अंदाज",
    viewForecast: "पहा",
    hideForecast: "लपवा",
    priceRange: "किंमत श्रेणी",
    predictedPrice: "अंदाजित किंमत",
    lower: "कमी",
    upper: "जास्त",
    chooseLang: "भाषा निवडा",
    loading: "डेटा लोड होत आहे...",
    error: "डेटा लोड करताना त्रुटी",
    checkConnection: "कृपया तुमचे इंटरनेट कनेक्शन तपासा",
    disclaimer: "किंमती सार्वजनिक डेटावर आधारित सल्लागार अंदाज आहेत. वास्तविक बाजार किंमती भिन्न असू शकतात.",
    project: "AI for Bharat – Crop Price & Market Advisor"
  },
  ta: {
    code: "தமிழ்",
    english: "Tamil",
    location: "லக்கனோ, உத்தர பிரதேசம்",
    heroLabel: "🚀 பாரதத்திற்கு AI",
    heroTitle: "ஒவ்வொரு அறுவடைக்காக<br/><em>ஸ்மார்ட் விலை</em>",
    heroSub: "AI மூலம் நேரடி பயிர் விலைகள் மற்றும் 7-நாள் முன்னறிவிப்பு — விவசாயிகளுக்கு சிறந்த சந்தைகளைக் கண்டறிய உதவுகிறது.",
    onion: "வெங்காயம்",
    potato: "உருளைக்கிழங்கு",
    wheat: "கோதுமை",
    tomato: "தக்காளி",
    rice: "அரிசி",
    vegetable: "காய்கறி",
    grain: "தானியம்",
    recommendedMarket: "பரிந்துரைக்கப்பட்ட சந்தை",
    avgPrice: "சராசரி விலை (7 நாட்கள்)",
    perQuintal: "ஒரு குவிண்டால்",
    forecast7Days: "📊 7-நாள் முன்னறிவிப்பு",
    viewForecast: "பார்க்கவும்",
    hideForecast: "மறைக்கவும்",
    priceRange: "விலை வரம்பு",
    predictedPrice: "கணிக்கப்பட்ட விலை",
    lower: "குறைவு",
    upper: "அதிகம்",
    chooseLang: "மொழி தேர்வு",
    loading: "தரவு ஏற்றுகிறது...",
    error: "தரவு ஏற்றுவதில் பிழை",
    checkConnection: "உங்கள் இணைய இணைப்பைச் சரிபார்க்கவும்",
    disclaimer: "விலைகள் பொது தரவின் அடிப்படையிலான ஆலோசனை கணிப்புகள் ஆகும். உண்மையான சந்தை விலைகள் மாறுபடலாம்.",
    project: "AI for Bharat – Crop Price & Market Advisor"
  }
};

const langOrder = ['hi','en','mr','ta'];
let currentLang = 'hi';
let cropsData = [];

/* ============================================================
   CROP METADATA
   ============================================================ */
const cropMeta = {
  onion: { emoji: '🧅', category: 'vegetable' },
  potato: { emoji: '🥔', category: 'vegetable' },
  tomato: { emoji: '🍅', category: 'vegetable' },
  wheat: { emoji: '🌾', category: 'grain' },
  rice: { emoji: '🌾', category: 'grain' }
};

/* ============================================================
   API FUNCTIONS
   ============================================================ */
async function fetchCropData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */
function renderCropNavigation(crops) {
  const navContainer = document.getElementById('cropNavContainer');
  const nav = document.getElementById('cropNav');
  
  if (crops.length === 0) {
    nav.style.display = 'none';
    return;
  }
  
  navContainer.innerHTML = '';
  
  crops.forEach(crop => {
    const cropName = crop.crop;
    const meta = cropMeta[cropName] || { emoji: '🌱', category: 'vegetable' };
    
    const navItem = document.createElement('a');
    navItem.className = 'crop-nav-item';
    navItem.href = `#crop-${cropName}`;
    navItem.dataset.crop = cropName;
    
    navItem.innerHTML = `
      <div class="crop-nav-emoji">${meta.emoji}</div>
      <div class="crop-nav-label" data-i18n="${cropName}"></div>
    `;
    
    navContainer.appendChild(navItem);
  });
  
  nav.style.display = 'block';
  applyLang(currentLang);
}



function renderCrops(apiData) {
  let crops = [];
  
  if (apiData?.data?.data && Array.isArray(apiData.data.data)) {
    crops = apiData.data.data;
  } else if (apiData?.data && Array.isArray(apiData.data)) {
    crops = apiData.data;
  }
  
  if (crops.length === 0) {
    showError('No data available');
    return;
  }
  
  cropsData = crops;
  
  // Render crop navigation
  renderCropNavigation(crops);
  
  const container = document.createElement('div');
  container.className = 'crops-container';
  
  crops.forEach(crop => {
    container.appendChild(createCropCard(crop));
  });
  
  document.getElementById('mainContent').innerHTML = '';
  document.getElementById('mainContent').appendChild(container);
  document.getElementById('disclaimer').style.display = 'block';
  
  applyLang(currentLang);
  
  // Add scroll observer to update active nav item
  setupScrollObserver();
}

function setupScrollObserver() {
  const options = {
    root: null,
    rootMargin: '-100px 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cropName = entry.target.dataset.crop;
        document.querySelectorAll('.crop-nav-item').forEach(item => {
          item.classList.toggle('active', item.dataset.crop === cropName);
        });
      }
    });
  }, options);
  
  document.querySelectorAll('.crop-card').forEach(card => {
    observer.observe(card);
  });
}

function createCropCard(cropData) {
  const t = langs[currentLang];
  const cropName = cropData.crop;
  const meta = cropMeta[cropName] || { emoji: '🌱', category: 'vegetable' };
  const market = cropData.recommended_market;
  const forecast = cropData.next_7_days_forecast || [];
  const explanation = cropData.explanation || {};
  
  const card = document.createElement('div');
  card.className = 'crop-card';
  card.dataset.crop = cropName;
  card.id = `crop-${cropName}`;
  
  // Calculate price range
  const avgPrice = market?.predicted_average_price || 0;
  const firstDay = forecast[0] || {};
  const lowerBound = firstDay.lower_bound || avgPrice * 0.95;
  const upperBound = firstDay.upper_bound || avgPrice * 1.05;
  
  card.innerHTML = `
    <div class="crop-header">
      <div class="crop-emoji">${meta.emoji}</div>
      <div class="crop-title-section">
        <div class="crop-name" data-i18n="${cropName}"></div>
        <span class="crop-category ${meta.category}" data-i18n="${meta.category}"></span>
      </div>
    </div>
    
    <div class="market-recommendation">
      <div class="market-label" data-i18n="recommendedMarket"></div>
      <div class="market-name">${market?.market || 'N/A'}</div>
      <div class="market-state">${market?.state || ''}</div>
      <div class="market-price">
        ₹${avgPrice.toLocaleString('en-IN')}
        <span class="unit" data-i18n="perQuintal"></span>
      </div>
    </div>
    
    <div class="explanation">
      <span class="explanation-icon">💡</span>
      <span class="explanation-text"></span>
    </div>
    
    <div class="price-range">
      <div class="range-label">
        <span><span data-i18n="lower"></span>: ₹${Math.round(lowerBound).toLocaleString('en-IN')}</span>
        <span><span data-i18n="upper"></span>: ₹${Math.round(upperBound).toLocaleString('en-IN')}</span>
      </div>
      <div class="range-bar">
        <div class="range-indicator" style="left: ${((avgPrice - lowerBound) / (upperBound - lowerBound)) * 100}%"></div>
      </div>
    </div>
    
    ${forecast.length > 0 ? `
    <div class="forecast-section">
      <div class="forecast-header">
        <div class="forecast-title">
          <span data-i18n="forecast7Days"></span>
        </div>
        <button class="expand-btn" onclick="toggleForecast(this)">
          <span data-i18n="viewForecast"></span>
          <span class="arrow">▼</span>
        </button>
      </div>
      <div class="forecast-grid">
        <div class="chart-container" id="chart-${cropName}"></div>
        <div class="forecast-legend">
          <div class="legend-item">
            <div class="legend-color legend-predicted"></div>
            <span data-i18n="predictedPrice"></span>
          </div>
          <div class="legend-item">
            <div class="legend-color legend-range"></div>
            <span data-i18n="priceRange"></span>
          </div>
        </div>
      </div>
    </div>
    ` : ''}
  `;
  
  // Set explanation text
  const explanationText = card.querySelector('.explanation-text');
  if (currentLang === 'hi' && explanation.hindi) {
    explanationText.textContent = explanation.hindi;
  } else if (explanation.english) {
    explanationText.textContent = explanation.english;
  }
  

  
  return card;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleDateString('en', { month: 'short' });
  return `${day} ${month}`;
}

function renderChart(container, forecast) {
  const width = container.offsetWidth;
  const height = 200;
  const padding = { top: 20, right: 10, bottom: 30, left: 45 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Extract data
  const prices = forecast.map(d => d.predicted_price);
  const lowerBounds = forecast.map(d => d.lower_bound);
  const upperBounds = forecast.map(d => d.upper_bound);
  const dates = forecast.map(d => formatDate(d.date));
  
  // Calculate scales
  const minPrice = Math.min(...lowerBounds);
  const maxPrice = Math.max(...upperBounds);
  const priceRange = maxPrice - minPrice;
  const yMin = minPrice - priceRange * 0.1;
  const yMax = maxPrice + priceRange * 0.1;
  
  const xScale = (i) => padding.left + (i / (forecast.length - 1)) * chartWidth;
  const yScale = (price) => padding.top + chartHeight - ((price - yMin) / (yMax - yMin)) * chartHeight;
  
  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'chart-svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  
  // Create area path for range band
  let areaPath = `M ${xScale(0)} ${yScale(lowerBounds[0])}`;
  for (let i = 0; i < forecast.length; i++) {
    areaPath += ` L ${xScale(i)} ${yScale(lowerBounds[i])}`;
  }
  for (let i = forecast.length - 1; i >= 0; i--) {
    areaPath += ` L ${xScale(i)} ${yScale(upperBounds[i])}`;
  }
  areaPath += ' Z';
  
  const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  area.setAttribute('d', areaPath);
  area.setAttribute('class', 'range-band');
  svg.appendChild(area);
  
  // Create line path for predicted prices
  let linePath = `M ${xScale(0)} ${yScale(prices[0])}`;
  for (let i = 1; i < prices.length; i++) {
    linePath += ` L ${xScale(i)} ${yScale(prices[i])}`;
  }
  
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', linePath);
  line.setAttribute('class', 'chart-line');
  svg.appendChild(line);
  
  // Add grid lines (horizontal)
  const gridLineCount = 3;
  for (let i = 0; i <= gridLineCount; i++) {
    const y = padding.top + (i / gridLineCount) * chartHeight;
    const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    gridLine.setAttribute('x1', padding.left);
    gridLine.setAttribute('y1', y);
    gridLine.setAttribute('x2', padding.left + chartWidth);
    gridLine.setAttribute('y2', y);
    gridLine.setAttribute('class', 'chart-grid-line');
    svg.appendChild(gridLine);
    
    // Add price labels
    const price = yMax - (i / gridLineCount) * (yMax - yMin);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', padding.left - 8);
    label.setAttribute('y', y + 4);
    label.setAttribute('text-anchor', 'end');
    label.setAttribute('class', 'chart-value');
    label.textContent = '₹' + Math.round(price);
    svg.appendChild(label);
  }
  
  // Add points and labels
  prices.forEach((price, i) => {
    // Point
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', xScale(i));
    circle.setAttribute('cy', yScale(price));
    circle.setAttribute('r', '4');
    circle.setAttribute('class', 'chart-point');
    
    // Tooltip on hover
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = `${dates[i]}: ₹${Math.round(price)}`;
    circle.appendChild(title);
    
    svg.appendChild(circle);
    
    // Date label
    const dateLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    dateLabel.setAttribute('x', xScale(i));
    dateLabel.setAttribute('y', height - 10);
    dateLabel.setAttribute('text-anchor', 'middle');
    dateLabel.setAttribute('class', 'chart-label');
    dateLabel.textContent = dates[i];
    svg.appendChild(dateLabel);
  });
  
  container.innerHTML = '';
  container.appendChild(svg);
}

function toggleForecast(btn) {
  const t = langs[currentLang];
  const card = btn.closest('.crop-card');
  const grid = card.querySelector('.forecast-grid');
  const chartContainer = grid.querySelector('.chart-container');
  const cropName = card.dataset.crop;
  const cropData = cropsData.find(c => c.crop === cropName);

  const isVisible = grid.classList.contains('visible');

  if (isVisible) {
    grid.classList.remove('visible');
    btn.classList.remove('expanded');
    btn.querySelector('[data-i18n]').textContent = t.viewForecast;
  } else {
    grid.classList.add('visible');
    btn.classList.add('expanded');
    btn.querySelector('[data-i18n]').textContent = t.hideForecast;

    // ⬅️ render ONLY after visible
    if (!chartContainer.dataset.rendered) {
      renderChart(chartContainer, cropData.next_7_days_forecast);
      chartContainer.dataset.rendered = "true";
    }
  }
}

function showError(message) {
  const t = langs[currentLang];
  document.getElementById('mainContent').innerHTML = `
    <div class="error-message">
      <strong>${t.error}</strong><br/>
      ${message}<br/><br/>
      ${t.checkConnection}
    </div>
  `;
}

/* ============================================================
   LANGUAGE FUNCTIONS
   ============================================================ */
function applyLang(code) {
  const t = langs[code];
  if (!t) return;
  currentLang = code;

  const isDark = document.body.classList.contains('dark');
  document.body.className = (isDark ? 'dark ' : '') + 'lang-' + code;
  document.documentElement.setAttribute('lang', code);

  document.getElementById('langCode').textContent = t.code;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === code);
  });
  
  // Update explanations
  document.querySelectorAll('.crop-card').forEach(card => {
    const cropName = card.dataset.crop;
    const cropData = cropsData.find(c => c.crop === cropName);
    if (cropData && cropData.explanation) {
      const explanationText = card.querySelector('.explanation-text');
      if (code === 'hi' && cropData.explanation.hindi) {
        explanationText.textContent = cropData.explanation.hindi;
      } else if (cropData.explanation.english) {
        explanationText.textContent = cropData.explanation.english;
      }
    }
  });
}

function buildLangList() {
  const list = document.getElementById('langList');
  list.innerHTML = '';
  langOrder.forEach(code => {
    const t = langs[code];
    const el = document.createElement('div');
    el.className = 'lang-option' + (code === currentLang ? ' active' : '');
    el.dataset.lang = code;
    el.innerHTML = `
      <span class="lang-flag">🇮🇳</span>
      <div class="lang-text">
        <span class="lang-native">${t.code}</span>
        <span class="lang-english">${t.english}</span>
      </div>
      <div class="lang-check">✓</div>
    `;
    el.addEventListener('click', () => { applyLang(code); closeDrawer(); });
    list.appendChild(el);
  });
}

function toggleDrawer() {
  const drawer = document.getElementById('langDrawer');
  drawer.classList.contains('visible') ? closeDrawer() : openDrawer();
}

function openDrawer() {
  buildLangList();
  document.getElementById('langOverlay').classList.add('visible');
  document.getElementById('langDrawer').classList.add('visible');
  document.getElementById('langBtn').classList.add('open');
}

function closeDrawer() {
  document.getElementById('langOverlay').classList.remove('visible');
  document.getElementById('langDrawer').classList.remove('visible');
  document.getElementById('langBtn').classList.remove('open');
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
async function init() {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  
  applyLang('hi');
  
  try {
    const data = await fetchCropData();
    renderCrops(data);
  } catch (error) {
    showError(error.message);
  }
}

// Event listeners
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

// Initialize app
init();

// Auto-refresh every 10 minutes
setInterval(init, 10 * 60 * 1000);