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

/***/ }),

/***/ "./resources/js/util/fallback-image.js":
/*!*********************************************!*\
  !*** ./resources/js/util/fallback-image.js ***!
  \*********************************************/
/***/ (() => {

// Missing image handling
var head = document.getElementsByTagName('head')[0];
var img = document.getElementsByTagName('img');
var style = "\n<style>\n\t@keyframes img-fallback-missing-pulse {\n\t\t0% {\n\t\t\topacity: 0.125;\n\t\t\twidth: 0%;\n\t\t\theight: 0%;\n\t\t}\n\t\t50% {\n\t\t\topacity: 1;\n\t\t}\n\t\t100% {\n\t\t\topacity: 0.125;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t}\n\t}\n\n\t.img-fallback-missing {\n\t\tposition: relative;\n\t\toverflow: hidden;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}\n\n\t.img-fallback-missing::before {\n\t\tposition: absolute;\n\t\ttop: 50%;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%) translateY(-50%);\n\n\t\tcontent: '';\n\t\twidth: 100%;\n\t\theight: 100%;\n\n\t\tborder-radius: 5px;\n\t\tbox-shadow: 0px 0px 12.5px #ff0000 inset;\n\t\t\n\t\t-webkit-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;\n\t\t-moz-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;\n\t\t-ms-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;\n\t\t-o-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;\n\t\tanimation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;\n\t\t\n\t\t-webkit-animation-iteration-count: infinite;\n\t\t-moz-animation-iteration-count: infinite;\n\t\t-ms-animation-iteration-count: infinite;\n\t\t-o-animation-iteration-count: infinite;\n\t\tanimation-iteration-count: infinite;\n\t}\n</style>\n";
head.insertAdjacentHTML("beforeend", style);
var i = 1;
Array.from(img).forEach(function (v) {
  v.addEventListener('error', function fallbackImageOnErrorReplace(e) {
    var obj = e.currentTarget;
    var dfiAttr1 = obj.getAttribute('data-fallback-image');
    var dfiAttr2 = obj.getAttribute('data-fallback-img');
    if (dfiAttr1 !== null && dfiAttr1 != 'none') {
      obj.src = dfiAttr1;
    } else if (dfiAttr2 !== null && dfiAttr2 != 'none') {
      obj.src = dfiAttr2;
    } else {
      var fiFallbackImgURL = typeof fiFallbackImg != 'undefined' ? fiFallbackImg : fiFallbackImage;
      obj.src = fiFallbackImgURL;
      if (typeof fiFallbackImgURL == 'undefined') {
        obj.id = "imgFallbackMissing".concat(i++);
        obj.classList.add('img-fallback-missing');
        console.warn('It seems that this element does not have a fallback image:\n', (window.location.href.indexOf('#') < 0 ? window.location.href : window.location.href.substr(0, window.location.href.indexOf('#'))) + "#" + obj.id);
      }
    }
    obj.removeEventListener('error', fallbackImageOnErrorReplace);
  });
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__["./resources/js/util/disable-on-submit.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./resources/js/util/fallback-image.js"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxDQUFDO01BQ2hPO0lBQ0Q7SUFFQVIsR0FBRyxDQUFDa0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFbkIsMkJBQTJCLENBQUM7RUFDOUQsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDOzs7Ozs7O1VFdkZGO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy91dGlsL2Rpc2FibGUtb24tc3VibWl0LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9qcy91dGlsL2ZhbGxiYWNrLWltYWdlLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovLy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG5cdC8vIENoYW5nZSBzdWJtaXQgdG8gZWl0aGVyIFwiVXBkYXRpbmdcIiBvciBcIlN1Ym1pdHRpbmdcIiBhZnRlciBjbGlja1xuXHQkKCdbdHlwZT1zdWJtaXRdLCBbZGF0YS1hY3Rpb25dJykub24oJ2NsaWNrJywgKGUpID0+IHtcblx0XHRsZXQgYnRuID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdGxldCBhY3Rpb24gPSBidG4uYXR0cignZGF0YS1hY3Rpb24nKTtcblx0XHRsZXQgcGFyZW50Rm9ybSA9IGJ0bi5jbG9zZXN0KFwiZm9ybVwiKTtcblxuXHRcdC8vIENoZWNrcyBpZiB0aGVyZSdzIGEgJ25lZWRzLXZhbGlkYXRpb24nIGNsYXNzXG5cdFx0aWYgKCFwYXJlbnRGb3JtLmhhc0NsYXNzKFwibmVlZHMtdmFsaWRhdGlvblwiKSkge1xuXHRcdFx0Ly8gaWYgdGhlcmUncyBub25lLCBhZGQgdGhlIGNsYXNzXG5cdFx0XHRwYXJlbnRGb3JtLmFkZENsYXNzKCduZWVkcy12YWxpZGF0aW9uJyk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2tzIGlmIHRoZXJlJ3MgYSBub3ZhbGlkYXRlIHByb3Bcblx0XHRpZiAodHlwZW9mIHBhcmVudEZvcm1bMF0ubm92YWxpZGF0ZSA9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgcGFyZW50Rm9ybVswXS5mb3Jtbm92YWxpZGF0ZSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Ly8gaWYgdGhlcmUncyBub25lLCBkZWZhdWx0IHRoZSBwcm9wIHRvIHRydWVcblx0XHRcdHBhcmVudEZvcm0ucHJvcChcIm5vdmFsaWRhdGVcIiwgdHJ1ZSk7XG5cdFx0XHRwYXJlbnRGb3JtLmF0dHIoXCJub3ZhbGlkYXRlXCIsIHRydWUpO1xuXG5cdFx0XHRwYXJlbnRGb3JtLnByb3AoXCJmb3Jtbm92YWxpZGF0ZVwiLCB0cnVlKTtcblx0XHRcdHBhcmVudEZvcm0uYXR0cihcImZvcm1ub3ZhbGlkYXRlXCIsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrcyBmb3IgYW4gaWRcblx0XHRpZiAodHlwZW9mIHBhcmVudEZvcm0uYXR0cihcImlkXCIpID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvLyBJZiB0aGVyZSdzIG5vIGlkLCBnZW5lcmF0ZSBvbmVcblx0XHRcdHBhcmVudEZvcm0uYXR0cihcImlkXCIsIGBkaXNhYmxlT25TdWJtaXQke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpfWApO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoaXMgYnV0dG9uIGlzIGFscmVhZHkgY2xpY2tlZFxuXHRcdGlmIChidG4uYXR0cignZGF0YS1jbGlja2VkJykgPT0gJ3RydWUnKSB7XG5cdFx0XHQvLyBQcmV2ZW50IHRoZSBldmVudCBmcm9tIGJlaW5nIHRyaWdnZXJlZCBvbmNlIG1vcmVcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdC8vIE90aGVyd2lzZS4uLlxuXHRcdGVsc2Uge1xuXHRcdFx0Ly8gU3RvcmUgcHJldmlvdXMgYnV0dG9uIGNvbnRlbnRcblx0XHRcdGJ0bi5hdHRyKFwiZGF0YS1kb3MtcHJldlwiLCBidG4uaHRtbCgpKTtcblxuXHRcdFx0Ly8gVXBkYXRlIGlubmVyIGh0bWwgdG8gdGhlIGRlc2lnbmF0ZWQgYWN0aW9uIHRleHQgYW5kIHNwaW5uZXJcblx0XHRcdGlmIChhY3Rpb24gPT0gJ3VwZGF0ZScpXG5cdFx0XHRcdGJ0bi5odG1sKGA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc20gdGV4dC1saWdodFwiIHJvbGU9XCJzdGF0dXNcIj48c3BhbiBjbGFzcz1cInNyLW9ubHlcIj48L3NwYW4+PC9kaXY+IFVwZGF0aW5nLi4uYCk7XG5cdFx0XHRlbHNlIGlmIChhY3Rpb24gPT0gJ2ZpbHRlcicpXG5cdFx0XHRcdGJ0bi5odG1sKGA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc20gdGV4dC1saWdodFwiIHJvbGU9XCJzdGF0dXNcIj48c3BhbiBjbGFzcz1cInNyLW9ubHlcIj48L3NwYW4+PC9kaXY+IEZpbHRlcmluZy4uLmApO1xuXHRcdFx0ZWxzZSBpZiAoYWN0aW9uID09ICdsb2dpbicpXG5cdFx0XHRcdGJ0bi5odG1sKGA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc20gdGV4dC1saWdodFwiIHJvbGU9XCJzdGF0dXNcIj48c3BhbiBjbGFzcz1cInNyLW9ubHlcIj48L3NwYW4+PC9kaXY+IExvZ2dpbmcgaW4uLi5gKTtcblx0XHRcdGVsc2UgaWYgKGFjdGlvbiA9PSAnc3VibWl0Jylcblx0XHRcdFx0YnRuLmh0bWwoYDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbSB0ZXh0LWxpZ2h0XCIgcm9sZT1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwic3Itb25seVwiPjwvc3Bhbj48L2Rpdj4gU3VibWl0dGluZy4uLmApO1xuXHRcdFx0Ly8gVXNlZCB3aGVuIHRoZSBidXR0b24gZG9lcyBub3QgaGF2ZSBhbiBhY3Rpb24gb3IgZG9lcyBub3QgbWF0Y2ggYW55dGhpbmcgZnJvbSBhYm92ZS5cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsZXQgYnRuTGFiZWwgPSBidG4uYXR0cignZGF0YS1kb3MtZGlzYWJsZWQtbGFiZWwnKTtcblx0XHRcdFx0bGV0IGlzSFRNTCA9IGJ0bi5hdHRyKCdkYXRhLWRvcy1pcy1odG1sJyk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBidG5MYWJlbCA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGJ0bi5odG1sKGA8ZGl2IGNsYXNzPVwic3Bpbm5lci1ib3JkZXIgc3Bpbm5lci1ib3JkZXItc20gdGV4dC1saWdodFwiIHJvbGU9XCJzdGF0dXNcIj48c3BhbiBjbGFzcz1cInNyLW9ubHlcIj48L3NwYW4+PC9kaXY+IFN1Ym1pdHRpbmcuLi5gKTtcblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGJ0bkxhYmVsID09PSAndHJ1ZScpXG5cdFx0XHRcdFx0XHRidG4uaHRtbChidG5MYWJlbCk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0YnRuLmh0bWwoYDxkaXYgY2xhc3M9XCJzcGlubmVyLWJvcmRlciBzcGlubmVyLWJvcmRlci1zbSB0ZXh0LWxpZ2h0XCIgcm9sZT1cInN0YXR1c1wiPjxzcGFuIGNsYXNzPVwic3Itb25seVwiPjwvc3Bhbj48L2Rpdj4gJHtidG5MYWJlbH0uLi5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRidG4uYWRkQ2xhc3MoYGRpc2FibGVkIGN1cnNvci1kZWZhdWx0YCk7XG5cdFx0XHRidG4uYXR0cignZGF0YS1jbGlja2VkJywgJ3RydWUnKTtcblx0XHR9XG5cblx0XHQvLyBJZiBjb250aW51b3VzIHZhbGlkYXRpb24sIHVzZXMgdGhlIHBzZXVkbyBzZWxlY3RvcnMsIG90aGVyd2lzZSwgdXNlcyB0aGUgY2xhc3Nlc1xuXHRcdGlmIChwYXJlbnRGb3JtLmF0dHIoXCJkYXRhLWNvbnRpbnVvdXMtdmFsaWRhdGlvblwiKSA9PSAndHJ1ZScpXG5cdFx0XHRwYXJlbnRGb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG5cblx0XHQvLyBDaGVjayBpZiBmb3JtIGlzIHZhbGlkXG5cdFx0aWYgKCFkb2N1bWVudC5mb3Jtc1twYXJlbnRGb3JtLmF0dHIoJ2lkJyldLnJlcG9ydFZhbGlkaXR5KCkpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cblx0XHRcdC8vIElmIG5vdCwgcHJvY2VlZCB0byByZWRvIHRoZSBlYXJsaWVyIGNoYW5nZXMgc28gYnV0dG9uIGNhbiBiZSB1c2VkIHRvIHN1Ym1pdCBhZ2FpblxuXHRcdFx0YnRuLmh0bWwoYCR7YnRuLmRhdGEoXCJkYXRhLWRvcy1wcmV2XCIpfWApXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhgZGlzYWJsZWQgY3Vyc29yLWRlZmF1bHRgKVxuXHRcdFx0XHQuYXR0cignZGF0YS1jbGlja2VkJywgJ2ZhbHNlJylcblx0XHRcdFx0LmF0dHIoJ2RhdGEtZG9zLXByZXYnKTtcblxuXHRcdFx0cGFyZW50Rm9ybS5maW5kKFwiOmludmFsaWRcIilcblx0XHRcdFx0Lm5vdChcIi5kb250LXZhbGlkYXRlXCIpXG5cdFx0XHRcdC5hZGRDbGFzcyhcImlzLWludmFsaWRcIilcblx0XHRcdFx0LnJlbW92ZUNsYXNzKFwiaXMtdmFsaWRcIilcblx0XHRcdFx0LmNsb3Nlc3QoXCIuZm9ybS1jb250cm9sOm5vdCguYm9vdHN0cmFwLXNlbGVjdCA+IHNlbGVjdClcIilcblx0XHRcdFx0LmFkZENsYXNzKFwiaXMtaW52YWxpZFwiKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJpcy12YWxpZFwiKTtcblxuXHRcdFx0cGFyZW50Rm9ybS5maW5kKFwiOnZhbGlkXCIpXG5cdFx0XHRcdC5ub3QoXCIuZG9udC12YWxpZGF0ZVwiKVxuXHRcdFx0XHQuYWRkQ2xhc3MoXCJpcy12YWxpZFwiKVxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJpcy1pbnZhbGlkXCIpXG5cdFx0XHRcdC5jbG9zZXN0KFwiLmZvcm0tY29udHJvbDpub3QoLmJvb3RzdHJhcC1zZWxlY3QgPiBzZWxlY3QpXCIpXG5cdFx0XHRcdC5hZGRDbGFzcyhcImlzLXZhbGlkXCIpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhcImlzLWludmFsaWRcIik7XG5cdFx0XHRcblx0XHRcdHBhcmVudEZvcm0ucmVtb3ZlQ2xhc3MoXCIud2FzLXZhbGlkYXRlZFwiKVxuXHRcdFx0XHQuZmluZChcIi5kb250LXZhbGlkYXRlXCIpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhcImlzLXZhbGlkIGlzLWludmFsaWRcIilcblx0XHRcdFx0LmNsb3Nlc3QoXCIuZm9ybS1jb250cm9sXCIpXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyhcImlzLXZhbGlkIGlzLWludmFsaWRcIik7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCdmb3JtJykub24oJ3N1Ym1pdCcsIChlKSA9PiB7JCh0aGlzKS5maW5kKCdbdHlwZT1zdWJtaXRdJykudHJpZ2dlcignY2xpY2snKTt9KTtcbn0pOyIsIi8vIE1pc3NpbmcgaW1hZ2UgaGFuZGxpbmdcclxuY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XHJcbmNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKTtcclxuXHJcbmNvbnN0IHN0eWxlID0gYFxyXG48c3R5bGU+XHJcblx0QGtleWZyYW1lcyBpbWctZmFsbGJhY2stbWlzc2luZy1wdWxzZSB7XHJcblx0XHQwJSB7XHJcblx0XHRcdG9wYWNpdHk6IDAuMTI1O1xyXG5cdFx0XHR3aWR0aDogMCU7XHJcblx0XHRcdGhlaWdodDogMCU7XHJcblx0XHR9XHJcblx0XHQ1MCUge1xyXG5cdFx0XHRvcGFjaXR5OiAxO1xyXG5cdFx0fVxyXG5cdFx0MTAwJSB7XHJcblx0XHRcdG9wYWNpdHk6IDAuMTI1O1xyXG5cdFx0XHR3aWR0aDogMTAwJTtcclxuXHRcdFx0aGVpZ2h0OiAxMDAlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LmltZy1mYWxsYmFjay1taXNzaW5nIHtcclxuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHRcdG92ZXJmbG93OiBoaWRkZW47XHJcblx0XHR3aWR0aDogMTAwJTtcclxuXHRcdGhlaWdodDogMTAwJTtcclxuXHR9XHJcblxyXG5cdC5pbWctZmFsbGJhY2stbWlzc2luZzo6YmVmb3JlIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogNTAlO1xyXG5cdFx0bGVmdDogNTAlO1xyXG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XHJcblxyXG5cdFx0Y29udGVudDogJyc7XHJcblx0XHR3aWR0aDogMTAwJTtcclxuXHRcdGhlaWdodDogMTAwJTtcclxuXHJcblx0XHRib3JkZXItcmFkaXVzOiA1cHg7XHJcblx0XHRib3gtc2hhZG93OiAwcHggMHB4IDEyLjVweCAjZmYwMDAwIGluc2V0O1xyXG5cdFx0XHJcblx0XHQtd2Via2l0LWFuaW1hdGlvbjogMS4yNXMgY3ViaWMtYmV6aWVyKDAuNSwgMSwgMC41LCAxKSBpbWctZmFsbGJhY2stbWlzc2luZy1wdWxzZTtcclxuXHRcdC1tb3otYW5pbWF0aW9uOiAxLjI1cyBjdWJpYy1iZXppZXIoMC41LCAxLCAwLjUsIDEpIGltZy1mYWxsYmFjay1taXNzaW5nLXB1bHNlO1xyXG5cdFx0LW1zLWFuaW1hdGlvbjogMS4yNXMgY3ViaWMtYmV6aWVyKDAuNSwgMSwgMC41LCAxKSBpbWctZmFsbGJhY2stbWlzc2luZy1wdWxzZTtcclxuXHRcdC1vLWFuaW1hdGlvbjogMS4yNXMgY3ViaWMtYmV6aWVyKDAuNSwgMSwgMC41LCAxKSBpbWctZmFsbGJhY2stbWlzc2luZy1wdWxzZTtcclxuXHRcdGFuaW1hdGlvbjogMS4yNXMgY3ViaWMtYmV6aWVyKDAuNSwgMSwgMC41LCAxKSBpbWctZmFsbGJhY2stbWlzc2luZy1wdWxzZTtcclxuXHRcdFxyXG5cdFx0LXdlYmtpdC1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuXHRcdC1tb3otYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcblx0XHQtbXMtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcblx0XHQtby1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxuXHRcdGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xyXG5cdH1cclxuPC9zdHlsZT5cclxuYDtcclxuXHJcbmhlYWQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHN0eWxlKTtcclxuXHJcbmxldCBpID0gMTtcclxuQXJyYXkuZnJvbShpbWcpLmZvckVhY2goKHYpID0+IHtcclxuXHR2LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gZmFsbGJhY2tJbWFnZU9uRXJyb3JSZXBsYWNlKGUpIHtcclxuXHRcdGxldCBvYmogPSBlLmN1cnJlbnRUYXJnZXQ7XHJcblx0XHRsZXQgZGZpQXR0cjEgPSBvYmouZ2V0QXR0cmlidXRlKCdkYXRhLWZhbGxiYWNrLWltYWdlJyk7XHJcblx0XHRsZXQgZGZpQXR0cjIgPSBvYmouZ2V0QXR0cmlidXRlKCdkYXRhLWZhbGxiYWNrLWltZycpO1xyXG5cclxuXHRcdGlmIChkZmlBdHRyMSAhPT0gbnVsbCAmJiBkZmlBdHRyMSAhPSAnbm9uZScpIHtcclxuXHRcdFx0b2JqLnNyYyA9IGRmaUF0dHIxO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoZGZpQXR0cjIgIT09IG51bGwgJiYgZGZpQXR0cjIgIT0gJ25vbmUnKSB7XHJcblx0XHRcdG9iai5zcmMgPSBkZmlBdHRyMjtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRsZXQgZmlGYWxsYmFja0ltZ1VSTCA9IHR5cGVvZiBmaUZhbGxiYWNrSW1nICE9ICd1bmRlZmluZWQnID9cclxuXHRcdFx0XHRmaUZhbGxiYWNrSW1nIDogZmlGYWxsYmFja0ltYWdlO1xyXG5cclxuXHRcdFx0b2JqLnNyYyA9IGZpRmFsbGJhY2tJbWdVUkw7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIGZpRmFsbGJhY2tJbWdVUkwgPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRvYmouaWQgPSBgaW1nRmFsbGJhY2tNaXNzaW5nJHtpKyt9YDtcclxuXHRcdFx0XHRvYmouY2xhc3NMaXN0LmFkZCgnaW1nLWZhbGxiYWNrLW1pc3NpbmcnKTtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ0l0IHNlZW1zIHRoYXQgdGhpcyBlbGVtZW50IGRvZXMgbm90IGhhdmUgYSBmYWxsYmFjayBpbWFnZTpcXG4nLCAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpIDwgMCA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmIDogd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyKDAsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMnKSkpICsgXCIjXCIgKyBvYmouaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFsbGJhY2tJbWFnZU9uRXJyb3JSZXBsYWNlKTtcclxuXHR9KTtcclxufSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX21vZHVsZXNfX1tcIi4vcmVzb3VyY2VzL2pzL3V0aWwvZGlzYWJsZS1vbi1zdWJtaXQuanNcIl0oKTtcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0ge307XG5fX3dlYnBhY2tfbW9kdWxlc19fW1wiLi9yZXNvdXJjZXMvanMvdXRpbC9mYWxsYmFjay1pbWFnZS5qc1wiXSgpO1xuIiwiIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJlIiwiYnRuIiwiY3VycmVudFRhcmdldCIsImFjdGlvbiIsImF0dHIiLCJwYXJlbnRGb3JtIiwiY2xvc2VzdCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJub3ZhbGlkYXRlIiwiZm9ybW5vdmFsaWRhdGUiLCJwcm9wIiwiY29uY2F0IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsImh0bWwiLCJidG5MYWJlbCIsImlzSFRNTCIsIl90eXBlb2YiLCJ1bmRlZmluZWQiLCJmb3JtcyIsInJlcG9ydFZhbGlkaXR5IiwiZGF0YSIsInJlbW92ZUNsYXNzIiwiZmluZCIsIm5vdCIsIl90aGlzIiwidHJpZ2dlciIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImltZyIsInN0eWxlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiaSIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJ2IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZhbGxiYWNrSW1hZ2VPbkVycm9yUmVwbGFjZSIsIm9iaiIsImRmaUF0dHIxIiwiZ2V0QXR0cmlidXRlIiwiZGZpQXR0cjIiLCJzcmMiLCJmaUZhbGxiYWNrSW1nVVJMIiwiZmlGYWxsYmFja0ltZyIsImZpRmFsbGJhY2tJbWFnZSIsImlkIiwiY2xhc3NMaXN0IiwiYWRkIiwiY29uc29sZSIsIndhcm4iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpbmRleE9mIiwic3Vic3RyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=