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
    return $('<div>', {
              class : OVERLAY.BOX_CLASS + ' clearfix',
              id    : OVERLAY.ID_PREFIX + index,
              idx   : index
            }).appendTo(elem)
  }

  mapBySectionId(data) {
    var res = {}
    $.each(data, (i, o) => {
      res[o.section_id] = o
    })
    return res
  }

  init(data) {
    var data = this.mapBySectionId(data)

    $.each(this.elems, (index, elem) => {
      // return if overlay is already added for this element
      if($('#' + OVERLAY.ID_PREFIX + index).length) return
      // add box
      this.addBox(index, elem)
      // initialize taggle with initial tags if present
      var datai = data[index] || []
      new Taggle(OVERLAY.ID_PREFIX + index, {
        tags: datai.tags || [],
        placeholder: 'Enter tags here',
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