// 渲染影片列表
function renderVideos() {
  const grid = document.getElementById('videoGrid');
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

// 渲染筆記內容
function showNote(key, el) {
  if (el) {
    document.querySelectorAll('.note-nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  }
  const note = notes[key];
  document.getElementById('noteContent').innerHTML = `
    <div class="note-content-head">
      <span class="note-content-title">${note.title}</span>
      <span style="font-family:var(--mono);font-size:0.7rem;color:var(--text-dim)">.md</span>
    </div>
    <div class="note-body">${note.html}</div>
  `;
}

// 影片 Modal 控制
function openVideo(id, title) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalFrame').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
  document.getElementById('videoModal').classList.add('open');
}

function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('open');
  document.getElementById('modalFrame').src = '';
}