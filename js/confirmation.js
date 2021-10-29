 // Récupération de l'id dans les paramètres de l'url
let paramsId = (new URL(document.location)).searchParams;
let orderId = paramsId.get("orderId");
 
 //Affichage des données sur la page de confirmation de commande
document.getElementById('totalCommande').textContent += 
    'Le montant total de votre commande est de : ' + sessionStorage.getItem('Total Cost') + '€';
document.getElementById('identifiantClient').textContent +=
    'Votre identifiant de commande à garder : ' + orderId


//Vidage du sessionStorage et redirection sur la page d'accueil après avoir cliquer sur "Terminer"
document.getElementById('resetStorage').addEventListener('click', function(){
    sessionStorage.clear()
    document.location = '/index.html';
})