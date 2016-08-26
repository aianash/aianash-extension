class AIASectionTagger {

  constructor(elems) {
    this.elems = elems
  }

  addElements(elems) {
    this.elems = this.elems.concat(elems)
  }

  addElement(elem) {
    addElements([elem])
  }

  addOverlay() {
    $('<div>', {
      id: OVERLAY.ID
    }).appendTo('body')
  }

  blur() {
    $('.aianash > *').each((index, elem) => {
      var el = $(elem)
      if(!el.hasClass(OVERLAY.BOX_CLASS) && !el.hasClass('fa-times-circle')) {
        el.css('-webkit-filter', 'blur(4px)');
      }
    })
  }

  addBox(index, elem) {
    var el = $(elem)
    // $('<i>',{class: 'fa fa-times-circle', id: 'test-' + index}).appendTo(elem)
    return $('<div>', {
              class: OVERLAY.BOX_CLASS + ' clearfix',
              id: OVERLAY.ID_PREFIX + index
            }).appendTo(elem)
  }

  init() {
    $.each(this.elems, (index, elem) => {
      if($('#' + OVERLAY.ID_PREFIX + index).length) return
      this.addBox(index, elem)
      new Taggle(OVERLAY.ID_PREFIX + index, {
        tagFormatter: (elem) => {
          var el = $(elem)
          el.find('button').html('').addClass('fa fa-times-circle')
          return elem
        }
      })
    })
    this.blur()
  }

}