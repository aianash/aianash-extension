function inject(tabId, fn) {
  return (file, cb) => {
    chrome.tabs[fn](tabId, { file: file, runAt: 'document_start' }, cb)
  }
}

function eachTask(tasks, done) {
  (function next(index = 0) {
    if (index === tasks.length) done && done()
    else tasks[index](() => next(++index))
  })()
}

function eachItem(arr, iter, done) {
  const tasks = arr.map((item) => {
    return (cb) => iter(item, cb)
  })
  return eachTask(tasks, done)
}