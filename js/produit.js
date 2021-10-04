// Récupération de l'id dans les paramètres de l'url
let paramsId = (new URL(document.location)).searchParams;
let id = paramsId.get("id");

//Afficahge du nombre de produits dans le panier
let nbPrdt = localStorage.getItem("compteurProduct");
document.querySelector(".cart span").textContent = nbPrdt;

// REQUETE API + id produit pour afficher uniquement celui qui a été sélectionné
fetch('http://localhost:3000/api/furniture/' + id)
    .then(response => response.json())
    .then(function (furniture) {

        //Tranformation du retour API en objet de type Produit    
        let item = new Produit(furniture)

        //Code pour l'affichage html de l'élément sur la page     
        document.getElementById("containerFurniture").innerHTML +=
            `<div class="card shadow mb-3">
            <div class="row no-gutters">
                <div class="col-md-6">  
                    <img class="card-img" src="${item.imageUrl}" alt=""/>
                </div>  
                <div class="col-md-6">
                    <div class="card-body">
                        <h2 class="card-title">Produit : ${item.name}</h2><br/>
                        <p class="card-text bold">Prix : ${item.priceTxt}</p>
                        <p class="card-text">Description : ${item.description}</p>
                        <div>
                            <label for="vernis">Personnalisation</label>
                            <select id="vernis" class="mb-3 form-control">
                                <option>Choisir un vernis</option>
                            </select>
                        </div> 
                    </div>
                    <div class="card-footer bg-white d-flex flex-row-reverse">
                        <a href="./panier.html" id="addcart" class="btn btn-dark mt-3 mb-3">Ajouter au panier</a>
                    </div>
                </div>
            </div>
        </div>`

        //Choix du vernis en fonction du meuble sélectionné
        for (varnish of item.varnish) {
            document.getElementById('vernis').innerHTML += `<option>${varnish}</option>`;
        }

        //Ecoute au clic pour ajout du meuble au panier    
        document.getElementById("addcart").addEventListener("click", function (e) {
            e.preventDefault();
            //Récupération du panier local ou initialisation si inexistant
            var inCart = JSON.parse(localStorage.getItem("inCart")) ?? {};
            //Ajout du meuble et de ses informations au panier local
            if (!inCart[item.name]) {
                inCart = {
                    ...inCart,
                    [item.name]: item
                }
            }
            inCart[item.name].quantity += 1;


            //Ajout local storage - Sauvegarde des éléments ajouté au panier
            localStorage.setItem("inCart", JSON.stringify(inCart));

            //Compteur du nombre de produits dans le panier
            var nbProduct = localStorage.getItem('compteurProduct');
            nbProduct++;
            localStorage.setItem("compteurProduct", nbProduct);
            document.querySelector(".cart span").textContent = nbProduct;
        })
    })

    //En cas d'erreur, renvoie une alerte "Aucun produit n'a été trouvé"
    .catch(function (err) {
        console.log("fetch Error")
        alert("Aucun produit n'a été trouvé")
    });


