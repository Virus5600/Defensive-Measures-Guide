/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/util/disable-on-submit.js":
/*!************************************************!*\
  !*** ./resources/js/util/disable-on-submit.js ***!
  \************************************************/
/***/ (function() {

var _this = this;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
$(document).ready(function () {
  // Change submit to either "Updating" or "Submitting" after click
  $('[type=submit], [data-action]').on('click', function (e) {
    var btn = $(e.currentTarget);
    var action = btn.attr('data-action');
    var parentForm = btn.closest("form");

    // Checks if there's a 'needs-validation' class
    if (!parentForm.hasClass("needs-validation")) {
      // if there's none, add the class
      parentForm.addClass('needs-validation');
    }

    // Checks if there's a novalidate prop
    if (typeof parentForm[0].novalidate == 'undefined' || typeof parentForm[0].formnovalidate == 'undefined') {
      // if there's none, default the prop to true
      parentForm.prop("novalidate", true);
      parentForm.attr("novalidate", true);
      parentForm.prop("formnovalidate", true);
      parentForm.attr("formnovalidate", true);
    }

    // Checks for an id
    if (typeof parentForm.attr("id") == 'undefined') {
      // If there's no id, generate one
      parentForm.attr("id", "disableOnSubmit".concat(Math.random().toString(16).slice(2)));
    }

    // If this button is already clicked
    if (btn.attr('data-clicked') == 'true') {
      // Prevent the event from being triggered once more
      e.preventDefault();
      e.stopPropagation();
    }
    // Otherwise...
    else {
      // Store previous button content
      btn.attr("data-dos-prev", btn.html());

      // Update inner html to the designated action text and spinner
      if (action == 'update') btn.html("<div class=\"spinner-border spinner-border-sm text-light\" role=\"status\"><span class=\"sr-only\"></span></div> Updating...");else if (action == 'filter') btn.html("<div class=\"spinner-border spinner-border-sm text-light\" role=\"status\"><span class=\"sr-only\"></span></div> Filtering...");else if (action == 'login') btn.html("<div class=\"spinner-border spinner-border-sm text-light\" role=\"status\"><span class=\"sr-only\"></span></div> Logging in...");else if (action == 'submit') btn.html("<div class=\"spinner-border spinner-border-sm text-light\" role=\"status\"><span class=\"sr-only\"></span></div> Submitting...");
      // Used when the button does not have an action or does not match anything from above.
      else {
        var btnLabel = btn.attr('data-dos-disabled-label');
        var isHTML = btn.attr('data-dos-is-html');
        if (_typeof(btnLabel) === undefined) btn.html("<div class=\"spinner-border spinner-border-sm text-light\" role=\"status\"><span class=\"sr-only\"></span></div> Submitting...");else {
          if (btnLabel === 'true') btn.html(btnLabel);else btn.html("<div class=\"spinner-border spinner-border-sm text-light\" role=\"status\"><span class=\"sr-only\"></span></div> ".concat(btnLabel, "..."));
        }
      }
      btn.addClass("disabled cursor-default");
      btn.attr('data-clicked', 'true');
    }

    // If continuous validation, uses the pseudo selectors, otherwise, uses the classes
    if (parentForm.attr("data-continuous-validation") == 'true') parentForm.addClass('was-validated');

    // Check if form is valid
    if (!document.forms[parentForm.attr('id')].reportValidity()) {
      e.preventDefault();
      e.stopPropagation();

      // If not, proceed to redo the earlier changes so button can be used to submit again
      btn.html("".concat(btn.data("data-dos-prev"))).removeClass("disabled cursor-default").attr('data-clicked', 'false').attr('data-dos-prev');
      parentForm.find(":invalid").not(".dont-validate").addClass("is-invalid").removeClass("is-valid").closest(".form-control:not(.bootstrap-select > select)").addClass("is-invalid").removeClass("is-valid");
      parentForm.find(":valid").not(".dont-validate").addClass("is-valid").removeClass("is-invalid").closest(".form-control:not(.bootstrap-select > select)").addClass("is-valid").removeClass("is-invalid");
      parentForm.removeClass(".was-validated").find(".dont-validate").removeClass("is-valid is-invalid").closest(".form-control").removeClass("is-valid is-invalid");
    }
  });
  $('form').on('submit', function (e) {
    $(_this).find('[type=submit]').trigger('click');
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./resources/js/util/disable-on-submit.js"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsZ0JBQWdCLENBQUMsQ0FDckJyQixRQUFRLENBQUMsVUFBVSxDQUFDLENBQ3BCbUIsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUN6QnJCLE9BQU8sQ0FBQywrQ0FBK0MsQ0FBQyxDQUN4REUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUNwQm1CLFdBQVcsQ0FBQyxZQUFZLENBQUM7TUFFM0J0QixVQUFVLENBQUNzQixXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FDdENDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUN0QkQsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQ2xDckIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUN4QnFCLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQztJQUNyQztFQUNELENBQUMsQ0FBQztFQUVGL0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDRyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUFDSixDQUFDLENBQUNrQyxLQUFJLENBQUMsQ0FBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDRyxPQUFPLENBQUMsT0FBTyxDQUFDO0VBQUMsQ0FBQyxDQUFDO0FBQ2pGLENBQUMsQ0FBQzs7Ozs7OztVRTVHRjtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3V0aWwvZGlzYWJsZS1vbi1zdWJtaXQuanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly8vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcblx0Ly8gQ2hhbmdlIHN1Ym1pdCB0byBlaXRoZXIgXCJVcGRhdGluZ1wiIG9yIFwiU3VibWl0dGluZ1wiIGFmdGVyIGNsaWNrXG5cdCQoJ1t0eXBlPXN1Ym1pdF0sIFtkYXRhLWFjdGlvbl0nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuXHRcdGxldCBidG4gPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IGFjdGlvbiA9IGJ0bi5hdHRyKCdkYXRhLWFjdGlvbicpO1xuXHRcdGxldCBwYXJlbnRGb3JtID0gYnRuLmNsb3Nlc3QoXCJmb3JtXCIpO1xuXG5cdFx0Ly8gQ2hlY2tzIGlmIHRoZXJlJ3MgYSAnbmVlZHMtdmFsaWRhdGlvbicgY2xhc3Ncblx0XHRpZiAoIXBhcmVudEZvcm0uaGFzQ2xhc3MoXCJuZWVkcy12YWxpZGF0aW9uXCIpKSB7XG5cdFx0XHQvLyBpZiB0aGVyZSdzIG5vbmUsIGFkZCB0aGUgY2xhc3Ncblx0XHRcdHBhcmVudEZvcm0uYWRkQ2xhc3MoJ25lZWRzLXZhbGlkYXRpb24nKTtcblx0XHR9XG5cblx0XHQvLyBDaGVja3MgaWYgdGhlcmUncyBhIG5vdmFsaWRhdGUgcHJvcFxuXHRcdGlmICh0eXBlb2YgcGFyZW50Rm9ybVswXS5ub3ZhbGlkYXRlID09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBwYXJlbnRGb3JtWzBdLmZvcm1ub3ZhbGlkYXRlID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvLyBpZiB0aGVyZSdzIG5vbmUsIGRlZmF1bHQgdGhlIHByb3AgdG8gdHJ1ZVxuXHRcdFx0cGFyZW50Rm9ybS5wcm9wKFwibm92YWxpZGF0ZVwiLCB0cnVlKTtcblx0XHRcdHBhcmVudEZvcm0uYXR0cihcIm5vdmFsaWRhdGVcIiwgdHJ1ZSk7XG5cblx0XHRcdHBhcmVudEZvcm0ucHJvcChcImZvcm1ub3ZhbGlkYXRlXCIsIHRydWUpO1xuXHRcdFx0cGFyZW50Rm9ybS5hdHRyKFwiZm9ybW5vdmFsaWRhdGVcIiwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2tzIGZvciBhbiBpZFxuXHRcdGlmICh0eXBlb2YgcGFyZW50Rm9ybS5hdHRyKFwiaWRcIikgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdC8vIElmIHRoZXJlJ3Mgbm8gaWQsIGdlbmVyYXRlIG9uZVxuXHRcdFx0cGFyZW50Rm9ybS5hdHRyKFwiaWRcIiwgYGRpc2FibGVPblN1Ym1pdCR7TWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc2xpY2UoMil9YCk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhpcyBidXR0b24gaXMgYWxyZWFkeSBjbGlja2VkXG5cdFx0aWYgKGJ0bi5hdHRyKCdkYXRhLWNsaWNrZWQnKSA9PSAndHJ1ZScpIHtcblx0XHRcdC8vIFByZXZlbnQgdGhlIGV2ZW50IGZyb20gYmVpbmcgdHJpZ2dlcmVkIG9uY2UgbW9yZVxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0Ly8gT3RoZXJ3aXNlLi4uXG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyBTdG9yZSBwcmV2aW91cyBidXR0b24gY29udGVudFxuXHRcdFx0YnRuLmF0dHIoXCJkYXRhLWRvcy1wcmV2XCIsIGJ0bi5odG1sKCkpO1xuXG5cdFx0XHQvLyBVcGRhdGUgaW5uZXIgaHRtbCB0byB0aGUgZGVzaWduYXRlZCBhY3Rpb24gdGV4dCBhbmQgc3Bpbm5lclxuXHRcdFx0aWYgKGFjdGlvbiA9PSAndXBkYXRlJylcblx0XHRcdFx0YnRuLmh0bWwoYDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbSB0ZXh0LWxpZ2h0XCIgcm9sZT1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwic3Itb25seVwiPjwvc3Bhbj48L2Rpdj4gVXBkYXRpbmcuLi5gKTtcblx0XHRcdGVsc2UgaWYgKGFjdGlvbiA9PSAnZmlsdGVyJylcblx0XHRcdFx0YnRuLmh0bWwoYDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbSB0ZXh0LWxpZ2h0XCIgcm9sZT1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwic3Itb25seVwiPjwvc3Bhbj48L2Rpdj4gRmlsdGVyaW5nLi4uYCk7XG5cdFx0XHRlbHNlIGlmIChhY3Rpb24gPT0gJ2xvZ2luJylcblx0XHRcdFx0YnRuLmh0bWwoYDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbSB0ZXh0LWxpZ2h0XCIgcm9sZT1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwic3Itb25seVwiPjwvc3Bhbj48L2Rpdj4gTG9nZ2luZyBpbi4uLmApO1xuXHRcdFx0ZWxzZSBpZiAoYWN0aW9uID09ICdzdWJtaXQnKVxuXHRcdFx0XHRidG4uaHRtbChgPGRpdiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtIHRleHQtbGlnaHRcIiByb2xlPVwic3RhdHVzXCI+PHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+PC9zcGFuPjwvZGl2PiBTdWJtaXR0aW5nLi4uYCk7XG5cdFx0XHQvLyBVc2VkIHdoZW4gdGhlIGJ1dHRvbiBkb2VzIG5vdCBoYXZlIGFuIGFjdGlvbiBvciBkb2VzIG5vdCBtYXRjaCBhbnl0aGluZyBmcm9tIGFib3ZlLlxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCBidG5MYWJlbCA9IGJ0bi5hdHRyKCdkYXRhLWRvcy1kaXNhYmxlZC1sYWJlbCcpO1xuXHRcdFx0XHRsZXQgaXNIVE1MID0gYnRuLmF0dHIoJ2RhdGEtZG9zLWlzLWh0bWwnKTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGJ0bkxhYmVsID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0YnRuLmh0bWwoYDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbSB0ZXh0LWxpZ2h0XCIgcm9sZT1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwic3Itb25seVwiPjwvc3Bhbj48L2Rpdj4gU3VibWl0dGluZy4uLmApO1xuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZiAoYnRuTGFiZWwgPT09ICd0cnVlJylcblx0XHRcdFx0XHRcdGJ0bi5odG1sKGJ0bkxhYmVsKTtcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRidG4uaHRtbChgPGRpdiBjbGFzcz1cInNwaW5uZXItYm9yZGVyIHNwaW5uZXItYm9yZGVyLXNtIHRleHQtbGlnaHRcIiByb2xlPVwic3RhdHVzXCI+PHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+PC9zcGFuPjwvZGl2PiAke2J0bkxhYmVsfS4uLmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGJ0bi5hZGRDbGFzcyhgZGlzYWJsZWQgY3Vyc29yLWRlZmF1bHRgKTtcblx0XHRcdGJ0bi5hdHRyKCdkYXRhLWNsaWNrZWQnLCAndHJ1ZScpO1xuXHRcdH1cblxuXHRcdC8vIElmIGNvbnRpbnVvdXMgdmFsaWRhdGlvbiwgdXNlcyB0aGUgcHNldWRvIHNlbGVjdG9ycywgb3RoZXJ3aXNlLCB1c2VzIHRoZSBjbGFzc2VzXG5cdFx0aWYgKHBhcmVudEZvcm0uYXR0cihcImRhdGEtY29udGludW91cy12YWxpZGF0aW9uXCIpID09ICd0cnVlJylcblx0XHRcdHBhcmVudEZvcm0uYWRkQ2xhc3MoJ3dhcy12YWxpZGF0ZWQnKTtcblxuXHRcdC8vIENoZWNrIGlmIGZvcm0gaXMgdmFsaWRcblx0XHRpZiAoIWRvY3VtZW50LmZvcm1zW3BhcmVudEZvcm0uYXR0cignaWQnKV0ucmVwb3J0VmFsaWRpdHkoKSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0Ly8gSWYgbm90LCBwcm9jZWVkIHRvIHJlZG8gdGhlIGVhcmxpZXIgY2hhbmdlcyBzbyBidXR0b24gY2FuIGJlIHVzZWQgdG8gc3VibWl0IGFnYWluXG5cdFx0XHRidG4uaHRtbChgJHtidG4uZGF0YShcImRhdGEtZG9zLXByZXZcIil9YClcblx0XHRcdFx0LnJlbW92ZUNsYXNzKGBkaXNhYmxlZCBjdXJzb3ItZGVmYXVsdGApXG5cdFx0XHRcdC5hdHRyKCdkYXRhLWNsaWNrZWQnLCAnZmFsc2UnKVxuXHRcdFx0XHQuYXR0cignZGF0YS1kb3MtcHJldicpO1xuXG5cdFx0XHRwYXJlbnRGb3JtLmZpbmQoXCI6aW52YWxpZFwiKVxuXHRcdFx0XHQubm90KFwiLmRvbnQtdmFsaWRhdGVcIilcblx0XHRcdFx0LmFkZENsYXNzKFwiaXMtaW52YWxpZFwiKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJpcy12YWxpZFwiKVxuXHRcdFx0XHQuY2xvc2VzdChcIi5mb3JtLWNvbnRyb2w6bm90KC5ib290c3RyYXAtc2VsZWN0ID4gc2VsZWN0KVwiKVxuXHRcdFx0XHQuYWRkQ2xhc3MoXCJpcy1pbnZhbGlkXCIpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhcImlzLXZhbGlkXCIpO1xuXG5cdFx0XHRwYXJlbnRGb3JtLmZpbmQoXCI6dmFsaWRcIilcblx0XHRcdFx0Lm5vdChcIi5kb250LXZhbGlkYXRlXCIpXG5cdFx0XHRcdC5hZGRDbGFzcyhcImlzLXZhbGlkXCIpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhcImlzLWludmFsaWRcIilcblx0XHRcdFx0LmNsb3Nlc3QoXCIuZm9ybS1jb250cm9sOm5vdCguYm9vdHN0cmFwLXNlbGVjdCA+IHNlbGVjdClcIilcblx0XHRcdFx0LmFkZENsYXNzKFwiaXMtdmFsaWRcIilcblx0XHRcdFx0LnJlbW92ZUNsYXNzKFwiaXMtaW52YWxpZFwiKTtcblx0XHRcdFxuXHRcdFx0cGFyZW50Rm9ybS5yZW1vdmVDbGFzcyhcIi53YXMtdmFsaWRhdGVkXCIpXG5cdFx0XHRcdC5maW5kKFwiLmRvbnQtdmFsaWRhdGVcIilcblx0XHRcdFx0LnJlbW92ZUNsYXNzKFwiaXMtdmFsaWQgaXMtaW52YWxpZFwiKVxuXHRcdFx0XHQuY2xvc2VzdChcIi5mb3JtLWNvbnRyb2xcIilcblx0XHRcdFx0LnJlbW92ZUNsYXNzKFwiaXMtdmFsaWQgaXMtaW52YWxpZFwiKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoJ2Zvcm0nKS5vbignc3VibWl0JywgKGUpID0+IHskKHRoaXMpLmZpbmQoJ1t0eXBlPXN1Ym1pdF0nKS50cmlnZ2VyKCdjbGljaycpO30pO1xufSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTtcbl9fd2VicGFja19tb2R1bGVzX19bXCIuL3Jlc291cmNlcy9qcy91dGlsL2Rpc2FibGUtb24tc3VibWl0LmpzXCJdKCk7XG4iLCIiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJvbiIsImUiLCJidG4iLCJjdXJyZW50VGFyZ2V0IiwiYWN0aW9uIiwiYXR0ciIsInBhcmVudEZvcm0iLCJjbG9zZXN0IiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsIm5vdmFsaWRhdGUiLCJmb3Jtbm92YWxpZGF0ZSIsInByb3AiLCJjb25jYXQiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzbGljZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiaHRtbCIsImJ0bkxhYmVsIiwiaXNIVE1MIiwiX3R5cGVvZiIsInVuZGVmaW5lZCIsImZvcm1zIiwicmVwb3J0VmFsaWRpdHkiLCJkYXRhIiwicmVtb3ZlQ2xhc3MiLCJmaW5kIiwibm90IiwiX3RoaXMiLCJ0cmlnZ2VyIl0sInNvdXJjZVJvb3QiOiIifQ==