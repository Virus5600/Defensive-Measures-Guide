$((function(){window.history.replaceState({content:$("#inner-content").html()},"",window.location.href);var t=$("#filters");new RTLoader("filters",{url:t.prop("action"),action:t.prop("method"),data:t.serialize(),pushHistoryState:!0,success:function(e){e.includes("nonce=")&&(e=e.replaceAll(/(nonce=)(.\w+.)/g,"$1".concat(document.querySelector('meta[name="csp-nonce"]').content))),e=(new DOMParser).parseFromString(e,"text/html"),filters=e.querySelector("#filters"),t=e.querySelector("#table-content"),$("#filters").html(filters.innerHTML),$("#table-content").html(t.innerHTML)},popstateEvent:{enabled:!0,pushFn:function(){return{form:document.getElementById("filters").innerHTML,table:document.getElementById("table-content").innerHTML}},popFn:function(t){var e,n=null!==(e=RTLoader.getStates(t))&&void 0!==e?e:{content:t.state.content},o=n.form,l=void 0===o?null:o,r=n.table,c=void 0===r?null:r,i=n.content,a=void 0===i?null:i;null!=l&&$("#filters").html(l),null!=c&&$("#table-content").html(c),null!=a&&$("#inner-content").html(a)}}}),$(document).on("submit","#filters",(function(t){t.preventDefault(),t.stopPropagation()})),$(document).on("reset","#filters",(function(e){var n,o=$(e.currentTarget);$.ajax({url:null!==(n=o.prop("action").split("?")[0])&&void 0!==n?n:window.location.href.split("?")[0],type:o.prop("method"),success:function(e){e.includes("nonce=")&&(e=e.replaceAll(/(nonce=)(.\w+.)/g,"$1".concat(document.querySelector('meta[name="csp-nonce"]').content))),e=(new DOMParser).parseFromString(e,"text/html"),filters=e.querySelector("#filters"),t=e.querySelector("#table-content"),$("#filters").html(filters.innerHTML),$("#table-content").html(t.innerHTML),window.history.pushState({content:$("#inner-content").html()},"",window.location.href.split("?")[0])}})}))}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3ZpZXdzL2FkbWluL3ZlcnNpb25zL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBQSxHQUFFLFdBRURDLE9BQU9DLFFBQVFDLGFBQ2QsQ0FBQyxRQUFXSCxFQUFFLGtCQUFrQkksUUFDaEMsR0FDQUgsT0FBT0ksU0FBU0MsTUFHakIsSUFBSUMsRUFBT1AsRUFBRSxZQUNiLElBQUlRLFNBQVMsVUFBVyxDQUN2QkMsSUFBS0YsRUFBS0csS0FBSyxVQUNmQyxPQUFRSixFQUFLRyxLQUFLLFVBQ2xCRSxLQUFNTCxFQUFLTSxZQUNYQyxrQkFBa0IsRUFDbEJDLFFBQVMsU0FBQ0gsR0FFTEEsRUFBS0ksU0FBUyxZQUNqQkosRUFBT0EsRUFBS0ssV0FBVyxtQkFBb0IsS0FBRkMsT0FBT0MsU0FBU0MsY0FBYywwQkFBMEJDLFdBRWxHVCxHQUFPLElBQUlVLFdBQVlDLGdCQUFnQlgsRUFBTSxhQUM3Q1ksUUFBVVosRUFBS1EsY0FBYyxZQUM3QmIsRUFBT0ssRUFBS1EsY0FBYyxrQkFFMUJwQixFQUFFLFlBQVlJLEtBQUtvQixRQUFRQyxXQUMzQnpCLEVBQUUsa0JBQWtCSSxLQUFLRyxFQUFLa0IsVUFDL0IsRUFDQUMsY0FBZSxDQUNkQyxTQUFTLEVBQ1RDLE9BQVEsV0FDUCxNQUFPLENBQ04sS0FBUVQsU0FBU1UsZUFBZSxXQUFXSixVQUMzQyxNQUFTTixTQUFTVSxlQUFlLGlCQUFpQkosVUFFcEQsRUFDQUssTUFBTyxTQUFDQyxHQUFNLElBQUFDLEVBQ1BwQixFQUE0QixRQUF4Qm9CLEVBQUd4QixTQUFTeUIsVUFBVUYsVUFBRSxJQUFBQyxFQUFBQSxFQUFJLENBQUVYLFFBQVNVLEVBQUVHLE1BQU1iLFNBQ3pEYyxFQUFzRHZCLEVBQTlDTCxLQUFBQSxPQUFJLElBQUE0QixFQUFHLEtBQUlBLEVBQUFDLEVBQW1DeEIsRUFBakN5QixNQUFBQSxPQUFLLElBQUFELEVBQUcsS0FBSUEsRUFBQUUsRUFBcUIxQixFQUFuQlMsUUFBQUEsT0FBTyxJQUFBaUIsRUFBRyxLQUFJQSxFQUVyQyxNQUFSL0IsR0FDSFAsRUFBRSxZQUFZSSxLQUFLRyxHQUVQLE1BQVQ4QixHQUNIckMsRUFBRSxrQkFBa0JJLEtBQUtpQyxHQUVYLE1BQVhoQixHQUNIckIsRUFBRSxrQkFBa0JJLEtBQUtpQixFQUMzQixLQUtGckIsRUFBRW1CLFVBQVVvQixHQUFHLFNBQUQsWUFBdUIsU0FBQ1IsR0FDckNBLEVBQUVTLGlCQUNGVCxFQUFFVSxpQkFDSCxJQUdBekMsRUFBRW1CLFVBQVVvQixHQUFHLFFBQUQsWUFBc0IsU0FBQ1IsR0FBTSxJQUFBVyxFQUN0Q0MsRUFBTTNDLEVBQUUrQixFQUFFYSxlQUVkNUMsRUFBRTZDLEtBQUssQ0FDTixJQUF1QyxRQUFsQ0gsRUFBRUMsRUFBSWpDLEtBQUssVUFBVW9DLE1BQU0sS0FBSyxVQUFFLElBQUFKLEVBQUFBLEVBQUl6QyxPQUFPSSxTQUFTQyxLQUFLd0MsTUFBTSxLQUFLLEdBQzNFLEtBQVFILEVBQUlqQyxLQUFLLFVBQ2pCLFFBQVcsU0FBQ0UsR0FDUEEsRUFBS0ksU0FBUyxZQUNqQkosRUFBT0EsRUFBS0ssV0FBVyxtQkFBb0IsS0FBRkMsT0FBT0MsU0FBU0MsY0FBYywwQkFBMEJDLFdBQ2xHVCxHQUFPLElBQUlVLFdBQVlDLGdCQUFnQlgsRUFBTSxhQUU3Q1ksUUFBVVosRUFBS1EsY0FBYyxZQUM3QmIsRUFBT0ssRUFBS1EsY0FBYyxrQkFFMUJwQixFQUFFLFlBQVlJLEtBQUtvQixRQUFRQyxXQUMzQnpCLEVBQUUsa0JBQWtCSSxLQUFLRyxFQUFLa0IsV0FHOUJ4QixPQUFPQyxRQUFRNkMsVUFDZCxDQUFDLFFBQVcvQyxFQUFFLGtCQUFrQkksUUFDaEMsR0FDQUgsT0FBT0ksU0FBU0MsS0FBS3dDLE1BQU0sS0FBSyxHQUVsQyxHQUVGLEdBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdmlld3MvYWRtaW4vdmVyc2lvbnMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiJCgoKSA9PiB7XG5cdC8vIE9ubG9hZCBoYW5kbGVyXG5cdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShcblx0XHR7XCJjb250ZW50XCI6ICQoYCNpbm5lci1jb250ZW50YCkuaHRtbCgpfSxcblx0XHRcIlwiLFxuXHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cdCk7XG5cblx0bGV0IGZvcm0gPSAkKGAjZmlsdGVyc2ApO1xuXHRuZXcgUlRMb2FkZXIoXCJmaWx0ZXJzXCIsIHtcblx0XHR1cmw6IGZvcm0ucHJvcChgYWN0aW9uYCksXG5cdFx0YWN0aW9uOiBmb3JtLnByb3AoYG1ldGhvZGApLFxuXHRcdGRhdGE6IGZvcm0uc2VyaWFsaXplKCksXG5cdFx0cHVzaEhpc3RvcnlTdGF0ZTogdHJ1ZSxcblx0XHRzdWNjZXNzOiAoZGF0YSkgPT4ge1xuXHRcdFx0Ly8gUmVwbGFjZSBub25jZS4uLlxuXHRcdFx0aWYgKGRhdGEuaW5jbHVkZXMoXCJub25jZT1cIikpXG5cdFx0XHRcdGRhdGEgPSBkYXRhLnJlcGxhY2VBbGwoLyhub25jZT0pKC5cXHcrLikvZywgYCQxJHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3Atbm9uY2VcIl0nKS5jb250ZW50fWApO1xuXG5cdFx0XHRkYXRhID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBgdGV4dC9odG1sYCk7XG5cdFx0XHRmaWx0ZXJzID0gZGF0YS5xdWVyeVNlbGVjdG9yKGAjZmlsdGVyc2ApO1xuXHRcdFx0Zm9ybSA9IGRhdGEucXVlcnlTZWxlY3RvcihgI3RhYmxlLWNvbnRlbnRgKTtcblxuXHRcdFx0JChgI2ZpbHRlcnNgKS5odG1sKGZpbHRlcnMuaW5uZXJIVE1MKTtcblx0XHRcdCQoYCN0YWJsZS1jb250ZW50YCkuaHRtbChmb3JtLmlubmVySFRNTCk7XG5cdFx0fSxcblx0XHRwb3BzdGF0ZUV2ZW50OiB7XG5cdFx0XHRlbmFibGVkOiB0cnVlLFxuXHRcdFx0cHVzaEZuOiAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0J2Zvcm0nOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVycycpLmlubmVySFRNTCxcblx0XHRcdFx0XHQndGFibGUnOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUtY29udGVudCcpLmlubmVySFRNTFxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdHBvcEZuOiAoZSkgPT4ge1xuXHRcdFx0XHRjb25zdCBkYXRhID0gUlRMb2FkZXIuZ2V0U3RhdGVzKGUpID8/IHsgY29udGVudDogZS5zdGF0ZS5jb250ZW50IH07XG5cdFx0XHRcdGNvbnN0IHsgZm9ybSA9IG51bGwsIHRhYmxlID0gbnVsbCwgY29udGVudCA9IG51bGwgfSA9IGRhdGE7XG5cblx0XHRcdFx0aWYgKGZvcm0gIT0gbnVsbClcblx0XHRcdFx0XHQkKGAjZmlsdGVyc2ApLmh0bWwoZm9ybSk7XG5cblx0XHRcdFx0aWYgKHRhYmxlICE9IG51bGwpXG5cdFx0XHRcdFx0JChgI3RhYmxlLWNvbnRlbnRgKS5odG1sKHRhYmxlKTtcblxuXHRcdFx0XHRpZiAoY29udGVudCAhPSBudWxsKVxuXHRcdFx0XHRcdCQoYCNpbm5lci1jb250ZW50YCkuaHRtbChjb250ZW50KVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gRmlsdGVycyBzdWJtaXQgaGFuZGxlclxuXHQkKGRvY3VtZW50KS5vbihgc3VibWl0YCwgYCNmaWx0ZXJzYCwgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0fSk7XG5cblx0Ly8gUmVzZXQgaGFuZGxlclxuXHQkKGRvY3VtZW50KS5vbihgcmVzZXRgLCBgI2ZpbHRlcnNgLCAoZSkgPT4ge1xuXHRcdGxldCBvYmogPSAkKGUuY3VycmVudFRhcmdldCk7XG5cblx0XHQkLmFqYXgoe1xuXHRcdFx0XCJ1cmxcIjogb2JqLnByb3AoYGFjdGlvbmApLnNwbGl0KFwiP1wiKVswXSA/PyB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0sXG5cdFx0XHRcInR5cGVcIjogb2JqLnByb3AoYG1ldGhvZGApLFxuXHRcdFx0XCJzdWNjZXNzXCI6IChkYXRhKSA9PiB7XG5cdFx0XHRcdGlmIChkYXRhLmluY2x1ZGVzKFwibm9uY2U9XCIpKVxuXHRcdFx0XHRcdGRhdGEgPSBkYXRhLnJlcGxhY2VBbGwoLyhub25jZT0pKC5cXHcrLikvZywgYCQxJHtkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJjc3Atbm9uY2VcIl0nKS5jb250ZW50fWApO1xuXHRcdFx0XHRkYXRhID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBgdGV4dC9odG1sYCk7XG5cblx0XHRcdFx0ZmlsdGVycyA9IGRhdGEucXVlcnlTZWxlY3RvcihgI2ZpbHRlcnNgKTtcblx0XHRcdFx0Zm9ybSA9IGRhdGEucXVlcnlTZWxlY3RvcihgI3RhYmxlLWNvbnRlbnRgKTtcblxuXHRcdFx0XHQkKGAjZmlsdGVyc2ApLmh0bWwoZmlsdGVycy5pbm5lckhUTUwpO1xuXHRcdFx0XHQkKGAjdGFibGUtY29udGVudGApLmh0bWwoZm9ybS5pbm5lckhUTUwpO1xuXG5cdFx0XHRcdC8vIEhpc3RvcnkgaGFuZGxlclxuXHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoXG5cdFx0XHRcdFx0e1wiY29udGVudFwiOiAkKGAjaW5uZXItY29udGVudGApLmh0bWwoKX0sXG5cdFx0XHRcdFx0XCJcIixcblx0XHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59KTtcbiJdLCJuYW1lcyI6WyIkIiwid2luZG93IiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsImh0bWwiLCJsb2NhdGlvbiIsImhyZWYiLCJmb3JtIiwiUlRMb2FkZXIiLCJ1cmwiLCJwcm9wIiwiYWN0aW9uIiwiZGF0YSIsInNlcmlhbGl6ZSIsInB1c2hIaXN0b3J5U3RhdGUiLCJzdWNjZXNzIiwiaW5jbHVkZXMiLCJyZXBsYWNlQWxsIiwiY29uY2F0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGVudCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImZpbHRlcnMiLCJpbm5lckhUTUwiLCJwb3BzdGF0ZUV2ZW50IiwiZW5hYmxlZCIsInB1c2hGbiIsImdldEVsZW1lbnRCeUlkIiwicG9wRm4iLCJlIiwiX1JUTG9hZGVyJGdldFN0YXRlcyIsImdldFN0YXRlcyIsInN0YXRlIiwiX2RhdGEkZm9ybSIsIl9kYXRhJHRhYmxlIiwidGFibGUiLCJfZGF0YSRjb250ZW50Iiwib24iLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIl9vYmokcHJvcCRzcGxpdCQiLCJvYmoiLCJjdXJyZW50VGFyZ2V0IiwiYWpheCIsInNwbGl0IiwicHVzaFN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==