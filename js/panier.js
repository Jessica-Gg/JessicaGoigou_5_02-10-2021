{//Affichage du nombre de produits dans le panier
var nbPrdt = sessionStorage.getItem("compteurProduct");
document.querySelector(".cart span").textContent = nbPrdt;

//************* RECUPERATION ET AFFICAHEGE DES ELEMENTS DANS LA PAGE *************
//Récupération des éléments mis dans le panier
let itemsInCart = [];
itemsInCart = JSON.parse(sessionStorage.getItem("inCart"));
console.log(itemsInCart)

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
        document.getElementById("totalCost").innerText = `Prix total de la commande = ${totalCost} €`;
        sessionStorage.setItem("Total Cost", JSON.stringify(totalCost))   

//Vider le panier
        document.getElementById('deleteCart').addEventListener('click', function(){
            sessionStorage.clear()
            window.location.reload()
        })    
 
//************* FORMULAIRE DE COMMANDE *************

    //Affichage du formulaire de commande
        document.getElementById("btnForm").addEventListener("click", function(){
            document.getElementById("containerFormulaire").innerHTML += `     
            <h2 class="border-top border-bottom bold mt-5">Formulaire de commande</h2>
            <p class="mt-3">Les champs suivit d'une astérisque sont obligatoires</p>
            <form id="formulaire">
                <div class="form-group">
                    <label for="firstName">Nom *</label>
                    <input type="text" required class="form-control" id="firstName" name="firstName" placeholder="Entrez votre nom"
                    pattern="[A-Za-z]+" title="caractères alphabétiques uniquement">   
                </div>
                <div class="form-group">
                    <label for="lastName">Prénom *</label>
                    <input type="text" required class="form-control" id="lastName" name="lastName" placeholder="Entrez votre prénom" 
                    pattern="[A-Za-z]+" title="caractères alphabétiques uniquement">
                </div>
                <div class="form-group">
                    <label for="email">Adresse e-mail *</label>
                    <input type="email" required class="form-control" id="email" name="email" placeholder="name@mail.com">
                </div>
                <div class="form-group">
                    <label for="address">Adresse postale *</label>
                    <input type="text" required class="form-control" id="address" name="address" placeholder="rue, boulevard, avenue..."
                    title="caractères alphabétiques et numériques uniquement">
                </div>
                <div class="form-group">
                    <label for="postalCode">Code postal *</label>
                    <input type="text" required class="form-control" id="postalCode" name="postalCode" placeholder="Entrez votre code postal"
                    pattern="[0-9]+" title="caractères numériques uniquement">
                </div>
                <div class="form-group">
                    <label for="city">Ville *</label>
                    <input type="text" required class="form-control" id="city" name="city" placeholder="Indiquez votre ville"
                    pattern="[A-Za-z]+" title="caractères alphabétiques uniquement">
                </div>
                <button type="submit" class="btn btn-dark mt-3 mb-3">Valider mes informations et payer</button>
            </form>
            `               
   //Récupération des données entrées par l'utilisateur, transformation en objet JSON et stockage dans le sessionStorage
            document.getElementById('formulaire').addEventListener('submit', (event)=> {
                event.preventDefault()
                sendOrder()
            });
        
 //*************ENVOI DU FORMULAIRE *************

            function sendOrder(){
                let itemsInCart = []
                itemsInCart = JSON.parse(sessionStorage.getItem("inCart"));
                console.log(itemsInCart)       
                if(formulaire.reportValidity() === true){
            //Mettre les valeurs dans un objet
                    contact = {
                        firstName : document.getElementById("firstName").value,
                        lastName : document.getElementById("lastName").value,
                        email : document.getElementById("email").value,
                        address : document.getElementById("address").value,
                        postalCode : document.getElementById("postalCode").value,
                        city : document.getElementById("city").value,
                    }

                    const clientOrder = {
                        contact,
                        products : [itemsInCart]
                    }
                    
                    console.log('clientOrder')
                    console.log(clientOrder)

                    const dataToSend = JSON.stringify(clientOrder)
                    sessionStorage.setItem('dataToSend', dataToSend)
                    sessionStorage.setItem('contact', JSON.stringify(contact))
                    console.log('datatoSend')
                    console.log(dataToSend)
                 
            // Requête API POST
                    fetch('http://localhost:3000/api/furniture/order', {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
            //Objet JSON contenant les informations du client et de sa commande               
                        body: dataToSend,
                    })
                    .then(response => { 
                            return response.json()
                    })
                //    .then((data) => {
                //      localStorage.setItem("commande", JSON.stringify(data));
                //      localStorage.setItem("id commande", JSON.stringify(data.orderId));
                //    })
                    .then(response =>{ 
                        sessionStorage.getItem(JSON.stringify(contact));
                        window.location.assign("confirmation.html?orderId=" + response.orderId);
                    })
                //.then(response => {
                //    let getOrderId = response.orderId;
                //    let getTotalPrice = document.getElementById('totalCost').textContent;
                //    let validOrder = {
                //        getOrderId,
                //        getTotalPrice,
                //    };
                //    sessionStorage.setItem("confirmOrder", JSON.stringify(validOrder));
                //    setTimeout(function () {
                //        window.location = 'confirmation.html';
                //    }, 1500);
                //    console.log(validOrder);
                //    })
                    .catch(err =>{
                    alert('Une erreur s\'est produite, votre commande n\'a pas pu être validée. Veuillez réessayer ultérieurement')
                        console.log(err);
                    })
          
                } // Fin du if
              
            } //Fin fonction sendOrder
       
        }) //Fermeture fonction formulaire 

    } //Fermeture du Else
} 
