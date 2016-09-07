$(document).ready(() => {
  // fetch the elements with aianash class
  var elems = $('.' + AIANASH_CLASS)
  if(!elems.length) return

  // create tagger object for returned elements
  chrome.storage.local.get(['token_id', 'page_url'], (storage) => {
    var tagger = new AIASectionTagger(elems)
    initializeTags(storage.token_id, storage.page_url, (data) => {
      tagger.init(data)
    })
  })

  function initializeTags(token_id, page_url, initializeTagger) {
    var onSuccess = (resp, status, jqXHR) => {
      if(jqXHR.status != 200) {
        window.aianashinjected = false  // so that plugin can be initialized again
        notifyError('Could not initialize plugin on this page due to some error !')
      } else {
        initializeTagger(resp)
      }
    }
    var onFailure = () => {
      window.aianashinjected = false  // so that plugin can be initialized again
      notifyError('Could not initialize plugin on this page due to some error !')
    }
    sendAjax(TAGS_GET_URL, 'GET', 'tokenId=' + token_id + '&url=' + encodeURIComponent(page_url), onSuccess, onFailure)
  }
})