/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./resources/js/views/admin/versions/create.js ***!
  \*****************************************************/
$(function () {
  var editor = {};

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
  $("#description_hidden").on("blur", function (e) {
    console.log(e.currentTarget.value);
    editor.description.setMarkdown(e.currentTarget.value);
  });
  if ($("#description_hidden").val().length > 0) {
    $("#description_hidden").trigger("blur");
  }
  desc.find('*').addClass("font-minecraftia");

  // Submit Handler
  $('form [type=submit]').on('click', function (e) {
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
  $("form").on("dos-done", function (e) {
    var form = $(e.currentTarget);
    if (form[0].reportValidity()) {
      form.trigger('submit');
    }
  });

  // Return Handler
  $('[data-return]').on('click', function (e) {
    var target = $(e.currentTarget).data('return');
    confirmLeave(target);
  });

  // Reset Handler
  $('[type=reset]').on('click', function (e) {
    editor.description.setMarkdown('');
    SwalFlash.info("Form reset!");
  });

  // Changelog Handler
  $("#addAdd, #addMod, #addRem").on('click', function (e) {
    var obj = $(e.currentTarget);
    var log = obj.attr('id').substring(3).toLowerCase();
    var target = $("#".concat(log));
    var html = "\n\t\t<div class=\"row my-3\">\n\t\t\t<div class=\"col-2 d-flex justify-content-center align-items-center\">\n\t\t\t\t<button type=\"button\" class=\"remove-button-style log-remover\" title=\"Remove Entry\">\n\t\t\t\t\t<i class=\"fas fa-circle-minus text-danger\"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<div class=\"col-9\">\n\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"".concat(log, "[]\" required>\n\t\t\t</div>\n\t\t</div>\n\t\t");
    target.append(html);
  });

  // Log Remover Handler
  $(document).on('click', ".log-remover", function (e) {
    $(e.currentTarget).closest('.row').remove();
  });

  // Compatibility Handler
  $("#addBedrock, #addJava").on('click', function (e) {
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
  $("#addBedrockLink, #addJavaLink").on('click', function (e) {
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
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xETSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ1AsU0FBUyxDQUFDLENBQUMsRUFBRU8sR0FBRyxDQUFDQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSXBCLE1BQU0sR0FBRzdCLENBQUMsS0FBQTJDLE1BQUEsQ0FBS0ssR0FBRyxPQUFJLENBQUM7SUFFM0IsSUFBSUosSUFBSSxnWkFBQUQsTUFBQSxDQVMwQ0ssR0FBRyxvSkFBQUwsTUFBQSxDQUlISyxHQUFHLDhFQUdwRDtJQUVEbkIsTUFBTSxDQUFDZ0IsTUFBTSxDQUFDRCxJQUFJLENBQUM7RUFDcEIsQ0FBQyxDQUFDOztFQUVGO0VBQ0E1QyxDQUFDLENBQUNjLFFBQVEsQ0FBQyxDQUFDSSxFQUFFLENBQUMsT0FBTyxtQkFBbUIsVUFBQ0MsQ0FBQyxFQUFLO0lBQy9DbkIsQ0FBQyxDQUFDbUIsQ0FBQyxDQUFDRyxhQUFhLENBQUMsQ0FBQ3dCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7RUFDNUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdmlld3MvYWRtaW4vdmVyc2lvbnMvY3JlYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoKCkgPT4ge1xuXHRjb25zdCBlZGl0b3IgPSB7fTtcblxuXHQvLyBEZXNjcmlwdGlvbiBNRCBFZGl0b3Jcblx0bGV0IGRlc2MgPSAkKGAjZGVzY3JpcHRpb25gKTtcblx0ZWRpdG9yLmRlc2NyaXB0aW9uID0gbmV3IEVkaXRvcih7XG5cdFx0ZWw6IGRlc2NbMF0sXG5cdFx0aW5pdGlhbEVkaXRUeXBlOiAnbWFya2Rvd24nLFxuXHRcdHRoZW1lOiAnZGFyaycsXG5cdFx0cGxhY2Vob2xkZXI6ICdEZXNjcmlwdGlvbicsXG5cdFx0aW5pdGlhbFZhbHVlOiAkKGAjZGVzY3JpcHRpb25faGlkZGVuYCkudmFsKCksXG5cdFx0YXV0b2ZvY3VzOiBmYWxzZSxcblx0XHRldmVudHM6IHtcblx0XHRcdGJsdXI6ICgpID0+IHtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRlc2NyaXB0aW9uX2hpZGRlbmApXG5cdFx0XHRcdFx0LnZhbHVlID0gZWRpdG9yLmRlc2NyaXB0aW9uLmdldE1hcmtkb3duKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0JChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApLm9uKGBibHVyYCwgKGUpID0+IHtcblx0XHRjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuXHRcdGVkaXRvci5kZXNjcmlwdGlvbi5zZXRNYXJrZG93bihlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuXHR9KTtcblx0aWYgKCQoYCNkZXNjcmlwdGlvbl9oaWRkZW5gKS52YWwoKS5sZW5ndGggPiAwKSB7XG5cdFx0JChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApLnRyaWdnZXIoYGJsdXJgKTtcblx0fVxuXG5cdGRlc2MuZmluZCgnKicpXG5cdFx0LmFkZENsYXNzKGBmb250LW1pbmVjcmFmdGlhYCk7XG5cblx0Ly8gU3VibWl0IEhhbmRsZXJcblx0JCgnZm9ybSBbdHlwZT1zdWJtaXRdJykub24oJ2NsaWNrJywgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0bGV0IHRhcmdldCA9ICQoYCNkZXNjcmlwdGlvbl9oaWRkZW5gKTtcblx0XHR0YXJnZXQucmVtb3ZlQ2xhc3MoYGQtbm9uZWApO1xuXG5cdFx0Ly8gSGFuZGxlcyB0aGUgZm9ybS12YWxpZGF0aW9uIG9mIEJTNSBmb3IgdGhlIGRlc2NyaXB0aW9uXG5cdFx0aWYgKHRhcmdldC5pcyhgOnZhbGlkYCkpIHtcblx0XHRcdCQoZWRpdG9yLmRlc2NyaXB0aW9uLm9wdGlvbnMuZWwpXG5cdFx0XHQuYWRkQ2xhc3MoJ2lzLXZhbGlkJylcblx0XHRcdC5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0YXJnZXQuaXMoYDppbnZhbGlkYCkpIHtcblx0XHRcdCQoZWRpdG9yLmRlc2NyaXB0aW9uLm9wdGlvbnMuZWwpXG5cdFx0XHQuYWRkQ2xhc3MoJ2lzLWludmFsaWQnKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdpcy12YWxpZCcpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdCQoZWRpdG9yLmRlc2NyaXB0aW9uLm9wdGlvbnMuZWwpXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ2lzLXZhbGlkJylcblx0XHRcdC5yZW1vdmVDbGFzcygnaXMtaW52YWxpZCcpO1xuXHRcdH1cblxuXHRcdHRhcmdldC5hZGRDbGFzcyhgZC1ub25lYCk7XG5cdH0pO1xuXG5cdCQoYGZvcm1gKS5vbihgZG9zLWRvbmVgLCAoZSkgPT4ge1xuXHRcdGxldCBmb3JtID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuXG5cdFx0aWYgKGZvcm1bMF0ucmVwb3J0VmFsaWRpdHkoKSkge1xuXHRcdFx0Zm9ybS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFJldHVybiBIYW5kbGVyXG5cdCQoJ1tkYXRhLXJldHVybl0nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuXHRcdGxldCB0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCkuZGF0YSgncmV0dXJuJyk7XG5cdFx0Y29uZmlybUxlYXZlKHRhcmdldCk7XG5cdH0pO1xuXG5cdC8vIFJlc2V0IEhhbmRsZXJcblx0JCgnW3R5cGU9cmVzZXRdJykub24oJ2NsaWNrJywgKGUpID0+IHtcblx0XHRlZGl0b3IuZGVzY3JpcHRpb24uc2V0TWFya2Rvd24oJycpO1xuXHRcdFN3YWxGbGFzaC5pbmZvKFwiRm9ybSByZXNldCFcIik7XG5cdH0pO1xuXG5cdC8vIENoYW5nZWxvZyBIYW5kbGVyXG5cdCQoYCNhZGRBZGQsICNhZGRNb2QsICNhZGRSZW1gKS5vbignY2xpY2snLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IGxvZyA9IG9iai5hdHRyKCdpZCcpLnN1YnN0cmluZygzKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHtsb2d9YCk7XG5cblx0XHRsZXQgaHRtbCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwicm93IG15LTNcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJyZW1vdmUtYnV0dG9uLXN0eWxlIGxvZy1yZW1vdmVyXCIgdGl0bGU9XCJSZW1vdmUgRW50cnlcIj5cblx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1jaXJjbGUtbWludXMgdGV4dC1kYW5nZXJcIj48L2k+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtOVwiPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCIke2xvZ31bXVwiIHJlcXVpcmVkPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdHRhcmdldC5hcHBlbmQoaHRtbCk7XG5cdH0pO1xuXG5cdC8vIExvZyBSZW1vdmVyIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgYC5sb2ctcmVtb3ZlcmAsIChlKSA9PiB7XG5cdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5yb3cnKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gQ29tcGF0aWJpbGl0eSBIYW5kbGVyXG5cdCQoYCNhZGRCZWRyb2NrLCAjYWRkSmF2YWApLm9uKCdjbGljaycsIChlKSA9PiB7XG5cdFx0bGV0IG9iaiA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRsZXQgdmVyID0gb2JqLmF0dHIoJ2lkJykuc3Vic3RyaW5nKDMpLnRvTG93ZXJDYXNlKCk7XG5cdFx0bGV0IHRhcmdldCA9ICQoYCMke3Zlcn1gKTtcblxuXHRcdGxldCBodG1sID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJjb2wtNiBjb2wtbGctNCBweS0zIHZlcnNpb24tZW50cnlcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGVudHJ5LXJlbW92ZXIgZC1mbGV4IGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXCIgdGl0bGU9XCJSZW1vdmUgRW50cnlcIj5cblx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1taW51c1wiPjwvaT5cblx0XHRcdFx0PC9idXR0b24+XG5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiJHt2ZXJ9W11cIiByZXF1aXJlZCBwYXR0ZXJuPVwiKF5cXFxcZHsxLDN9KShcXFxcLikoXFxcXGR7MSwzfSkoXFxcXC4oPz1cXFxcZHsxLDN9KVxcXFxkezEsM30pPyRcIj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHR0YXJnZXQuYXBwZW5kKGh0bWwpO1xuXHR9KTtcblxuXHQvLyBWZXJzaW9uIFJlbW92ZXIgSGFuZGxlclxuXHQkKGRvY3VtZW50KS5vbihgY2xpY2tgLCBgLmVudHJ5LXJlbW92ZXJgLCAoZSkgPT4ge1xuXHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KGAudmVyc2lvbi1lbnRyeWApLnJlbW92ZSgpO1xuXHR9KTtcblxuXHQvLyBEb3dubG9hZCBMaW5rIEhhbmRsZXJcblx0JChgI2FkZEJlZHJvY2tMaW5rLCAjYWRkSmF2YUxpbmtgKS5vbignY2xpY2snLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IHZlciA9IG9iai5hdHRyKCdpZCcpLnN1YnN0cmluZygzKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0dmVyID0gdmVyLnN1YnN0cmluZygwLCB2ZXIuaW5kZXhPZignbGluaycpKTtcblx0XHRsZXQgdGFyZ2V0ID0gJChgIyR7dmVyfURMYCk7XG5cblx0XHRsZXQgaHRtbCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwicm93IG15LTNcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJyZW1vdmUtYnV0dG9uLXN0eWxlIGxpbmstcmVtb3ZlclwiIHRpdGxlPVwiUmVtb3ZlIEVudHJ5XCI+XG5cdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtY2lyY2xlLW1pbnVzIHRleHQtZGFuZ2VyXCI+PC9pPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLTVcIj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiJHt2ZXJ9RExbXVwiIHBsYWNlaG9sZGVyPVwiVVJMXCIgcmVxdWlyZWQ+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC01XCI+XG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIiR7dmVyfURMV1tdXCIgcGxhY2Vob2xkZXI9XCJXZWJzaXRlXCIgcmVxdWlyZWQ+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0dGFyZ2V0LmFwcGVuZChodG1sKTtcblx0fSk7XG5cblx0Ly8gRG93bmxvYWQgTGluayBSZW1vdmVyIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgYC5saW5rLXJlbW92ZXJgLCAoZSkgPT4ge1xuXHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCcucm93JykucmVtb3ZlKCk7XG5cdH0pO1xufSk7XG4iXSwibmFtZXMiOlsiJCIsImVkaXRvciIsImRlc2MiLCJkZXNjcmlwdGlvbiIsIkVkaXRvciIsImVsIiwiaW5pdGlhbEVkaXRUeXBlIiwidGhlbWUiLCJwbGFjZWhvbGRlciIsImluaXRpYWxWYWx1ZSIsInZhbCIsImF1dG9mb2N1cyIsImV2ZW50cyIsImJsdXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJnZXRNYXJrZG93biIsIm9uIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0Iiwic2V0TWFya2Rvd24iLCJsZW5ndGgiLCJ0cmlnZ2VyIiwiZmluZCIsImFkZENsYXNzIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJyZW1vdmVDbGFzcyIsImlzIiwib3B0aW9ucyIsImZvcm0iLCJyZXBvcnRWYWxpZGl0eSIsImRhdGEiLCJjb25maXJtTGVhdmUiLCJTd2FsRmxhc2giLCJpbmZvIiwib2JqIiwiYXR0ciIsInN1YnN0cmluZyIsInRvTG93ZXJDYXNlIiwiY29uY2F0IiwiaHRtbCIsImFwcGVuZCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJ2ZXIiLCJpbmRleE9mIl0sInNvdXJjZVJvb3QiOiIifQ==