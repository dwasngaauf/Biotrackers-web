/* ═══════════════════════════════════════════
   HERO — Navbar scroll & active link
═══════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });

  nav.style.background = window.scrollY > 10
    ? 'rgba(8,16,43,0.98)'
    : 'rgba(8,16,43,0.9)';
});


/* ═══════════════════════════════════════════
   HERO — YouTube Video Modal
   Cách dùng:
   1. Lấy video ID từ link YouTube
      VD: https://youtu.be/ABC123xyz → ID là "ABC123xyz"
   2. Dán ID vào data-yt-id trong #videoModal ở HTML
      VD: <div id="videoModal" data-yt-id="ABC123xyz">
═══════════════════════════════════════════ */
const videoModal = document.getElementById('videoModal');
const ytPlayer   = document.getElementById('ytPlayer');
const videoContainer = document.getElementById('videoContainer');

function openVideo(e) {
  e.preventDefault();

  const ytId = videoModal.getAttribute('data-yt-id') || '';
  if (!ytId) {
    console.warn('Chưa gắn YouTube ID vào data-yt-id!');
    return;
  }

  // autoplay=1 → tự phát, mute=0 → có tiếng
  ytPlayer.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
  videoModal.classList.add('active');
  videoModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  // Xoá src để dừng hẳn video + tắt tiếng
  ytPlayer.src = '';
  videoModal.classList.remove('active');
  videoModal.style.display = 'none';
  document.body.style.overflow = '';
}

// Click ra ngoài video container → đóng
videoModal.addEventListener('click', function(e) {
  if (!videoContainer.contains(e.target)) closeVideo();
});

// Phím ESC → đóng
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeVideo();
});


/* ═══════════════════════════════════════════
   TEAM — Render member cards
═══════════════════════════════════════════ */
const tw = `<svg viewBox="0 0 24 24" fill="#38bdf8"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>`;
const fb = `<svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
const li = `<svg viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`;
const gh = `<svg viewBox="0 0 24 24" fill="#ffffff"><path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.78-1.34-1.78-1.1-.75.08-.74.08-.74 1.21.09 1.84 1.25 1.84 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
const ig = `<svg viewBox="0 0 24 24" fill="#E1306C"><path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.22 4 20 5.78 20 7.75v8.5c0 1.97-1.78 3.75-3.75 3.75h-8.5C5.78 20 4 18.22 4 16.25v-8.5C4 5.78 5.78 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/></svg>`;

const members = [
  { name: "Phan Quốc Chiến",    role: "CEO", img: "assets/Chiến.jpg",    init: "Phan Quốc Chiến",    fb: "https://www.facebook.com/phan.chien.789760?locale=vi_VN",          li: "https://www.linkedin.com/in/phan-chi%E1%BA%BFn-621395321/" },
  { name: "Chu Đắc Vinh Quang", role: "CTO", img: "assets/Quang.jpg",    init: "Chu Đắc Vinh Quang", fb: "https://www.facebook.com/quang.chudacvinh?locale=vi_VN",            gh: "https://github.com/1m4n00b6292" },
  { name: "Nguyễn Nam Thành",   role: "Embedded Systems & Software Engineering", img: "assets/Thành.jpg", init: "Nguyễn Nam Thành", fb: "https://www.facebook.com/thanh.nguyennam.31521?locale=vi_VN", gh: "https://github.com/namthanh82" },
  { name: "Bùi Thị Khánh Linh", role: "CMO", img: "assets/Linh.jpg",    init: "Bùi Thị Khánh Linh", fb: "https://www.facebook.com/khanhlinh.05062005?locale=vi_VN",          ig: "https://www.instagram.com/_khanh.linh.56_/" },
  { name: "Phùng Tuấn Anh",     role: "CFO", img: "assets/TuấnAnh.png", init: "Phùng Tuấn Anh",     fb: "https://www.facebook.com/tuananhhh27?locale=vi_VN",                ig: "https://www.instagram.com/phgtuananh" },
  { name: "Đặng Quỳnh Dương",   role: "AI & Software Engineering", img: "assets/Dương.jpg", init: "Quỳnh Dương", fb: "https://www.facebook.com/quuuuuuuuynhduuuuuuuuong/?locale=vi_VN", gh: "https://github.com/dwasngaauf" },
];

