/* 编年史档案馆 · 公共脚本 */
const $ = (s, r) => (r || document).querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,
  c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const _cache = {};
async function getJSON(p) {
  if (!_cache[p]) {
    _cache[p] = fetch(p).then(r => { if (!r.ok) throw new Error('加载失败：' + p); return r.json(); });
  }
  return _cache[p];
}
const getMeta = () => getJSON('data/meta.json');
const getVol = v => getJSON('data/vol' + v + '.json');
const danghao = (vol, seq) => 'A-1965-V' + vol + '-' + String(seq).padStart(3, '0');
const qs = k => new URLSearchParams(location.search).get(k);
const fmtNum = n => n.toLocaleString('zh-CN');
