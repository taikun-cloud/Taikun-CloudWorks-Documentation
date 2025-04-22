document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
        document.body.classList.add("homepage");
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const onScroll = () => {
    if (window.scrollY > 50) {
      document.body.classList.add("scrolled");
    } else {
      document.body.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll);
});
