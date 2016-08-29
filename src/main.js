$(document).ready(() => {
  // inject script that highlights the sections with class aianash
  $('#aianash-show').click(() => {
    chrome.tabs.executeScript(null, {
      code  : 'var viewinjected = window.aianashViewInjected; window.aianashViewInjected = true; viewinjected;',
      runAt : 'document_start'
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
        'font-awesome.css'
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