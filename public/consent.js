/**
 * FINAL PRODUCTION-READY GOOGLE CONSENT MODE v2
 */
const GA_ID = 'G-PY2SWD2WY4';
const CONSENT_VERSION = 'v1.0';

// -----------------------------
// 1. INIT gtag
// -----------------------------
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// -----------------------------
// 2. STORAGE HELPERS
// -----------------------------
function getStoredConsent() {
  try {
    const data = JSON.parse(localStorage.getItem('ga_consent'));
    if (data && data.version === CONSENT_VERSION) {
      return data.status;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function saveConsent(state) {
  localStorage.setItem('ga_consent', JSON.stringify({
    status: state,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  }));
}

// -----------------------------
// 3. DEFAULT CONSENT (ALWAYS DENIED INITIALLY)
// -----------------------------
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 2000
});

// -----------------------------
// 4. LOAD GA (ONLY AFTER CONSENT)
// -----------------------------
function loadGA() {
  if (document.getElementById('ga-script')) return;
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  // FIXED: Added backticks and protocol
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_ID, {
    'anonymize_ip': true,
    'page_path': window.location.pathname
  });
}

// -----------------------------
// 5. APPLY CONSENT UPDATE
// -----------------------------
function applyConsent(state) {
  gtag('consent', 'update', {
    'analytics_storage': state,
    'ad_storage': state,
    'ad_user_data': state,
    'ad_personalization': state
  });
  if (state === 'granted') {
    loadGA();
  }
}

// -----------------------------
// 6. APPLY STORED CONSENT
// -----------------------------
const storedStatus = getStoredConsent();
if (storedStatus === 'granted') {
  applyConsent('granted');
} else if (storedStatus === 'denied') {
  applyConsent('denied');
}

// -----------------------------
// 7. UI logic
// -----------------------------
function initConsentUI() {
  if (document.getElementById('consent-banner')) return;

  const style = document.createElement('style');
  style.textContent = `
    #consent-banner {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #111827; color: #f9fafb;
      padding: 18px 24px; display: flex;
      justify-content: space-between; align-items: center;
      gap: 16px; flex-wrap: wrap; z-index: 9999;
      font-family: system-ui, sans-serif;
    }
    #consent-banner p { margin: 0; font-size: 13px; max-width: 600px; line-height: 1.5; }
    .consent-actions { display: flex; gap: 10px; }
    .btn { border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; }
    #accept { background: #10b981; color: white; }
    #reject { background: #374151; color: white; }
    #manage-consent {
      position: fixed; bottom: 20px; right: 20px;
      background: #111827; color: white; border: none; padding: 8px 12px;
      border-radius: 20px; font-size: 11px; cursor: pointer; opacity: 0.7; z-index: 9998;
    }
  `;
  document.head.appendChild(style);

  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  // FIXED: Added backticks for template literal
  banner.innerHTML = `
    <p>We use cookies and Google Analytics to understand usage and improve your experience. See our <a href="/privacy" style="color:#93c5fd;">Privacy Policy</a>.</p>
    <div class="consent-actions">
      <button id="reject" class="btn">Reject</button>
      <button id="accept" class="btn">Accept</button>
    </div>`;

  const manageBtn = document.createElement('button');
  manageBtn.id = 'manage-consent';
  manageBtn.textContent = 'Privacy Settings';

  banner.style.display = storedStatus ? 'none' : 'flex';
  manageBtn.style.display = storedStatus ? 'block' : 'none';

  document.body.appendChild(banner);
  document.body.appendChild(manageBtn);

  document.getElementById('accept').onclick = () => {
    saveConsent('granted');
    applyConsent('granted');
    banner.style.display = 'none';
    manageBtn.style.display = 'block';
  };

  document.getElementById('reject').onclick = () => {
    saveConsent('denied');
    applyConsent('denied');
    banner.style.display = 'none';
    manageBtn.style.display = 'block';
  };

  manageBtn.onclick = () => {
    banner.style.display = 'flex';
    manageBtn.style.display = 'none';
  };
}

// -----------------------------
// 8. INIT UI
// -----------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConsentUI);
} else {
  initConsentUI();
}