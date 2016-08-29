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

function sendAjax(url, type, data, s, f, contentType) {
  $.ajax({
    url: url,
    method: type,
    data: data,
    contentType: contentType || 'text/plain'
  })
  .done((resp, status, jqXHR) => {
    if(s && typeof(s) == 'function') s(resp, status, jqXHR)
  })
  .fail((resp, status, jqXHR) => {
    if(f && typeof(s) == 'function') f(resp, status, jqXHR)
  })
}

function notifySuccess(msg) {
  $.notify(msg, {
    position  : 'top center',
    className : 'success'
  })
}

function notifyError(msg) {
  $.notify(msg, {
    position  : 'top center',
    className : 'error'
  })
}