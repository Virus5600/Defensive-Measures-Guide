/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL2N1c3RvbS9jb21wb25lbnRzL25hdmJhci1keW5hbWljLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFNO0VBQ3ZCLElBQUlDLE9BQU8sR0FBR0gsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0VBQ2pDLElBQUlJLE1BQU0sR0FBR0osQ0FBQyxDQUFDLGlDQUFpQyxDQUFDO0VBQ2pELElBQUlLLFNBQVMsR0FBR0wsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0VBRXZDQSxDQUFDLENBQUNNLE1BQU0sQ0FBQyxDQUFDQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUM3QixJQUFJQyxHQUFHLEdBQUdULENBQUMsQ0FBQ1EsQ0FBQyxDQUFDRSxNQUFNLENBQUM7SUFFckIsSUFBSUQsR0FBRyxDQUFDRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUc7TUFDckI7TUFDQVIsT0FBTyxDQUFDUyxNQUFNLENBQUNQLFNBQVMsQ0FBQyxDQUFDO01BRTFCO01BQ0FGLE9BQU8sQ0FBQ1MsTUFBTSxDQUFDUixNQUFNLENBQUM7RUFDeEIsQ0FBQyxDQUFDO0VBRUZKLENBQUMsQ0FBQ00sTUFBTSxDQUFDLENBQUNPLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDNUIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY3VzdG9tL2NvbXBvbmVudHMvbmF2YmFyLWR5bmFtaWMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuXHRsZXQgd3JhcHBlciA9ICQoJyN0b3BiYXJXcmFwcGVyJyk7XG5cdGxldCB0b3BiYXIgPSAkKCdbZGF0YS10YXJnZXQ9XCIjdG9wYmFyRHJvcGRvd25cIl0nKTtcblx0bGV0IGdlblNlYXJjaCA9ICQoJyNnZW5lcmFsU2VhcmNoRm9ybScpO1xuXG5cdCQod2luZG93KS5vbigncmVzaXplJywgKGUpID0+IHtcblx0XHRsZXQgd2luID0gJChlLnRhcmdldCk7XG5cblx0XHRpZiAod2luLndpZHRoKCkgPj0gNzY4KVxuXHRcdFx0Ly8gSWYgd2luZG93J3Mgd2lkdGggaXMgNzY4IG9yIG1vcmUsIHB1dCB0aGUgc2VhcmNoIGF0IHRoZSBlbmRcblx0XHRcdHdyYXBwZXIuYXBwZW5kKGdlblNlYXJjaCk7XG5cdFx0ZWxzZVxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBwdXQgdGhlIG5hdmlnYXRpb24gYmFyIGF0IHRoZSBlbmRcblx0XHRcdHdyYXBwZXIuYXBwZW5kKHRvcGJhcik7XG5cdH0pO1xuXG5cdCQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcbn0pOyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIndyYXBwZXIiLCJ0b3BiYXIiLCJnZW5TZWFyY2giLCJ3aW5kb3ciLCJvbiIsImUiLCJ3aW4iLCJ0YXJnZXQiLCJ3aWR0aCIsImFwcGVuZCIsInRyaWdnZXIiXSwic291cmNlUm9vdCI6IiJ9