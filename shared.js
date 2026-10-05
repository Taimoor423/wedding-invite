import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL = "https://sbgitwhbirsukfaoffld.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiZ2l0d2hiaXJzdWtmYW9mZmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMTEyOTMsImV4cCI6MjEwNjc4NzI5M30.nrc3wf6ahotZDlKksmn1kAe1EbAJ0mxekHotzkx58Do";

export const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const defaultContent = {
  couple: {
    groomName: 'Zayn', brideName: 'Nora',
    groomParents: 'Son of Mr. & Mrs. Malik', groomEducation: 'B.E., M.S.', groomJob: 'Data Scientist',
    brideParents: 'Daughter of Mr. & Mrs. Nasser', brideEducation: 'MBBS, M.D.', brideJob: 'Pediatrician',
    showParentDetails: true
  },
  hero: { headingScript: "We're getting married", imageUrl: '' },
  dates: {
    weddingDateISO: '2027-01-31T10:30:00+05:00',
    weddingDateLabel: 'January 31, 2027',
    weddingDayLabel: 'Sunday',
    weddingTimeLabel: '10:30 AM'
  },
  welcome: {
    text: 'We are honored to welcome you to the wedding ceremony of {{coupleName}} as they begin their journey together in faith and love. We thank you for being part of this blessed occasion.'
  },
  heartCard: { ctaLabel: 'SAVE THE DATE', icsEnabled: true },
  gallery: { enabled: true, images: [] },
  timeline: {
    heading: 'Program Timeline',
    items: [
      { dateGroup: 'SUNDAY, JAN. 31, 2027', time: '10:00 AM', title: 'Guest Arrival', description: 'We welcome you.' },
      { dateGroup: 'SUNDAY, JAN. 31, 2027', time: '10:30 AM', title: 'Wedding Ceremony', description: 'Your presence means a lot!' },
      { dateGroup: 'TUESDAY, FEB. 2, 2027', time: '7:30 PM', title: 'Reception' }
    ]
  },
  venue: {
    heading: 'Venue', name: 'Grand Palace Hall', address: 'City Centre, London',
    mapsUrl: 'https://maps.google.com', embedUrl: '', buttonLabel: 'View on Google Maps'
  },
  dressCode: {
    enabled: true, heading: 'Dress Code',
    women: { title: 'Women', desc: 'Elegant formal attire in pastel or jewel tones' },
    men: { title: 'Men', desc: 'Suit or traditional formal wear' }
  },
  preWeddingEvents: {
    enabled: true, heading: 'Pre-Wedding Events',
    events: [
      { name: 'Mahendi', date: 'Jan 28, 2027', time: '8:30 PM', location: "At Bride's House" },
      { name: 'Haldi', date: 'Jan 29, 2027', time: '8:00 PM', location: "At Groom's House" }
    ]
  },
  transportation: { enabled: true, heading: 'Transportation', text: 'Shuttle service will be available from the city center to the venue.\nPickup point: Central Station at 3:30 PM.' },
  accommodation: { enabled: true, heading: 'Accommodation', hotelName: 'The Grand Palace Hotel', distance: '5 minutes from the venue', code: 'WEDDING2026', bookingUrl: '', text: 'Special rates at The Grand Palace Hotel, 5 minutes from the venue. Use code WEDDING2026 when booking.' },
  gifts: { enabled: true, heading: 'Gifts', text: 'Your love, blessings, and presence are the greatest gifts we could ever ask for.', link: '' },
  rsvp: {
    enabled: true, heading: 'RSVP', nameLabel: 'Your Name', attendanceLabel: 'Will you be attending?',
    attendanceOptions: ['Joyfully Accepts', 'Regretfully Declines'],
    messageLabel: 'Your Message', messagePlaceholder: 'Leave a note for the couple (optional)',
    submitLabel: 'Send Message', successMessage: 'Thank you! Your RSVP has been received.'
  },
  closing: { heading: "We can't wait to celebrate with you!", footerLinkText: '', footerLinkUrl: '' },
  whatsappTemplate: `Assalam-o-Alaikum {{guestName}},

You are warmly invited to the wedding celebration of {{coupleName}}.
Please open your personalized invitation here:
{{invitationUrl}}

We would be honored by your presence.`
};

