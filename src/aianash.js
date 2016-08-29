$(document).ready(() => {
  var elems = $('.' + AIANASH_CLASS)
  var tagger = new AIASectionTagger(elems)
  tagger.init()
})