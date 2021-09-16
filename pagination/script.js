function getPageList(totalPages, page, maxLength) {
  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }
  var sideWidht = maxLength < 9 ? 1 : 2;
  var leftWidht = (maxLength - sideWidht * 2 - 3) >> 1;
  var righWidht = (maxLength - sideWidht * 2 - 3) >> 1;

  if (totalPages <= maxLength) {
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidht - 1 - righWidht) {
    return range(1, maxLength - sideWidht - 1).concat(0, range(totalPages - sideWidht + 1, totalPages));
  }
  if (page >= totalPages - sideWidht - 1 - righWidht) {
    return range(1, sideWidht).concat(0, range(totalPages - sideWidht - 1 - righWidht - leftWidht, totalPages));
  }
  return range(1, sideWidht).concat(0, range(page - leftWidht, page + righWidht), 0, range(totalPages - sideWidht + 1, totalPages));
}

$(function () {
  var numberOfItems = $("#card-content .card").length;
  var limitPerPage = 3;
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  var paginationSize = 7;
  var currentPage;

  function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;

    currentPage = whichPage;
    $("#card-content .card")
      .hide()
      .slice(currentPage - 1 + limitPerPage, currentItem + limitPerPage)
      .show();

    $(".pagination li").slice(1, -1).remove();

    getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
      $("<li>")
        .addClass(".currentPage")
        .addClass(item ? "currentPage" : "dots")
        .toggleClass("active", item === currentPage)
        .append(
          $("<a>")
            .addClass("page-link")
            .attr({ href: "javascript:void(0)" })
            .text(item || "...")
        )
        .insertBefore(".next-page");
    });
    $(".previous-page").toggleClass("disable", currentPage === 1);
    $(".next-page").toggleClass("disable", currentPage === totalPages);
  }
  $(".pagination").append(
    $("<li>")
      .addClass("page-item")
      .addClass("previous-page")
      .append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("previous")),
    $("<li>")
      .addClass("page-item")
      .addClass("previous-page")
      .append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("next"))
  );
  $("#card-content").show();
  showPage(1);
  $(document).on("click", ".pagination li.current-page:not(.active)", function () {
    return showPage(+$(this).text());
  });
  $(".next-page").on("click", function () {
    return showPage(currentPage + 1);
  });
  $(".previous-page").on("click", function () {
    return showPage(currentPage - 1);
  });
});
