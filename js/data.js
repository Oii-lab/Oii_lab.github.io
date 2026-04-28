/**
 * data.js — 資料層
 * 新增影片、筆記、題目都只需改這個檔案
 */

/* ══════════════════════════════════════════════
   影片資料
   每筆格式：
     id    : YouTube 影片 ID（網址 ?v= 後面那串）
     title : 影片標題
     tags  : 陣列，可選值：'cpp' | 'sort' | 'ds' | 'algo' | 'graph'
   thumb 會自動由 id 產生，不用填
   ══════════════════════════════════════════════ */
const videos = [
  {
    id:    '7OnBY2SoxfA',
    title: 'Bubble Sort — 泡沫排序完整解析',
    tags:  ['sort', 'algo'],
  },
  {
    id:    'H21wcVaW-X4',
    title: 'Insertion Sort — 插入排序 + 撲克牌比喻',
    tags:  ['sort', 'algo'],
  },
  {
    id:    'z6sOA2nnhjc',
    title: 'Selection Sort — 選擇排序視覺化',
    tags:  ['sort', 'algo'],
  },
  {
    id:    'YOUTUBE_ID_HERE',
    title: 'Quick Sort — Partition 詳解',
    tags:  ['sort', 'algo'],
  },
  {
    id:    'YOUTUBE_ID_HERE',
    title: 'Merge Sort — 分治法入門',
    tags:  ['sort', 'algo', 'ds'],
  },
  {
    id:    '5UH3u_KdKEE',
    title: 'C++ 入門 #01 — 第一支程式',
    tags:  ['cpp'],
  },
  {
    id:    'YoXmyVrLfYY',
    title: 'C++ 入門 #02 — 變數、型別與運算子',
    tags:  ['cpp'],
  },
  {
    id:    '2vdUiTSG3GY',
    title: 'C++ 入門 #03 — 輸入與輸出',
    tags:  ['cpp'],
  },
  {
    id:    'Rsfnl6OCIlU',
    title: 'C++ 入門 #04 — 輸入與輸出實戰篇',
    tags:  ['cpp'],
  },
  {
    id:    'Rz9uuLWQumk',
    title: 'C++ 入門 #05 — if/else 條件判斷',
    tags:  ['cpp'],
  },
  {
    id:    'hBFdXvULsoQ',
    title: 'C++ 入門 #06 — if/else if/else 多重選擇',
    tags:  ['cpp'],
  },
  {
    id:    'bbyw8fGlY4Y',
    title: 'C++ 入門 #07 — switch 語法',
    tags:  ['cpp'],
  },
  {
    id:    'TIUzh82ssNA',
    title: 'C++ 入門 #08 — while 迴圈',
    tags:  ['cpp'],
  },
  {
    id:    'OUe_RKs3bSY',
    title: 'C++ 入門 #09 — do while 迴圈',
    tags:  ['cpp'],
  },
  {
    id:    'RMERuanvbCw',
    title: 'C++ 入門 #10 — for 迴圈',
    tags:  ['cpp'],
  },
];

/* ══════════════════════════════════════════════
   Tag 顯示設定（一般不需要更動）
   ══════════════════════════════════════════════ */
const tagMeta = {
  cpp:   { label: 'C++',    cls: 'cpp'   },
  sort:  { label: 'Sort',   cls: 'sort'  },
  ds:    { label: 'DS',     cls: 'ds'    },
  algo:  { label: 'Algo',   cls: 'algo'  },
  graph: { label: 'Graph',  cls: 'graph' },
};

/* ══════════════════════════════════════════════
   筆記資料
   key   : 唯一識別鍵，對應 components/notes.html 裡的 data-note
   title : 顯示在頁面上的標題
   html  : 筆記內容（支援 HTML，class 參考 style.css）
   ══════════════════════════════════════════════ */
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
    `,
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
        <tr><td>平均</td><td>O(n log n)</td><td>—</td></tr>
        <tr><td>最差</td><td>O(n²)</td><td>已排序 + 固定 pivot</td></tr>
      </table>
    `,
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
    `,
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
    `,
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
      <div class="code-block" data-lang="C++">sort(v.begin(), v.end());              <span class="cm">// 排序</span>