export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

export function normalizePkNumber(raw, countryCode) {
  countryCode = countryCode || '92';
  if (!raw) return { normalized: null, valid: false, reason: 'Empty number' };
  let s = String(raw).trim().replace(/[\s\-().]/g, '');
  s = s.replace(/^\+/, '');
  if (s.startsWith('00')) s = s.slice(2);
  if (s.startsWith('0')) s = countryCode + s.slice(1);
  if (!s.startsWith(countryCode) && /^3\d{9}$/.test(s)) s = countryCode + s;
  const valid = new RegExp(`^${countryCode}3\\d{9}$`).test(s);
  return { normalized: valid ? s : null, valid, reason: valid ? undefined : 'Not a recognizable Pakistani mobile number' };
}

export function generateGuestToken(length) {
  length = length || 24;
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => ALPHABET[b % ALPHABET.length]).join('');
}

export function fillTemplate(template, vars) {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? '');
}

export function buildWaLink(internationalDigitsOnly, message) {
  const clean = String(internationalDigitsOnly).replace(/\D/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function buildIcsFile(opts) {
  const fmt = iso => new Date(iso).toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  return [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wedding Invitation//EN','BEGIN:VEVENT',
    `UID:${crypto.randomUUID()}`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(opts.startISO)}`,
    `DTEND:${fmt(opts.endISO)}`,
    `SUMMARY:${opts.title}`,
    `DESCRIPTION:${opts.description.replace(/\n/g,'\\n')}`,
    `LOCATION:${opts.location}`,
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
}

export function downloadIcs(filename, content) {
  const blob = new Blob([content], { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function renderInvitationHTML(c, guestName) {
  const coupleName = `${c.couple.groomName} & ${c.couple.brideName}`;
  const welcomeText = c.welcome.text.replace('{{coupleName}}', coupleName);

  const timelineGroups = {};
  (c.timeline.items || []).forEach(it => {
    (timelineGroups[it.dateGroup] = timelineGroups[it.dateGroup] || []).push(it);
  });
  const timelineHtml = Object.entries(timelineGroups).map(([date, items]) => `
    <h3 class="timeline-date">${escapeHtml(date)}</h3>
    <ol class="timeline-list">
      ${items.map(it => `
        <li class="timeline-item">
          <span class="timeline-time">${escapeHtml(it.time)}</span>
          <div>
            <p class="timeline-title">${escapeHtml(it.title)}</p>
            ${it.description ? `<p class="timeline-desc">${escapeHtml(it.description)}</p>` : ''}
          </div>
        </li>`).join('')}
    </ol>`).join('');

  const galleryHtml = (c.gallery.enabled && c.gallery.images && c.gallery.images.length) ? `
    <section class="section gallery" aria-label="Wedding gallery">
      <h2 class="script-heading">Gallery</h2>
      <div class="gallery-track" id="galleryTrack" tabindex="0" role="region" aria-label="Photo gallery, swipe or use arrow keys">
        ${c.gallery.images.map(img => `
          <figure class="gallery-item">
            <img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.alt || '')}" loading="lazy" width="320" height="320">
            ${img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : ''}
          </figure>`).join('')}
      </div>
      <div class="gallery-dots" id="galleryDots" role="tablist" aria-label="Gallery navigation"></div>
    </section>` : '';

  const dressCodeHtml = c.dressCode.enabled ? `
    <section class="section icon-section" aria-label="Dress code">
      <span class="icon-circle" aria-hidden="true">👗</span>
      <h2 class="script-heading">${escapeHtml(c.dressCode.heading)}</h2>
      <div class="dress-grid">
        <div><h3>${escapeHtml(c.dressCode.women.title)}</h3><p>${escapeHtml(c.dressCode.women.desc)}</p></div>
        <div><h3>${escapeHtml(c.dressCode.men.title)}</h3><p>${escapeHtml(c.dressCode.men.desc)}</p></div>
      </div>
    </section>` : '';

  const preWeddingHtml = c.preWeddingEvents.enabled ? `
    <section class="section icon-section" aria-label="Pre-wedding events">
      <span class="icon-circle" aria-hidden="true">💍</span>
      <h2 class="script-heading">${escapeHtml(c.preWeddingEvents.heading)}</h2>
      <ul class="events-list">
        ${c.preWeddingEvents.events.map(e => `
          <li>
            <p class="event-name">${escapeHtml(e.name)}</p>
            <p class="event-meta">${escapeHtml(e.date)}, ${escapeHtml(e.time)}</p>
            <p class="event-location">${escapeHtml(e.location)}</p>
          </li>`).join('')}
      </ul>
    </section>` : '';

  const transportHtml = c.transportation.enabled ? `
    <section class="section icon-section" aria-label="Transportation">
      <span class="icon-circle" aria-hidden="true">🚗</span>
      <h2 class="script-heading">${escapeHtml(c.transportation.heading)}</h2>
      <p style="white-space:pre-line">${escapeHtml(c.transportation.text)}</p>
      ${c.transportation.directionsUrl ? `<a class="link" href="${escapeHtml(c.transportation.directionsUrl)}" target="_blank" rel="noopener noreferrer">Get directions</a>` : ''}
    </section>` : '';

  const accomHtml = c.accommodation.enabled ? `
    <section class="section icon-section" aria-label="Accommodation">
      <span class="icon-circle" aria-hidden="true">🏨</span>
      <h2 class="script-heading">${escapeHtml(c.accommodation.heading)}</h2>
      <p>${escapeHtml(c.accommodation.text)}</p>
      ${c.accommodation.bookingUrl ? `<a class="btn btn-outline" href="${escapeHtml(c.accommodation.bookingUrl)}" target="_blank" rel="noopener noreferrer">Book a room</a>` : ''}
    </section>` : '';

  const giftsHtml = c.gifts.enabled ? `
    <section class="section icon-section" aria-label="Gifts">
      <span class="icon-circle" aria-hidden="true">🎁</span>
      <h2 class="script-heading">${escapeHtml(c.gifts.heading)}</h2>
      <p>${escapeHtml(c.gifts.text)}</p>
      ${c.gifts.link ? `<a class="link" href="${escapeHtml(c.gifts.link)}" target="_blank" rel="noopener noreferrer">Learn more</a>` : ''}
    </section>` : '';

  const rsvpHtml = c.rsvp.enabled ? `
    <section class="section rsvp" aria-label="RSVP" id="rsvpSection">
      <span class="icon-circle" aria-hidden="true">✉️</span>
      <h2 class="script-heading">${escapeHtml(c.rsvp.heading)}</h2>
      <form class="rsvp-form" id="rsvpForm" novalidate>
        <input type="text" name="company" id="rsvpHoneypot" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
        <label for="rsvpName">${escapeHtml(c.rsvp.nameLabel)} *</label>
        <input id="rsvpName" required>
        <label for="rsvpAttendance">${escapeHtml(c.rsvp.attendanceLabel)} *</label>
        <select id="rsvpAttendance">
          ${c.rsvp.attendanceOptions.map(o => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join('')}
        </select>
        <label for="rsvpMessage">${escapeHtml(c.rsvp.messageLabel)}</label>
        <textarea id="rsvpMessage" rows="4" placeholder="${escapeHtml(c.rsvp.messagePlaceholder)}"></textarea>
        <p class="form-error" id="rsvpError" role="alert" style="display:none"></p>
        <button type="submit" class="btn btn-primary" id="rsvpSubmitBtn">${escapeHtml(c.rsvp.submitLabel)}</button>
      </form>
      <p class="rsvp-success" id="rsvpSuccess" style="display:none" role="status">${escapeHtml(c.rsvp.successMessage)}</p>
    </section>` : '';

  return `
    <div class="floral-border floral-border-left" aria-hidden="true">${'<span>🌸</span><span>🌿</span>'.repeat(8)}</div>
    <div class="floral-border floral-border-right" aria-hidden="true">${'<span>🌿</span><span>🌸</span>'.repeat(8)}</div>

    <section class="hero" aria-label="Wedding introduction">
      ${c.hero.imageUrl ? `<div class="hero-image" style="background-image:url('${escapeHtml(c.hero.imageUrl)}')" aria-hidden="true"></div>` : ''}
      <div class="hero-content reveal">
        <span class="ornament-heart" aria-hidden="true">♥</span>
        <p class="hero-eyebrow">${escapeHtml(c.hero.headingScript)}</p>
        <h1 class="hero-name">${escapeHtml(c.couple.groomName)}</h1>
        ${c.couple.showParentDetails ? `<div class="hero-details"><p>${escapeHtml(c.couple.groomParents)}</p><p>${escapeHtml(c.couple.groomEducation)}</p><p>${escapeHtml(c.couple.groomJob)}</p></div>` : ''}
        <span class="hero-amp" aria-hidden="true">&amp;</span>
        <h1 class="hero-name">${escapeHtml(c.couple.brideName)}</h1>
        ${c.couple.showParentDetails ? `<div class="hero-details"><p>${escapeHtml(c.couple.brideParents)}</p><p>${escapeHtml(c.couple.brideEducation)}</p><p>${escapeHtml(c.couple.brideJob)}</p></div>` : ''}
      </div>
      <div class="hero-scroll-cue" aria-hidden="true">SCROLL <span>⌄</span></div>
    </section>

    <section class="section welcome reveal" aria-label="Welcome message">
      <span class="ornament-heart" aria-hidden="true">♥</span>
      <p class="welcome-text">${escapeHtml(welcomeText)}</p>
      <span class="ornament-heart" aria-hidden="true">♥</span>
    </section>

    <section class="section countdown" aria-label="Countdown to the wedding">
      <h2 class="script-heading">Counting Down to Forever</h2>
      <div class="countdown-grid" role="timer" aria-live="polite" id="countdownGrid">
        <div class="countdown-cell"><span class="countdown-value" id="cd-days">00</span><span class="countdown-label">DAYS</span></div>
        <div class="countdown-cell"><span class="countdown-value" id="cd-hours">00</span><span class="countdown-label">HOURS</span></div>
        <div class="countdown-cell"><span class="countdown-value" id="cd-minutes">00</span><span class="countdown-label">MINUTES</span></div>
        <div class="countdown-cell"><span class="countdown-value" id="cd-seconds">00</span><span class="countdown-label">SECONDS</span></div>
      </div>
    </section>

    <section class="section heart-card-section reveal" aria-label="Invitation details">
      <h2 class="script-heading">Our forever begins</h2>
      <div class="heart" aria-hidden="true"></div>
      <div class="heart-content">
        <p class="heart-invited">You're Invited!</p>
        <p class="heart-guest">Dear ${escapeHtml(guestName)},</p>
        <p class="heart-date">${escapeHtml(c.dates.weddingDateLabel)}</p>
        <p class="heart-day">${escapeHtml(c.dates.weddingDayLabel)}</p>
        <p class="heart-time">${escapeHtml(c.dates.weddingTimeLabel)}</p>
      </div>
      ${c.heartCard.icsEnabled ? `<button class="btn btn-primary" id="saveDateBtn">📅 ${escapeHtml(c.heartCard.ctaLabel)}</button>` : ''}
    </section>

    ${galleryHtml}

    <section class="section timeline" aria-label="Program timeline">
      <span class="icon-circle" aria-hidden="true">🕐</span>
      <h2 class="script-heading">${escapeHtml(c.timeline.heading)}</h2>
      ${timelineHtml}
    </section>

    <section class="section venue" aria-label="Venue">
      <span class="icon-circle" aria-hidden="true">📍</span>
      <h2 class="script-heading">${escapeHtml(c.venue.heading)}</h2>
      <p class="venue-name">${escapeHtml(c.venue.name)}</p>
      <p class="venue-address">${escapeHtml(c.venue.address)}</p>
      <div class="venue-map-frame" id="venueMapFrame">
        <div class="venue-map-placeholder"><p>Tap below to open the map.</p></div>
      </div>
      <a class="btn btn-primary" href="${escapeHtml(c.venue.mapsUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.venue.buttonLabel)}</a>
    </section>

    ${dressCodeHtml}
    ${preWeddingHtml}
    ${transportHtml}
    ${accomHtml}
    ${giftsHtml}
    ${rsvpHtml}

    <footer class="section closing reveal" aria-label="Closing message">
      <p class="closing-ornament" aria-hidden="true">❧</p>
      <h2 class="script-heading">${escapeHtml(c.closing.heading)}</h2>
      <p class="closing-names">${escapeHtml(c.couple.groomName)} &amp; ${escapeHtml(c.couple.brideName)}</p>
      ${c.closing.footerLinkText && c.closing.footerLinkUrl ? `<a class="closing-footer-link" href="${escapeHtml(c.closing.footerLinkUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.closing.footerLinkText)}</a>` : ''}
    </footer>
  `;
}

export function attachInvitationBehavior(c, token) {
  function updateCountdown() {
    const diff = new Date(c.dates.weddingDateISO).getTime() - Date.now();
    const els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-minutes'),
      seconds: document.getElementById('cd-seconds')
    };
    if (!els.days) return;
    if (diff <= 0) {
      els.days.textContent = '00'; els.hours.textContent = '00'; els.minutes.textContent = '00'; els.seconds.textContent = '00';
      return;
    }
    els.days.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    els.hours.textContent = String(Math.floor(diff / 3600000) % 24).padStart(2, '0');
    els.minutes.textContent = String(Math.floor(diff / 60000) % 60).padStart(2, '0');
    els.seconds.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  const track = document.getElementById('galleryTrack');
  const dotsWrap = document.getElementById('galleryDots');
  if (track && dotsWrap) {
    const items = track.querySelectorAll('.gallery-item');
    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
      dot.onclick = () => { items[i].scrollIntoView({ behavior: 'smooth', inline: 'center' }); };
      dotsWrap.appendChild(dot);
    });
    track.addEventListener('scroll', () => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      dotsWrap.querySelectorAll('.gallery-dot').forEach((d, i) => d.classList.toggle('is-active', i === idx));
    });
    track.addEventListener('keydown', (e) => {
      const idx = Math.round(track.scrollLeft / track.clientWidth);
      if (e.key === 'ArrowRight' && items[idx + 1]) items[idx + 1].scrollIntoView({ behavior: 'smooth', inline: 'center' });
      if (e.key === 'ArrowLeft' && items[idx - 1]) items[idx - 1].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    });
  }

  const mapFrame = document.getElementById('venueMapFrame');
  if (mapFrame && c.venue.embedUrl) {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          mapFrame.innerHTML = `<iframe title="Venue map" src="${c.venue.embedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;border:0"></iframe>`;
          obs2.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs2.observe(mapFrame);
  }

  const saveBtn = document.getElementById('saveDateBtn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const ics = buildIcsFile({
        title: `${c.couple.groomName} & ${c.couple.brideName}'s Wedding`,
        description: 'We would be honored by your presence.',
        location: `${c.venue.name}, ${c.venue.address}`,
        startISO: c.dates.weddingDateISO,
        endISO: new Date(new Date(c.dates.weddingDateISO).getTime() + 3 * 3600000).toISOString()
      });
      downloadIcs('wedding-invitation.ics', ics);
    };
  }

  const form = document.getElementById('rsvpForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvpName').value.trim();
      const attendance = document.getElementById('rsvpAttendance').value;
      const message = document.getElementById('rsvpMessage').value.trim();
      const honeypot = document.getElementById('rsvpHoneypot').value;
      const errorEl = document.getElementById('rsvpError');
      const btn = document.getElementById('rsvpSubmitBtn');
      errorEl.style.display = 'none';
      if (!name) { errorEl.textContent = 'Please enter your name.'; errorEl.style.display = 'block'; return; }
      btn.disabled = true; btn.textContent = 'Sending…';
      const { error } = await sb.from('rsvp_submissions').insert({
        guest_token: token, name, attendance, message: message || null, honeypot
      });
      btn.disabled = false;
      if (error) { errorEl.textContent = 'Something went wrong. Please try again shortly.'; errorEl.style.display = 'block'; btn.textContent = c.rsvp.submitLabel; return; }
      form.style.display = 'none';
      document.getElementById('rsvpSuccess').style.display = 'block';
    });
  }
}
