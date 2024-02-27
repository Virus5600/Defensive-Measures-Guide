$((function(){var t,n,e,o,i={},r={original:null!==(t=null===(n=history.state)||void 0===n?void 0:n.original)&&void 0!==t?t:$("form#form-content").html()},a=$("#description");i.description=new Editor({el:a[0],initialEditType:"markdown",theme:"dark",placeholder:"Description",initialValue:$("#description_hidden").val(),autofocus:!1,events:{blur:function(){document.getElementById("description_hidden").value=i.description.getMarkdown()}}}),$(document).on("blur","#description_hidden",(function(t){i.description.setMarkdown(t.currentTarget.value)})),$("#description_hidden").val().length>0&&$("#description_hidden").trigger("blur"),a.find("*").addClass("font-minecraftia"),$(document).on("click","form#form-content [type=submit]",(function(t){t.preventDefault();var n=$("#description_hidden");n.removeClass("d-none"),n.is(":valid")?$(i.description.options.el).addClass("is-valid").removeClass("is-invalid"):n.is(":invalid")?$(i.description.options.el).addClass("is-invalid").removeClass("is-valid"):$(i.description.options.el).removeClass("is-valid").removeClass("is-invalid"),n.addClass("d-none")})),$(document).on("dos-done","form#form-content",(function(t){var n=$(t.currentTarget);$("#description_hidden").addClass("d-none"),r.content=n.html(),window.history.replaceState(r,"",window.location.href),n[0].reportValidity()&&n.trigger("submit")})),$(document).on("click","[data-return]",(function(t){var n=$(t.currentTarget).data("return");confirmLeave(n)})),$(document).on("click","[type=reset]",(function(t){i.description.setMarkdown(""),SwalFlash.info("Form reset!")})),$(document).on("click","#addAdd, #addMod, #addRem",(function(t){var n=$(t.currentTarget).attr("id").substring(3).toLowerCase(),e=$("#".concat(n)),o='\n\t\t<div class="row my-3 justify-content-center">\n\t\t\t<div class="col-1 d-flex justify-content-center align-items-center">\n\t\t\t\t<button type="button" class="remove-button-style log-remover" title="Remove Entry">\n\t\t\t\t\t<i class="fas fa-circle-minus text-danger"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<div class="col-10">\n\t\t\t\t<input type="text" class="form-control" name="'.concat(n,'[]" required>\n\t\t\t</div>\n\t\t</div>\n\t\t');e.append(o)})),$(document).on("click",".log-remover",(function(t){$(t.currentTarget).closest(".row").remove()})),$(document).on("click","#addBedrock, #addJava",(function(t){var n=$(t.currentTarget).attr("id").substring(3).toLowerCase(),e=$("#".concat(n)),o='\n\t\t<div class="col-6 col-lg-4 py-3 version-entry">\n\t\t\t<div class="input-group">\n\t\t\t\t<button type="button" class="btn btn-danger entry-remover d-flex justify-content-center align-items-center" title="Remove Entry">\n\t\t\t\t\t<i class="fas fa-minus"></i>\n\t\t\t\t</button>\n\n\t\t\t\t<input type="text" class="form-control" name="'.concat(n,'[]" required pattern="(^\\d{1,3})(\\.)(\\d{1,3})(\\.(?=\\d{1,3})\\d{1,3})?$">\n\t\t\t</div>\n\t\t</div>\n\t\t');e.append(o)})),$(document).on("click",".entry-remover",(function(t){$(t.currentTarget).closest(".version-entry").remove()})),$(document).on("click","#addBedrockLink, #addJavaLink",(function(t){var n=$(t.currentTarget).attr("id").substring(3).toLowerCase();n=n.substring(0,n.indexOf("link"));var e=$("#".concat(n,"DL")),o='\n\t\t<div class="row my-3">\n\t\t\t<div class="col-2 d-flex justify-content-center align-items-center">\n\t\t\t\t<button type="button" class="remove-button-style link-remover" title="Remove Entry">\n\t\t\t\t\t<i class="fas fa-circle-minus text-danger"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\n\t\t\t<div class="col-5">\n\t\t\t\t<input type="text" class="form-control" name="'.concat(n,'DL[]" placeholder="URL" required>\n\t\t\t</div>\n\n\t\t\t<div class="col-5">\n\t\t\t\t<input type="text" class="form-control" name="').concat(n,'DLW[]" placeholder="Website" required>\n\t\t\t</div>\n\t\t</div>\n\t\t');e.append(o)})),$(document).on("click",".link-remover",(function(t){$(t.currentTarget).closest(".row").remove()})),isPageRefreshed()&&null!==(e=history.state)&&void 0!==e&&e.original?(r.content=history.state.original,$("form#form-content").html(r.content),window.history.replaceState(r,"",window.location.href)):null!==(o=history.state)&&void 0!==o&&o.content&&$("form#form-content").html(history.state.content),$("form#form-content").find("select, input, textarea").css("visibility","").css("opacity","").css("display","").removeAttr("data-dos-invisible"),$("[data-dos-clicked=true]").each((function(t,n){var e=$(n);e.html("".concat(e.data("dos-prev"))).removeClass("disabled cursor-default").attr("data-dos-clicked","false").attr("data-dos-prev")}))}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3JDLElBQUlDLEVBQU1sRSxFQUFFaUUsR0FFWkMsRUFBSXpELEtBQUssR0FBRDZDLE9BQUlZLEVBQUlwQixLQUFLLGNBQ25CVixZQUFZLDJCQUNaZSxLQUFLLG1CQUFvQixTQUN6QkEsS0FBSyxnQkFDUixHQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2pzL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2NyZWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKCgpID0+IHtcblx0Y29uc3QgZWRpdG9yID0ge307XG5cdGNvbnN0IHN0YXRlID0ge29yaWdpbmFsOiBoaXN0b3J5LnN0YXRlPy5vcmlnaW5hbCA/PyAkKGBmb3JtI2Zvcm0tY29udGVudGApLmh0bWwoKX07XG5cblx0Ly8gRGVzY3JpcHRpb24gTUQgRWRpdG9yXG5cdGxldCBkZXNjID0gJChgI2Rlc2NyaXB0aW9uYCk7XG5cdGVkaXRvci5kZXNjcmlwdGlvbiA9IG5ldyBFZGl0b3Ioe1xuXHRcdGVsOiBkZXNjWzBdLFxuXHRcdGluaXRpYWxFZGl0VHlwZTogJ21hcmtkb3duJyxcblx0XHR0aGVtZTogJ2RhcmsnLFxuXHRcdHBsYWNlaG9sZGVyOiAnRGVzY3JpcHRpb24nLFxuXHRcdGluaXRpYWxWYWx1ZTogJChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApLnZhbCgpLFxuXHRcdGF1dG9mb2N1czogZmFsc2UsXG5cdFx0ZXZlbnRzOiB7XG5cdFx0XHRibHVyOiAoKSA9PiB7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkZXNjcmlwdGlvbl9oaWRkZW5gKVxuXHRcdFx0XHRcdC52YWx1ZSA9IGVkaXRvci5kZXNjcmlwdGlvbi5nZXRNYXJrZG93bigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdCQoZG9jdW1lbnQpLm9uKGBibHVyYCwgYCNkZXNjcmlwdGlvbl9oaWRkZW5gLCAoZSkgPT4ge1xuXHRcdGVkaXRvci5kZXNjcmlwdGlvbi5zZXRNYXJrZG93bihlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuXHR9KTtcblx0aWYgKCQoYCNkZXNjcmlwdGlvbl9oaWRkZW5gKS52YWwoKS5sZW5ndGggPiAwKSB7XG5cdFx0JChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApLnRyaWdnZXIoYGJsdXJgKTtcblx0fVxuXG5cdGRlc2MuZmluZCgnKicpXG5cdFx0LmFkZENsYXNzKGBmb250LW1pbmVjcmFmdGlhYCk7XG5cblx0Ly8gU3VibWl0IEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2Zvcm0jZm9ybS1jb250ZW50IFt0eXBlPXN1Ym1pdF0nLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRsZXQgdGFyZ2V0ID0gJChgI2Rlc2NyaXB0aW9uX2hpZGRlbmApO1xuXHRcdHRhcmdldC5yZW1vdmVDbGFzcyhgZC1ub25lYCk7XG5cblx0XHQvLyBIYW5kbGVzIHRoZSBmb3JtLXZhbGlkYXRpb24gb2YgQlM1IGZvciB0aGUgZGVzY3JpcHRpb25cblx0XHRpZiAodGFyZ2V0LmlzKGA6dmFsaWRgKSkge1xuXHRcdFx0JChlZGl0b3IuZGVzY3JpcHRpb24ub3B0aW9ucy5lbClcblx0XHRcdC5hZGRDbGFzcygnaXMtdmFsaWQnKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHRhcmdldC5pcyhgOmludmFsaWRgKSkge1xuXHRcdFx0JChlZGl0b3IuZGVzY3JpcHRpb24ub3B0aW9ucy5lbClcblx0XHRcdC5hZGRDbGFzcygnaXMtaW52YWxpZCcpXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ2lzLXZhbGlkJyk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JChlZGl0b3IuZGVzY3JpcHRpb24ub3B0aW9ucy5lbClcblx0XHRcdC5yZW1vdmVDbGFzcygnaXMtdmFsaWQnKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdpcy1pbnZhbGlkJyk7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0LmFkZENsYXNzKGBkLW5vbmVgKTtcblx0fSk7XG5cblx0JChkb2N1bWVudCkub24oYGRvcy1kb25lYCwgYGZvcm0jZm9ybS1jb250ZW50YCwgKGUpID0+IHtcblx0XHRsZXQgZm9ybSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuXHRcdCQoYCNkZXNjcmlwdGlvbl9oaWRkZW5gKS5hZGRDbGFzcyhgZC1ub25lYCk7XG5cblx0XHQvLyBTdG9yZXMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGZvcm0uLi5cblx0XHRzdGF0ZS5jb250ZW50ID0gZm9ybS5odG1sKCk7XG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdFx0c3RhdGUsXG5cdFx0XHRcIlwiLFxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHQpO1xuXG5cdFx0Ly8gU3VibWl0IHRoZSBmb3JtIGlmIGl0IGlzIHZhbGlkXG5cdFx0aWYgKGZvcm1bMF0ucmVwb3J0VmFsaWRpdHkoKSkge1xuXHRcdFx0Zm9ybS50cmlnZ2VyKCdzdWJtaXQnKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIFJldHVybiBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbZGF0YS1yZXR1cm5dJywgKGUpID0+IHtcblx0XHRsZXQgdGFyZ2V0ID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3JldHVybicpO1xuXHRcdGNvbmZpcm1MZWF2ZSh0YXJnZXQpO1xuXHR9KTtcblxuXHQvLyBSZXNldCBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbdHlwZT1yZXNldF0nLCAoZSkgPT4ge1xuXHRcdGVkaXRvci5kZXNjcmlwdGlvbi5zZXRNYXJrZG93bignJyk7XG5cdFx0U3dhbEZsYXNoLmluZm8oXCJGb3JtIHJlc2V0IVwiKTtcblx0fSk7XG5cblx0Ly8gQ2hhbmdlbG9nIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgYCNhZGRBZGQsICNhZGRNb2QsICNhZGRSZW1gLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IGxvZyA9IG9iai5hdHRyKCdpZCcpLnN1YnN0cmluZygzKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHtsb2d9YCk7XG5cblx0XHRsZXQgaHRtbCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwicm93IG15LTMganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC0xIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInJlbW92ZS1idXR0b24tc3R5bGUgbG9nLXJlbW92ZXJcIiB0aXRsZT1cIlJlbW92ZSBFbnRyeVwiPlxuXHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFzIGZhLWNpcmNsZS1taW51cyB0ZXh0LWRhbmdlclwiPjwvaT5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC0xMFwiPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCIke2xvZ31bXVwiIHJlcXVpcmVkPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdHRhcmdldC5hcHBlbmQoaHRtbCk7XG5cdH0pO1xuXG5cdC8vIExvZyBSZW1vdmVyIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgYC5sb2ctcmVtb3ZlcmAsIChlKSA9PiB7XG5cdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5yb3cnKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gQ29tcGF0aWJpbGl0eSBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGAjYWRkQmVkcm9jaywgI2FkZEphdmFgLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cdFx0bGV0IHZlciA9IG9iai5hdHRyKCdpZCcpLnN1YnN0cmluZygzKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHt2ZXJ9YCk7XG5cblx0XHRsZXQgaHRtbCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiY29sLTYgY29sLWxnLTQgcHktMyB2ZXJzaW9uLWVudHJ5XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBlbnRyeS1yZW1vdmVyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiIHRpdGxlPVwiUmVtb3ZlIEVudHJ5XCI+XG5cdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtbWludXNcIj48L2k+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXG5cdFx0XHRcdDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmFtZT1cIiR7dmVyfVtdXCIgcmVxdWlyZWQgcGF0dGVybj1cIiheXFxcXGR7MSwzfSkoXFxcXC4pKFxcXFxkezEsM30pKFxcXFwuKD89XFxcXGR7MSwzfSlcXFxcZHsxLDN9KT8kXCI+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0dGFyZ2V0LmFwcGVuZChodG1sKTtcblx0fSk7XG5cblx0Ly8gVmVyc2lvbiBSZW1vdmVyIEhhbmRsZXJcblx0JChkb2N1bWVudCkub24oYGNsaWNrYCwgYC5lbnRyeS1yZW1vdmVyYCwgKGUpID0+IHtcblx0XHQkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdChgLnZlcnNpb24tZW50cnlgKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gRG93bmxvYWQgTGluayBIYW5kbGVyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGAjYWRkQmVkcm9ja0xpbmssICNhZGRKYXZhTGlua2AsIChlKSA9PiB7XG5cdFx0bGV0IG9iaiA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRsZXQgdmVyID0gb2JqLmF0dHIoJ2lkJykuc3Vic3RyaW5nKDMpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR2ZXIgPSB2ZXIuc3Vic3RyaW5nKDAsIHZlci5pbmRleE9mKCdsaW5rJykpO1xuXHRcdGxldCB0YXJnZXQgPSAkKGAjJHt2ZXJ9RExgKTtcblxuXHRcdGxldCBodG1sID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJyb3cgbXktM1wiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC0yIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInJlbW92ZS1idXR0b24tc3R5bGUgbGluay1yZW1vdmVyXCIgdGl0bGU9XCJSZW1vdmUgRW50cnlcIj5cblx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1jaXJjbGUtbWludXMgdGV4dC1kYW5nZXJcIj48L2k+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtNVwiPlxuXHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCIke3Zlcn1ETFtdXCIgcGxhY2Vob2xkZXI9XCJVUkxcIiByZXF1aXJlZD5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLTVcIj5cblx0XHRcdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwiJHt2ZXJ9RExXW11cIiBwbGFjZWhvbGRlcj1cIldlYnNpdGVcIiByZXF1aXJlZD5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHR0YXJnZXQuYXBwZW5kKGh0bWwpO1xuXHR9KTtcblxuXHQvLyBEb3dubG9hZCBMaW5rIFJlbW92ZXIgSGFuZGxlclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCBgLmxpbmstcmVtb3ZlcmAsIChlKSA9PiB7XG5cdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoJy5yb3cnKS5yZW1vdmUoKTtcblx0fSk7XG5cblx0Ly8gUmVzdG9yZXMgdGhlIGZvcm0gdG8gaXRzIG9yaWdpbmFsIHN0YXRlIGlmIHJlZnJlc2hlZC4gSWYgbm90LFxuXHQvLyBpdCByZXN0b3JlcyB0aGUgcmVjZW50IHN0YXRlIG9mIHRoZSBmb3JtLiBWZXJ5IHVzZWZ1bCBmb3Igd2hlblxuXHQvLyB0aGUgdXNlciBjbGlja3MgdGhlIGJhY2sgYnV0dG9uLlxuXHRpZiAoaXNQYWdlUmVmcmVzaGVkKCkgJiYgaGlzdG9yeS5zdGF0ZT8ub3JpZ2luYWwpIHtcblx0XHRzdGF0ZS5jb250ZW50ID0gaGlzdG9yeS5zdGF0ZS5vcmlnaW5hbDtcblx0XHQkKGBmb3JtI2Zvcm0tY29udGVudGApLmh0bWwoc3RhdGUuY29udGVudCk7XG5cdFx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKFxuXHRcdFx0c3RhdGUsXG5cdFx0XHRcIlwiLFxuXHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWZcblx0XHQpO1xuXHR9XG5cdGVsc2UgaWYgKGhpc3Rvcnkuc3RhdGU/LmNvbnRlbnQpIHtcblx0XHQkKGBmb3JtI2Zvcm0tY29udGVudGApLmh0bWwoaGlzdG9yeS5zdGF0ZS5jb250ZW50KTtcblx0fVxuXG5cdC8vIEhpZGUgYWxsIGhpZGRlbiBmb3JtcyBvbmNlIG1vcmUgaWYgdGhleSB3ZXJlIGhpZGRlbiBiZWZvcmVcblx0JChgZm9ybSNmb3JtLWNvbnRlbnRgKS5maW5kKGBzZWxlY3QsIGlucHV0LCB0ZXh0YXJlYWApXG5cdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgJycpXG5cdFx0XHQuY3NzKCdvcGFjaXR5JywgJycpXG5cdFx0XHQuY3NzKCdkaXNwbGF5JywgJycpXG5cdFx0XHQucmVtb3ZlQXR0cignZGF0YS1kb3MtaW52aXNpYmxlJyk7XG5cblx0Ly8gRW5hYmxlcyBhbGwgZGlzYWJsZWQgYnV0dG9ucy4uLlxuXHQkKGBbZGF0YS1kb3MtY2xpY2tlZD10cnVlXWApLmVhY2goKGssIHYpID0+IHtcblx0XHRsZXQgYnRuID0gJCh2KTtcblxuXHRcdGJ0bi5odG1sKGAke2J0bi5kYXRhKFwiZG9zLXByZXZcIil9YClcblx0XHRcdC5yZW1vdmVDbGFzcyhgZGlzYWJsZWQgY3Vyc29yLWRlZmF1bHRgKVxuXHRcdFx0LmF0dHIoJ2RhdGEtZG9zLWNsaWNrZWQnLCAnZmFsc2UnKVxuXHRcdFx0LmF0dHIoJ2RhdGEtZG9zLXByZXYnKTtcblx0fSk7XG59KTtcbiJdLCJuYW1lcyI6WyIkIiwiX2hpc3Rvcnkkc3RhdGUkb3JpZ2luIiwiX2hpc3Rvcnkkc3RhdGUiLCJfaGlzdG9yeSRzdGF0ZTIiLCJfaGlzdG9yeSRzdGF0ZTMiLCJlZGl0b3IiLCJzdGF0ZSIsIm9yaWdpbmFsIiwiaGlzdG9yeSIsImh0bWwiLCJkZXNjIiwiZGVzY3JpcHRpb24iLCJFZGl0b3IiLCJlbCIsImluaXRpYWxFZGl0VHlwZSIsInRoZW1lIiwicGxhY2Vob2xkZXIiLCJpbml0aWFsVmFsdWUiLCJ2YWwiLCJhdXRvZm9jdXMiLCJldmVudHMiLCJibHVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInZhbHVlIiwiZ2V0TWFya2Rvd24iLCJvbiIsImUiLCJzZXRNYXJrZG93biIsImN1cnJlbnRUYXJnZXQiLCJsZW5ndGgiLCJ0cmlnZ2VyIiwiZmluZCIsImFkZENsYXNzIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJyZW1vdmVDbGFzcyIsImlzIiwib3B0aW9ucyIsImZvcm0iLCJjb250ZW50Iiwid2luZG93IiwicmVwbGFjZVN0YXRlIiwibG9jYXRpb24iLCJocmVmIiwicmVwb3J0VmFsaWRpdHkiLCJkYXRhIiwiY29uZmlybUxlYXZlIiwiU3dhbEZsYXNoIiwiaW5mbyIsImxvZyIsImF0dHIiLCJzdWJzdHJpbmciLCJ0b0xvd2VyQ2FzZSIsImNvbmNhdCIsImFwcGVuZCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJ2ZXIiLCJpbmRleE9mIiwiaXNQYWdlUmVmcmVzaGVkIiwiY3NzIiwicmVtb3ZlQXR0ciIsImVhY2giLCJrIiwidiIsImJ0biJdLCJzb3VyY2VSb290IjoiIn0=