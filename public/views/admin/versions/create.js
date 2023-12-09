/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./resources/js/views/admin/versions/create.js ***!
  \*****************************************************/
$(function () {
  var _history$state$origin, _history$state, _history$state2, _history$state3;
  var editor = {};
  var state = {
    original: (_history$state$origin = (_history$state = history.state) === null || _history$state === void 0 ? void 0 : _history$state.original) !== null && _history$state$origin !== void 0 ? _history$state$origin : $("form#form-content").html()
  };

  // Description MD Editor
  var desc = $("#description");
  editor.description = new Editor({
    el: desc[0],
    initialEditType: 'markdown',
    theme: 'dark',
    placeholder: 'Description',
    initialValue: $("#description_hidden").val(),
    autofocus: false,
    events: {
      blur: function blur() {
        document.getElementById("description_hidden").value = editor.description.getMarkdown();
      }
    }
  });
  $(document).on("blur", "#description_hidden", function (e) {
    editor.description.setMarkdown(e.currentTarget.value);
  });
  if ($("#description_hidden").val().length > 0) {
    $("#description_hidden").trigger("blur");
  }
  desc.find('*').addClass("font-minecraftia");

  // Submit Handler
  $(document).on('click', 'form#form-content [type=submit]', function (e) {
    e.preventDefault();
    var target = $("#description_hidden");
    target.removeClass("d-none");

    // Handles the form-validation of BS5 for the description
    if (target.is(":valid")) {
      $(editor.description.options.el).addClass('is-valid').removeClass('is-invalid');
    } else if (target.is(":invalid")) {
      $(editor.description.options.el).addClass('is-invalid').removeClass('is-valid');
    } else {
      $(editor.description.options.el).removeClass('is-valid').removeClass('is-invalid');
    }
    target.addClass("d-none");
  });
  $(document).on("dos-done", "form#form-content", function (e) {
    var form = $(e.currentTarget);
    $("#description_hidden").addClass("d-none");

    // Stores the current state of the form...
    state.content = form.html();
    window.history.replaceState(state, "", window.location.href);

    // Submit the form if it is valid
    if (form[0].reportValidity()) {
      form.trigger('submit');
    }
  });

  // Return Handler
  $(document).on('click', '[data-return]', function (e) {
    var target = $(e.currentTarget).data('return');
    confirmLeave(target);
  });

  // Reset Handler
  $(document).on('click', '[type=reset]', function (e) {
    editor.description.setMarkdown('');
    SwalFlash.info("Form reset!");
  });

  // Changelog Handler
  $(document).on('click', "#addAdd, #addMod, #addRem", function (e) {
    var obj = $(e.currentTarget);
    var log = obj.attr('id').substring(3).toLowerCase();
    var target = $("#".concat(log));
    var html = "\n\t\t<div class=\"row my-3 justify-content-center\">\n\t\t\t<div class=\"col-1 d-flex justify-content-center align-items-center\">\n\t\t\t\t<button type=\"button\" class=\"remove-button-style log-remover\" title=\"Remove Entry\">\n\t\t\t\t\t<i class=\"fas fa-circle-minus text-danger\"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-10\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"".concat(log, "[]\" required>\n\t\t\t</div>\n\t\t</div>\n\t\t");
    target.append(html);
  });

  // Log Remover Handler
  $(document).on('click', ".log-remover", function (e) {
    $(e.currentTarget).closest('.row').remove();
  });

  // Compatibility Handler
  $(document).on('click', "#addBedrock, #addJava", function (e) {
    var obj = $(e.currentTarget);
    var ver = obj.attr('id').substring(3).toLowerCase();
    var target = $("#".concat(ver));
    var html = "\n\t\t<div class=\"col-6 col-lg-4 py-3 version-entry\">\n\t\t\t<div class=\"input-group\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-danger entry-remover d-flex justify-content-center align-items-center\" title=\"Remove Entry\">\n\t\t\t\t\t<i class=\"fas fa-minus\"></i>\n\t\t\t\t</button>\n\n\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"".concat(ver, "[]\" required pattern=\"(^\\d{1,3})(\\.)(\\d{1,3})(\\.(?=\\d{1,3})\\d{1,3})?$\">\n\t\t\t</div>\n\t\t</div>\n\t\t");
    target.append(html);
  });

  // Version Remover Handler
  $(document).on("click", ".entry-remover", function (e) {
    $(e.currentTarget).closest(".version-entry").remove();
  });

  // Download Link Handler
  $(document).on('click', "#addBedrockLink, #addJavaLink", function (e) {
    var obj = $(e.currentTarget);
    var ver = obj.attr('id').substring(3).toLowerCase();
    ver = ver.substring(0, ver.indexOf('link'));
    var target = $("#".concat(ver, "DL"));
    var html = "\n\t\t<div class=\"row my-3\">\n\t\t\t<div class=\"col-2 d-flex justify-content-center align-items-center\">\n\t\t\t\t<button type=\"button\" class=\"remove-button-style link-remover\" title=\"Remove Entry\">\n\t\t\t\t\t<i class=\"fas fa-circle-minus text-danger\"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-5\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"".concat(ver, "DL[]\" placeholder=\"URL\" required>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-5\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"").concat(ver, "DLW[]\" placeholder=\"Website\" required>\n\t\t\t</div>\n\t\t</div>\n\t\t");
    target.append(html);
  });

  // Download Link Remover Handler
  $(document).on('click', ".link-remover", function (e) {
    $(e.currentTarget).closest('.row').remove();
  });

  // Restores the form to its original state if refreshed. If not,
  // it restores the recent state of the form. Very useful for when
  // the user clicks the back button.
  if (isPageRefreshed() && (_history$state2 = history.state) !== null && _history$state2 !== void 0 && _history$state2.original) {
    state.content = history.state.original;
    $("form#form-content").html(state.content);
    window.history.replaceState(state, "", window.location.href);
  } else if ((_history$state3 = history.state) !== null && _history$state3 !== void 0 && _history$state3.content) {
    $("form#form-content").html(history.state.content);
  }

  // Hide all hidden forms once more if they were hidden before
  $("form#form-content").find("select, input, textarea").css('visibility', '').css('opacity', '').css('display', '').removeAttr('data-dos-invisible');

  // Enables all disabled buttons...
  $("[data-dos-clicked=true]").each(function (k, v) {
    var btn = $(v);
    btn.html("".concat(btn.data("dos-prev"))).removeClass("disabled cursor-default").attr('data-dos-clicked', 'false').attr('data-dos-prev');
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDa0UsQ0FBQyxDQUFDO0lBRWRDLEdBQUcsQ0FBQzFELElBQUksSUFBQThDLE1BQUEsQ0FBSVksR0FBRyxDQUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFFLENBQUMsQ0FDakNWLFdBQVcsMEJBQTBCLENBQUMsQ0FDdENnQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQ2pDQSxJQUFJLENBQUMsZUFBZSxDQUFDO0VBQ3hCLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2NyZWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCgpID0+IHtcblx0Y29uc3QgZWRpdG9yID0ge307XG5cdGNvbnN0IHN0YXRlID0ge29yaWdpbmFsOiBoaXN0b3J5LnN0YXRlPy5vcmlnaW5hbCA/PyAkKGBmb3JtI2Zvcm0tY29udGVudGApLmh0bWwoKX07XG5cblx0Ly8gRGVzY3JpcHRpb24gTUQgRWRpdG9yXG5cdGxldCBkZXNjID0gJChgI2Rlc2NyaXB0aW9uYCk7XG5cdGVkaXRvci5kZXNjcmlwdGlvbiA9IG5ldyBFZGl0b3Ioe1xuXHRcdGVsOiBkZXNjWzBdLFxuXHRcdGluaXRpYWxFZGl0VHlwZTogJ21hcmtkb3duJyxcblx0XHR0aGVtZTogJ2RhcmsnLFxuXHRcdHBsYWNlaG9sZGVyOiAnRGVzY3JpcHRpb24nLFxuXHRcdGluaXRpYWxWYWx1ZTogJChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApLnZhbCgpLFxuXHRcdGF1dG9mb2N1czogZmFsc2UsXG5cdFx0ZXZlbnRzOiB7XG5cdFx0XHRibHVyOiAoKSA9PiB7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkZXNjcmlwdGlvbl9oaWRkZW5gKVxuXHRcdFx0XHRcdC52YWx1ZSA9IGVkaXRvci5kZXNjcmlwdGlvbi5nZXRNYXJrZG93bigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdCQoZG9jdW1lbnQpLm9uKGBibHVyYCwgYCNkZXNjcmlwdGlvbl9oaWRkZW5gLCAoZSkgPT4ge1xuXHRcdGVkaXRvci5kZXNjcmlwdGlvbi5zZXRNYXJrZG93bihlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuXHR9KTtcblx0aWYgKCQoYCNkZXNjcmlwdGlvbl9oaWRkZW5gKS52YWwoKS5sZW5ndGggPiAwKSB7XG5cdFx0JChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApLnRyaWdnZXIoYGJsdXJgKTtcblx0fVxuXG5cdGRlc2MuZmluZCgnKicpXG5cdFx0LmFkZENsYXNzKGBmb250LW1pbmVjcmFmdGlhYCk7XG5cblx0Ly8gU3VibWl0IEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2Zvcm0jZm9ybS1jb250ZW50IFt0eXBlPXN1Ym1pdF0nLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgdGFyZ2V0ID0gJChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApO1xuXHRcdHRhcmdldC5yZW1vdmVDbGFzcyhgZC1ub25lYCk7XG5cblx0XHQvLyBIYW5kbGVzIHRoZSBmb3JtLXZhbGlkYXRpb24gb2YgQlM1IGZvciB0aGUgZGVzY3JpcHRpb25cblx0XHRpZiAodGFyZ2V0LmlzKGA6dmFsaWRgKSkge1xuXHRcdFx0JChlZGl0b3IuZGVzY3JpcHRpb24ub3B0aW9ucy5lbClcblx0XHRcdC5hZGRDbGFzcygnaXMtdmFsaWQnKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRhcmdldC5pcyhgOmludmFsaWRgKSkge1xuXHRcdFx0JChlZGl0b3IuZGVzY3JpcHRpb24ub3B0aW9ucy5lbClcblx0XHRcdC5hZGRDbGFzcygnaXMtaW52YWxpZCcpXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ2lzLXZhbGlkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JChlZGl0b3IuZGVzY3JpcHRpb24ub3B0aW9ucy5lbClcblx0XHRcdC5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0LmFkZENsYXNzKGBkLW5vbmVgKTtcblx0fSk7XG5cblx0JChkb2N1bWVudCkub24oYGRvcy1kb25lYCwgYGZvcm0jZm9ybS1jb250ZW50YCwgKGUpID0+IHtcblx0XHRsZXQgZm9ybSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuXHRcdCQoYCNkZXNjcmlwdGlvbl9oaWRkZW5gKS5hZGRDbGFzcyhgZC1ub25lYCk7XG5cblx0XHQvLyBTdG9yZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGZvcm0uLi5cblx0XHRzdGF0ZS5jb250ZW50ID0gZm9ybS5odG1sKCk7XG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdFx0c3RhdGUsXG5cdFx0XHRcIlwiLFxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHQpO1xuXG5cdFx0Ly8gU3VibWl0IHRoZSBmb3JtIGlmIGl0IGlzIHZhbGlkXG5cdFx0aWYgKGZvcm1bMF0ucmVwb3J0VmFsaWRpdHkoKSkge1xuXHRcdFx0Zm9ybS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFJldHVybiBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1yZXR1cm5dJywgKGUpID0+IHtcblx0XHRsZXQgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3JldHVybicpO1xuXHRcdGNvbmZpcm1MZWF2ZSh0YXJnZXQpO1xuXHR9KTtcblxuXHQvLyBSZXNldCBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbdHlwZT1yZXNldF0nLCAoZSkgPT4ge1xuXHRcdGVkaXRvci5kZXNjcmlwdGlvbi5zZXRNYXJrZG93bignJyk7XG5cdFx0U3dhbEZsYXNoLmluZm8oXCJGb3JtIHJlc2V0IVwiKTtcblx0fSk7XG5cblx0Ly8gQ2hhbmdlbG9nIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgYCNhZGRBZGQsICNhZGRNb2QsICNhZGRSZW1gLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IGxvZyA9IG9iai5hdHRyKCdpZCcpLnN1YnN0cmluZygzKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHtsb2d9YCk7XG5cblx0XHRsZXQgaHRtbCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwicm93IG15LTMganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC0xIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInJlbW92ZS1idXR0b24tc3R5bGUgbG9nLXJlbW92ZXJcIiB0aXRsZT1cIlJlbW92ZSBFbnRyeVwiPlxuXHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFzIGZhLWNpcmNsZS1taW51cyB0ZXh0LWRhbmdlclwiPjwvaT5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC0xMFwiPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCIke2xvZ31bXVwiIHJlcXVpcmVkPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdHRhcmdldC5hcHBlbmQoaHRtbCk7XG5cdH0pO1xuXG5cdC8vIExvZyBSZW1vdmVyIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgYC5sb2ctcmVtb3ZlcmAsIChlKSA9PiB7XG5cdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5yb3cnKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gQ29tcGF0aWJpbGl0eSBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGAjYWRkQmVkcm9jaywgI2FkZEphdmFgLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IHZlciA9IG9iai5hdHRyKCdpZCcpLnN1YnN0cmluZygzKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHt2ZXJ9YCk7XG5cblx0XHRsZXQgaHRtbCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiY29sLTYgY29sLWxnLTQgcHktMyB2ZXJzaW9uLWVudHJ5XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBlbnRyeS1yZW1vdmVyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiIHRpdGxlPVwiUmVtb3ZlIEVudHJ5XCI+XG5cdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtbWludXNcIj48L2k+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIiR7dmVyfVtdXCIgcmVxdWlyZWQgcGF0dGVybj1cIiheXFxcXGR7MSwzfSkoXFxcXC4pKFxcXFxkezEsM30pKFxcXFwuKD89XFxcXGR7MSwzfSlcXFxcZHsxLDN9KT8kXCI+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0dGFyZ2V0LmFwcGVuZChodG1sKTtcblx0fSk7XG5cblx0Ly8gVmVyc2lvbiBSZW1vdmVyIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oYGNsaWNrYCwgYC5lbnRyeS1yZW1vdmVyYCwgKGUpID0+IHtcblx0XHQkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdChgLnZlcnNpb24tZW50cnlgKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gRG93bmxvYWQgTGluayBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGAjYWRkQmVkcm9ja0xpbmssICNhZGRKYXZhTGlua2AsIChlKSA9PiB7XG5cdFx0bGV0IG9iaiA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRsZXQgdmVyID0gb2JqLmF0dHIoJ2lkJykuc3Vic3RyaW5nKDMpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR2ZXIgPSB2ZXIuc3Vic3RyaW5nKDAsIHZlci5pbmRleE9mKCdsaW5rJykpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHt2ZXJ9RExgKTtcblxuXHRcdGxldCBodG1sID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJyb3cgbXktM1wiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInJlbW92ZS1idXR0b24tc3R5bGUgbGluay1yZW1vdmVyXCIgdGl0bGU9XCJSZW1vdmUgRW50cnlcIj5cblx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1jaXJjbGUtbWludXMgdGV4dC1kYW5nZXJcIj48L2k+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtNVwiPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCIke3Zlcn1ETFtdXCIgcGxhY2Vob2xkZXI9XCJVUkxcIiByZXF1aXJlZD5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLTVcIj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiJHt2ZXJ9RExXW11cIiBwbGFjZWhvbGRlcj1cIldlYnNpdGVcIiByZXF1aXJlZD5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHR0YXJnZXQuYXBwZW5kKGh0bWwpO1xuXHR9KTtcblxuXHQvLyBEb3dubG9hZCBMaW5rIFJlbW92ZXIgSGFuZGxlclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBgLmxpbmstcmVtb3ZlcmAsIChlKSA9PiB7XG5cdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5yb3cnKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gUmVzdG9yZXMgdGhlIGZvcm0gdG8gaXRzIG9yaWdpbmFsIHN0YXRlIGlmIHJlZnJlc2hlZC4gSWYgbm90LFxuXHQvLyBpdCByZXN0b3JlcyB0aGUgcmVjZW50IHN0YXRlIG9mIHRoZSBmb3JtLiBWZXJ5IHVzZWZ1bCBmb3Igd2hlblxuXHQvLyB0aGUgdXNlciBjbGlja3MgdGhlIGJhY2sgYnV0dG9uLlxuXHRpZiAoaXNQYWdlUmVmcmVzaGVkKCkgJiYgaGlzdG9yeS5zdGF0ZT8ub3JpZ2luYWwpIHtcblx0XHRzdGF0ZS5jb250ZW50ID0gaGlzdG9yeS5zdGF0ZS5vcmlnaW5hbDtcblx0XHQkKGBmb3JtI2Zvcm0tY29udGVudGApLmh0bWwoc3RhdGUuY29udGVudCk7XG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdFx0c3RhdGUsXG5cdFx0XHRcIlwiLFxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHQpO1xuXHR9XG5cdGVsc2UgaWYgKGhpc3Rvcnkuc3RhdGU/LmNvbnRlbnQpIHtcblx0XHQkKGBmb3JtI2Zvcm0tY29udGVudGApLmh0bWwoaGlzdG9yeS5zdGF0ZS5jb250ZW50KTtcblx0fVxuXG5cdC8vIEhpZGUgYWxsIGhpZGRlbiBmb3JtcyBvbmNlIG1vcmUgaWYgdGhleSB3ZXJlIGhpZGRlbiBiZWZvcmVcblx0JChgZm9ybSNmb3JtLWNvbnRlbnRgKS5maW5kKGBzZWxlY3QsIGlucHV0LCB0ZXh0YXJlYWApXG5cdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgJycpXG5cdFx0XHQuY3NzKCdvcGFjaXR5JywgJycpXG5cdFx0XHQuY3NzKCdkaXNwbGF5JywgJycpXG5cdFx0XHQucmVtb3ZlQXR0cignZGF0YS1kb3MtaW52aXNpYmxlJyk7XG5cblx0Ly8gRW5hYmxlcyBhbGwgZGlzYWJsZWQgYnV0dG9ucy4uLlxuXHQkKGBbZGF0YS1kb3MtY2xpY2tlZD10cnVlXWApLmVhY2goKGssIHYpID0+IHtcblx0XHRsZXQgYnRuID0gJCh2KTtcblxuXHRcdGJ0bi5odG1sKGAke2J0bi5kYXRhKFwiZG9zLXByZXZcIil9YClcblx0XHRcdC5yZW1vdmVDbGFzcyhgZGlzYWJsZWQgY3Vyc29yLWRlZmF1bHRgKVxuXHRcdFx0LmF0dHIoJ2RhdGEtZG9zLWNsaWNrZWQnLCAnZmFsc2UnKVxuXHRcdFx0LmF0dHIoJ2RhdGEtZG9zLXByZXYnKTtcblx0fSk7XG59KTtcbiJdLCJuYW1lcyI6WyIkIiwiX2hpc3Rvcnkkc3RhdGUkb3JpZ2luIiwiX2hpc3Rvcnkkc3RhdGUiLCJfaGlzdG9yeSRzdGF0ZTIiLCJfaGlzdG9yeSRzdGF0ZTMiLCJlZGl0b3IiLCJzdGF0ZSIsIm9yaWdpbmFsIiwiaGlzdG9yeSIsImh0bWwiLCJkZXNjIiwiZGVzY3JpcHRpb24iLCJFZGl0b3IiLCJlbCIsImluaXRpYWxFZGl0VHlwZSIsInRoZW1lIiwicGxhY2Vob2xkZXIiLCJpbml0aWFsVmFsdWUiLCJ2YWwiLCJhdXRvZm9jdXMiLCJldmVudHMiLCJibHVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiZ2V0TWFya2Rvd24iLCJvbiIsImUiLCJzZXRNYXJrZG93biIsImN1cnJlbnRUYXJnZXQiLCJsZW5ndGgiLCJ0cmlnZ2VyIiwiZmluZCIsImFkZENsYXNzIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJyZW1vdmVDbGFzcyIsImlzIiwib3B0aW9ucyIsImZvcm0iLCJjb250ZW50Iiwid2luZG93IiwicmVwbGFjZVN0YXRlIiwibG9jYXRpb24iLCJocmVmIiwicmVwb3J0VmFsaWRpdHkiLCJkYXRhIiwiY29uZmlybUxlYXZlIiwiU3dhbEZsYXNoIiwiaW5mbyIsIm9iaiIsImxvZyIsImF0dHIiLCJzdWJzdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNvbmNhdCIsImFwcGVuZCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJ2ZXIiLCJpbmRleE9mIiwiaXNQYWdlUmVmcmVzaGVkIiwiY3NzIiwicmVtb3ZlQXR0ciIsImVhY2giLCJrIiwidiIsImJ0biJdLCJzb3VyY2VSb290IjoiIn0=