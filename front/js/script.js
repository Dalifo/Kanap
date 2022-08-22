let cardsFetch = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .catch((error) => alert("Erreur : " + error))

    .then((data) => {
      console.log("Success:", data);
      for (i = 0; i < data.length; i++) {
        const productCard = `
        <a href="./product.html?id=${data[i]._id}">
            <article>
              <img
                src="${data[i].imageUrl}"
                alt="${data[i].altTxt}"
              />
              <h3 class="productName">${data[i].name}</h3>
              <p class="productDescription">
                ${data[i].description}
              </p>
            </article>
          </a>`;
        document
          .getElementById("items")
          .insertAdjacentHTML("beforeend", productCard);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
cardsFetch();