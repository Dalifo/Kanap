var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

var colorPicked = document.querySelector("#colors");
var quantityPicked = document.querySelector("#quantity");

cardsFetch();

// Récupération des articles de l'API
function cardsFetch() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getPost(article) {
  // Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // Modification du titre
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // Modification du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // Modification de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // Insertion des options de couleurs
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

// Ajout de produits au panier
// get panier from localStorage.
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  // Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  btn_envoyerPanier.addEventListener("click", (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      // Récupérer couleur, quantité, options.
      let choixCouleur = colorPicked.value;
      let choixQuantite = quantityPicked.value;
      let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      // Initialiser le local Storage
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

//fenêtre pop-up
const popupConfirmation =() =>{
  if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
      window.location.href ="cart.html";
  }
}


      // Importation dans le local storage
      // Si le produitt est deja dans le panier
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) =>
            el.idProduit === idProduct && el.couleurProduit === choixCouleur
        );
        // Si id du produit et sa couleur sont dans le panier alors
        /// On augmente sa quantité
        if (resultFind) {
          let newQuantite =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();

          // Au cas contraire on ajoute un nouveau produit.
        } else {
          produitLocalStorage.push(optionsProduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
        // Si le panier est vide
      } else {
        // Créer le panier
        produitLocalStorage = [];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}
