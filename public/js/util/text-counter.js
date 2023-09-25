/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./resources/js/util/text-counter.js ***!
  \*******************************************/
$(document).ready(function () {
  $(document).on('change keyup keydown', '.text-counter-input', function (e) {
    var _obj$attr;
    var obj = $(e.currentTarget);
    var parent = obj.parent();
    var counter = parent.find('.text-counter');
    var max = obj.attr('data-max');
    var warnAt = (_obj$attr = obj.attr('data-warn-at')) !== null && _obj$attr !== void 0 ? _obj$attr : 0;
    if (typeof warnAt !== 'number' && isNaN(warnAt)) warnAt = 0;
    counter.text(max - obj.val().length);
    warnAt = parseInt(warnAt);
    textLen = parseInt(counter.text());
    if (textLen <= warnAt && textLen >= 0) {
      counter.addClass('bg-warning');
      counter.removeClass('bg-danger');
      obj.addClass('mark-warning');
      obj.removeClass('mark-danger');
    } else if (textLen < 0) {
      counter.removeClass('bg-warning');
      counter.addClass('bg-danger');
      obj.removeClass('mark-warning');
      obj.addClass('mark-danger');
    } else {
      counter.removeClass('bg-danger');
      counter.removeClass('bg-warning');
      obj.removeClass('mark-danger');
      obj.removeClass('mark-warning');
    }
  });
  $('.text-counter-input').trigger('change');
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL3V0aWwvdGV4dC1jb3VudGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFNO0VBQ3ZCRixDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDRSxFQUFFLENBQUMsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO0lBQUEsSUFBQUMsU0FBQTtJQUNwRSxJQUFJQyxHQUFHLEdBQUdOLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDRyxhQUFhLENBQUM7SUFDNUIsSUFBSUMsTUFBTSxHQUFHRixHQUFHLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLElBQUlDLE9BQU8sR0FBR0QsTUFBTSxDQUFDRSxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzFDLElBQUlDLEdBQUcsR0FBR0wsR0FBRyxDQUFDTSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzlCLElBQUlDLE1BQU0sSUFBQVIsU0FBQSxHQUFHQyxHQUFHLENBQUNNLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBQVAsU0FBQSxjQUFBQSxTQUFBLEdBQUksQ0FBQztJQUUxQyxJQUFJLE9BQU9RLE1BQU0sS0FBSyxRQUFRLElBQUlDLEtBQUssQ0FBQ0QsTUFBTSxDQUFDLEVBQzlDQSxNQUFNLEdBQUcsQ0FBQztJQUVYSixPQUFPLENBQUNNLElBQUksQ0FBQ0osR0FBRyxHQUFHTCxHQUFHLENBQUNVLEdBQUcsQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQztJQUVwQ0osTUFBTSxHQUFHSyxRQUFRLENBQUNMLE1BQU0sQ0FBQztJQUN6Qk0sT0FBTyxHQUFHRCxRQUFRLENBQUNULE9BQU8sQ0FBQ00sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVsQyxJQUFJSSxPQUFPLElBQUlOLE1BQU0sSUFBSU0sT0FBTyxJQUFJLENBQUMsRUFBRTtNQUN0Q1YsT0FBTyxDQUFDVyxRQUFRLENBQUMsWUFBWSxDQUFDO01BQzlCWCxPQUFPLENBQUNZLFdBQVcsQ0FBQyxXQUFXLENBQUM7TUFDaENmLEdBQUcsQ0FBQ2MsUUFBUSxDQUFDLGNBQWMsQ0FBQztNQUM1QmQsR0FBRyxDQUFDZSxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQy9CLENBQUMsTUFDSSxJQUFJRixPQUFPLEdBQUcsQ0FBQyxFQUFFO01BQ3JCVixPQUFPLENBQUNZLFdBQVcsQ0FBQyxZQUFZLENBQUM7TUFDakNaLE9BQU8sQ0FBQ1csUUFBUSxDQUFDLFdBQVcsQ0FBQztNQUM3QmQsR0FBRyxDQUFDZSxXQUFXLENBQUMsY0FBYyxDQUFDO01BQy9CZixHQUFHLENBQUNjLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQyxNQUNJO01BQ0pYLE9BQU8sQ0FBQ1ksV0FBVyxDQUFDLFdBQVcsQ0FBQztNQUNoQ1osT0FBTyxDQUFDWSxXQUFXLENBQUMsWUFBWSxDQUFDO01BQ2pDZixHQUFHLENBQUNlLFdBQVcsQ0FBQyxhQUFhLENBQUM7TUFDOUJmLEdBQUcsQ0FBQ2UsV0FBVyxDQUFDLGNBQWMsQ0FBQztJQUNoQztFQUNELENBQUMsQ0FBQztFQUVGckIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUNzQixPQUFPLENBQUMsUUFBUSxDQUFDO0FBQzNDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3V0aWwvdGV4dC1jb3VudGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcclxuXHQkKGRvY3VtZW50KS5vbignY2hhbmdlIGtleXVwIGtleWRvd24nLCAnLnRleHQtY291bnRlci1pbnB1dCcsIChlKSA9PiB7XHJcblx0XHRsZXQgb2JqID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG5cdFx0bGV0IHBhcmVudCA9IG9iai5wYXJlbnQoKTtcclxuXHRcdGxldCBjb3VudGVyID0gcGFyZW50LmZpbmQoJy50ZXh0LWNvdW50ZXInKTtcclxuXHRcdGxldCBtYXggPSBvYmouYXR0cignZGF0YS1tYXgnKTtcclxuXHRcdGxldCB3YXJuQXQgPSBvYmouYXR0cignZGF0YS13YXJuLWF0JykgPz8gMDtcclxuXHJcblx0XHRpZiAodHlwZW9mIHdhcm5BdCAhPT0gJ251bWJlcicgJiYgaXNOYU4od2FybkF0KSlcclxuXHRcdFx0d2FybkF0ID0gMDtcclxuXHJcblx0XHRjb3VudGVyLnRleHQobWF4IC0gb2JqLnZhbCgpLmxlbmd0aCk7XHJcblxyXG5cdFx0d2FybkF0ID0gcGFyc2VJbnQod2FybkF0KTtcclxuXHRcdHRleHRMZW4gPSBwYXJzZUludChjb3VudGVyLnRleHQoKSk7XHJcblxyXG5cdFx0aWYgKHRleHRMZW4gPD0gd2FybkF0ICYmIHRleHRMZW4gPj0gMCkge1xyXG5cdFx0XHRjb3VudGVyLmFkZENsYXNzKCdiZy13YXJuaW5nJyk7XHJcblx0XHRcdGNvdW50ZXIucmVtb3ZlQ2xhc3MoJ2JnLWRhbmdlcicpO1xyXG5cdFx0XHRvYmouYWRkQ2xhc3MoJ21hcmstd2FybmluZycpO1xyXG5cdFx0XHRvYmoucmVtb3ZlQ2xhc3MoJ21hcmstZGFuZ2VyJyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0ZXh0TGVuIDwgMCkge1xyXG5cdFx0XHRjb3VudGVyLnJlbW92ZUNsYXNzKCdiZy13YXJuaW5nJyk7XHJcblx0XHRcdGNvdW50ZXIuYWRkQ2xhc3MoJ2JnLWRhbmdlcicpO1xyXG5cdFx0XHRvYmoucmVtb3ZlQ2xhc3MoJ21hcmstd2FybmluZycpO1xyXG5cdFx0XHRvYmouYWRkQ2xhc3MoJ21hcmstZGFuZ2VyJyk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Y291bnRlci5yZW1vdmVDbGFzcygnYmctZGFuZ2VyJyk7XHJcblx0XHRcdGNvdW50ZXIucmVtb3ZlQ2xhc3MoJ2JnLXdhcm5pbmcnKTtcclxuXHRcdFx0b2JqLnJlbW92ZUNsYXNzKCdtYXJrLWRhbmdlcicpO1xyXG5cdFx0XHRvYmoucmVtb3ZlQ2xhc3MoJ21hcmstd2FybmluZycpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHQkKCcudGV4dC1jb3VudGVyLWlucHV0JykudHJpZ2dlcignY2hhbmdlJyk7XHJcbn0pOyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm9uIiwiZSIsIl9vYmokYXR0ciIsIm9iaiIsImN1cnJlbnRUYXJnZXQiLCJwYXJlbnQiLCJjb3VudGVyIiwiZmluZCIsIm1heCIsImF0dHIiLCJ3YXJuQXQiLCJpc05hTiIsInRleHQiLCJ2YWwiLCJsZW5ndGgiLCJwYXJzZUludCIsInRleHRMZW4iLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwidHJpZ2dlciJdLCJzb3VyY2VSb290IjoiIn0=