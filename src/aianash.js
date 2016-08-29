$(document).ready(() => {
  // fetch the elements with aianash class
  var elems = $('.' + AIANASH_CLASS)
  if(!elems.length) return

  // create tagger object for returned elements
  var tagger = new AIASectionTagger(elems)
  initializeTags((data) => {
    tagger.init(data)
  })

  function initializeTags(initializeTagger) {
    var tokenid = 338283
    var pageid = 3223
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
    sendAjax(TAGS_GET_URL, 'GET', 'tokenId=' + tokenid + '&pageId=' + pageid, onSuccess, onFailure)
  }
})