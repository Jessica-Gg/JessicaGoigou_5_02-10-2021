class Produit{
    constructor(furniture){
        this.varnish = furniture.varnish;
        this.id = furniture._id;
        this.name = furniture.name;
        this.price = furniture.price/100;
        this.priceTxt = (new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(furniture.price/100))
        this.description = furniture.description;
        this.imageUrl = furniture.imageUrl;
        this.quantity = furniture?.quantity ?? 0; 
    }
}

