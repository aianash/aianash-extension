(($) => {
  $(document).ready(() => {
    var data = collectTagInfo()
    sendAjax(TAGS_ADD_URL, 'POST', JSON.stringify(data), onSuccess, onFailure, 'application/json')

    function collectTagInfo() {
      return $('.' + OVERLAY.BOX_CLASS).map((index, elem) => {
        var el = $(elem)
        var data = {
          'tid'  : 338283,
          'pid'  : 3223,
          'sid'  : parseInt(el.attr('idx')),
          'tags' : el.find('.taggle_list .taggle span').map((index, tag) => { return tag.innerHTML; }).toArray()
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
