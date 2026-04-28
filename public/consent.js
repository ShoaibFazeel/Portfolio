/**

* PRODUCTION-READY GOOGLE CONSENT MODE v2 IMPLEMENTATION
* Lightweight, no external CMP
  */

const GA_ID = 'G-Q605QRL3DB';

// -----------------------------
// 1. INIT gtag + dataLayer
// -----------------------------
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// -----------------------------
// 2. DEFAULT CONSENT (REQUIRED)
// MUST always be denied initially
// -----------------------------
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 2000
});

// -----------------------------
// 3. LOAD GA (only after consent)
// -----------------------------
function loadGA() {
  if (document.getElementById('ga-script')) return;

  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  gtag('js', new Date());

  gtag('config', GA_ID, {
    anonymize_ip: true,
    page_path: window.location.pathname
  });
}

// -----------------------------
// 4. APPLY CONSENT
// -----------------------------
function applyConsent(state) {
  gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state
  });

  if (state === 'granted') {
    loadGA();
  }
}

// -----------------------------
// 5. STORAGE (with audit info)
// -----------------------------
function saveConsent(state) {
  localStorage.setItem('ga_consent', JSON.stringify({
    status: state,
    timestamp: Date.now(),
    version: 'v1'
  }));
}

function getStoredConsent() {
  try {
    const data = JSON.parse(localStorage.getItem('ga_consent'));
    return data?.status || null;
  } catch {
    return null;
  }
}

// -----------------------------
// 6. INITIAL CONSENT LOAD
// -----------------------------
const stored = getStoredConsent();

if (stored === 'granted') {
  applyConsent('granted');
} else if (stored === 'denied') {
  applyConsent('denied');
}

// -----------------------------
// 7. UI
// -----------------------------
function initUI() {

  // Styles
  const style = document.createElement('style');
  style.textContent = `
#consent-banner {
position: fixed;
bottom: 0; left: 0; right: 0;
background: #111827;
color: #f9fafb;
padding: 18px 24px;
display: flex;
justify-content: space-between;
align-items: center;
gap: 16px;
flex-wrap: wrap;
z-index: 9999;
font-family: system-ui;
}
#consent-banner p {
margin: 0;
font-size: 13px;
max-width: 600px;
line-height: 1.5;
}
.consent-actions {
display: flex;
gap: 10px;
}
.btn {
border: none;
padding: 8px 14px;
border-radius: 6px;
cursor: pointer;
font-size: 13px;
font-weight: 600;
}
#accept { background: #10b981; color: white; }
#reject { background: #374151; color: white; }

```
  #manage - consent {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #111827;
    color: white;
    border: none;
    padding: 8px 12px;
    border - radius: 20px;
    font - size: 12px;
    cursor: pointer;
    opacity: 0.7;
    z - index: 9998;
  }
  ```

`;
  document.head.appendChild(style);

  // Banner
  const banner = document.createElement('div');
  banner.id = 'consent-banner';

  banner.innerHTML = `     <p>
      We use cookies and Google Analytics to understand how you use our site and improve your experience.
      See our <a href="/privacy" style="color:#93c5fd;">Privacy Policy</a>.     </p>     <div class="consent-actions">       <button id="reject" class="btn">Reject</button>       <button id="accept" class="btn">Accept</button>     </div>
  `;

  document.body.appendChild(banner);

  // Manage button
  const manage = document.createElement('button');
  manage.id = 'manage-consent';
  manage.textContent = 'Privacy';
  manage.style.display = stored ? 'block' : 'none';
  document.body.appendChild(manage);

  if (stored) banner.style.display = 'none';

  // Events
  document.getElementById('accept').onclick = () => {
    applyConsent('granted');
    saveConsent('granted');
    banner.style.display = 'none';
    manage.style.display = 'block';
  };

  document.getElementById('reject').onclick = () => {
    applyConsent('denied');
    saveConsent('denied');
    banner.style.display = 'none';
    manage.style.display = 'block';
  };

  manage.onclick = () => {
    banner.style.display = 'flex';
    manage.style.display = 'none';
  };
}

// -----------------------------
// 8. INIT AFTER DOM READY
// -----------------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUI);
} else {
  initUI();
}
