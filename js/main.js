/**
 * main.js — 邏輯層
 * 負責：
 *   1. 頁面初始化：載入各 component HTML
 *   2. 導覽路由：showSection()
 *   3. 事件綁定（全域 keyboard、Modal overlay）
 */

/* ══════════════════════════════════════════════
   Component 載入
   用 fetch 把 components/*.html 注入對應的 <section>
   ══════════════════════════════════════════════ */

const COMPONENTS = [
  { section: 'home',   file: 'components/home.html'   },
  { section: 'videos', file: 'components/videos.html' },
  { section: 'notes',  file: 'components/notes.html'  },
  { section: 'quiz',   file: 'components/quiz.html'   },
  { section: 'about',  file: 'components/about.html'  },
];

/**
 * 載入單一 component HTML 並注入 <section id="...">
 * @param {string} sectionId
 * @param {string} filePath
 */
async function loadComponent(sectionId, filePath) {
  try {
    const res  = await fetch(filePath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    document.getElementById(sectionId).innerHTML = html;
  } catch (err) {
    console.error(`[main] 無法載入 ${filePath}:`, err);
  }
}

/**
 * 並行載入所有 components，完成後初始化首頁
 */
async function initApp() {
  await Promise.all(
    COMPONENTS.map(({ section, file }) => loadComponent(section, file))
  );

  // 預先渲染影片（避免第一次切換到 videos 時才載入）
  renderVideos();

  // 渲染首個筆記
  showNote('bubble', null);

  // 綁定事件
  bindGlobalEvents();

  // 根據 URL hash 決定初始頁（支援直接連結）
  const hash = location.hash.replace('#', '') || 'home';
  showSection(hash, false);
}

/* ══════════════════════════════════════════════
   路由：showSection
   ══════════════════════════════════════════════ */

/**
 * 切換顯示的 section
 * @param {string}  id         - section 的 id
 * @param {boolean} pushState  - 是否更新 URL hash（預設 true）
 */
function showSection(id, pushState = true) {
  // 確認目標 section 存在
  const target = document.getElementById(id);
  if (!target) return;

  // 切換 section
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  target.classList.add('active');

  // 更新桌機 navbar active 狀態
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('nav-' + id)?.classList.add('active');

  // 更新手機選單 active 狀態
  document.querySelectorAll('.nav-mobile-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById('mnav-' + id)?.classList.add('active');

  // 更新 URL hash（方便分享連結）
  if (pushState) history.pushState(null, '', `#${id}`);

  // 捲到頂端
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════════════
   全域事件綁定
   ══════════════════════════════════════════════ */

function bindGlobalEvents() {
  // Modal 遮罩點擊關閉
  document.getElementById('videoModal')
    ?.addEventListener('click', handleModalOverlayClick);

  // ESC 鍵關閉 Modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeVideoModal();
  });

  // 留言板 Enter 送出（Shift+Enter 換行）
  document.getElementById('commentInput')
    ?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitComment();
      }
    });

  // 瀏覽器上一頁 / 下一頁（popstate）
  window.addEventListener('popstate', () => {
    const hash = location.hash.replace('#', '') || 'home';
    showSection(hash, false);
  });

  // ── 漢堡選單 ──
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // 點擊選單以外的區域自動收起
  document.addEventListener('click', e => {
    if (!hamburger?.contains(e.target) && !mobileMenu?.contains(e.target)) {
      closeMobileMenu();
    }
  });
}

/** 收起手機選單 */
function closeMobileMenu() {
  const hamburger  = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  mobileMenu?.classList.remove('open');
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
}

/**
 * 手機版選單點擊：切換頁面並收起選單
 * @param {string} id - section id
 */
function mobileNav(id) {
  showSection(id);
  closeMobileMenu();

  // 同步手機選單的 active 狀態
  document.querySelectorAll('.nav-mobile-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById('mnav-' + id)?.classList.add('active');
}

/* ══════════════════════════════════════════════
   Entry Point
   ══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', initApp);