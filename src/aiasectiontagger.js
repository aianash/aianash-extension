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

  addOverlay(index, elem) {
    var el = $(elem)
    return $('<div>', {
              class: OVERLAY.CLASS + ' clearfix',
              id: OVERLAY.ID_PREFIX + index
            }).appendTo(elem)
  }

  init() {
    $.each(this.elems, (index, elem) => {
      if($('#' + OVERLAY.ID_PREFIX + index).length) return
      this.addOverlay(index, elem)
      new Taggle(OVERLAY.ID_PREFIX + index)
    })
  }

}