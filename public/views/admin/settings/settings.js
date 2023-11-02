/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./resources/js/views/admin/settings.js ***!
  \**********************************************/
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
$(function () {
  // ADD SOCIAL LINK HANDLER
  $("#addSocialLink").on("click", function (e) {
    var target = $("#socialLinkList");
    var websiteOptions = "";
    $.ajaxSetup({
      headers: {
        'Authorization': "Bearer ".concat($("meta[name=bearer]").attr('content'))
      }
    });
    $.get(API.sites, function (response) {
      if (response.success) {
        var sites = JSON.parse(response.websites);
        for (site in sites) websiteOptions += "<option data-icon=\"fa-brands fa-".concat(site, "\" value=\"").concat(sites[site], "\">").concat(sites[site], "</option>");
        var template = "\n\t\t\t\t<tr class=\"slideFromLeft\">\n\t\t\t\t\t<td class=\"align-middle p-3\">\n\t\t\t\t\t\t<div class=\"d-flex w-100 h-100 justify-content-center align-items-center\">\n\t\t\t\t\t\t\t<i class=\"fas fa-circle-minus fa-xs btn btn-outline-danger btn-sm p-1 rounded-circle remove-sl\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\n\t\t\t\t\t<td class=\"align-middle p-3\">\n\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t<span class=\"input-group-text\">\n\t\t\t\t\t\t\t\t<i class=\"fas fa-globe\"></i>\n\t\t\t\t\t\t\t</span>\n\n\t\t\t\t\t\t\t<select class=\"form-select form-control w-auto website-input\" autocomplete=\"off\">\n\t\t\t\t\t\t\t\t".concat(websiteOptions, "\n\t\t\t\t\t\t\t\t<option data-icon=\"fas fa-globe\" value=\"Other\" selected>Other</option>\n\t\t\t\t\t\t\t</select>\n\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control small w-auto website-input-alt\" name=\"website[]\" value=\"Other\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\n\t\t\t\t\t<td class=\"align-middle p-3\">\n\t\t\t\t\t\t<input type=\"text\" class=\"form-control w-auto w-lg-100\" name=\"url[]\"></input>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t");
        target.append(template);
      } else {
        SwalFlash.error("Something went wrong, please try again later.");
        return 0;
      }
    });
  });

  // REMOVE SOCIAL LINK HANDLER
  $(document).on("click", ".remove-sl", function (e) {
    var container = $(e.target).closest("tr");
    Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible unless you refresh the page, of course... but that would also remove all your changes.",
      icon: "warning",
      showCancelButton: true,
      showDenyButton: false,
      confirmButtonText: "Proceed",
      customClass: {
        confirmButton: "btn-bad",
        cancelButton: "btn-good"
      }
    }).then(function (response) {
      if (response.isConfirmed) {
        container.on("animationend", function (ev) {
          $(ev.target).remove();
        });
        container.addClass("slideToRight");
      }
    });
  });

  // SOCIAL LINK ICON AND WEBSITE INPUT CHANGE HANDLER
  $(document).on("change", "select.website-input", function (e) {
    var target = $(e.target);
    var icon = target.find("option:selected").attr("data-icon");
    if (icon == "fas fa-globe") {
      target.removeAttr("name").closest("td").find(".website-input-alt").attr("name", "website[]").removeClass("d-none");
    } else {
      target.attr("name", "website[]").closest("td").find(".website-input-alt").removeAttr("name").addClass("d-none");
    }
    target.closest("td").find("span").html("<i class=\"".concat(icon, "\"></i>")).closest("td").find(".website-input-alt").val(target.val());
  });

  // REVERT CHANGES HANDLER
  $("#revert").on("click", function (e) {
    $.ajax({
      url: API.reset,
      type: "POST",
      dataType: "json",
      headers: {
        'Authorization': "Bearer ".concat($("meta[name=bearer]").attr('content')),
        'XSRF-TOKEN': $("meta[name=xsrf]").attr('content')
      },
      data: {
        _method: "PATCH"
      },
      success: function success(response) {
        if (response.success) {
          var settings = JSON.parse(response.settings);
          var _iterator = _createForOfIteratorHelper(settings),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              setting = _step.value;
              var target = $("[name=\"".concat(setting.name, "\"]"));
              if (setting.name == "web-logo") {
                target.val("").parent().find("img").attr("src", "".concat(API.home, "/uploads/settings/").concat(setting.value));
              } else {
                if (target.length > 0) {
                  target.val(setting.value).trigger("change");
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          SwalFlash.success(response.message);
        } else {
          var errors = JSON.parse(response.errors);
          console.table(errors);
          SwalFlash.error("Something went wrong, please try again later.");
        }
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxNQUFNLENBQUM7VUFDeENDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDRixNQUFNLENBQUM7VUFFckJsRCxTQUFTLENBQUNDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQztRQUNqRTtNQUNEO0lBQ0QsQ0FBQyxDQUFDO0VBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdmlld3MvYWRtaW4vc2V0dGluZ3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJCgoKSA9PiB7XG5cdC8vIEFERCBTT0NJQUwgTElOSyBIQU5ETEVSXG5cdCQoYCNhZGRTb2NpYWxMaW5rYCkub24oYGNsaWNrYCwgKGUpID0+IHtcblx0XHRsZXQgdGFyZ2V0ID0gJChcdGAjc29jaWFsTGlua0xpc3RgKTtcblxuXHRcdGxldCB3ZWJzaXRlT3B0aW9ucyA9IGBgO1xuXG5cdFx0JC5hamF4U2V0dXAoe1xuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHQnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHskKFwibWV0YVtuYW1lPWJlYXJlcl1cIikuYXR0cignY29udGVudCcpfWBcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQuZ2V0KEFQSS5zaXRlcywgKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuXHRcdFx0XHRsZXQgc2l0ZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLndlYnNpdGVzKTtcblxuXHRcdFx0XHRmb3IgKHNpdGUgaW4gc2l0ZXMpXG5cdFx0XHRcdFx0d2Vic2l0ZU9wdGlvbnMgKz0gYDxvcHRpb24gZGF0YS1pY29uPVwiZmEtYnJhbmRzIGZhLSR7c2l0ZX1cIiB2YWx1ZT1cIiR7c2l0ZXNbc2l0ZV19XCI+JHtzaXRlc1tzaXRlXX08L29wdGlvbj5gO1xuXG5cdFx0XHRcdGNvbnN0IHRlbXBsYXRlID0gYFxuXHRcdFx0XHQ8dHIgY2xhc3M9XCJzbGlkZUZyb21MZWZ0XCI+XG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwiYWxpZ24tbWlkZGxlIHAtM1wiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMCBoLTEwMCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1jaXJjbGUtbWludXMgZmEteHMgYnRuIGJ0bi1vdXRsaW5lLWRhbmdlciBidG4tc20gcC0xIHJvdW5kZWQtY2lyY2xlIHJlbW92ZS1zbFwiPjwvaT5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvdGQ+XG5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJhbGlnbi1taWRkbGUgcC0zXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtZ2xvYmVcIj48L2k+XG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cblxuXHRcdFx0XHRcdFx0XHQ8c2VsZWN0IGNsYXNzPVwiZm9ybS1zZWxlY3QgZm9ybS1jb250cm9sIHctYXV0byB3ZWJzaXRlLWlucHV0XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG5cdFx0XHRcdFx0XHRcdFx0JHt3ZWJzaXRlT3B0aW9uc31cblx0XHRcdFx0XHRcdFx0XHQ8b3B0aW9uIGRhdGEtaWNvbj1cImZhcyBmYS1nbG9iZVwiIHZhbHVlPVwiT3RoZXJcIiBzZWxlY3RlZD5PdGhlcjwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0XHQ8L3NlbGVjdD5cblxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBzbWFsbCB3LWF1dG8gd2Vic2l0ZS1pbnB1dC1hbHRcIiBuYW1lPVwid2Vic2l0ZVtdXCIgdmFsdWU9XCJPdGhlclwiPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC90ZD5cblxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cImFsaWduLW1pZGRsZSBwLTNcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHctYXV0byB3LWxnLTEwMFwiIG5hbWU9XCJ1cmxbXVwiPjwvaW5wdXQ+XG5cdFx0XHRcdFx0PC90ZD5cblx0XHRcdFx0PC90cj5cblx0XHRcdFx0YDtcblxuXHRcdFx0XHR0YXJnZXQuYXBwZW5kKHRlbXBsYXRlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRTd2FsRmxhc2guZXJyb3IoXCJTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIik7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0pO1xuXG5cdC8vIFJFTU9WRSBTT0NJQUwgTElOSyBIQU5ETEVSXG5cdCQoZG9jdW1lbnQpLm9uKGBjbGlja2AsIGAucmVtb3ZlLXNsYCwgKGUpID0+IHtcblx0XHRsZXQgY29udGFpbmVyID0gJChlLnRhcmdldCkuY2xvc2VzdChgdHJgKTtcblxuXHRcdFN3YWwuZmlyZSh7XG5cdFx0XHR0aXRsZTogXCJBcmUgeW91IHN1cmU/XCIsXG5cdFx0XHR0ZXh0OiBcIlRoaXMgYWN0aW9uIGlzIGlycmV2ZXJzaWJsZSB1bmxlc3MgeW91IHJlZnJlc2ggdGhlIHBhZ2UsIG9mIGNvdXJzZS4uLiBidXQgdGhhdCB3b3VsZCBhbHNvIHJlbW92ZSBhbGwgeW91ciBjaGFuZ2VzLlwiLFxuXHRcdFx0aWNvbjogXCJ3YXJuaW5nXCIsXG5cdFx0XHRzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuXHRcdFx0c2hvd0RlbnlCdXR0b246IGZhbHNlLFxuXHRcdFx0Y29uZmlybUJ1dHRvblRleHQ6IFwiUHJvY2VlZFwiLFxuXHRcdFx0Y3VzdG9tQ2xhc3M6IHtcblx0XHRcdFx0Y29uZmlybUJ1dHRvbjogXCJidG4tYmFkXCIsXG5cdFx0XHRcdGNhbmNlbEJ1dHRvbjogXCJidG4tZ29vZFwiLFxuXHRcdFx0fSxcblx0XHR9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuXHRcdFx0aWYgKHJlc3BvbnNlLmlzQ29uZmlybWVkKSB7XG5cdFx0XHRcdGNvbnRhaW5lci5vbihgYW5pbWF0aW9uZW5kYCwgKGV2KSA9PiB7XG5cdFx0XHRcdFx0JChldi50YXJnZXQpLnJlbW92ZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjb250YWluZXIuYWRkQ2xhc3MoYHNsaWRlVG9SaWdodGApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBTT0NJQUwgTElOSyBJQ09OIEFORCBXRUJTSVRFIElOUFVUIENIQU5HRSBIQU5ETEVSXG5cdCQoZG9jdW1lbnQpLm9uKGBjaGFuZ2VgLCBgc2VsZWN0LndlYnNpdGUtaW5wdXRgLCAoZSkgPT4ge1xuXHRcdGxldCB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcblx0XHRsZXQgaWNvbiA9IHRhcmdldC5maW5kKGBvcHRpb246c2VsZWN0ZWRgKS5hdHRyKGBkYXRhLWljb25gKTtcblxuXHRcdGlmIChpY29uID09IFwiZmFzIGZhLWdsb2JlXCIpIHtcblx0XHRcdHRhcmdldC5yZW1vdmVBdHRyKGBuYW1lYClcblx0XHRcdFx0LmNsb3Nlc3QoYHRkYClcblx0XHRcdFx0LmZpbmQoYC53ZWJzaXRlLWlucHV0LWFsdGApXG5cdFx0XHRcdC5hdHRyKGBuYW1lYCwgYHdlYnNpdGVbXWApXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhgZC1ub25lYCk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmF0dHIoYG5hbWVgLCBgd2Vic2l0ZVtdYClcblx0XHRcdFx0LmNsb3Nlc3QoYHRkYClcblx0XHRcdFx0LmZpbmQoYC53ZWJzaXRlLWlucHV0LWFsdGApXG5cdFx0XHRcdC5yZW1vdmVBdHRyKGBuYW1lYClcblx0XHRcdFx0LmFkZENsYXNzKGBkLW5vbmVgKTtcblx0XHR9XG5cblx0XHR0YXJnZXQuY2xvc2VzdChgdGRgKVxuXHRcdFx0LmZpbmQoYHNwYW5gKVxuXHRcdFx0Lmh0bWwoYDxpIGNsYXNzPVwiJHtpY29ufVwiPjwvaT5gKVxuXHRcdC5jbG9zZXN0KGB0ZGApXG5cdFx0XHQuZmluZChgLndlYnNpdGUtaW5wdXQtYWx0YClcblx0XHRcdC52YWwodGFyZ2V0LnZhbCgpKTtcblx0fSk7XG5cblx0Ly8gUkVWRVJUIENIQU5HRVMgSEFORExFUlxuXHQkKGAjcmV2ZXJ0YCkub24oYGNsaWNrYCwgKGUpID0+IHtcblx0XHQkLmFqYXgoe1xuXHRcdFx0dXJsOiBBUEkucmVzZXQsXG5cdFx0XHR0eXBlOiBcIlBPU1RcIixcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0J0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7JChcIm1ldGFbbmFtZT1iZWFyZXJdXCIpLmF0dHIoJ2NvbnRlbnQnKX1gLFxuXHRcdFx0XHQnWFNSRi1UT0tFTic6ICQoXCJtZXRhW25hbWU9eHNyZl1cIikuYXR0cignY29udGVudCcpXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRfbWV0aG9kOiBcIlBBVENIXCJcblx0XHRcdH0sXG5cdFx0XHRzdWNjZXNzOiAocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0aWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcblx0XHRcdFx0XHRsZXQgc2V0dGluZ3MgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnNldHRpbmdzKTtcblx0XHRcdFx0XHRmb3IgKHNldHRpbmcgb2Ygc2V0dGluZ3MpIHtcblx0XHRcdFx0XHRcdGxldCB0YXJnZXQgPSAkKGBbbmFtZT1cIiR7c2V0dGluZy5uYW1lfVwiXWApO1xuXG5cdFx0XHRcdFx0XHRpZiAoc2V0dGluZy5uYW1lID09IFwid2ViLWxvZ29cIikge1xuXHRcdFx0XHRcdFx0XHR0YXJnZXQudmFsKFwiXCIpXG5cdFx0XHRcdFx0XHRcdFx0LnBhcmVudCgpXG5cdFx0XHRcdFx0XHRcdFx0LmZpbmQoXCJpbWdcIilcblx0XHRcdFx0XHRcdFx0XHQuYXR0cihcInNyY1wiLCBgJHtBUEkuaG9tZX0vdXBsb2Fkcy9zZXR0aW5ncy8ke3NldHRpbmcudmFsdWV9YCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKHRhcmdldC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0LnZhbChzZXR0aW5nLnZhbHVlKVxuXHRcdFx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRTd2FsRmxhc2guc3VjY2VzcyhyZXNwb25zZS5tZXNzYWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRsZXQgZXJyb3JzID0gSlNPTi5wYXJzZShyZXNwb25zZS5lcnJvcnMpO1xuXHRcdFx0XHRcdGNvbnNvbGUudGFibGUoZXJyb3JzKTtcblxuXHRcdFx0XHRcdFN3YWxGbGFzaC5lcnJvcihcIlNvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn0pO1xuIl0sIm5hbWVzIjpbIiQiLCJvbiIsImUiLCJ0YXJnZXQiLCJ3ZWJzaXRlT3B0aW9ucyIsImFqYXhTZXR1cCIsImhlYWRlcnMiLCJjb25jYXQiLCJhdHRyIiwiZ2V0IiwiQVBJIiwic2l0ZXMiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJKU09OIiwicGFyc2UiLCJ3ZWJzaXRlcyIsInNpdGUiLCJ0ZW1wbGF0ZSIsImFwcGVuZCIsIlN3YWxGbGFzaCIsImVycm9yIiwiZG9jdW1lbnQiLCJjb250YWluZXIiLCJjbG9zZXN0IiwiU3dhbCIsImZpcmUiLCJ0aXRsZSIsInRleHQiLCJpY29uIiwic2hvd0NhbmNlbEJ1dHRvbiIsInNob3dEZW55QnV0dG9uIiwiY29uZmlybUJ1dHRvblRleHQiLCJjdXN0b21DbGFzcyIsImNvbmZpcm1CdXR0b24iLCJjYW5jZWxCdXR0b24iLCJ0aGVuIiwiaXNDb25maXJtZWQiLCJldiIsInJlbW92ZSIsImFkZENsYXNzIiwiZmluZCIsInJlbW92ZUF0dHIiLCJyZW1vdmVDbGFzcyIsImh0bWwiLCJ2YWwiLCJhamF4IiwidXJsIiwicmVzZXQiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkYXRhIiwiX21ldGhvZCIsInNldHRpbmdzIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsInMiLCJuIiwiZG9uZSIsInNldHRpbmciLCJ2YWx1ZSIsIm5hbWUiLCJwYXJlbnQiLCJob21lIiwibGVuZ3RoIiwidHJpZ2dlciIsImVyciIsImYiLCJtZXNzYWdlIiwiZXJyb3JzIiwiY29uc29sZSIsInRhYmxlIl0sInNvdXJjZVJvb3QiOiIifQ==