const grid = document.getElementById('g');
members.forEach(m => {
  const c = document.createElement('div');
  c.className = 'card';
  c.innerHTML = `
    <div class="img-wrap">
      <div class="initials">${m.init}</div>
      <img src="${m.img}" alt="${m.name}"
           onload="this.previousElementSibling.style.display='none'"
           onerror="this.style.display='none'">
      <div class="corner-tl"></div>
      <div class="corner-br"></div>
    </div>
    <div class="info">
      <h3>${m.name}</h3>
      <p>${m.role}</p>
      <div class="socials">
        ${m.tw ? `<a class="sb" href="${m.tw}" target="_blank">${tw}</a>` : ""}
        ${m.fb ? `<a class="sb" href="${m.fb}" target="_blank">${fb}</a>` : ""}
        ${m.li ? `<a class="sb" href="${m.li}" target="_blank">${li}</a>` : ""}
        ${m.gh ? `<a class="sb" href="${m.gh}" target="_blank">${gh}</a>` : ""}
        ${m.ig ? `<a class="sb" href="${m.ig}" target="_blank">${ig}</a>` : ""}
      </div>
    </div>`;
  grid.appendChild(c);
});


/* ═══════════════════════════════════════════
   ADVISOR — Render advisor cards
═══════════════════════════════════════════ */
const iconEmail = `<svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>`;

const featuredAdvisor = {
  name: "PGS.TS Nguyễn Thành Trung",
  role: "Khoa Cơ khí Chế tạo máy, Trường Cơ khí, Đại học Bách Khoa Hà Nội",
  init: "PGS.TS",
  img:  "assets/Thầy.png",
  desc: [
    "09/2012 - 08/2015: Nghiên cứu sinh tại Học viện công nghệ Shibaura, Nhật Bản",
    "09/2011 - 08/2012: Thạc sỹ tại Học viện công nghệ Shibaura, Nhật Bản",
    "09/2010 - 08/2011: Thạc sỹ tại trường Đại học Bách khoa Hà Nội",
    "09/2003 - 08/2008: Sinh viên tại trường Đại học Bách khoa Hà Nội"
  ],
  email: "trung.nguyenthanh@hust.edu.vn"
};

const advisors = [
  { name: "Bác sĩ Nguyễn Văn Đương",    role: "Trưởng khoa An dưỡng Bệnh viện PHCN Hải Dương",     init: "BS", img: "assets/Nguyễn Văn Đương.jpg" },
  { name: "Ths. BS Nguyễn Hữu Đức Minh", role: "Giảng viên Đại học Y dược TP. HCM 2013–2021",        init: "BS", img: "assets/Bác sĩ Minh.jpg" },
];

const f = featuredAdvisor;
document.getElementById('featured').innerHTML = `
  <div class="img-wrap">
    <div class="initials">${f.init}</div>
    <img src="${f.img}" alt="${f.name}"
         onload="this.previousElementSibling.style.display='none'"
         onerror="this.style.display='none'">
    <div class="corner-tl"></div>
    <div class="corner-br"></div>
  </div>
  <div class="info">
    <h3>${f.name}</h3>
    <div class="role">${f.role}</div>
    <div class="desc">${f.desc.map(d => `<p>• ${d}</p>`).join('')}</div>
    <div class="email-row">${iconEmail}<a href="mailto:${f.email}">${f.email}</a></div>
  </div>`;

const advisorGrid = document.getElementById('advisor-grid');
advisors.forEach(m => {
  const c = document.createElement('div');
  c.className = 'card';
  c.innerHTML = `
    <div class="img-wrap">
      <div class="initials">${m.init}</div>
      <img src="${m.img}" alt="${m.name}"
           onload="this.previousElementSibling.style.display='none'"
           onerror="this.style.display='none'">
      <div class="corner-tl"></div>
      <div class="corner-br"></div>
    </div>
    <div class="info">
      <h3>${m.name}</h3>
      <p class="role">${m.role}</p>
    </div>`;
  advisorGrid.appendChild(c);
});


/* ═══════════════════════════════════════════
   ACHIEVEMENTS — Slider
═══════════════════════════════════════════ */
const track = document.getElementById('sliderTrack');
const achCards = document.querySelectorAll('.ach-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');