reverse(v.begin(), v.end());           <span class="cm">// 反轉</span>
*max_element(v.begin(), v.end());      <span class="cm">// 最大值</span>
binary_search(v.begin(), v.end(), x);  <span class="cm">// 二分搜</span></div>
    `,
  },
};

/* ══════════════════════════════════════════════
   測驗題目資料
   每個主題是一個陣列，每題格式：
     q       : 題目文字
     opts    : 選項陣列（4 個）
     ans     : 正確選項的 index（0-based）
     explain : 解析文字
     code    : （可選）題目附上的程式碼片段
   ══════════════════════════════════════════════ */
const quizData = {
  sort: [
    {
      q:       'Bubble Sort 的最差時間複雜度是？',
      opts:    ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      ans:     2,
      explain: 'Bubble Sort 在每次 pass 只確定一個元素的位置，需要 n-1 次 pass，每次最多比較 n-1 次，共 O(n²)。',
    },
    {
      q:       '以下哪個排序演算法是穩定排序（Stable Sort）？',
      opts:    ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
      ans:     2,
      explain: 'Merge Sort 是穩定排序，相同元素的相對順序不會改變。Quick Sort 和 Heap Sort 都不穩定。',
    },
    {
      q:       'Quick Sort 的平均時間複雜度是？',
      opts:    ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      ans:     1,
      explain: '平均情況下 Quick Sort 的 pivot 能把陣列均分，遞迴深度 O(log n)，每層 O(n)，共 O(n log n)。',
    },
    {
      q:       'Insertion Sort 在什麼情況下效率最好？',
      opts:    ['陣列完全反序', '陣列已近乎排好序', '陣列隨機', '陣列所有元素相同'],
      ans:     1,
      explain: '當陣列幾乎已排序時，每次插入只需移動很少元素，時間複雜度接近 O(n)。',
    },
    {
      q:       '下面哪個排序是 In-place 排序（不需額外記憶體）？',
      opts:    ['Merge Sort', 'Counting Sort', 'Radix Sort', 'Heap Sort'],
      ans:     3,
      explain: 'Heap Sort 只需 O(1) 的額外空間。Merge Sort 需要 O(n) 合併空間，Counting/Radix Sort 需要輔助陣列。',
    },
  ],

  cpp: [
    {
      q:       '在 C++ 中，以下哪種方式正確地宣告一個指向 int 的指標？',
      opts:    ['int ptr;', 'int& ptr;', 'int* ptr;', 'ptr int;'],
      ans:     2,
      explain: 'int* ptr; 宣告了一個指向 int 型別的指標。& 是參考符號，不是指標。',
    },
    {
      q:       'vector<int> v = {3,1,4}; 執行 v.push_back(2) 後，v.size() 是？',
      opts:    ['3', '4', '5', '2'],
      ans:     1,
      explain: '原本有 3 個元素，push_back 加入一個，size 變為 4。',
    },
    {
      q:       '以下程式碼的輸出是什麼？',
      code:    'int x = 5;\ncout << x++ << " " << x;',
      opts:    ['5 6', '6 6', '5 5', '6 5'],
      ans:     0,
      explain: 'x++ 是後置遞增，先回傳 x 的值（5），再遞增 x 為 6。所以輸出 "5 6"。',
    },
    {
      q:       'C++ 中 #include <algorithm> 提供了哪個函式？',
      opts:    ['printf()', 'sort()', 'malloc()', 'cin'],
      ans:     1,
      explain: '<algorithm> 提供 sort()、find()、max()、min() 等演算法函式。printf 在 <cstdio>，malloc 在 <cstdlib>。',
    },
    {
      q:       '以下哪個是 C++ 中正確的函式重載（overloading）？',
      opts:    [
        'int add(int a); int add(int a) { return a; }',
        'int add(int a, int b); double add(double a, double b);',
        'void foo(); void foo();',
        'int bar(int x); int bar(int y);',
      ],
      ans:     1,
      explain: '函式重載要求參數的型別或數量不同。選項 B 中兩個 add 的參數型別不同（int vs double），合法重載。',
    },
  ],

  complexity: [
    {
      q:       '一個巢狀迴圈，外層跑 n 次，內層跑 log n 次，時間複雜度是？',
      opts:    ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
      ans:     1,
      explain: '外層 n 次 × 內層 log n 次 = O(n log n)。',
    },
    {
      q:       '二分搜尋（Binary Search）的時間複雜度？',
      opts:    ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      ans:     2,
      explain: '每次比較都將搜尋範圍減半，經過 log₂n 次後結束，所以是 O(log n)。',
    },
    {
      q:       '以下哪種時間複雜度在 n=10⁶ 時仍然實用？',
      opts:    ['O(n²)', 'O(2ⁿ)', 'O(n!)', 'O(n log n)'],
      ans:     3,
      explain: 'n=10⁶ 時，O(n log n) ≈ 2×10⁷，約 0.02 秒可接受。O(n²) = 10¹² 遠超時限。',
    },
    {
      q:       'f(n) = 3n² + 5n + 100，用 Big-O 表示是？',
      opts:    ['O(n)', 'O(n²)', 'O(3n²)', 'O(n³)'],
      ans:     1,
      explain: 'Big-O 忽略常數係數和低次項，3n² + 5n + 100 的主導項是 n²，所以是 O(n²)。',
    },
    {
      q:       '遞迴費氏數列 fib(n) = fib(n-1) + fib(n-2) 的時間複雜度？',
      opts:    ['O(n)', 'O(n log n)', 'O(2ⁿ)', 'O(n²)'],
      ans:     2,
      explain: '未加記憶化的遞迴費氏數列，每個節點產生兩個子呼叫，形成二元樹，深度 n，共約 2ⁿ 個節點。',
    },
  ],
  BubbleSort: [
    {
      q: '泡沫排序（Bubble Sort）的核心操作機制為何？',
      opts: ['隨機交換元素', '比較相鄰元素並交換', '找出最小元素放入前端', '將陣列對半分割'],
      ans: 1,
      explain: '泡沫排序透過不斷比較「相鄰」的兩個元素，若順序錯誤則交換，使大值像氣泡一樣浮向末端。',
    },
    {
      q: '在「未優化」的情況下，泡沫排序處理長度為 n 的陣列，其平均時間複雜度為何？',
      opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      ans: 2,
      explain: '標準泡沫排序使用兩層巢狀迴圈，不論資料狀況，比較次數約為 n(n-1)/2，故為 O(n²)。',
    },
    {
      q: '若加入一個旗標（Flag）判斷該輪是否發生交換，處理「已排序」陣列的最佳時間複雜度為何？',
      opts: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      ans: 1,
      explain: '優化後的泡沫排序在第一輪發現無交換後會直接結束，僅需遍歷一次，故為 O(n)。',
    },
    {
      q: '泡沫排序屬於「穩定排序（Stable Sort）」，其主要原因為何？',
      opts: ['執行速度穩定', '不會改變相等元素的相對順序', '消耗記憶體極少', '程式碼行數固定'],
      ans: 1,
      explain: '穩定排序是指數值相等的元素在排序後仍保持原始相對位置，泡沫排序在相等時不交換，符合此定義。',
    },
    {
      q: '泡沫排序在排序過程中需要多少額外的輔助空間（空間複雜度）？',
      opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      ans: 0,
      explain: '泡沫排序是原地排序（In-place），僅需一個變數空間進行交換，故為常數空間 O(1)。',
    },
    {
      q: '內層迴圈 `j < n - 1 - i` 中的 `- i` 主要目的是什麼？',
      opts: ['防止陣列越界', '處理負數數據', '避免與已就位的末端元素進行無效比較', '增加演算法隨機性'],
      ans: 2,
      explain: '每一輪結束後，末端都會確定一個最大值，`- i` 可以跳過這些已排好序的部分以提升效能。',
    },
    {
      q: '對於一個完全「反序」的數列，泡沫排序的交換次數與比較次數關係為何？',
      opts: ['交換次數遠少於比較次數', '交換次數等於比較次數', '不會發生交換', '交換次數為零'],
      ans: 1,
      explain: '在完全反序的情況下，每一次比較都會觸發交換，因此兩者次數相同。',
    },
    {
      q: '數列 [5, 2, 8, 1] 執行「第一輪」完整交換後（Pass 1），結果為何？',
      opts: ['[1, 2, 5, 8]', '[2, 5, 1, 8]', '[2, 5, 8, 1]', '[5, 2, 1, 8]'],
      ans: 1,
      explain: '過程：(5,2)->(2,5)；(5,8)不換；(8,1)->(1,8)。結果為 [2, 5, 1, 8]，8 移至末端。',
    },
    {
      q: '下列哪種情況最適合使用泡沫排序？',
      opts: ['海量數據排序', '幾乎已排序的極小規模數據', '需要最快搜尋速度時', '多處理器並行運算'],
      ans: 1,
      explain: '由於 O(n²) 效率低，泡沫排序僅適合極小規模或近乎排序完成（優化後極快）的場景。',
    },
    {
      q: '與快速排序（Quick Sort）相比，泡沫排序的主要缺點是？',
      opts: ['不具備穩定性', '輔助空間需求太大', '大規模數據下的效能極差', '實作邏輯過於複雜'],
      ans: 2,
      explain: '快速排序平均為 O(n log n)，而泡沫排序為 O(n²)，在數據量大時效能差異巨大。',
    },
  ],

InsertionSort: [
    {
      q: '插入排序（Insertion Sort）的運作邏輯最類似於下列哪種日常行為？',
      opts: ['在圖書館依編號找書', '整理手中的撲克牌', '在賣場排隊結帳', '玩剪刀石頭布'],
      ans: 1,
      explain: '插入排序就像整理撲克牌，將一張新牌與已排好的牌組由後往前比較，找到合適位置後「插入」。',
    },
    {
      q: '在「最佳情況（Best Case）」下，即數列已完全排序，插入排序的時間複雜度為何？',
      opts: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      ans: 1,
      explain: '若資料已排序，每一輪只需比較一次且不需移動元素，掃描一遍即完成，故為 O(n)。',
    },
    {
      q: '插入排序在「最壞情況（Worst Case）」下的時間複雜度為何？',
      opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
      ans: 2,
      explain: '當數列為反序時，每個元素都要與前面所有元素比較並移動，比較次數與 n² 成正比。',
    },
    {
      q: '關於插入排序的「穩定性（Stability）」，下列敘述何者正確？',
      opts: ['它是穩定排序', '它是不穩定排序', '取決於插入的方向', '取決於資料類型'],
      ans: 0,
      explain: '插入排序在遇到數值相等的元素時不會改變它們的相對順序，因此屬於穩定排序。',
    },
    {
      q: '插入排序在執行過程中的空間複雜度為何？',
      opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      ans: 0,
      explain: '插入排序是原地排序（In-place），僅需一個變數空間暫存當前處理的元素，故為 O(1)。',
    },
    {
      q: '在實作插入排序時，若當前元素比左側元素小，則會發生什麼事？',
      opts: ['直接刪除該元素', '將左側元素向右平移', '結束整個排序程序', '將右側所有元素清空'],
      ans: 1,
      explain: '為了騰出空間插入，演算法會將已排序部分中比當前元素大的元素逐一向右「平移」。',
    },
    {
      q: '數列 [5, 2, 4, 6, 1, 3] 在處理完數值「2」之後（第二個元素），數列變為？',
      opts: ['[2, 5, 4, 6, 1, 3]', '[5, 2, 4, 6, 1, 3]', '[2, 4, 5, 6, 1, 3]', '[1, 2, 3, 4, 5, 6]'],
      ans: 0,
      explain: '處理 2 時，發現它比 5 小，將 5 右移一位，然後把 2 插入到最前面，得到 [2, 5, 4, 6, 1, 3]。',
    },
    {
      q: '插入排序（Insertion Sort）與泡沫排序（Bubble Sort）在哪種情況下表現相似？',
      opts: ['處理隨機分布的大數據', '處理完全反序的數據', '在資料量極大時', '兩者皆為 O(n log n)'],
      ans: 1,
      explain: '在最壞情況（完全反序）下，兩者的效率都很低，時間複雜度皆為 O(n²)。',
    },
    {
      q: '為什麼插入排序在數據量較小時，通常比快速排序（Quick Sort）更受青睞？',
      opts: ['因為它佔用更多記憶體', '因為它支援多線程', '因為它實作簡單且常數項較小', '因為它是非線性演算法'],
      ans: 2,
      explain: '插入排序邏輯簡單且沒有遞迴開銷，在小規模數據（如 n < 15）下實際運行速度往往較快。',
    },
    {
      q: '在「幾乎已排序（Nearly Sorted）」的數據中，下列哪種排序演算法效率最高？',
      opts: ['選擇排序', '插入排序', '快速排序', '合併排序'],
      ans: 1,
      explain: '插入排序在面對近乎排序好的資料時，移動次數極少，效能接近線性 O(n)，表現優於其他複雜演算法。',
    },
  ],
SelectionSort: [
    {
      q: '選擇排序（Selection Sort）的基本運作原理為何？',
      opts: ['不斷交換相鄰元素', '將數列分成兩半遞迴處理', '每一輪從未排序部分尋找最小值並交換至前端', '將元素插入已排序序列的正確位置'],
      ans: 2,
      explain: '選擇排序的核心在於「掃描全體尋找極值」，每一輪找最小值並固定到已排序部分的末尾。',
    },
    {
      q: '選擇排序在最壞情況下的時間複雜度為何？',
      opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n³)'],
      ans: 2,
      explain: '不論輸入資料的順序，選擇排序都需要執行兩層巢狀迴圈，故時間複雜度恆為 O(n²)。',
    },
    {
      q: '若輸入數列已經是「完全排序」的狀態，選擇排序的時間複雜度為何？',
      opts: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
      ans: 2,
      explain: '這是選擇排序的主要缺點：即使資料已排好，它仍會執行完整的掃描來確認最小值，故依然是 O(n²)。',
    },
    {
      q: '關於選擇排序的「穩定性（Stability）」，下列敘述何者正確？',
      opts: ['它是穩定排序', '它是不穩定排序', '取決於陣列大小', '取決於數值範圍'],
      ans: 1,
      explain: '由於最小值與前端元素交換時可能會跳過中間相同的元素，導致相對順序改變，故為不穩定排序。',
    },
    {
      q: '選擇排序在執行過程中的空間複雜度為何？',
      opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
      ans: 0,
      explain: '選擇排序是原地排序（In-place），僅需極少數暫存變數記錄索引，空間複雜度為 O(1)。',
    },
    {
      q: '在實作選擇排序時，內層迴圈通常用來執行什麼任務？',
      opts: ['交換元素', '切割陣列', '尋找剩餘元素中的最小值索引', '計算平均值'],
      ans: 2,
      explain: '內層迴圈會遍歷所有未排序的元素，透過比較更新「目前最小值」的索引位置。',
    },
    {
      q: '數列 [11, 25, 12, 22, 64] 執行「第一輪」選擇排序後的結果為何？',
      opts: ['[11, 12, 22, 25, 64]', '[11, 25, 12, 22, 64]', '[64, 25, 12, 22, 11]', '[11, 22, 12, 25, 64]'],
      ans: 1,
      explain: '第一輪會掃描全數列，發現最小是 11，而 11 已在首位，故交換後位置不變。',
    },
    {
      q: '選擇排序相較於泡沫排序，在「數據交換次數」上的表現如何？',
      opts: ['交換次數更多', '交換次數一樣', '交換次數較少', '不會發生交換'],
      ans: 2,
      explain: '泡沫排序每一輪可能多次交換，而選擇排序每一輪最多只發生「一次」交換，故移動次數較少。',
    },
    {
      q: '若要將選擇排序改為「由大到小（降序）」排列，應該修改程式碼的哪個部分？',
      opts: ['修改迴圈次數', '將尋找最小值的邏輯改為尋找最大值', '增加額外的陣列', '改變空間複雜度'],
      ans: 1,
      explain: '只要將比較條件改為尋找未排序部分的最大值（Max），即可實現降序排列。',
    },
    {
      q: '選擇排序的「外層」迴圈執行 n-1 次後，最後一個元素為何不需要再處理？',
      opts: ['因為它會自動消失', '因為剩下的最後一個元素必定是最大的', '因為內層迴圈會處理它', '因為空間不足'],
      ans: 1,
      explain: '當前 n-1 個較小的元素都已按順序放好，剩下的一個元素必然會落在正確的最後位置。',
    },
  ],

  
};
