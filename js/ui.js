/**
 * ui.js — 渲染層
 * 負責把 data.js 的資料轉成 DOM 元素
 * 不包含路由邏輯（那在 main.js）
 */

/* ══════════════════════════════════════════════
   影片區
   ══════════════════════════════════════════════ */

/**
 * 初次載入影片卡片（只跑一次）
 */
function renderVideos() {
  const grid = document.getElementById('videoGrid');
  if (!grid || grid.children.length > 0) return;

  grid.innerHTML = videos
    .map(v => buildVideoCard(v))
    .join('');
}

/**
 * 產生單張影片卡片的 HTML 字串
 * @param {object} v - videos 陣列中的一筆資料
 */
function buildVideoCard(v) {
  const thumb = `https://img.youtube.com/vi/${v.id}/mqdefault.jpg`;
  const tagHTML = v.tags
    .map(t => `<span class="tag ${tagMeta[t].cls}">${tagMeta[t].label}</span>`)
    .join('');

  // 用 data-* 屬性傳值，避免字串 escape 問題
  return `
    <div class="video-card" data-tags="${v.tags.join(',')}"
         data-id="${v.id}" data-title="${v.title}"
         onclick="openVideo(this)">
      <div class="video-thumb">
        <img src="${thumb}" alt="${v.title}" loading="lazy">
        <div class="play-overlay"><div class="play-icon">▶</div></div>
      </div>
      <div class="video-info">
        <div class="video-title">${v.title}</div>
        <div class="video-meta">${tagHTML}</div>
      </div>
    </div>`;
}

/**
 * 依 tag 篩選影片卡片顯示 / 隱藏
 * @param {string} tag  - 'all' 或 tagMeta 的 key
 * @param {HTMLElement} btn - 被點擊的篩選按鈕
 */
function filterVideos(tag, btn) {
  document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.video-card').forEach(card => {
    const tags = card.dataset.tags.split(',');
    const hide = tag !== 'all' && !tags.includes(tag);
    card.classList.toggle('hidden', hide);
  });
}

/* ══════════════════════════════════════════════
   影片 Modal
   ══════════════════════════════════════════════ */

/**
 * 開啟影片播放 Modal
 * @param {HTMLElement} cardEl - 被點擊的 .video-card 元素
 */
function openVideo(cardEl) {
  const id    = cardEl.dataset.id;
  const title = cardEl.dataset.title;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalFrame').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  document.getElementById('videoModal').classList.add('open');
}

/** 關閉影片 Modal（並停止播放） */
function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('open');
  document.getElementById('modalFrame').src = '';
}

/** Modal 遮罩點擊關閉 */
function handleModalOverlayClick(e) {
  if (e.target === document.getElementById('videoModal')) closeVideoModal();
}

/* ══════════════════════════════════════════════
   筆記區
   ══════════════════════════════════════════════ */

/**
 * 切換並渲染筆記內容
 * @param {string}      key  - notes 物件的 key
 * @param {HTMLElement} navEl - 被點擊的 .note-nav-item（可為 null）
 */
function showNote(key, navEl) {
  // 更新側邊欄 active 狀態
  if (navEl) {
    document.querySelectorAll('.note-nav-item').forEach(i => i.classList.remove('active'));
    navEl.classList.add('active');
  }

  const note = notes[key];
  if (!note) return;

  document.getElementById('noteContent').innerHTML = `
    <div class="note-content-head">
      <span class="note-content-title">${note.title}</span>
      <span class="note-ext">.md</span>
    </div>
    <div class="note-body">${note.html}</div>`;
}

/* ══════════════════════════════════════════════
   測驗區
   ══════════════════════════════════════════════ */

// 測驗狀態（模組內私有）
let _quiz = {
  questions: [],
  index:     0,
  score:     0,
};

/**
 * 開始測驗
 * @param {string} topic - quizData 的 key
 */
function startQuiz(topic) {
  const topicLabels = { sort: '排序演算法', cpp: 'C++ 基礎', complexity: '時間複雜度',BubbleSort:'Bubble Sort',InsertionSort:'Insertion Sort',SelectionSort:'Selection Sort' };

  _quiz.questions = quizData[topic];
  _quiz.index     = 0;
  _quiz.score     = 0;

  document.getElementById('quizTopicLabel').textContent = `// ${topicLabels[topic]}`;
  document.getElementById('quizSelect').style.display   = 'none';
  document.getElementById('quizGame').classList.add('active');
  document.getElementById('quizResult').classList.remove('show');

  _renderQuestion();
}

