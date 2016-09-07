(($) => {
  $(document).ready(() => {
    // 1. get token_id and page_url from storage
    // 2. collect data
    // 3. send ajax request to store the data
    chrome.storage.local.get(['token_id', 'page_url'], (storage) => {
      var tags = collectTagInfo()
      var data = {
        token_id : storage.token_id,
        url      : storage.page_url,
        tags     : tags
      }
      sendAjax(TAGS_ADD_URL, 'POST', JSON.stringify(data), onSuccess, onFailure, 'application/json')
    })

    function collectTagInfo() {
      return $('.' + OVERLAY.BOX_CLASS).map((index, elem) => {
        var el = $(elem)
        var data = {
          'section_id' : parseInt(el.attr('idx')),
          'tags'       : el.find('.taggle_list .taggle span').map((index, tag) => { return tag.innerHTML; }).toArray()
        }
        return data
      }).toArray()
    }

    function onSuccess(resp, status, jqXHR) {
      if(jqXHR.status == 200) {
        notifySuccess(resp)
      } else {
        notifyError('Could not add tags due to some error !')
      }
    }

    function onFailure() {
      notifyError('Could not add tags due to some error !')
    }
  })
})(jQuery)
