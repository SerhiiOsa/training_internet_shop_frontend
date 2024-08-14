import { addToBasket, deleteFromBasket } from "../http/basketApi"

export const handleAddToBasketClick = (product, basket) => {
  addToBasket({productId: product.id}).then(() => {
    basket.addProduct(product);
  })
}

export const handleRemoveFromBasketClick = (productId, basket) => {
  deleteFromBasket({productId}).then(() => {
    basket.removeProduct(productId)
  })
};