let current = 0;
let visibleCount = getVisible();

function getVisible() {
  const w = window.innerWidth;
  if (w <= 500) return 1;
  if (w <= 768) return 2;
  if (w <= 1100) return 3;
  return 4;
}

const totalCards = achCards.length;
function maxIndex() { return totalCards - visibleCount; }

function buildDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= maxIndex(); i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.onclick = () => goTo(i);
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function getCardWidth() { return achCards[0].offsetWidth + 24; }

function goTo(index) {
  current = Math.max(0, Math.min(index, maxIndex()));
  track.style.transform = `translateX(-${current * getCardWidth()}px)`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= maxIndex();
  updateDots();
}

function slide(dir) { goTo(current + dir); }

buildDots();
goTo(0);

window.addEventListener('resize', () => {
  visibleCount = getVisible();
  buildDots();
  goTo(Math.min(current, maxIndex()));
});

achCards.forEach(card => {
  const link = card.querySelector('.read-more');
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.read-more')) link.click();
  });
});


/* ═══════════════════════════════════════════
   RETRACK — Tooltip on hover
═══════════════════════════════════════════ */
const tooltipData = {
  imu:   { title: "Hệ thống cảm biến IMU",                       body: "Tại các khớp: vai, khuỷu tay, cổ tay, hông, đầu gối, cổ chân. Đo lường chính xác góc khớp, biên độ vận động (ROM) và phân tích dáng đi (Gait Analysis) để đánh giá khả năng vận động." },
  ecg:   { title: "Hệ thống cảm biến ECG",                       body: "Vị trí trước ngực. Theo dõi nhịp tim và tín hiệu điện tim 24/7, đảm bảo an toàn tim mạch tuyệt đối và đánh giá mức độ gắng sức khi tập luyện." },
  emg:   { title: "Hệ thống cảm biến EMG",                       body: "Trên các bắp cơ: bắp tay, đùi, bắp chân. Ghi nhận mức độ kích hoạt cơ, sự phối hợp giữa các nhóm cơ và phát hiện sớm tình trạng mỏi cơ hoặc co cứng." },
  twin:  { title: "Bản Sao Số (Digital Twin) 3D Real-time",      body: "Tái hiện cử động của bệnh nhân một cách trực quan trên giao diện 3D, giúp bác sĩ dễ dàng phát hiện các sai lệch trong tư thế và động tác phục hồi." },
  ai:    { title: "Trí Tuệ Nhân Tạo (AI) Phân Tích Chuyên Sâu", body: "Thuật toán AI đạt độ chính xác ≥94%, hỗ trợ dự báo rủi ro chấn thương và tự động hóa báo cáo phục hồi hàng ngày cho bác sĩ." },
  cloud: { title: "Quản lý Dữ liệu Đám Mây (Cloud)",             body: "Lưu trữ hồ sơ bệnh án điện tử tập trung, hỗ trợ bác sĩ theo dõi tiến trình phục hồi của bệnh nhân từ xa theo thời gian thực." }
};

const tip     = document.getElementById('tip');
const diagram = document.querySelector('.diagram');

document.querySelectorAll('.node-icon').forEach(node => {
  node.addEventListener('mouseenter', function() {
    const d = tooltipData[this.getAttribute('data-id')];
    if (!d) return;
    document.getElementById('tip-title').textContent = d.title;
    document.getElementById('tip-body').textContent  = d.body;
    const svgRect = diagram.getBoundingClientRect();
    const nr = this.getBoundingClientRect();
    let left = nr.left - svgRect.left + nr.width / 2 - 97;
    let top  = nr.top  - svgRect.top  + nr.height + 6;
    left = Math.max(0, Math.min(left, diagram.offsetWidth - 205));
    if (top + 150 > diagram.offsetHeight) top = nr.top - svgRect.top - 155;
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';
    tip.classList.add('show');
  });
  node.addEventListener('mouseleave', () => tip.classList.remove('show'));
});


/* ═══════════════════════════════════════════
   FOOTER — Link click logger
═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".footer a").forEach(link => {
    link.addEventListener("click", () => console.log("Clicked:", link.textContent));
  });
});