const GA_ID = 'G-DNG1135CBB';

// Setup dataLayer and default consent state
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Initial default consent
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});

function loadGoogleAnalytics() {
  if (document.getElementById('ga-script')) return; // Prevent duplicate injection

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_ID);
}

function updateConsent(granted) {
  const consentState = granted ? 'granted' : 'denied';

  gtag('consent', 'update', {
    'analytics_storage': consentState,
    'ad_storage': consentState
  });

  if (granted) {
    loadGoogleAnalytics();
    localStorage.setItem('ga_consent', 'granted');
  } else {
    localStorage.setItem('ga_consent', 'denied');
  }
}

// Inject CSS
const style = document.createElement('style');
style.textContent = `
  #consent-banner {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background-color: #f8f9fa;
    color: #333;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    z-index: 9999;
    font-family: inherit;
    flex-wrap: wrap;
    gap: 12px;
  }
  #consent-banner p { margin: 0; font-size: 14px; }
  .consent-buttons { display: flex; gap: 8px; }
  .consent-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  }
  #accept-consent { background-color: #10b981; color: white; }
  #accept-consent:hover { background-color: #059669; }
  #reject-consent { background-color: #ef4444; color: white; }
  #reject-consent:hover { background-color: #dc2626; }
  
  #change-consent {
    position: fixed;
    bottom: 16px; right: 16px;
    background: rgba(0,0,0,0.7);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    z-index: 9998;
    transition: opacity 0.2s;
  }
  #change-consent:hover { opacity: 0.8; }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  const storedConsent = localStorage.getItem('ga_consent');

  // Banner UI
  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.innerHTML = `
    <p>This site uses analytics to improve experience</p>
    <div class="consent-buttons">
      <button id="accept-consent" class="consent-btn">Accept</button>
      <button id="reject-consent" class="consent-btn">Reject</button>
    </div>
  `;
  banner.style.display = storedConsent ? 'none' : 'flex';
  document.body.appendChild(banner);

  // Change Consent Button UI
  const changeBtn = document.createElement('button');
  changeBtn.id = 'change-consent';
  changeBtn.textContent = 'Change Consent';
  changeBtn.style.display = storedConsent ? 'block' : 'none';
  document.body.appendChild(changeBtn);

  // Event Listeners
  document.getElementById('accept-consent').addEventListener('click', () => {
    updateConsent(true);
    banner.style.display = 'none';
    changeBtn.style.display = 'block';
  });

  document.getElementById('reject-consent').addEventListener('click', () => {
    updateConsent(false);
    banner.style.display = 'none';
    changeBtn.style.display = 'block';
  });

  changeBtn.addEventListener('click', () => {
    banner.style.display = 'flex';
    changeBtn.style.display = 'none';
  });

  // Apply stored consent natively
  if (storedConsent === 'granted') {
    updateConsent(true);
  } else if (storedConsent === 'denied') {
    updateConsent(false);
  }
});
