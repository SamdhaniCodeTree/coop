
$(".gallery img").click(function () {
    $(".gallery-lightbox").fadeIn(300);
    $(".gallery-lightbox").append(
        "<img src='" +
        $(this).attr("src") +
        "' alt='" +
        $(this).attr("alt") +
        "' />"
    );
    $(".filter").css(
        "background-image",
        "url(" + $(this).attr("src") + ")"
    );
    /*$(".title").append("<h1>" + $(this).attr("alt") + "</h1>");*/
    $("html").css("overflow", "hidden");
    if ($(this).is(":last-child")) {
        $(".arrowr").css("display", "none");
        $(".arrowl").css("display", "block");
    } else if ($(this).is(":first-child")) {
        $(".arrowr").css("display", "block");
        $(".arrowl").css("display", "none");
    } else {
        $(".arrowr").css("display", "block");
        $(".arrowl").css("display", "block");
    }
});

$(".close").click(function () {
    $(".gallery-lightbox").fadeOut(300);
    //$("h1").remove();
    $(".gallery-lightbox img").remove();
    $("html").css("overflow", "auto");
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        $(".gallery-lightbox").fadeOut(300);
        $(".gallery-lightbox img").remove();
        $("html").css("overflow", "auto");
    }
});

$(".arrowr").click(function () {
    var imgSrc = $(".gallery-lightbox img").attr("src");
    var search = $(".gallery").find("img[src$='" + imgSrc + "']");
    var newImage = search.next().attr("src");
    /*$(".gallery-lightbox img").attr("src", search.next());*/
    $(".gallery-lightbox img").attr("src", newImage);
    $(".filter").css("background-image", "url(" + newImage + ")");

    if (!search.next().is(":last-child")) {
        $(".arrowl").css("display", "block");
    } else {
        $(".arrowr").css("display", "none");
    }
});

$(".arrowl").click(function () {
    var imgSrc = $(".gallery-lightbox img").attr("src");
    var search = $(".gallery").find("img[src$='" + imgSrc + "']");
    var newImage = search.prev().attr("src");
    /*$(".gallery-lightbox img").attr("src", search.next());*/
    $(".gallery-lightbox img").attr("src", newImage);
    $(".filter").css("background-image", "url(" + newImage + ")");

    if (!search.prev().is(":first-child")) {
        $(".arrowr").css("display", "block");
    } else {
        $(".arrowl").css("display", "none");
    }
});