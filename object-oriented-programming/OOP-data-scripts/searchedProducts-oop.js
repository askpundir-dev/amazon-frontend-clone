import products from "./products-oop.js";
export const search = {
  previousValue: "",
  results: [],

  searchProduct({ searchBar, productGrid, renderUi }) {
    let value = searchBar.value.trim().toLowerCase();
    this.results = []; // reset each time

    if (value !== this.previousValue) {
      this.previousValue = value;

      if (value === "") {
        window.location.href = "amazon.html";
        return;
      }
      products.forEach((product) => {
        product.keywords.forEach((keyword) => {
          if (
            keyword.includes(value) ||
            product.name.toLowerCase().includes(value)
          ) {
            if (!this.results.includes(product)) {
              this.results.push(product);
            }
          }
        });
      });

      if (this.results.length) {
        renderUi(this.results);
      } else {
        productGrid.classList.add("is-empty");
        productGrid.innerHTML = `
                  <div class="no-results">
                  <img src="/images/no-results.jpg" alt="No results" class="no-results-img">
                  <p class="no-results-text">Sorry, we don't have this product in our inventory yet.</p>
                  <button class="no-results-btn">Go back to all products</button>
                  </div>
                  `;

        const noResultBtn = productGrid.querySelector(".no-results-btn");
        noResultBtn.onclick = () => {
          renderUi(products);
        };
      }
    } else if (value === this.previousValue) {
      void productGrid.offsetWidth; // reflow for CSS animation
      productGrid.classList.add("refresh-effect");

      setTimeout(() => {
        productGrid.classList.remove("refresh-effect");
      }, 600);

      searchBar.value = "";
    }
  },
};
