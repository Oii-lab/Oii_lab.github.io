// ─── 影片資料 ───
const videos = [
  { id: 'dQw4w9WgXcQ', title: 'C++ 入門 #01 — 環境建置與第一支程式', tags: ['cpp'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'C++ 入門 #02 — 變數、型別與運算子', tags: ['cpp'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'C++ 入門 #03 — 條件判斷與迴圈', tags: ['cpp'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'H21wcVaW-X4', title: 'Bubble Sort — 泡沫排序完整解析', tags: ['sort', 'algo'], thumb: 'https://img.youtube.com/vi/H21wcVaW-X4/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'Selection Sort — 選擇排序視覺化', tags: ['sort', 'algo'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'Insertion Sort — 插入排序 + 撲克牌比喻', tags: ['sort', 'algo'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'Merge Sort — 分治法入門', tags: ['sort', 'algo', 'ds'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: 'Quick Sort — Partition 詳解', tags: ['sort', 'algo'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
  { id: 'dQw4w9WgXcQ', title: '排序演算法時間複雜度總比較', tags: ['sort', 'algo'], thumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
];

const tagLabels = { cpp: 'C++', sort: 'Sort', ds: 'DS', algo: 'Algo', graph: 'Graph' };
const tagClass = { cpp: 'cpp', sort: 'sort', ds: 'ds', algo: 'algo', graph: 'graph' };

// ─── 筆記資料 ───
const notes = {
  bubble: {
    title: 'Bubble Sort 筆記',
    html: `
      <h3>概念</h3>
      <p>Bubble Sort 是最基礎的排序演算法。每次比較相鄰兩個元素，如果順序錯誤就交換，反覆進行直到沒有元素需要交換為止。</p>
      <h3>實作 (C++)</h3>
      <div class="code-block" data-lang="C++"><span class="kw">void</span> <span class="fn">bubbleSort</span>(vector&lt;<span class="kw">int</span>&gt;&amp; arr) {
  <span class="kw">int</span> n = arr.size();
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">for</span> (<span class="kw">int</span> j = <span class="num">0</span>; j &lt; n - i - <span class="num">1</span>; j++) {
      <span class="kw">if</span> (arr[j] &gt; arr[j+<span class="num">1</span>])
        swap(arr[j], arr[j+<span class="num">1</span>]); <span class="cm">// 交換</span>
    }
  }
}</div>
      <h3>複雜度</h3>
      <table class="complexity-table">
        <tr><th>情況</th><th>時間複雜度</th><th>空間複雜度</th></tr>
        <tr><td>最佳</td><td>O(n)</td><td>O(1)</td></tr>
        <tr><td>平均</td><td>O(n²)</td><td>O(1)</td></tr>
        <tr><td>最差</td><td>O(n²)</td><td>O(1)</td></tr>
      </table>
      <h3>重點整理</h3>
      <p>✅ 穩定排序（Stable Sort）<br>✅ In-place（不需額外空間）<br>❌ n 很大時效率差</p>
    `
  },
  quicksort: {
    title: 'Quick Sort 筆記',
    html: `
      <h3>核心思想：Divide and Conquer</h3>
      <p>選一個 pivot，將小於 pivot 的放左邊，大於的放右邊，然後遞迴對左右子陣列重複此操作。</p>
      <h3>Partition 實作</h3>
      <div class="code-block" data-lang="C++"><span class="kw">int</span> <span class="fn">partition</span>(vector&lt;<span class="kw">int</span>&gt;&amp; arr, <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">int</span> pivot = arr[hi]; <span class="cm">// 選最後一個為 pivot</span>
  <span class="kw">int</span> i = lo - <span class="num">1</span>;
  <span class="kw">for</span> (<span class="kw">int</span> j = lo; j &lt; hi; j++) {
    <span class="kw">if</span> (arr[j] &lt;= pivot)
      swap(arr[++i], arr[j]);
  }
  swap(arr[i+<span class="num">1</span>], arr[hi]);
  <span class="kw">return</span> i + <span class="num">1</span>;
}</div>
      <h3>複雜度</h3>
      <table class="complexity-table">
        <tr><th>情況</th><th>時間複雜度</th><th>說明</th></tr>
        <tr><td>最佳</td><td>O(n log n)</td><td>每次均分</td></tr>
        <tr><td>平均</td><td>O(n log n)</td><td>-</td></tr>
        <tr><td>最差</td><td>O(n²)</td><td>已排序陣列 + 固定 pivot</td></tr>
      </table>
    `
  },
  bigo: {
    title: '時間複雜度 Big-O 速覽',
    html: `
      <h3>什麼是 Big-O？</h3>
      <p>Big-O 描述演算法在輸入規模 n 趨近無窮大時，執行時間的成長趨勢，忽略常數和低次項。</p>
      <h3>常見複雜度排序</h3>
      <table class="complexity-table">
        <tr><th>符號</th><th>名稱</th><th>n=100 時約為</th></tr>
        <tr><td>O(1)</td><td>常數</td><td>1</td></tr>
        <tr><td>O(log n)</td><td>對數</td><td>7</td></tr>
        <tr><td>O(n)</td><td>線性</td><td>100</td></tr>
        <tr><td>O(n log n)</td><td>線性對數</td><td>664</td></tr>
        <tr><td>O(n²)</td><td>平方</td><td>10,000</td></tr>
        <tr><td>O(2ⁿ)</td><td>指數</td><td>10³⁰</td></tr>
      </table>
      <h3>實用口訣</h3>
      <p>競賽中 1 秒大約能跑 <strong style="color:var(--green)">10⁸</strong> 次基本操作。n = 10⁵ 時就不能用 O(n²) 演算法了。</p>
    `
  },
  ptr: {
    title: '指標 & 記憶體管理',
    html: `
      <h3>指標基礎</h3>
      <p>指標（Pointer）儲存的是另一個變數的記憶體位址，而不是值本身。</p>
      <div class="code-block" data-lang="C++"><span class="kw">int</span> x = <span class="num">42</span>;
<span class="kw">int</span>* ptr = &amp;x;      <span class="cm">// ptr 指向 x 的位址</span>
cout &lt;&lt; *ptr;       <span class="cm">// 解參考：輸出 42</span>
*ptr = <span class="num">100</span>;         <span class="cm">// 修改 x 的值為 100</span></div>
      <h3>常見錯誤</h3>
      <p>⚠️ 未初始化的指標（dangling pointer）<br>⚠️ 存取 nullptr<br>⚠️ 忘記 delete（記憶體洩漏）</p>
    `
  },
  stl: {
    title: 'C++ STL 速查表',
    html: `
      <h3>常用容器</h3>
      <table class="complexity-table">
        <tr><th>容器</th><th>用途</th><th>存取</th></tr>
        <tr><td>vector&lt;T&gt;</td><td>動態陣列</td><td>O(1)</td></tr>
        <tr><td>stack&lt;T&gt;</td><td>後進先出</td><td>O(1)</td></tr>
        <tr><td>queue&lt;T&gt;</td><td>先進先出</td><td>O(1)</td></tr>
        <tr><td>map&lt;K,V&gt;</td><td>有序鍵值對</td><td>O(log n)</td></tr>
        <tr><td>unordered_map</td><td>雜湊表</td><td>O(1) avg</td></tr>
        <tr><td>priority_queue</td><td>最大堆積</td><td>O(log n)</td></tr>
      </table>
      <h3>常用算法</h3>
      <div class="code-block" data-lang="C++">sort(v.begin(), v.end());         <span class="cm">// 排序</span>
reverse(v.begin(), v.end());      <span class="cm">// 反轉</span>
*max_element(v.begin(), v.end()); <span class="cm">// 最大值</span>
binary_search(v.begin(), v.end(), x); <span class="cm">// 二分搜</span></div>
    `
  }
};

// ─── 測驗資料 ───
const quizData = {
  sort: [
    { q: 'Bubble Sort 的最差時間複雜度是？', opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], ans: 2, explain: '...' }
  ],
  cpp: [ /* ... (略) ... */ ],
  complexity: [ /* ... (略) ... */ ]
};