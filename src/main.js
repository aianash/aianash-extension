$(document).ready(() => {

  // inject script that highlights the sections with class aianash
  $('#aianash-show').click(() => {
    chrome.tabs.executeScript(null, {
      code: 'var injected = window.aianashInjected; window.aianashInjected = true; injected;',
      runAt: 'document_start'
    }, (res) => {
      if(chrome.runtime.lastError || res[0])
        return

      const jsFiles = [
        'jquery.js',
        'taggle.js',
        'aianash.js'
      ]

      const cssFiles = [
        'taggle.css',
        'overlay.css',
        'font-awesome.css'
      ]

      eachTask([
        (cb) => eachItem(jsFiles, inject(null, 'executeScript'), cb),
        (cb) => eachItem(cssFiles, inject(null, 'insertCSS'), cb)
      ])
    })
  })

})