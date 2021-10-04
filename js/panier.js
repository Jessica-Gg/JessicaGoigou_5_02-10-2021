//Affichage du nombre de produits dans le panier
var nbPrdt = localStorage.getItem("compteurProduct");
document.querySelector(".cart span").textContent = nbPrdt;

//************* RECUPERATION ET AFFICAHEGE DES ELEMENTS DANS LA PAGE *************
//Récupération des éléments mis dans le panier
let itemInCart = JSON.parse(localStorage.getItem("inCart"));

//Affichage si le panier est vide 
if(itemInCart == null || itemInCart == []){
    document.getElementById("containerCart").innerHTML += 
        `<div class="container">
            <h2 class="text-center">Le panier est vide !</h2>
        </div>
        `
}
//Affichage des élements du panier
    else{
        for(let i in itemInCart){
            document.getElementById("containerCart").innerHTML +=
            `<div class="card shadow mb-3">
                <div class="row"> 
                    <div class="col-md-4">  
                        <img class="card-img" src="${itemInCart[i].imageUrl}" alt=""/>
                    </div>  
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Produit : ${itemInCart[i].name}</h5></br>
                            <p class="card-text bold" id="price">Prix : ${itemInCart[i].priceTxt}</p>
                            <label for="quantityValue">Quantité : </label>
                            <input type="number"class="mb-3" name="quantityValue" id="quantityValue" min="0" max="10" size="1" value="${itemInCart[i].quantity}"> 
                            <p class="card-text bold" id="totalElement"> Total : ${itemInCart[i].quantity*itemInCart[i].price} €</p>
                            <button type="button" onclick="deleteItem(id)" class="btn btn-outline-dark btn-sm mt-3 btnSuppr" data-id="${i}">Retirer l'article</button>
                        </div>
                    </div>
                </div>
            </div>` 
        }    

//************* SUPPRIMER OU AJOUTER DES ELEMENTS *************
         function deleteItem(id){
                if(itemInCart[id].quantity > 1){
                    itemInCart[id] --
                } else {
                    itemInCart.splice(id, 1)
                }
                localStorage.setItem("inCart", JSON.stringify(itemInCart))
                window.location.reload()
        }

//************* TOTAL DU PANIER *************
    //Déclaration de la variable et enregistrement des prix dans un tableau
        let totalCostCalcul = [];
        for (j in itemInCart){
            let costProducts = itemInCart[j].price*itemInCart[j].quantity;
            totalCostCalcul.push(costProducts);
        }

    //Addition des prix du tableau avec la méthode reduce
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        const totalCost = totalCostCalcul.reduce(reducer, 0);

    //Affichage du total des prix 
        document.getElementById("totalCost").innerText = "Prix total du panier = " + totalCost + " €";
        localStorage.setItem("Total Cost", JSON.stringify(totalCost))

//************* FORMULAIRE DE COMMANDE *************

    //Affichage du formulaire de commande
        document.getElementById("btnForm").addEventListener("click", function(e){
            e = document.getElementById("containerFormulaire").innerHTML += `     
            <h2 id="formulaire" class="border-top border-bottom bold mt-5">Formulaire de commande</h2>
            <div class="form-group col-md-4 mt-3">
                <label for="firstName">Nom *</label>
                <input type="text" required class="form-control" id="firstName" placeholder="Entrez votre nom">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="lastName">Prénom *</label>
                <input type="text" required class="form-control" id="lastName" placeholder="Entrez votre prénom">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="mail">Adresse e-mail *</label>
                <input type="email" required class="form-control" id="mail" placeholder="name@mail.com">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="adress">Adresse postale *</label>
                <input type="text" required class="form-control" id="address" placeholder="rue, boulevard, avenue...">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="addressComplement">Complément d'adresse</label>
                <input type="text" class="form-control" id="addressComplement" placeholder="Bâtiment, étage, appartement...">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="postalCode">Code postal *</label>
                <input type="number" required class="form-control" id="postalCode" placeholder="Entrez votre code postal">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="city">Ville *</label>
                <input type="text" required class="form-control" id="city" placeholder="Indiquez votre ville">
            </div>
            <div class="form-group col-md-4 mt-3">
                <label for="country">Pays</label>
                <input type="text" class="form-control" id="country" placeholder="Si autre que la France">
            </div>
            <p class="text-muted mt-3">* Ces champs sont obligatoires</p>
            <a href="confirmation.html">
                <button id="orderCommand" type="submit" class="btn btn-dark mt-3 mb-3">
                    Valider mes informations et payer
                </button>
            </a>`
        })

    //Enregistrement des données du formulaire au clic
        function sendOrder(){
            if(containerFormulaire.reportValidity() == true && itemInCart > 0){
    //Mettre les values dans un objet
                const idContact = {
                    firstName : document.getElementById("firstName").value,
                    lastName : document.getElementById("lastName").value,
                    email : document.getElementById("mail").value,
                    adress : document.getElementById("adress").value,
                    adressComplement : document.getElementById("adressComplement").value,
                    postalCode : document.getElementById("postalCode").value,
                    city : document.getElementById("city").value,
                    country : document.getElementById("country").value,
                }

                const clientOrder = {
                    idContact,
                    itemInCart,
                }

                localStorage.setItem("clientOrder", JSON.stringify(clientOrder))

        // Requête API POST
            fetch("http://localhost:3000/api/furniture/order", {
                method:'POST',
                headers: {
                    'content-type': "application/json"
                },
                mode:"cors",
                body: JSON.stringify(clientOrder),
            })
                .then(function(response){ 
                return response.json()
                })
                .then(function (r){ 
                    localStorage.setItem("orderForm", JSON.stringify(r.clientOrder));
                    window.location.assign("confirmation.html?clientOrderId=" + r.clientOrderId);
                })
                .catch(function (err){
                    console.log("fetch Error");
                });
            }
        }

        sendForm = document.getElementById('orderCommand')
        sendForm.addEventListener('click', function() {
            sendOrder()
        });
       
      
//Fermeture du Else
}


