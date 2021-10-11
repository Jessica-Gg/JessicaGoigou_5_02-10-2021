{//Affichage du nombre de produits dans le panier
var nbPrdt = localStorage.getItem("compteurProduct");
document.querySelector(".cart span").textContent = nbPrdt;

//************* RECUPERATION ET AFFICAHEGE DES ELEMENTS DANS LA PAGE *************
//Récupération des éléments mis dans le panier
let itemsInCart = JSON.parse(localStorage.getItem("inCart"));

//Affichage si le panier est vide 
if(itemsInCart === null || itemsInCart === []){
    document.getElementById("containerCart").innerHTML += 
        `<div class="container">
            <h2 class="text-center">Le panier est vide !</h2>
        </div>
        `
}
//Affichage des élements du panier
    else {
        for(let i in itemsInCart){
            let item = itemsInCart[i]
            document.getElementById("containerCart").innerHTML +=
            `<div id="cardItems" class="card shadow mb-3">
                <div class="row"> 
                    <div class="col-md-4">  
                        <img class="card-img" src="${item.imageUrl}" alt=""/>
                    </div>  
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5></br>
                            <p class="card-text bold" id="price">Prix : ${item.priceTxt}</p>
                            <p class="card-text" id="quantityValue">Quantité : ${item.quantity}</p> 
                            <p class="card-text bold" id="totalElement"> Total : ${item.quantity*item.price} €</p>
                        
                        </div>
                    </div>
                </div>
            </div>` 
        }    
//************* TOTAL*************
//Total du panier
    //Déclaration de la variable et enregistrement des prix dans un tableau
        let totalCostCalcul = [];
        for (j in itemsInCart){
            let costProducts = itemsInCart[j].price*itemsInCart[j].quantity;
            totalCostCalcul.push(costProducts);
        }

    //Addition des prix avec la méthode reduce
        let reducer = (accumulator, currentValue) => accumulator + currentValue
        let totalCost = totalCostCalcul.reduce(reducer, 0);

    //Affichage du total des prix 
        document.getElementById("totalCost").innerText = "Prix total du panier = " + totalCost + " €";
        localStorage.setItem("Total Cost", JSON.stringify(totalCost))   

//Vider le panier
    document.getElementById('deleteCart').addEventListener('click', function(){
        localStorage.clear()
        window.location.reload()
    })    
 
//************* FORMULAIRE DE COMMANDE *************

    //Affichage du formulaire de commande
        document.getElementById("btnForm").addEventListener("click", function(){
            document.getElementById("containerFormulaire").innerHTML += `     
            <h2 class="border-top border-bottom bold mt-5">Formulaire de commande</h2>
            <form id="formulaire">
                <div class="form-group">
                    <label for="firstName">Nom *</label>
                    <input type="text" required class="form-control" id="firstName" placeholder="Entrez votre nom">
                </div>
                <div class="form-group">
                    <label for="lastName">Prénom *</label>
                    <input type="text" required class="form-control" id="lastName" placeholder="Entrez votre prénom">
                </div>
                <div class="form-group">
                    <label for="mail">Adresse e-mail *</label>
                    <input type="email" required class="form-control" id="mail" placeholder="name@mail.com">
                </div>
                <div class="form-group">
                    <label for="adress">Adresse postale *</label>
                    <input type="text" required class="form-control" id="address" placeholder="rue, boulevard, avenue...">
                </div>
                <div class="form-group">
                    <label for="addressComplement">Complément d'adresse</label>
                    <input type="text" class="form-control" id="addressComplement" placeholder="Bâtiment, étage, appartement...">
                </div>
                <div class="form-group">
                    <label for="postalCode">Code postal *</label>
                    <input type="text" required class="form-control" id="postalCode" placeholder="Entrez votre code postal">
                </div>
                <div class="form-group">
                    <label for="city">Ville *</label>
                    <input type="text" required class="form-control" id="city" placeholder="Indiquez votre ville">
                </div>
                <div class="form-group">
                    <label for="country">Pays</label>
                    <input type="text" class="form-control" id="country" placeholder="Si autre que la France">
                </div>
                <p class="text-muted mt-3">* Ces champs sont obligatoires</p>
                <p id="messageIfError"></p>
                <a href="./confirmation.html">
                    <button id="validationCommande" type="submit" class="btn btn-dark mt-3 mb-3">Valider mes informations et payer</button>
                </a>
            </form>
            `           
        })
//Vérification des données du formulaire
    /*    function checkInputs(){
            //Contrôles Regex source : https://montrezvous.net/developpement-web/controles-de-formulaires-en-html5.html + https://javascript.developpez.com/tutoriels/cours-regexp/#LII.4-C
            let checkString = /[a-zA-ZÀ-ÿ]/;
            let checkNumber = /[0-9]+/;
            let checkSpecialCaracter = /[§!@#$%^&*(),.?":{}|<>]/
            let checkMail = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;

            //Récupération des inputs
            let formFirstName = document.getElementById('firstName').value
            let formLastName = document.getElementById('lastname').value
            let formMail = document.getElementById('mail').value
            let formAdress = document.getElementById('adress').value
            let formAddressComplement = document.getElementById('addressComplement').value
            let formPostalCode = document.getElementById('postalCode').value
            let formCity = document.getElementById('city').value
            let formCountry = document.getElementById('country').value
            let messageError = document.getElementById('messageIfError')

            //Test des inputs
            //Nom
            if(checkNumber.test(formFirstName) === true || formFirstName === ""){
                messageError.innerText += 'Veuillez n\'utiliser que des lettres'
            }else{
                console.log("Administration : ok")
            }
            //Prénom
            if(checkNumber.test(formLastName) === true || formLastName === ""){
                messageError.innerText += 'Veuillez n\'utiliser que des lettres'
            }else{
                console.log("Administration : ok")
            }
            //Mail
            if(checkMail.test(formMail) === false){
                messageError.innerText += 'Veuillez entrer une adresse mail valide'
            }else{
                console.log("Administration : ok")
            }
            //Adresse 1
            if(checkSpecialCaracter.text(formAdress) === true || formAdress === ""){
                messageError.innerText += 'Veuillez remplir votre adresse correctement'
            }else{
                console.log("Administration : ok")
            }
            //Adresse 2
            if(checkSpecialCaracter.text(formAddressComplement) === true || formAddressComplement === ""){
                messageError.innerText += 'Veuillez remplir votre adresse correctement'
            }else{
                console.log("Administration : ok")
            }
            //Code Postal
            if(checkString.test(formPostalCode) === true || formPostalCode === ""){
                messageError.innerText += 'Veuillez n\'utiliser que des chiffres'
            }else{
                console.log("Administration : ok")
            }
            //Ville
            if(checkNumber.test(formCity) === true || formCity === ""){
                messageError.innerText += 'Veuillez n\'utiliser que des lettres'
            }else{
                console.log("Administration : ok")
            }
            //Pays
            if(checkNumber.test(formCountry) === true || formCountry === ""){
                messageError.innerText += 'Veuillez n\'utiliser que des lettres'
            }else{
                console.log("Administration : ok")
            }
        }*/
    //Enregistrement des données du formulaire au clic
        function sendOrder(){
            if(formulaire.reportValidity() === true && itemsInCart.length > 0){
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

                itemsOrder = [itemsInCart]

                const clientOrder = {
                    idContact,
                    itemsOrder,
                }

               localStorage.setItem("clientOrder", JSON.stringify(clientOrder)) 
  
        // Requête API POST
            fetch("http://localhost:3000/api/furniture/order", {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json"
                },
                //Objet JSON contenant les informations du client et de sa commande
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

        sendForm = document.getElementById('validationCommande')
        if(sendForm !== undefined && sendForm !== null){
            sendForm.addEventListener('click', function() {
                sendOrder()
            });
        };
              
//Fermeture du Else
    }
}
