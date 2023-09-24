/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************************************!*\
  !*** ./resources/js/custom/components/login-page.js ***!
  \******************************************************/
$(document).ready(function () {
  $('#masthead').on('click', function (e) {
    var obj = $(e.currentTarget);
    var counter = obj.attr('data-count');
    if (typeof counter == 'undefined') {
      obj.attr('data-count', 0);
      counter = obj.attr('data-count');
    }
    if (counter < 5) {
      obj.attr('data-count', parseInt(counter) + 1);
      setTimeout(function () {
        if (obj.attr('data-count') > 0) obj.attr('data-count', parseInt(obj.attr('data-count')) - 1);
        if (obj.attr('data-count') == 0) obj.removeAttr('data-count');
      }, 5000);
    } else {
      if (obj.attr('data-url') === undefined) window.location = "/login";else window.location = obj.attr('data-url');
    }
  });
});
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!**********************************************************!*\
  !*** ./resources/js/custom/components/navbar-dynamic.js ***!
  \**********************************************************/
$(document).ready(function () {
  var wrapper = $('#topbarWrapper');
  var topbar = $('[data-target="#topbarDropdown"]');
  var genSearch = $('#generalSearchForm');
  $(window).on('resize', function (e) {
    var win = $(e.target);
    if (win.width() >= 768)
      // If window's width is 768 or more, put the search at the end
      wrapper.append(genSearch);else
      // Otherwise, put the navigation bar at the end
      wrapper.append(topbar);
  });
  $(window).trigger('resize');
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL2N1c3RvbS9jb21wb25lbnRzL2xvZ2luLXBhZ2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBTTtFQUN2QkYsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUNqQyxJQUFJQyxHQUFHLEdBQUdMLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDRSxhQUFhLENBQUM7SUFDNUIsSUFBSUMsT0FBTyxHQUFHRixHQUFHLENBQUNHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFFcEMsSUFBSSxPQUFPRCxPQUFPLElBQUksV0FBVyxFQUFFO01BQ2xDRixHQUFHLENBQUNHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO01BRXpCRCxPQUFPLEdBQUdGLEdBQUcsQ0FBQ0csSUFBSSxDQUFDLFlBQVksQ0FBQztJQUNqQztJQUVBLElBQUlELE9BQU8sR0FBRyxDQUFDLEVBQUU7TUFDaEJGLEdBQUcsQ0FBQ0csSUFBSSxDQUFDLFlBQVksRUFBRUMsUUFBUSxDQUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7TUFFN0NHLFVBQVUsQ0FBQyxZQUFNO1FBQ2hCLElBQUlMLEdBQUcsQ0FBQ0csSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDN0JILEdBQUcsQ0FBQ0csSUFBSSxDQUFDLFlBQVksRUFBRUMsUUFBUSxDQUFDSixHQUFHLENBQUNHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3RCxJQUFJSCxHQUFHLENBQUNHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQzlCSCxHQUFHLENBQUNNLFVBQVUsQ0FBQyxZQUFZLENBQUM7TUFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQztJQUNULENBQUMsTUFDSTtNQUNKLElBQUlOLEdBQUcsQ0FBQ0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLSSxTQUFTLEVBQ3JDQyxNQUFNLENBQUNDLFFBQVEsV0FBVyxDQUFDLEtBRTNCRCxNQUFNLENBQUNDLFFBQVEsR0FBR1QsR0FBRyxDQUFDRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hDO0VBQ0QsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEM7Ozs7Ozs7O0FDN0JGUixDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBTTtFQUN2QixJQUFJYSxPQUFPLEdBQUdmLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUNqQyxJQUFJZ0IsTUFBTSxHQUFHaEIsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDO0VBQ2pELElBQUlpQixTQUFTLEdBQUdqQixDQUFDLENBQUMsb0JBQW9CLENBQUM7RUFFdkNBLENBQUMsQ0FBQ2EsTUFBTSxDQUFDLENBQUNWLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO0lBQzdCLElBQUljLEdBQUcsR0FBR2xCLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDZSxNQUFNLENBQUM7SUFFckIsSUFBSUQsR0FBRyxDQUFDRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUc7TUFDckI7TUFDQUwsT0FBTyxDQUFDTSxNQUFNLENBQUNKLFNBQVMsQ0FBQyxDQUFDO01BRTFCO01BQ0FGLE9BQU8sQ0FBQ00sTUFBTSxDQUFDTCxNQUFNLENBQUM7RUFDeEIsQ0FBQyxDQUFDO0VBRUZoQixDQUFDLENBQUNhLE1BQU0sQ0FBQyxDQUFDUyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2N1c3RvbS9jb21wb25lbnRzL2xvZ2luLXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL2N1c3RvbS9jb21wb25lbnRzL25hdmJhci1keW5hbWljLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0JCgnI21hc3RoZWFkJykub24oJ2NsaWNrJywgKGUpID0+IHtcblx0XHRsZXQgb2JqID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdGxldCBjb3VudGVyID0gb2JqLmF0dHIoJ2RhdGEtY291bnQnKTtcblxuXHRcdGlmICh0eXBlb2YgY291bnRlciA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0b2JqLmF0dHIoJ2RhdGEtY291bnQnLCAwKTtcblx0XG5cdFx0XHRjb3VudGVyID0gb2JqLmF0dHIoJ2RhdGEtY291bnQnKTtcblx0XHR9XG5cblx0XHRpZiAoY291bnRlciA8IDUpIHtcblx0XHRcdG9iai5hdHRyKCdkYXRhLWNvdW50JywgcGFyc2VJbnQoY291bnRlcikgKyAxKTtcblxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdGlmIChvYmouYXR0cignZGF0YS1jb3VudCcpID4gMClcblx0XHRcdFx0XHRvYmouYXR0cignZGF0YS1jb3VudCcsIHBhcnNlSW50KG9iai5hdHRyKCdkYXRhLWNvdW50JykpIC0gMSk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZiAob2JqLmF0dHIoJ2RhdGEtY291bnQnKSA9PSAwKVxuXHRcdFx0XHRcdG9iai5yZW1vdmVBdHRyKCdkYXRhLWNvdW50Jyk7XG5cdFx0XHR9LCA1MDAwKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAob2JqLmF0dHIoJ2RhdGEtdXJsJykgPT09IHVuZGVmaW5lZClcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uID0gYC9sb2dpbmA7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IG9iai5hdHRyKCdkYXRhLXVybCcpO1xuXHRcdH1cblx0fSk7XG59KTsiLCIkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcblx0bGV0IHdyYXBwZXIgPSAkKCcjdG9wYmFyV3JhcHBlcicpO1xyXG5cdGxldCB0b3BiYXIgPSAkKCdbZGF0YS10YXJnZXQ9XCIjdG9wYmFyRHJvcGRvd25cIl0nKTtcclxuXHRsZXQgZ2VuU2VhcmNoID0gJCgnI2dlbmVyYWxTZWFyY2hGb3JtJyk7XHJcblxyXG5cdCQod2luZG93KS5vbigncmVzaXplJywgKGUpID0+IHtcclxuXHRcdGxldCB3aW4gPSAkKGUudGFyZ2V0KTtcclxuXHJcblx0XHRpZiAod2luLndpZHRoKCkgPj0gNzY4KVxyXG5cdFx0XHQvLyBJZiB3aW5kb3cncyB3aWR0aCBpcyA3Njggb3IgbW9yZSwgcHV0IHRoZSBzZWFyY2ggYXQgdGhlIGVuZFxyXG5cdFx0XHR3cmFwcGVyLmFwcGVuZChnZW5TZWFyY2gpO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHQvLyBPdGhlcndpc2UsIHB1dCB0aGUgbmF2aWdhdGlvbiBiYXIgYXQgdGhlIGVuZFxyXG5cdFx0XHR3cmFwcGVyLmFwcGVuZCh0b3BiYXIpO1xyXG5cdH0pO1xyXG5cclxuXHQkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XHJcbn0pOyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm9uIiwiZSIsIm9iaiIsImN1cnJlbnRUYXJnZXQiLCJjb3VudGVyIiwiYXR0ciIsInBhcnNlSW50Iiwic2V0VGltZW91dCIsInJlbW92ZUF0dHIiLCJ1bmRlZmluZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIndyYXBwZXIiLCJ0b3BiYXIiLCJnZW5TZWFyY2giLCJ3aW4iLCJ0YXJnZXQiLCJ3aWR0aCIsImFwcGVuZCIsInRyaWdnZXIiXSwic291cmNlUm9vdCI6IiJ9