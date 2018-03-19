import Ember from 'ember';
import PageNumber from '../models/lib/page-number';

export default Ember.Component.extend({
  currentPage: 1,
  totalPages: 1,
  numPagesToShow: 10,
  newPage: null,

  pages: Ember.computed("currentPage", "totalPages", "numPagesToShow", function() {
    let minPage = Math.max(this.get("currentPage") - this.get("numPagesToShow") / 2, 1);
    let maxPage = Math.min(minPage + this.get("numPagesToShow") - 1, this.get("totalPages"));

    let pagesArray = [];
    if (minPage > 1) pagesArray.pushObject(PageNumber.create({dots: true, current: false, num: '...'}));
    for (var i = minPage; i <= maxPage; i++) {
        pagesArray.pushObject(PageNumber.create({current: (i == this.get('currentPage')), num: i}));
    }

    return pagesArray;
  }),

  canStepForward: Ember.computed("currentPage", "totalPages", function() {
    const page = Number(this.get("currentPage"));
    const totalPages = Number(this.get("totalPages"));
    return page < totalPages;
  }),

  canStepBackward: Ember.computed("currentPage", function() {
    const page = Number(this.get("currentPage"));
    return page > 1;
  }),

  actions: {
    pageClicked: function(num) {
      this.set('currentPage', num);
      this.get('onPageChange')();
    },
    incrementPage: function(num) {
      if (this.get("currentPage") === this.get("totalPages") && num === 1) { return false; }
      if (this.get("currentPage") <= 1 && num === -1) { return false; }
      this.incrementProperty('currentPage', num);
      this.get('onPageChange')();
    }
  }
});