/** 渲染當前題目 */
function _renderQuestion() {
  const total = _quiz.questions.length;

  // 全部作答完畢
  if (_quiz.index >= total) {
    _showQuizResult();
    return;
  }

  const q   = _quiz.questions[_quiz.index];
  const pct = (_quiz.index / total) * 100;
  document.getElementById('quizProgressFill').style.width = pct + '%';

  const optionsHTML = q.opts
    .map((opt, i) => `
      <button class="quiz-option" id="qopt${i}" onclick="answerQuiz(${i})">
        <span class="opt-label">${'ABCD'[i]}</span>${opt}
      </button>`)
    .join('');

  document.getElementById('quizCardArea').innerHTML = `
    <div class="quiz-card">
      <div class="quiz-num">Q${_quiz.index + 1} / ${total}</div>
      <div class="quiz-q">${q.q}</div>
      ${q.code ? `<div class="quiz-code">${q.code}</div>` : ''}
      <div class="quiz-options">${optionsHTML}</div>
      <div class="quiz-explain" id="quizExplain">💡 ${q.explain}</div>
    </div>
    <div class="quiz-footer">
      <div class="quiz-score-badge">得分：<span>${_quiz.score}</span> / ${_quiz.index}</div>
      <button class="btn" id="nextBtn" style="display:none" onclick="nextQuestion()">下一題 →</button>
    </div>`;
}

/**
 * 使用者選擇答案
 * @param {number} idx - 選擇的選項 index
 */
function answerQuiz(idx) {
  const q = _quiz.questions[_quiz.index];

  // 鎖定所有選項
  document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

  if (idx === q.ans) {
    document.getElementById('qopt' + idx).classList.add('correct');
    _quiz.score++;
  } else {
    document.getElementById('qopt' + idx).classList.add('wrong');
    document.getElementById('qopt' + q.ans).classList.add('correct');
  }

  document.getElementById('quizExplain').classList.add('show');
  document.getElementById('nextBtn').style.display = 'inline-block';
}

/** 前往下一題 */
function nextQuestion() {
  _quiz.index++;
  _renderQuestion();
}

/** 顯示測驗結果 */
function _showQuizResult() {
  document.getElementById('quizProgressFill').style.width = '100%';
  document.getElementById('quizCardArea').innerHTML = '';

  const total = _quiz.questions.length;
  const pct   = Math.round((_quiz.score / total) * 100);
  const msgs  = [
    [0,   39,  '再複習一下影片，很快就會懂的！📚'],
    [40,  59,  '有些概念需要加強，繼續加油！💪'],
    [60,  79,  '不錯！大部分都理解了 👍'],
    [80,  99,  '優秀！基礎非常紮實 🎯'],
    [100, 100, '滿分！演算法大師 🏆'],
  ];
  const msg = msgs.find(([lo, hi]) => pct >= lo && pct <= hi)?.[2] ?? '';

  document.getElementById('resultScore').textContent = `${_quiz.score} / ${total}`;
  document.getElementById('resultMsg').textContent   = `正確率 ${pct}%  —  ${msg}`;
  document.getElementById('quizResult').classList.add('show');
}

/** 返回主題選擇畫面 */
function backToSelect() {
  document.getElementById('quizSelect').style.display = 'block';
  document.getElementById('quizGame').classList.remove('active');
}

/* ══════════════════════════════════════════════
   留言板
   ══════════════════════════════════════════════ */

const _avatars = ['🙋','💻','🧑‍🎓','👨‍💻','🤔','😊','🧠','🐧'];

/** 送出留言 */
function submitComment() {
  const inp  = document.getElementById('commentInput');
  const text = inp.value.trim();
  if (!text) return;

  const list = document.getElementById('commentList');
  const div  = document.createElement('div');
  div.className = 'comment-item';
  div.innerHTML = `
    <div class="comment-avatar">${_avatars[Math.floor(Math.random() * _avatars.length)]}</div>
    <div>
      <div class="comment-meta">
        <span class="comment-author">訪客</span>
        <span class="comment-time">剛剛</span>
      </div>
      <div class="comment-text">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>`;

  list.prepend(div);
  inp.value = '';
}
