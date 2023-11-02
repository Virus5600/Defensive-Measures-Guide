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

  // ANIMATION HANDLER
  $(document).on("animationstart", ".slideFromLeft", function (e) {
    var obj = $(e.target);
    obj.removeClass("opacity-0");
  });
  $(document).on("animationend", ".slideFromLeft", function (e) {
    var obj = $(e.target);
    obj.removeClass("slideFromLeft delay-animation").removeAttr("style").removeProp("style");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUJ1RCxPQUFPLENBQUNDLEtBQUssQ0FBRSxDQUFDO2NBQy9ELENBQUMsTUFDSTtnQkFDSixJQUFJNUQsTUFBTSxDQUFDZ0UsTUFBTSxHQUFHLENBQUMsRUFBRTtrQkFDdEJoRSxNQUFNLENBQUMwQyxHQUFHLENBQUNpQixPQUFPLENBQUNDLEtBQUssQ0FBQyxDQUN2QkssT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDcEI7Y0FDRDtZQUNEO1VBQUMsU0FBQUMsR0FBQTtZQUFBYixTQUFBLENBQUF0RCxDQUFBLENBQUFtRSxHQUFBO1VBQUE7WUFBQWIsU0FBQSxDQUFBYyxDQUFBO1VBQUE7VUFFRGxELFNBQVMsQ0FBQ1AsT0FBTyxDQUFDRCxRQUFRLENBQUMyRCxPQUFPLENBQUM7UUFDcEMsQ0FBQyxNQUNJO1VBQ0osSUFBSUMsTUFBTSxHQUFHMUQsSUFBSSxDQUFDQyxLQUFLLENBQUNILFFBQVEsQ0FBQzRELE1BQU0sQ0FBQztVQUN4Q0MsT0FBTyxDQUFDQyxLQUFLLENBQUNGLE1BQU0sQ0FBQztVQUVyQnBELFNBQVMsQ0FBQ0MsS0FBSyxDQUFDLCtDQUErQyxDQUFDO1FBQ2pFO01BQ0Q7SUFDRCxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy92aWV3cy9hZG1pbi9zZXR0aW5ncy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCgpID0+IHtcblx0Ly8gQUREIFNPQ0lBTCBMSU5LIEhBTkRMRVJcblx0JChgI2FkZFNvY2lhbExpbmtgKS5vbihgY2xpY2tgLCAoZSkgPT4ge1xuXHRcdGxldCB0YXJnZXQgPSAkKFx0YCNzb2NpYWxMaW5rTGlzdGApO1xuXG5cdFx0bGV0IHdlYnNpdGVPcHRpb25zID0gYGA7XG5cblx0XHQkLmFqYXhTZXR1cCh7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdBdXRob3JpemF0aW9uJzogYEJlYXJlciAkeyQoXCJtZXRhW25hbWU9YmVhcmVyXVwiKS5hdHRyKCdjb250ZW50Jyl9YFxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0JC5nZXQoQVBJLnNpdGVzLCAocmVzcG9uc2UpID0+IHtcblx0XHRcdGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG5cdFx0XHRcdGxldCBzaXRlcyA9IEpTT04ucGFyc2UocmVzcG9uc2Uud2Vic2l0ZXMpO1xuXG5cdFx0XHRcdGZvciAoc2l0ZSBpbiBzaXRlcylcblx0XHRcdFx0XHR3ZWJzaXRlT3B0aW9ucyArPSBgPG9wdGlvbiBkYXRhLWljb249XCJmYS1icmFuZHMgZmEtJHtzaXRlfVwiIHZhbHVlPVwiJHtzaXRlc1tzaXRlXX1cIj4ke3NpdGVzW3NpdGVdfTwvb3B0aW9uPmA7XG5cblx0XHRcdFx0Y29uc3QgdGVtcGxhdGUgPSBgXG5cdFx0XHRcdDx0ciBjbGFzcz1cInNsaWRlRnJvbUxlZnRcIj5cblx0XHRcdFx0XHQ8dGQgY2xhc3M9XCJhbGlnbi1taWRkbGUgcC0zXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwIGgtMTAwIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFzIGZhLWNpcmNsZS1taW51cyBmYS14cyBidG4gYnRuLW91dGxpbmUtZGFuZ2VyIGJ0bi1zbSBwLTEgcm91bmRlZC1jaXJjbGUgcmVtb3ZlLXNsXCI+PC9pPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC90ZD5cblxuXHRcdFx0XHRcdDx0ZCBjbGFzcz1cImFsaWduLW1pZGRsZSBwLTNcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIj5cblx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1nbG9iZVwiPjwvaT5cblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxuXG5cdFx0XHRcdFx0XHRcdDxzZWxlY3QgY2xhc3M9XCJmb3JtLXNlbGVjdCBmb3JtLWNvbnRyb2wgdy1hdXRvIHdlYnNpdGUtaW5wdXRcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cblx0XHRcdFx0XHRcdFx0XHQke3dlYnNpdGVPcHRpb25zfVxuXHRcdFx0XHRcdFx0XHRcdDxvcHRpb24gZGF0YS1pY29uPVwiZmFzIGZhLWdsb2JlXCIgdmFsdWU9XCJPdGhlclwiIHNlbGVjdGVkPk90aGVyPC9vcHRpb24+XG5cdFx0XHRcdFx0XHRcdDwvc2VsZWN0PlxuXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHNtYWxsIHctYXV0byB3ZWJzaXRlLWlucHV0LWFsdFwiIG5hbWU9XCJ3ZWJzaXRlW11cIiB2YWx1ZT1cIk90aGVyXCI+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L3RkPlxuXG5cdFx0XHRcdFx0PHRkIGNsYXNzPVwiYWxpZ24tbWlkZGxlIHAtM1wiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgdy1hdXRvIHctbGctMTAwXCIgbmFtZT1cInVybFtdXCI+PC9pbnB1dD5cblx0XHRcdFx0XHQ8L3RkPlxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHRgO1xuXG5cdFx0XHRcdHRhcmdldC5hcHBlbmQodGVtcGxhdGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFN3YWxGbGFzaC5lcnJvcihcIlNvbWV0aGluZyB3ZW50IHdyb25nLCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiKTtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSk7XG5cblx0Ly8gUkVNT1ZFIFNPQ0lBTCBMSU5LIEhBTkRMRVJcblx0JChkb2N1bWVudCkub24oYGNsaWNrYCwgYC5yZW1vdmUtc2xgLCAoZSkgPT4ge1xuXHRcdGxldCBjb250YWluZXIgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KGB0cmApO1xuXG5cdFx0U3dhbC5maXJlKHtcblx0XHRcdHRpdGxlOiBcIkFyZSB5b3Ugc3VyZT9cIixcblx0XHRcdHRleHQ6IFwiVGhpcyBhY3Rpb24gaXMgaXJyZXZlcnNpYmxlIHVubGVzcyB5b3UgcmVmcmVzaCB0aGUgcGFnZSwgb2YgY291cnNlLi4uIGJ1dCB0aGF0IHdvdWxkIGFsc28gcmVtb3ZlIGFsbCB5b3VyIGNoYW5nZXMuXCIsXG5cdFx0XHRpY29uOiBcIndhcm5pbmdcIixcblx0XHRcdHNob3dDYW5jZWxCdXR0b246IHRydWUsXG5cdFx0XHRzaG93RGVueUJ1dHRvbjogZmFsc2UsXG5cdFx0XHRjb25maXJtQnV0dG9uVGV4dDogXCJQcm9jZWVkXCIsXG5cdFx0XHRjdXN0b21DbGFzczoge1xuXHRcdFx0XHRjb25maXJtQnV0dG9uOiBcImJ0bi1iYWRcIixcblx0XHRcdFx0Y2FuY2VsQnV0dG9uOiBcImJ0bi1nb29kXCIsXG5cdFx0XHR9LFxuXHRcdH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRpZiAocmVzcG9uc2UuaXNDb25maXJtZWQpIHtcblx0XHRcdFx0Y29udGFpbmVyLm9uKGBhbmltYXRpb25lbmRgLCAoZXYpID0+IHtcblx0XHRcdFx0XHQkKGV2LnRhcmdldCkucmVtb3ZlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNvbnRhaW5lci5hZGRDbGFzcyhgc2xpZGVUb1JpZ2h0YCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8vIFNPQ0lBTCBMSU5LIElDT04gQU5EIFdFQlNJVEUgSU5QVVQgQ0hBTkdFIEhBTkRMRVJcblx0JChkb2N1bWVudCkub24oYGNoYW5nZWAsIGBzZWxlY3Qud2Vic2l0ZS1pbnB1dGAsIChlKSA9PiB7XG5cdFx0bGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXHRcdGxldCBpY29uID0gdGFyZ2V0LmZpbmQoYG9wdGlvbjpzZWxlY3RlZGApLmF0dHIoYGRhdGEtaWNvbmApO1xuXG5cdFx0aWYgKGljb24gPT0gXCJmYXMgZmEtZ2xvYmVcIikge1xuXHRcdFx0dGFyZ2V0LnJlbW92ZUF0dHIoYG5hbWVgKVxuXHRcdFx0XHQuY2xvc2VzdChgdGRgKVxuXHRcdFx0XHQuZmluZChgLndlYnNpdGUtaW5wdXQtYWx0YClcblx0XHRcdFx0LmF0dHIoYG5hbWVgLCBgd2Vic2l0ZVtdYClcblx0XHRcdFx0LnJlbW92ZUNsYXNzKGBkLW5vbmVgKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXR0cihgbmFtZWAsIGB3ZWJzaXRlW11gKVxuXHRcdFx0XHQuY2xvc2VzdChgdGRgKVxuXHRcdFx0XHQuZmluZChgLndlYnNpdGUtaW5wdXQtYWx0YClcblx0XHRcdFx0LnJlbW92ZUF0dHIoYG5hbWVgKVxuXHRcdFx0XHQuYWRkQ2xhc3MoYGQtbm9uZWApO1xuXHRcdH1cblxuXHRcdHRhcmdldC5jbG9zZXN0KGB0ZGApXG5cdFx0XHQuZmluZChgc3BhbmApXG5cdFx0XHQuaHRtbChgPGkgY2xhc3M9XCIke2ljb259XCI+PC9pPmApXG5cdFx0LmNsb3Nlc3QoYHRkYClcblx0XHRcdC5maW5kKGAud2Vic2l0ZS1pbnB1dC1hbHRgKVxuXHRcdFx0LnZhbCh0YXJnZXQudmFsKCkpO1xuXHR9KTtcblxuXHQvLyBBTklNQVRJT04gSEFORExFUlxuXHQkKGRvY3VtZW50KS5vbihgYW5pbWF0aW9uc3RhcnRgLCBgLnNsaWRlRnJvbUxlZnRgLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUudGFyZ2V0KTtcblx0XHRvYmoucmVtb3ZlQ2xhc3MoYG9wYWNpdHktMGApO1xuXHR9KTtcblxuXHQkKGRvY3VtZW50KS5vbihgYW5pbWF0aW9uZW5kYCwgYC5zbGlkZUZyb21MZWZ0YCwgKGUpID0+IHtcblx0XHRsZXQgb2JqID0gJChlLnRhcmdldCk7XG5cdFx0b2JqLnJlbW92ZUNsYXNzKGBzbGlkZUZyb21MZWZ0IGRlbGF5LWFuaW1hdGlvbmApXG5cdFx0XHQucmVtb3ZlQXR0cihgc3R5bGVgKVxuXHRcdFx0LnJlbW92ZVByb3AoYHN0eWxlYCk7XG5cdH0pO1xuXG5cdC8vIFJFVkVSVCBDSEFOR0VTIEhBTkRMRVJcblx0JChgI3JldmVydGApLm9uKGBjbGlja2AsIChlKSA9PiB7XG5cdFx0JC5hamF4KHtcblx0XHRcdHVybDogQVBJLnJlc2V0LFxuXHRcdFx0dHlwZTogXCJQT1NUXCIsXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdCdBdXRob3JpemF0aW9uJzogYEJlYXJlciAkeyQoXCJtZXRhW25hbWU9YmVhcmVyXVwiKS5hdHRyKCdjb250ZW50Jyl9YCxcblx0XHRcdFx0J1hTUkYtVE9LRU4nOiAkKFwibWV0YVtuYW1lPXhzcmZdXCIpLmF0dHIoJ2NvbnRlbnQnKVxuXHRcdFx0fSxcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0X21ldGhvZDogXCJQQVRDSFwiXG5cdFx0XHR9LFxuXHRcdFx0c3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG5cdFx0XHRcdFx0bGV0IHNldHRpbmdzID0gSlNPTi5wYXJzZShyZXNwb25zZS5zZXR0aW5ncyk7XG5cdFx0XHRcdFx0Zm9yIChzZXR0aW5nIG9mIHNldHRpbmdzKSB7XG5cdFx0XHRcdFx0XHRsZXQgdGFyZ2V0ID0gJChgW25hbWU9XCIke3NldHRpbmcubmFtZX1cIl1gKTtcblxuXHRcdFx0XHRcdFx0aWYgKHNldHRpbmcubmFtZSA9PSBcIndlYi1sb2dvXCIpIHtcblx0XHRcdFx0XHRcdFx0dGFyZ2V0LnZhbChcIlwiKVxuXHRcdFx0XHRcdFx0XHRcdC5wYXJlbnQoKVxuXHRcdFx0XHRcdFx0XHRcdC5maW5kKFwiaW1nXCIpXG5cdFx0XHRcdFx0XHRcdFx0LmF0dHIoXCJzcmNcIiwgYCR7QVBJLmhvbWV9L3VwbG9hZHMvc2V0dGluZ3MvJHtzZXR0aW5nLnZhbHVlfWApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0YXJnZXQubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0XHRcdHRhcmdldC52YWwoc2V0dGluZy52YWx1ZSlcblx0XHRcdFx0XHRcdFx0XHRcdC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0U3dhbEZsYXNoLnN1Y2Nlc3MocmVzcG9uc2UubWVzc2FnZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bGV0IGVycm9ycyA9IEpTT04ucGFyc2UocmVzcG9uc2UuZXJyb3JzKTtcblx0XHRcdFx0XHRjb25zb2xlLnRhYmxlKGVycm9ycyk7XG5cblx0XHRcdFx0XHRTd2FsRmxhc2guZXJyb3IoXCJTb21ldGhpbmcgd2VudCB3cm9uZywgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJuYW1lcyI6WyIkIiwib24iLCJlIiwidGFyZ2V0Iiwid2Vic2l0ZU9wdGlvbnMiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiY29uY2F0IiwiYXR0ciIsImdldCIsIkFQSSIsInNpdGVzIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwiSlNPTiIsInBhcnNlIiwid2Vic2l0ZXMiLCJzaXRlIiwidGVtcGxhdGUiLCJhcHBlbmQiLCJTd2FsRmxhc2giLCJlcnJvciIsImRvY3VtZW50IiwiY29udGFpbmVyIiwiY2xvc2VzdCIsIlN3YWwiLCJmaXJlIiwidGl0bGUiLCJ0ZXh0IiwiaWNvbiIsInNob3dDYW5jZWxCdXR0b24iLCJzaG93RGVueUJ1dHRvbiIsImNvbmZpcm1CdXR0b25UZXh0IiwiY3VzdG9tQ2xhc3MiLCJjb25maXJtQnV0dG9uIiwiY2FuY2VsQnV0dG9uIiwidGhlbiIsImlzQ29uZmlybWVkIiwiZXYiLCJyZW1vdmUiLCJhZGRDbGFzcyIsImZpbmQiLCJyZW1vdmVBdHRyIiwicmVtb3ZlQ2xhc3MiLCJodG1sIiwidmFsIiwib2JqIiwicmVtb3ZlUHJvcCIsImFqYXgiLCJ1cmwiLCJyZXNldCIsInR5cGUiLCJkYXRhVHlwZSIsImRhdGEiLCJfbWV0aG9kIiwic2V0dGluZ3MiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwicyIsIm4iLCJkb25lIiwic2V0dGluZyIsInZhbHVlIiwibmFtZSIsInBhcmVudCIsImhvbWUiLCJsZW5ndGgiLCJ0cmlnZ2VyIiwiZXJyIiwiZiIsIm1lc3NhZ2UiLCJlcnJvcnMiLCJjb25zb2xlIiwidGFibGUiXSwic291cmNlUm9vdCI6IiJ9