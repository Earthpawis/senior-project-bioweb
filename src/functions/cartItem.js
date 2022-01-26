export const getCartItem = () => {
  
        return JSON.parse(localStorage.getItem('item'));
   
    

}
export const setCartItem = (item) => {
    localStorage.setItem('item', JSON.stringify(item))
}