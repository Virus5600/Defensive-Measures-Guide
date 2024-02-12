/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./resources/js/views/downloads/index.js ***!
  \***********************************************/
$(function () {
  // Onload handler
  window.history.replaceState({
    "content": $("#inner-content").html()
  }, "", window.location.href);
  var form = $("#filters");
  new RTLoader("filters", {
    url: form.prop("action"),
    action: form.prop("method"),
    data: form.serialize(),
    pushHistoryState: true,
    success: function success(data) {
      data = new DOMParser().parseFromString(data, "text/html");
      filters = data.querySelector("#filters");
      form = data.querySelector("#table-content");
      $("#filters").html(filters.innerHTML);
      $("#table-content").html(form.innerHTML);
    }
  });

  // Filters submit handler
  $(document).on("submit", "#filters", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var form = $(e.currentTarget);
  });

  // Reset handler
  $(document).on("reset", "#filters", function (e) {
    var _obj$prop;
    var obj = $(e.currentTarget);
    $.ajax({
      "url": (_obj$prop = obj.prop("action")) !== null && _obj$prop !== void 0 ? _obj$prop : window.location.href.split("?")[0],
      "type": obj.prop("method"),
      "success": function success(data) {
        data = new DOMParser().parseFromString(data, "text/html");
        filters = data.querySelector("#filters");
        form = data.querySelector("#table-content");
        $("#filters").html(filters.innerHTML);
        $("#table-content").html(form.innerHTML);

        // History handler
        window.history.pushState({
          "content": $("#inner-content").html()
        }, "", window.location.href.split("?")[0]);
      }
    });
  });

  // Popstate handler
  $(window).on("popstate", function (e) {
    var data = e.originalEvent.state.content;
    $("#filters").html(filters.innerHTML);
    $("#table-content").html(form.innerHTML);
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3ZpZXdzL2Rvd25sb2Fkcy9pbmRleC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBQSxDQUFDLENBQUMsWUFBTTtFQUNQO0VBQ0FDLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxZQUFZLENBQzFCO0lBQUMsU0FBUyxFQUFFSCxDQUFDLGlCQUFpQixDQUFDLENBQUNJLElBQUksQ0FBQztFQUFDLENBQUMsRUFDdkMsRUFBRSxFQUNGSCxNQUFNLENBQUNJLFFBQVEsQ0FBQ0MsSUFDakIsQ0FBQztFQUVELElBQUlDLElBQUksR0FBR1AsQ0FBQyxXQUFXLENBQUM7RUFDeEIsSUFBSVEsUUFBUSxDQUFDLFNBQVMsRUFBRTtJQUN2QkMsR0FBRyxFQUFFRixJQUFJLENBQUNHLElBQUksU0FBUyxDQUFDO0lBQ3hCQyxNQUFNLEVBQUVKLElBQUksQ0FBQ0csSUFBSSxTQUFTLENBQUM7SUFDM0JFLElBQUksRUFBRUwsSUFBSSxDQUFDTSxTQUFTLENBQUMsQ0FBQztJQUN0QkMsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QkMsT0FBTyxFQUFFLFNBQUFBLFFBQUNILElBQUksRUFBSztNQUNsQkEsSUFBSSxHQUFHLElBQUlJLFNBQVMsQ0FBQyxDQUFDLENBQUNDLGVBQWUsQ0FBQ0wsSUFBSSxhQUFhLENBQUM7TUFDekRNLE9BQU8sR0FBR04sSUFBSSxDQUFDTyxhQUFhLFdBQVcsQ0FBQztNQUN4Q1osSUFBSSxHQUFHSyxJQUFJLENBQUNPLGFBQWEsaUJBQWlCLENBQUM7TUFFM0NuQixDQUFDLFdBQVcsQ0FBQyxDQUFDSSxJQUFJLENBQUNjLE9BQU8sQ0FBQ0UsU0FBUyxDQUFDO01BQ3JDcEIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDSSxJQUFJLENBQUNHLElBQUksQ0FBQ2EsU0FBUyxDQUFDO0lBQ3pDO0VBQ0QsQ0FBQyxDQUFDOztFQUVGO0VBQ0FwQixDQUFDLENBQUNxQixRQUFRLENBQUMsQ0FBQ0MsRUFBRSx1QkFBdUIsVUFBQ0MsQ0FBQyxFQUFLO0lBQzNDQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCRCxDQUFDLENBQUNFLGVBQWUsQ0FBQyxDQUFDO0lBRW5CLElBQUlsQixJQUFJLEdBQUdQLENBQUMsQ0FBQ3VCLENBQUMsQ0FBQ0csYUFBYSxDQUFDO0VBQzlCLENBQUMsQ0FBQzs7RUFFRjtFQUNBMUIsQ0FBQyxDQUFDcUIsUUFBUSxDQUFDLENBQUNDLEVBQUUsc0JBQXNCLFVBQUNDLENBQUMsRUFBSztJQUFBLElBQUFJLFNBQUE7SUFDMUMsSUFBSUMsR0FBRyxHQUFHNUIsQ0FBQyxDQUFDdUIsQ0FBQyxDQUFDRyxhQUFhLENBQUM7SUFFNUIxQixDQUFDLENBQUM2QixJQUFJLENBQUM7TUFDTixLQUFLLEdBQUFGLFNBQUEsR0FBRUMsR0FBRyxDQUFDbEIsSUFBSSxTQUFTLENBQUMsY0FBQWlCLFNBQUEsY0FBQUEsU0FBQSxHQUFJMUIsTUFBTSxDQUFDSSxRQUFRLENBQUNDLElBQUksQ0FBQ3dCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDL0QsTUFBTSxFQUFFRixHQUFHLENBQUNsQixJQUFJLFNBQVMsQ0FBQztNQUMxQixTQUFTLEVBQUUsU0FBQUssUUFBQ0gsSUFBSSxFQUFLO1FBQ3BCQSxJQUFJLEdBQUcsSUFBSUksU0FBUyxDQUFDLENBQUMsQ0FBQ0MsZUFBZSxDQUFDTCxJQUFJLGFBQWEsQ0FBQztRQUV6RE0sT0FBTyxHQUFHTixJQUFJLENBQUNPLGFBQWEsV0FBVyxDQUFDO1FBQ3hDWixJQUFJLEdBQUdLLElBQUksQ0FBQ08sYUFBYSxpQkFBaUIsQ0FBQztRQUUzQ25CLENBQUMsV0FBVyxDQUFDLENBQUNJLElBQUksQ0FBQ2MsT0FBTyxDQUFDRSxTQUFTLENBQUM7UUFDckNwQixDQUFDLGlCQUFpQixDQUFDLENBQUNJLElBQUksQ0FBQ0csSUFBSSxDQUFDYSxTQUFTLENBQUM7O1FBRXhDO1FBQ0FuQixNQUFNLENBQUNDLE9BQU8sQ0FBQzZCLFNBQVMsQ0FDdkI7VUFBQyxTQUFTLEVBQUUvQixDQUFDLGlCQUFpQixDQUFDLENBQUNJLElBQUksQ0FBQztRQUFDLENBQUMsRUFDdkMsRUFBRSxFQUNGSCxNQUFNLENBQUNJLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDd0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDbEMsQ0FBQztNQUNGO0lBQ0QsQ0FBQyxDQUFDO0VBQ0gsQ0FBQyxDQUFDOztFQUVGO0VBQ0E5QixDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDcUIsRUFBRSxhQUFhLFVBQUNDLENBQUMsRUFBSztJQUMvQixJQUFJWCxJQUFJLEdBQUdXLENBQUMsQ0FBQ1MsYUFBYSxDQUFDQyxLQUFLLENBQUNDLE9BQU87SUFFeENsQyxDQUFDLFdBQVcsQ0FBQyxDQUFDSSxJQUFJLENBQUNjLE9BQU8sQ0FBQ0UsU0FBUyxDQUFDO0lBQ3JDcEIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDSSxJQUFJLENBQUNHLElBQUksQ0FBQ2EsU0FBUyxDQUFDO0VBQ3pDLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3ZpZXdzL2Rvd25sb2Fkcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCgpID0+IHtcblx0Ly8gT25sb2FkIGhhbmRsZXJcblx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdHtcImNvbnRlbnRcIjogJChgI2lubmVyLWNvbnRlbnRgKS5odG1sKCl9LFxuXHRcdFwiXCIsXG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0KTtcblxuXHRsZXQgZm9ybSA9ICQoYCNmaWx0ZXJzYCk7XG5cdG5ldyBSVExvYWRlcihcImZpbHRlcnNcIiwge1xuXHRcdHVybDogZm9ybS5wcm9wKGBhY3Rpb25gKSxcblx0XHRhY3Rpb246IGZvcm0ucHJvcChgbWV0aG9kYCksXG5cdFx0ZGF0YTogZm9ybS5zZXJpYWxpemUoKSxcblx0XHRwdXNoSGlzdG9yeVN0YXRlOiB0cnVlLFxuXHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cdFx0XHRkYXRhID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBgdGV4dC9odG1sYCk7XG5cdFx0XHRmaWx0ZXJzID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjZmlsdGVyc2ApO1xuXHRcdFx0Zm9ybSA9IGRhdGEucXVlcnlTZWxlY3RvcihgI3RhYmxlLWNvbnRlbnRgKTtcblxuXHRcdFx0JChgI2ZpbHRlcnNgKS5odG1sKGZpbHRlcnMuaW5uZXJIVE1MKTtcblx0XHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBGaWx0ZXJzIHN1Ym1pdCBoYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKGBzdWJtaXRgLCBgI2ZpbHRlcnNgLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0bGV0IGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdH0pO1xuXG5cdC8vIFJlc2V0IGhhbmRsZXJcblx0JChkb2N1bWVudCkub24oYHJlc2V0YCwgYCNmaWx0ZXJzYCwgKGUpID0+IHtcblx0XHRsZXQgb2JqID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdFx0JC5hamF4KHtcblx0XHRcdFwidXJsXCI6IG9iai5wcm9wKGBhY3Rpb25gKSA/PyB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0sXG5cdFx0XHRcInR5cGVcIjogb2JqLnByb3AoYG1ldGhvZGApLFxuXHRcdFx0XCJzdWNjZXNzXCI6IChkYXRhKSA9PiB7XG5cdFx0XHRcdGRhdGEgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRhdGEsIGB0ZXh0L2h0bWxgKTtcblxuXHRcdFx0XHRmaWx0ZXJzID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjZmlsdGVyc2ApO1xuXHRcdFx0XHRmb3JtID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjdGFibGUtY29udGVudGApO1xuXG5cdFx0XHRcdCQoYCNmaWx0ZXJzYCkuaHRtbChmaWx0ZXJzLmlubmVySFRNTCk7XG5cdFx0XHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cblx0XHRcdFx0Ly8gSGlzdG9yeSBoYW5kbGVyXG5cdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcblx0XHRcdFx0XHR7XCJjb250ZW50XCI6ICQoYCNpbm5lci1jb250ZW50YCkuaHRtbCgpfSxcblx0XHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBQb3BzdGF0ZSBoYW5kbGVyXG5cdCQod2luZG93KS5vbihgcG9wc3RhdGVgLCAoZSkgPT4ge1xuXHRcdGxldCBkYXRhID0gZS5vcmlnaW5hbEV2ZW50LnN0YXRlLmNvbnRlbnQ7XG5cblx0XHQkKGAjZmlsdGVyc2ApLmh0bWwoZmlsdGVycy5pbm5lckhUTUwpO1xuXHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cdH0pO1xufSk7XG4iXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJodG1sIiwibG9jYXRpb24iLCJocmVmIiwiZm9ybSIsIlJUTG9hZGVyIiwidXJsIiwicHJvcCIsImFjdGlvbiIsImRhdGEiLCJzZXJpYWxpemUiLCJwdXNoSGlzdG9yeVN0YXRlIiwic3VjY2VzcyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImZpbHRlcnMiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwiZG9jdW1lbnQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImN1cnJlbnRUYXJnZXQiLCJfb2JqJHByb3AiLCJvYmoiLCJhamF4Iiwic3BsaXQiLCJwdXNoU3RhdGUiLCJvcmlnaW5hbEV2ZW50Iiwic3RhdGUiLCJjb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==