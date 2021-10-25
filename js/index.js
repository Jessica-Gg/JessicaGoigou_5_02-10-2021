let nbPrdt = sessionStorage.getItem("compteurProduct");
document.querySelector(".cart span").textContent = nbPrdt;

// Requête API
fetch("http://localhost:3000/api/furniture")
    .then(response => response.json())
    .then(function (listFurniture) {

//Boucle for pour générer un nouvel élément tant qu'il en reste à afficher
        for (let furniture of listFurniture) {  
            let item= new Produit(furniture)         
            document.getElementById("containerFurnitures").innerHTML +=

//Affichage des éléments sur la page
             `<div class="col-12 col-md-6 mt-5">
                <div class="card cardIndex shadow">
                    <div class="card-header bg-white">
                        <h2 class="card-title text-center">${item.name}</h2>
                    </div>
                    <a href="./pages_html/produit.html?id=${item.id}" aria-label="Lien vers la fiche produit détaillée">
                        <img src="${item.imageUrl}" class="card-img-top"  alt="image of a ${item.name}">
                    </a>
                    <div class="card-body">
                        <p class="card-text bold">prix : ${item.priceTxt}</p>
                        <p class="card-text">Description : ${item.description}</p>
                    </div>
                    <div class="card-footer">
                        <div class="text-center"><a id="seeProduct" class="btn" href="./pages_html/produit.html?id=${item.id}" aria-label="Lien vers la fiche produit détaillée">Voir la fiche complète</a></div>
                    </div>
                </div>
            </div>` 
        }
    })   

//En cas d'erreur au chargement, renvoie une alerte "Aucun produit n'a été trouvé"
    .catch(function (err) {
        console.log("fetch Error")
        alert("Aucun produit n'a été trouvé !")
    });




