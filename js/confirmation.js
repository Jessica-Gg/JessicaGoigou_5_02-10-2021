 //Afficahge des données sur la page de confirmation de commande
document.getElementById('totalCommande').textContent += 'Le montant total de votre commande est de : ' + sessionStorage.getItem('Total Cost') + '€';


//Vidage du sessionStorage et redirection sur la page d'accueil après avoir cliquer sur "Terminer"
document.getElementById('resetStorage').addEventListener('click', function(){
    sessionStorage.clear()
    document.location = '/index.html';
})
