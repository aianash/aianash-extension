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

  sortData(data) {
    data.sort((a, b) => {
      if(a.sid < b.sid) return -1
      else if(a.sid > b.sid) return 1
      else return 0
    })
  }

  init(data) {
    this.sortData(data)

    $.each(this.elems, (index, elem) => {
      // return if overlay is already added for this element
      if($('#' + OVERLAY.ID_PREFIX + index).length) return
      // add box
      this.addBox(index, elem)
      // initialize taggle with initial tags if present
      var datai = data[index] || []
      new Taggle(OVERLAY.ID_PREFIX + index, {
        tags: datai.tags || [],
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