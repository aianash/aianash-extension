$(document).ready(() => {
  chrome.tabs.getSelected(null, (tab) => {
    chrome.storage.local.set({
      'page_url' : tab.url
    })
    init(tab.url)
  })

  function init(url) {
    var onSuccess = (resp, status, jqXHR) => {
      if(jqXHR.status == 200) {
        $('#aianash-validating').hide()
        $('#aianash-validated').show()
        chrome.storage.local.set({
          'token_id' : resp.token_id,
          'domain': resp.domain
        })
        attachEvents()
      } else {
        $('#aianash-validating img').hide()
        $('#aianash-validating #error').show()
      }
    }
    var onFailure = (resp, status, jqXHR) => {
      $('#aianash-validating img').hide()
      $('#aianash-validating #error').show()
    }
    sendAjax(TOKEN_ID_GET_URL, 'GET', 'url=' + encodeURIComponent(url), onSuccess, onFailure)
  }

  function attachEvents() {
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
  }
})