// 封装操作 localstorage 的方法
// 增&改
function setLocal(key: string, value: any): void {
  // 将 value 转为一个字符串存在到 localstroage
  window.localStorage.setItem(key, JSON.stringify(value));
}
// 删除
function remLocal(key: string): void {
  window.localStorage.removeItem(key);
}
// 查询
function getLocal(key: string) {
  // 将得到字符串转为了一个对象
  return JSON.parse(window.localStorage.getItem(key) || '""');
}

// 暴露方法
export {
  setLocal,
  remLocal,
  getLocal,
};
