export const getCartItem = () => {
    if(localStorage.getItem('item') === null){
        localStorage.setItem('item', JSON.stringify([]))
    }else {
        return JSON.parse(localStorage.getItem('item'));
    }
    

}
export const setCartItem = (item) => {
    localStorage.setItem('item', JSON.stringify(item))
}