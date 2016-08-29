(($) => {
  $(document).ready(() => {

    var data = collectTagInfo()
    console.log(data)
    sendAjax(API_URL, 'POST', JSON.stringify(data))

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

    function sendAjax(url, type, data, s, f) {
      console.log(data)
      $.ajax({
        url: url,
        method: type,
        data: data,
        contentType: 'application/json',
        dataType: 'json'
      })
      .done((resp) => {
        console.log(resp)
      })
      .fail((resp) => {
        console.log(resp)
      })
      .always((resp) => {
        console.log('complete')
      })
    }

  })
})(jQuery)