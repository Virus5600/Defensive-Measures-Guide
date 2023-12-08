/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/js/views/admin/versions/index.js ***!
  \****************************************************/
$(function () {
  // Onload handler
  window.history.replaceState({
    "content": $("#inner-content").html()
  }, "", window.location.href);

  // Reset handler
  $("#filters").on("reset", function (e) {
    var obj = $(e.currentTarget);

    // Checkbox handler
    obj.find("[type=checkbox]").removeAttr("checked").removeProp("checked");

    // Text handler
    obj.find("[type=text], textarea").removeAttr("value").removeProp("value").val("");

    // Sort By Handler
    obj.find("[name=sort_by]").val("version");

    // Sort Order Handler
    obj.find("[name=sort_order]").val("desc");

    // History handler
    window.history.pushState({
      "content": $("#inner-content").html()
    }, "", window.location.href.split("?")[0]);
  });

  // Popstate handler
  $(window).on("popstate", function (e) {
    $("#inner-content").html($(e.originalEvent.state.content));
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLENBQUMsQ0FBQyxZQUFNO0VBQ1A7RUFDQUMsTUFBTSxDQUFDQyxPQUFPLENBQUNDLFlBQVksQ0FDMUI7SUFBQyxTQUFTLEVBQUVILENBQUMsaUJBQWlCLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO0VBQUMsQ0FBQyxFQUN2QyxFQUFFLEVBQ0ZILE1BQU0sQ0FBQ0ksUUFBUSxDQUFDQyxJQUNqQixDQUFDOztFQUVEO0VBQ0FOLENBQUMsV0FBVyxDQUFDLENBQUNPLEVBQUUsVUFBVSxVQUFDQyxDQUFDLEVBQUs7SUFDaEMsSUFBSUMsR0FBRyxHQUFHVCxDQUFDLENBQUNRLENBQUMsQ0FBQ0UsYUFBYSxDQUFDOztJQUU1QjtJQUNBRCxHQUFHLENBQUNFLElBQUksa0JBQWtCLENBQUMsQ0FDekJDLFVBQVUsVUFBVSxDQUFDLENBQ3JCQyxVQUFVLFVBQVUsQ0FBQzs7SUFFdkI7SUFDQUosR0FBRyxDQUFDRSxJQUFJLHdCQUF3QixDQUFDLENBQy9CQyxVQUFVLFFBQVEsQ0FBQyxDQUNuQkMsVUFBVSxRQUFRLENBQUMsQ0FDbkJDLEdBQUcsR0FBRyxDQUFDOztJQUVUO0lBQ0FMLEdBQUcsQ0FBQ0UsSUFBSSxpQkFBaUIsQ0FBQyxDQUN4QkcsR0FBRyxVQUFVLENBQUM7O0lBRWhCO0lBQ0FMLEdBQUcsQ0FBQ0UsSUFBSSxvQkFBb0IsQ0FBQyxDQUMzQkcsR0FBRyxPQUFPLENBQUM7O0lBRWI7SUFDQWIsTUFBTSxDQUFDQyxPQUFPLENBQUNhLFNBQVMsQ0FDdkI7TUFBQyxTQUFTLEVBQUVmLENBQUMsaUJBQWlCLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO0lBQUMsQ0FBQyxFQUN2QyxFQUFFLEVBQ0ZILE1BQU0sQ0FBQ0ksUUFBUSxDQUFDQyxJQUFJLENBQUNVLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ2xDLENBQUM7RUFDRixDQUFDLENBQUM7O0VBRUY7RUFDQWhCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUNNLEVBQUUsYUFBYSxVQUFDQyxDQUFDLEVBQUs7SUFDL0JSLENBQUMsaUJBQWlCLENBQUMsQ0FBQ0ksSUFBSSxDQUFDSixDQUFDLENBQUNRLENBQUMsQ0FBQ1MsYUFBYSxDQUFDQyxLQUFLLENBQUNDLE9BQU8sQ0FBQyxDQUFDO0VBQzNELENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoKCkgPT4ge1xuXHQvLyBPbmxvYWQgaGFuZGxlclxuXHR3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUoXG5cdFx0e1wiY29udGVudFwiOiAkKGAjaW5uZXItY29udGVudGApLmh0bWwoKX0sXG5cdFx0XCJcIixcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZlxuXHQpO1xuXG5cdC8vIFJlc2V0IGhhbmRsZXJcblx0JChgI2ZpbHRlcnNgKS5vbihgcmVzZXRgLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cblx0XHQvLyBDaGVja2JveCBoYW5kbGVyXG5cdFx0b2JqLmZpbmQoYFt0eXBlPWNoZWNrYm94XWApXG5cdFx0XHQucmVtb3ZlQXR0cihgY2hlY2tlZGApXG5cdFx0XHQucmVtb3ZlUHJvcChgY2hlY2tlZGApO1xuXG5cdFx0Ly8gVGV4dCBoYW5kbGVyXG5cdFx0b2JqLmZpbmQoYFt0eXBlPXRleHRdLCB0ZXh0YXJlYWApXG5cdFx0XHQucmVtb3ZlQXR0cihgdmFsdWVgKVxuXHRcdFx0LnJlbW92ZVByb3AoYHZhbHVlYClcblx0XHRcdC52YWwoYGApO1xuXG5cdFx0Ly8gU29ydCBCeSBIYW5kbGVyXG5cdFx0b2JqLmZpbmQoYFtuYW1lPXNvcnRfYnldYClcblx0XHRcdC52YWwoYHZlcnNpb25gKTtcblxuXHRcdC8vIFNvcnQgT3JkZXIgSGFuZGxlclxuXHRcdG9iai5maW5kKGBbbmFtZT1zb3J0X29yZGVyXWApXG5cdFx0XHQudmFsKGBkZXNjYCk7XG5cblx0XHQvLyBIaXN0b3J5IGhhbmRsZXJcblx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXG5cdFx0XHR7XCJjb250ZW50XCI6ICQoYCNpbm5lci1jb250ZW50YCkuaHRtbCgpfSxcblx0XHRcdFwiXCIsXG5cdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF1cblx0XHQpO1xuXHR9KTtcblxuXHQvLyBQb3BzdGF0ZSBoYW5kbGVyXG5cdCQod2luZG93KS5vbihgcG9wc3RhdGVgLCAoZSkgPT4ge1xuXHRcdCQoYCNpbm5lci1jb250ZW50YCkuaHRtbCgkKGUub3JpZ2luYWxFdmVudC5zdGF0ZS5jb250ZW50KSk7XG5cdH0pO1xufSk7XG4iXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJodG1sIiwibG9jYXRpb24iLCJocmVmIiwib24iLCJlIiwib2JqIiwiY3VycmVudFRhcmdldCIsImZpbmQiLCJyZW1vdmVBdHRyIiwicmVtb3ZlUHJvcCIsInZhbCIsInB1c2hTdGF0ZSIsInNwbGl0Iiwib3JpZ2luYWxFdmVudCIsInN0YXRlIiwiY29udGVudCJdLCJzb3VyY2VSb290IjoiIn0=