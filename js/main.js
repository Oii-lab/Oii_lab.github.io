/**
 * UI 渲染模組
 * 負責將 data.js 中的資料轉化為 HTML 元素
 */

// ─── 影片列表渲染 ───
function renderVideos() {
    const grid = document.getElementById('videoGrid');
    // 防錯機制：確保 grid 存在且目前是空的才渲染，避免重複注入
    if (!grid || grid.children.length > 0) return;

    grid.innerHTML = videos.map(v => `
        <div class="video-card" data-tags="${v.tags.join(',')}" onclick="openVideo('${v.id}','${v.title.replace(/'/g,"\\'")}')">
            <div class="video-thumb">
                <img src="${v.thumb}" alt="${v.title}" loading="lazy">
                <div class="play-overlay"><div class="play-icon">▶</div></div>
            </div>
            <div class="video-info">
                <div class="video-title">${v.title}</div>
                <div class="video-meta">
                    ${v.tags.map(t => `<span class="tag ${tagClass[t]}">${tagLabels[t]}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// ─── 筆記內容渲染 ───
function showNote(key, el) {
    // 1. 處理側邊欄 UI 狀態
    if (el) {
        document.querySelectorAll('.note-nav-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
    }
    
    // 2. 注入內容
    const note = notes[key];
    const contentArea = document.getElementById('noteContent');
    
    if (contentArea && note) {
        contentArea.innerHTML = `
            <div class="note-content-head">
                <span class="note-content-title">${note.title}</span>
                <span style="font-family:var(--mono);font-size:0.7rem;color:var(--text-dim)">.md</span>
            </div>
            <div class="note-body">${note.html}</div>
        `;
    }
}

// ─── 影片彈窗 (Modal) 控制 ───
function openVideo(id, title) {
    const modal = document.getElementById('videoModal');
    const titleEl = document.getElementById('modalTitle');
    const frame = document.getElementById('modalFrame');

    if (modal && titleEl && frame) {
        titleEl.textContent = title;
        frame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
        modal.classList.add('open');
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('modalFrame');

    if (modal) modal.classList.remove('open');
    if (frame) frame.src = ''; // 停止影片播放
}

// 點擊 Modal 外部自動關閉
function closeModal(e) {
    if (e.target.id === 'videoModal') {
        closeVideoModal();
    }
}

// ─── 影片篩選邏輯 ───
function filterVideos(tag, btn) {
    // 1. 切換按鈕樣式
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // 2. 篩選卡片
    document.querySelectorAll('.video-card').forEach(card => {
        const tags = card.dataset.tags.split(',');
        if (tag === 'all' || tags.includes(tag)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * main.js - 核心控制器 (Controller)
 * 負責處理路由切換與組件初始化
 */

// js/main.js
async function showSection(id) {
    const mainContainer = document.getElementById('app-content');
    const path = `component/${id}.html`; // 這裡一定要跟你的資料夾名稱一模一樣
    
    console.log("準備載入頁面路徑:", path); 

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP 錯誤! 狀態碼: ${response.status}`);
        
        const html = await response.text();
        mainContainer.innerHTML = html;

        // 記得執行初始化，否則 Videos 頁面會是空的
        initializeUI(id); 
    } catch (err) {
        console.error("切換頁面失敗:", err);
    }
}

/**
 * 根據載入的頁面 ID，啟動 ui.js 中對應的渲染功能
 */
function initializeUI(id) {
    switch (id) {
        case 'videos':
            renderVideos(); // 呼叫 ui.js：渲染影片 Grid
            break;
        case 'notes':
            showNote('bubble', null); // 呼叫 ui.js：預設顯示第一篇筆記
            break;
        case 'quiz':
            // 如果你有測驗初始化邏輯可以放這裡
            break;
        case 'home':
            // 首頁通常是靜態的，或有打字機特效可在這啟動
            break;
    }
}

/**
 * 更新導覽列連結的 Active 樣式
 */
function updateNavStatus(id) {
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('onclick')?.includes(`'${id}'`)) {
            a.classList.add('active');
        }
    });
}

// ─── 初始啟動 ───
window.addEventListener('DOMContentLoaded', () => {
    // 預設載入首頁
    showSection('home');
});