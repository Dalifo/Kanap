const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
  };
  const orderId = getProductId();
  
  const cart = JSON.parse(localStorage.getItem("cart"));
  
  const idConfirmation = document.querySelector("#orderId");

  
  //Affichage de l'orderId dans le DOM
  (function () {
    idConfirmation.innerHTML = `
    <br>
    <strong>${orderId}</strong>.
    `;
      localStorage.clear();
  })();