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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2pzL2N1c3RvbS9jb21wb25lbnRzL25hdmJhci1keW5hbWljLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFNO0VBQ3ZCLElBQUlDLE9BQU8sR0FBR0gsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO0VBQ2pDLElBQUlJLE1BQU0sR0FBR0osQ0FBQyxDQUFDLGlDQUFpQyxDQUFDO0VBQ2pELElBQUlLLFNBQVMsR0FBR0wsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0VBRXZDQSxDQUFDLENBQUNNLE1BQU0sQ0FBQyxDQUFDQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUM3QixJQUFJQyxHQUFHLEdBQUdULENBQUMsQ0FBQ1EsQ0FBQyxDQUFDRSxNQUFNLENBQUM7SUFFckIsSUFBSUQsR0FBRyxDQUFDRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEdBQUc7TUFDckI7TUFDQVIsT0FBTyxDQUFDUyxNQUFNLENBQUNQLFNBQVMsQ0FBQyxDQUFDO01BRTFCO01BQ0FGLE9BQU8sQ0FBQ1MsTUFBTSxDQUFDUixNQUFNLENBQUM7RUFDeEIsQ0FBQyxDQUFDO0VBRUZKLENBQUMsQ0FBQ00sTUFBTSxDQUFDLENBQUNPLE9BQU8sQ0FBQyxRQUFRLENBQUM7QUFDNUIsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvY3VzdG9tL2NvbXBvbmVudHMvbmF2YmFyLWR5bmFtaWMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG5cdGxldCB3cmFwcGVyID0gJCgnI3RvcGJhcldyYXBwZXInKTtcclxuXHRsZXQgdG9wYmFyID0gJCgnW2RhdGEtdGFyZ2V0PVwiI3RvcGJhckRyb3Bkb3duXCJdJyk7XHJcblx0bGV0IGdlblNlYXJjaCA9ICQoJyNnZW5lcmFsU2VhcmNoRm9ybScpO1xyXG5cclxuXHQkKHdpbmRvdykub24oJ3Jlc2l6ZScsIChlKSA9PiB7XHJcblx0XHRsZXQgd2luID0gJChlLnRhcmdldCk7XHJcblxyXG5cdFx0aWYgKHdpbi53aWR0aCgpID49IDc2OClcclxuXHRcdFx0Ly8gSWYgd2luZG93J3Mgd2lkdGggaXMgNzY4IG9yIG1vcmUsIHB1dCB0aGUgc2VhcmNoIGF0IHRoZSBlbmRcclxuXHRcdFx0d3JhcHBlci5hcHBlbmQoZ2VuU2VhcmNoKTtcclxuXHRcdGVsc2VcclxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBwdXQgdGhlIG5hdmlnYXRpb24gYmFyIGF0IHRoZSBlbmRcclxuXHRcdFx0d3JhcHBlci5hcHBlbmQodG9wYmFyKTtcclxuXHR9KTtcclxuXHJcblx0JCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xyXG59KTsiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJ3cmFwcGVyIiwidG9wYmFyIiwiZ2VuU2VhcmNoIiwid2luZG93Iiwib24iLCJlIiwid2luIiwidGFyZ2V0Iiwid2lkdGgiLCJhcHBlbmQiLCJ0cmlnZ2VyIl0sInNvdXJjZVJvb3QiOiIifQ==