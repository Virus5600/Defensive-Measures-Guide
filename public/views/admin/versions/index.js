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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUFBLENBQUMsQ0FBQyxZQUFNO0VBQ1A7RUFDQUMsTUFBTSxDQUFDQyxPQUFPLENBQUNDLFlBQVksQ0FDMUI7SUFBQyxTQUFTLEVBQUVILENBQUMsaUJBQWlCLENBQUMsQ0FBQ0ksSUFBSSxDQUFDO0VBQUMsQ0FBQyxFQUN2QyxFQUFFLEVBQ0ZILE1BQU0sQ0FBQ0ksUUFBUSxDQUFDQyxJQUNqQixDQUFDOztFQUVEO0VBQ0FOLENBQUMsV0FBVyxDQUFDLENBQUNPLEVBQUUsVUFBVSxVQUFDQyxDQUFDLEVBQUs7SUFDaEMsSUFBSUMsR0FBRyxHQUFHVCxDQUFDLENBQUNRLENBQUMsQ0FBQ0UsYUFBYSxDQUFDOztJQUU1QjtJQUNBRCxHQUFHLENBQUNFLElBQUksa0JBQWtCLENBQUMsQ0FDekJDLFVBQVUsVUFBVSxDQUFDLENBQ3JCQyxVQUFVLFVBQVUsQ0FBQzs7SUFFdkI7SUFDQUosR0FBRyxDQUFDRSxJQUFJLHdCQUF3QixDQUFDLENBQy9CQyxVQUFVLFFBQVEsQ0FBQyxDQUNuQkMsVUFBVSxRQUFRLENBQUMsQ0FDbkJDLEdBQUcsR0FBRyxDQUFDOztJQUVUO0lBQ0FiLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDYSxTQUFTLENBQ3ZCO01BQUMsU0FBUyxFQUFFZixDQUFDLGlCQUFpQixDQUFDLENBQUNJLElBQUksQ0FBQztJQUFDLENBQUMsRUFDdkMsRUFBRSxFQUNGSCxNQUFNLENBQUNJLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDVSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUNsQyxDQUFDO0VBQ0YsQ0FBQyxDQUFDOztFQUVGO0VBQ0FoQixDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDTSxFQUFFLGFBQWEsVUFBQ0MsQ0FBQyxFQUFLO0lBQy9CUixDQUFDLGlCQUFpQixDQUFDLENBQUNJLElBQUksQ0FBQ0osQ0FBQyxDQUFDUSxDQUFDLENBQUNTLGFBQWEsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLENBQUMsQ0FBQztFQUMzRCxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy92aWV3cy9hZG1pbi92ZXJzaW9ucy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCgpID0+IHtcblx0Ly8gT25sb2FkIGhhbmRsZXJcblx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdHtcImNvbnRlbnRcIjogJChgI2lubmVyLWNvbnRlbnRgKS5odG1sKCl9LFxuXHRcdFwiXCIsXG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0KTtcblxuXHQvLyBSZXNldCBoYW5kbGVyXG5cdCQoYCNmaWx0ZXJzYCkub24oYHJlc2V0YCwgKGUpID0+IHtcblx0XHRsZXQgb2JqID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdFx0Ly8gQ2hlY2tib3ggaGFuZGxlclxuXHRcdG9iai5maW5kKGBbdHlwZT1jaGVja2JveF1gKVxuXHRcdFx0LnJlbW92ZUF0dHIoYGNoZWNrZWRgKVxuXHRcdFx0LnJlbW92ZVByb3AoYGNoZWNrZWRgKTtcblxuXHRcdC8vIFRleHQgaGFuZGxlclxuXHRcdG9iai5maW5kKGBbdHlwZT10ZXh0XSwgdGV4dGFyZWFgKVxuXHRcdFx0LnJlbW92ZUF0dHIoYHZhbHVlYClcblx0XHRcdC5yZW1vdmVQcm9wKGB2YWx1ZWApXG5cdFx0XHQudmFsKGBgKTtcblxuXHRcdC8vIEhpc3RvcnkgaGFuZGxlclxuXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcblx0XHRcdHtcImNvbnRlbnRcIjogJChgI2lubmVyLWNvbnRlbnRgKS5odG1sKCl9LFxuXHRcdFx0XCJcIixcblx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXVxuXHRcdCk7XG5cdH0pO1xuXG5cdC8vIFBvcHN0YXRlIGhhbmRsZXJcblx0JCh3aW5kb3cpLm9uKGBwb3BzdGF0ZWAsIChlKSA9PiB7XG5cdFx0JChgI2lubmVyLWNvbnRlbnRgKS5odG1sKCQoZS5vcmlnaW5hbEV2ZW50LnN0YXRlLmNvbnRlbnQpKTtcblx0fSk7XG59KTtcbiJdLCJuYW1lcyI6WyIkIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImh0bWwiLCJsb2NhdGlvbiIsImhyZWYiLCJvbiIsImUiLCJvYmoiLCJjdXJyZW50VGFyZ2V0IiwiZmluZCIsInJlbW92ZUF0dHIiLCJyZW1vdmVQcm9wIiwidmFsIiwicHVzaFN0YXRlIiwic3BsaXQiLCJvcmlnaW5hbEV2ZW50Iiwic3RhdGUiLCJjb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==