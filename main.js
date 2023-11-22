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

  const cartEmpty = document.querySelector("#empty");

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

  addToCart.addEventListener("click", () => {
    if (amount.innerText == "0") return;
    cartEmpty.innerText = "";
    cartModal.insertAdjacentHTML(
      "beforeend",
      ` <div
              id="cart-body"
              class="grid grid-cols-6 grid-rows-2 gap-6 justify-start items-center p-6"
            >
              <span class="row-[1/2] col-[1-2]"
                ><img
                  class="h-24 w-24 max-w-full rounded-lg"
                  src="./images/image-product-1-thumbnail.jpg"
                  alt=""
                />
              </span>
              <div class="row-[1/2] col-[2/6]">
                <p class="text-xl">Fall Limited Edition sneakers</p>
                <p class="text-xl">
                  $125.00 &times; ${
                    amount.innerText
                  } <span class="font-bold">$${
        parseFloat(amount.innerText) * 125
      }</span>
                </p>
              </div>
              <span id="remove-item" class="row-[1/2] col-[6/7] ml-auto cursor-pointer"
                ><img class="max-w-full" src="./images/icon-delete.svg" alt=""
              /></span>
              <span
                class="row-[2/3] col-[1/7] py-8 rounded-lg cursor-pointer text-center place-content-center bg-orange-400"
              >
                <a class="block text-2xl" href="/">Checkout</a>
              </span>
            </div>`
    );

    amount.innerText = 0;
    var removeItem = document.querySelectorAll("#remove-item");
    Array.from(removeItem).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log("ayay");
        e.target.closest("#cart-body").remove();
        console.log(cartEmpty.innerText);
      });
    });

    if (document.querySelectorAll("#remove-item".length == 0)) {
      console.log("ayayaaa");
    }
  });

  function checkItems() {
    document.querySelectorAll("#remove-item").length;
  }
});
