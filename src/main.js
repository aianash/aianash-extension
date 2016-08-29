$(document).ready(() => {
  // inject script that highlights the sections with class aianash
  $('#aianash-show').click(() => {
    chrome.tabs.executeScript(null, {
      code  : 'var injected = window.aianashinjected; window.aianashinjected = true; injected;',
      runAt : 'document_start'
    }, (res) => {
      if(chrome.runtime.lastError || res[0])
        return

      const jsFiles = [
        'jquery.js',
        'taggle.js',
        'notify.js',
        'aianash.js'
      ]

      const cssFiles = [
        'aianash.css',
        'fontello.css'
      ]

      eachTask([
        (cb) => eachItem(jsFiles, inject(null, 'executeScript'), cb),
        (cb) => eachItem(cssFiles, inject(null, 'insertCSS'), cb)
      ])
    })
  })

  // inject script that transports the tag information to backend
  $('#aianash-send').click(() => {
    const jsFiles = [
      'transport.js'
    ]

    eachTask([
      (cb) => eachItem(jsFiles, inject(null, 'executeScript'), cb)
    ])
  })
})