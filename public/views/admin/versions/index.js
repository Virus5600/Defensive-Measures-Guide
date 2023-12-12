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

    // $.ajax({
    // 	"url": form.attr(`action`),
    // 	"type": form.attr(`method`),
    // 	"data": form.serialize(),
    // 	"success": (data) => {
    // 		data = new DOMParser().parseFromString(data, `text/html`);
    // 		data = data.querySelector(`#inner-content`);

    // 		$(`#inner-content`).html(data.innerHTML);

    // 		// History handler
    // 		window.history.pushState(
    // 			{"content": $(`#inner-content`).html()},
    // 			"",
    // 			window.location.href + "?" + form.serialize()
    // 		);
    // 	}
    // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLENBQUMsQ0FBQyxZQUFNO0VBQ1A7RUFDQUMsTUFBTSxDQUFDQyxPQUFPLENBQUNDLFlBQVksQ0FDMUI7SUFBQyxTQUFTLEVBQUVILENBQUMsaUJBQWlCLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO0VBQUMsQ0FBQyxFQUN2QyxFQUFFLEVBQ0ZILE1BQU0sQ0FBQ0ksUUFBUSxDQUFDQyxJQUNqQixDQUFDO0VBRUQsSUFBSUMsSUFBSSxHQUFHUCxDQUFDLFdBQVcsQ0FBQztFQUN4QixJQUFJUSxRQUFRLENBQUMsU0FBUyxFQUFFO0lBQ3ZCQyxHQUFHLEVBQUVGLElBQUksQ0FBQ0csSUFBSSxTQUFTLENBQUM7SUFDeEJDLE1BQU0sRUFBRUosSUFBSSxDQUFDRyxJQUFJLFNBQVMsQ0FBQztJQUMzQkUsSUFBSSxFQUFFTCxJQUFJLENBQUNNLFNBQVMsQ0FBQyxDQUFDO0lBQ3RCQyxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCQyxPQUFPLEVBQUUsU0FBQUEsUUFBQ0gsSUFBSSxFQUFLO01BQ2xCQSxJQUFJLEdBQUcsSUFBSUksU0FBUyxDQUFDLENBQUMsQ0FBQ0MsZUFBZSxDQUFDTCxJQUFJLGFBQWEsQ0FBQztNQUN6RE0sT0FBTyxHQUFHTixJQUFJLENBQUNPLGFBQWEsV0FBVyxDQUFDO01BQ3hDWixJQUFJLEdBQUdLLElBQUksQ0FBQ08sYUFBYSxpQkFBaUIsQ0FBQztNQUUzQ25CLENBQUMsV0FBVyxDQUFDLENBQUNJLElBQUksQ0FBQ2MsT0FBTyxDQUFDRSxTQUFTLENBQUM7TUFDckNwQixDQUFDLGlCQUFpQixDQUFDLENBQUNJLElBQUksQ0FBQ0csSUFBSSxDQUFDYSxTQUFTLENBQUM7SUFDekM7RUFDRCxDQUFDLENBQUM7O0VBRUY7RUFDQXBCLENBQUMsQ0FBQ3FCLFFBQVEsQ0FBQyxDQUFDQyxFQUFFLHVCQUF1QixVQUFDQyxDQUFDLEVBQUs7SUFDM0NBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7SUFDbEJELENBQUMsQ0FBQ0UsZUFBZSxDQUFDLENBQUM7SUFFbkIsSUFBSWxCLElBQUksR0FBR1AsQ0FBQyxDQUFDdUIsQ0FBQyxDQUFDRyxhQUFhLENBQUM7O0lBRTdCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVBOztJQUVBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFDRCxDQUFDLENBQUM7O0VBRUY7RUFDQTFCLENBQUMsQ0FBQ3FCLFFBQVEsQ0FBQyxDQUFDQyxFQUFFLHNCQUFzQixVQUFDQyxDQUFDLEVBQUs7SUFBQSxJQUFBSSxTQUFBO0lBQzFDLElBQUlDLEdBQUcsR0FBRzVCLENBQUMsQ0FBQ3VCLENBQUMsQ0FBQ0csYUFBYSxDQUFDO0lBRTVCMUIsQ0FBQyxDQUFDNkIsSUFBSSxDQUFDO01BQ04sS0FBSyxHQUFBRixTQUFBLEdBQUVDLEdBQUcsQ0FBQ2xCLElBQUksU0FBUyxDQUFDLGNBQUFpQixTQUFBLGNBQUFBLFNBQUEsR0FBSTFCLE1BQU0sQ0FBQ0ksUUFBUSxDQUFDQyxJQUFJLENBQUN3QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQy9ELE1BQU0sRUFBRUYsR0FBRyxDQUFDbEIsSUFBSSxTQUFTLENBQUM7TUFDMUIsU0FBUyxFQUFFLFNBQUFLLFFBQUNILElBQUksRUFBSztRQUNwQkEsSUFBSSxHQUFHLElBQUlJLFNBQVMsQ0FBQyxDQUFDLENBQUNDLGVBQWUsQ0FBQ0wsSUFBSSxhQUFhLENBQUM7UUFFekRNLE9BQU8sR0FBR04sSUFBSSxDQUFDTyxhQUFhLFdBQVcsQ0FBQztRQUN4Q1osSUFBSSxHQUFHSyxJQUFJLENBQUNPLGFBQWEsaUJBQWlCLENBQUM7UUFFM0NuQixDQUFDLFdBQVcsQ0FBQyxDQUFDSSxJQUFJLENBQUNjLE9BQU8sQ0FBQ0UsU0FBUyxDQUFDO1FBQ3JDcEIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDSSxJQUFJLENBQUNHLElBQUksQ0FBQ2EsU0FBUyxDQUFDOztRQUV4QztRQUNBbkIsTUFBTSxDQUFDQyxPQUFPLENBQUM2QixTQUFTLENBQ3ZCO1VBQUMsU0FBUyxFQUFFL0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDSSxJQUFJLENBQUM7UUFBQyxDQUFDLEVBQ3ZDLEVBQUUsRUFDRkgsTUFBTSxDQUFDSSxRQUFRLENBQUNDLElBQUksQ0FBQ3dCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ2xDLENBQUM7TUFDRjtJQUNELENBQUMsQ0FBQztFQUNILENBQUMsQ0FBQzs7RUFFRjtFQUNBOUIsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQ3FCLEVBQUUsYUFBYSxVQUFDQyxDQUFDLEVBQUs7SUFDL0IsSUFBSVgsSUFBSSxHQUFHVyxDQUFDLENBQUNTLGFBQWEsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPO0lBRXhDbEMsQ0FBQyxXQUFXLENBQUMsQ0FBQ0ksSUFBSSxDQUFDYyxPQUFPLENBQUNFLFNBQVMsQ0FBQztJQUNyQ3BCLENBQUMsaUJBQWlCLENBQUMsQ0FBQ0ksSUFBSSxDQUFDRyxJQUFJLENBQUNhLFNBQVMsQ0FBQztFQUN6QyxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy92aWV3cy9hZG1pbi92ZXJzaW9ucy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCgpID0+IHtcblx0Ly8gT25sb2FkIGhhbmRsZXJcblx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdHtcImNvbnRlbnRcIjogJChgI2lubmVyLWNvbnRlbnRgKS5odG1sKCl9LFxuXHRcdFwiXCIsXG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0KTtcblxuXHRsZXQgZm9ybSA9ICQoYCNmaWx0ZXJzYCk7XG5cdG5ldyBSVExvYWRlcihcImZpbHRlcnNcIiwge1xuXHRcdHVybDogZm9ybS5wcm9wKGBhY3Rpb25gKSxcblx0XHRhY3Rpb246IGZvcm0ucHJvcChgbWV0aG9kYCksXG5cdFx0ZGF0YTogZm9ybS5zZXJpYWxpemUoKSxcblx0XHRwdXNoSGlzdG9yeVN0YXRlOiB0cnVlLFxuXHRcdHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG5cdFx0XHRkYXRhID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBgdGV4dC9odG1sYCk7XG5cdFx0XHRmaWx0ZXJzID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjZmlsdGVyc2ApO1xuXHRcdFx0Zm9ybSA9IGRhdGEucXVlcnlTZWxlY3RvcihgI3RhYmxlLWNvbnRlbnRgKTtcblxuXHRcdFx0JChgI2ZpbHRlcnNgKS5odG1sKGZpbHRlcnMuaW5uZXJIVE1MKTtcblx0XHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBGaWx0ZXJzIHN1Ym1pdCBoYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKGBzdWJtaXRgLCBgI2ZpbHRlcnNgLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5cdFx0bGV0IGZvcm0gPSAkKGUuY3VycmVudFRhcmdldCk7XG5cblx0XHQvLyAkLmFqYXgoe1xuXHRcdC8vIFx0XCJ1cmxcIjogZm9ybS5hdHRyKGBhY3Rpb25gKSxcblx0XHQvLyBcdFwidHlwZVwiOiBmb3JtLmF0dHIoYG1ldGhvZGApLFxuXHRcdC8vIFx0XCJkYXRhXCI6IGZvcm0uc2VyaWFsaXplKCksXG5cdFx0Ly8gXHRcInN1Y2Nlc3NcIjogKGRhdGEpID0+IHtcblx0XHQvLyBcdFx0ZGF0YSA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGF0YSwgYHRleHQvaHRtbGApO1xuXHRcdC8vIFx0XHRkYXRhID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjaW5uZXItY29udGVudGApO1xuXG5cdFx0Ly8gXHRcdCQoYCNpbm5lci1jb250ZW50YCkuaHRtbChkYXRhLmlubmVySFRNTCk7XG5cblx0XHQvLyBcdFx0Ly8gSGlzdG9yeSBoYW5kbGVyXG5cdFx0Ly8gXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcblx0XHQvLyBcdFx0XHR7XCJjb250ZW50XCI6ICQoYCNpbm5lci1jb250ZW50YCkuaHRtbCgpfSxcblx0XHQvLyBcdFx0XHRcIlwiLFxuXHRcdC8vIFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCI/XCIgKyBmb3JtLnNlcmlhbGl6ZSgpXG5cdFx0Ly8gXHRcdCk7XG5cdFx0Ly8gXHR9XG5cdFx0Ly8gfSk7XG5cdH0pO1xuXG5cdC8vIFJlc2V0IGhhbmRsZXJcblx0JChkb2N1bWVudCkub24oYHJlc2V0YCwgYCNmaWx0ZXJzYCwgKGUpID0+IHtcblx0XHRsZXQgb2JqID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdFx0JC5hamF4KHtcblx0XHRcdFwidXJsXCI6IG9iai5wcm9wKGBhY3Rpb25gKSA/PyB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0sXG5cdFx0XHRcInR5cGVcIjogb2JqLnByb3AoYG1ldGhvZGApLFxuXHRcdFx0XCJzdWNjZXNzXCI6IChkYXRhKSA9PiB7XG5cdFx0XHRcdGRhdGEgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRhdGEsIGB0ZXh0L2h0bWxgKTtcblxuXHRcdFx0XHRmaWx0ZXJzID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjZmlsdGVyc2ApO1xuXHRcdFx0XHRmb3JtID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjdGFibGUtY29udGVudGApO1xuXG5cdFx0XHRcdCQoYCNmaWx0ZXJzYCkuaHRtbChmaWx0ZXJzLmlubmVySFRNTCk7XG5cdFx0XHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cblx0XHRcdFx0Ly8gSGlzdG9yeSBoYW5kbGVyXG5cdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcblx0XHRcdFx0XHR7XCJjb250ZW50XCI6ICQoYCNpbm5lci1jb250ZW50YCkuaHRtbCgpfSxcblx0XHRcdFx0XHRcIlwiLFxuXHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBQb3BzdGF0ZSBoYW5kbGVyXG5cdCQod2luZG93KS5vbihgcG9wc3RhdGVgLCAoZSkgPT4ge1xuXHRcdGxldCBkYXRhID0gZS5vcmlnaW5hbEV2ZW50LnN0YXRlLmNvbnRlbnQ7XG5cblx0XHQkKGAjZmlsdGVyc2ApLmh0bWwoZmlsdGVycy5pbm5lckhUTUwpO1xuXHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cdH0pO1xufSk7XG4iXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJodG1sIiwibG9jYXRpb24iLCJocmVmIiwiZm9ybSIsIlJUTG9hZGVyIiwidXJsIiwicHJvcCIsImFjdGlvbiIsImRhdGEiLCJzZXJpYWxpemUiLCJwdXNoSGlzdG9yeVN0YXRlIiwic3VjY2VzcyIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImZpbHRlcnMiLCJxdWVyeVNlbGVjdG9yIiwiaW5uZXJIVE1MIiwiZG9jdW1lbnQiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImN1cnJlbnRUYXJnZXQiLCJfb2JqJHByb3AiLCJvYmoiLCJhamF4Iiwic3BsaXQiLCJwdXNoU3RhdGUiLCJvcmlnaW5hbEV2ZW50Iiwic3RhdGUiLCJjb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==