document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.querySelector("#menu-hamburger");
  const navContainer = document.querySelector("#nav-container");
  const closeBtn = document.querySelector("#close-menu-btn");
  const cartBtn = document.querySelector("#cart");
  const cartModal = document.querySelector("#cart-modal");

  const thumbnailImgs = document.querySelectorAll("#thumbnail-img");
  const productImg = document.querySelector("#product-img");

  const increaseAmount = document.querySelector("#increment");

  const decreaseAmount = document.querySelector("#decrement");
  const amount = document.querySelector("#amount");

  const gallery = document.querySelector("#lightbox-gallery");
  const galleryNext = document.querySelector("#gallery-next");
  const galleryPrev = document.querySelector("#gallery-previous");
  const galleryImg = document.querySelector("#gallery-img");

  const galleryThumbnails = document.querySelectorAll("#gallery-thumbnails");

  const exitGallery = document.querySelector("#lightbox-gallery-close");

  const mobileNext = document.querySelector("#mobile-next");
  const mobilePrev = document.querySelector("#mobile-prev");
  const addToCart = document.querySelector("#add-to-cart");

  const cartBody = document.querySelector("#cart-body");

  const cartEmpty = document.querySelector("#empty");
  const removeItem = document.querySelector("#remove-item");
  const orderAmount = document.querySelector("#order-amount");
  const orderPrice = document.querySelector("#order-price");

  const cartToolTip = document.querySelector("#cart-amount-tip");

  if (cartEmpty.nextElementSibling) {
    cartEmpty.classList.add("hidden");
  }

  //hamburger stufff !

  hamburgerBtn.addEventListener("click", () => {
    navContainer.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    navContainer.classList.add("hidden");
  });

  // cart

  cartBtn.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
  });

  // incremment and decrement

  [increaseAmount, decreaseAmount].forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "increment") {
        amount.innerText = parseInt(amount.innerText) + 1;
      }
      if (btn.id === "decrement") {
        if (parseInt(amount.innerText) == 0) return;
        amount.innerText = parseInt(amount.innerText) - 1;
      }
      return;
    });
  });

  Array.from(thumbnailImgs).forEach((imgs) => {
    imgs.addEventListener("click", (e) => {
      switchImg(e, productImg);
    });
  });

  function switchImg(e, el) {
    const src = e.target.getAttribute("src");
    const newSrc = src.slice(0, src.lastIndexOf("-")) + ".jpg";
    el.firstElementChild.setAttribute("src", newSrc);
  }

  if (window.innerWidth < 640) {
    console.log("coe on man");
    productImg.removeEventListener("click", () => {
      gallery.classList.remove("hidden");
      gallery.classList.add("flex");
    });
  } else {
    productImg.addEventListener("click", () => {
      gallery.classList.remove("hidden");
      gallery.classList.add("flex");
    });
  }

  exitGallery.addEventListener("click", () => {
    gallery.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      gallery.classList.add("hidden");
    }
  });

  galleryNext.addEventListener("click", () => {
    let currentImg = galleryImg.getAttribute("src");
    currentImg = currentImg.replace(
      /(\d+)(\.jpg)$/,
      (match, number, extension) => {
        if (number == 4) {
          number = 0;
        }
        const incrementedNumber = parseInt(number) + 1;
        return incrementedNumber + extension;
      }
    );
    galleryImg.setAttribute("src", currentImg);
  });

  galleryPrev.addEventListener("click", () => {
    let currentImg = galleryImg.getAttribute("src");
    currentImg = currentImg.replace(
      /(\d+)(\.jpg)$/,
      (match, number, extension) => {
        if (number == 1) {
          number = 5;
        }
        const incrementedNumber = parseInt(number) - 1;
        return incrementedNumber + extension;
      }
    );
    galleryImg.setAttribute("src", currentImg);
  });

  Array.from(galleryThumbnails).forEach((thumb) => {
    thumb.addEventListener("click", (e) => {
      const src = e.target.getAttribute("src");
      const newSrc = src.slice(0, src.lastIndexOf("-")) + ".jpg";
      galleryImg.setAttribute("src", newSrc);
    });
  });

  mobileNext.addEventListener("click", () => {
    let src = productImg.firstElementChild.getAttribute("src");
    src = src.replace(/(\d+)(\.jpg)$/, (match, number, extension) => {
      if (number == 4) {
        number = 0;
      }
      const incrementedNumber = parseInt(number) + 1;
      return incrementedNumber + extension;
    });
    productImg.firstElementChild.setAttribute("src", src);
  });

  mobilePrev.addEventListener("click", () => {
    let src = productImg.firstElementChild.getAttribute("src");

    src = productImg.firstElementChild.getAttribute("src");
    src = src.replace(/(\d+)(\.jpg)$/, (match, number, extension) => {
      if (number == 0) {
        number = 5;
      }
      const incrementedNumber = parseInt(number) - 1;
      return incrementedNumber + extension;
    });
    productImg.firstElementChild.setAttribute("src", src);
  });

  let cartIsEmpty = true;

  function updateCartStatus() {
    if (cartIsEmpty) {
      cartEmpty.innerText = "Your cart is empty.";
      cartEmpty.style.marginBlock = "30px";
      cartBody.classList.add("hidden");
      cartBody.classList.remove("grid");
      cartToolTip.innerText = amount.innerText = 0;
      if (cartToolTip.parentElement.classList.contains("hidden")) {
        return;
      } else {
        cartToolTip.parentElement.classList.add("hidden");
      }
    } else {
      cartEmpty.innerText = "";
      cartEmpty.style.marginBlock = "0px";
      cartBody.classList.remove("hidden");
      cartBody.classList.add("grid");
      orderAmount.innerText = amount.innerText;
      orderPrice.innerText = `$${125 * parseFloat(amount.innerText)}.00`;

      cartToolTip.innerText = amount.innerText;
      if (cartToolTip.parentElement.classList.contains("hidden")) {
        cartToolTip.parentElement.classList.remove("hidden");
      }
    }
  }

  addToCart.addEventListener("click", () => {
    if (amount.innerText == "0") return;
    cartIsEmpty = false;
    updateCartStatus(amount);
  });

  removeItem.addEventListener("click", () => {
    console.log("ayayaya");
    cartIsEmpty = true;
    updateCartStatus(amount);
  });
});
