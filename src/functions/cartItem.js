export const getCartItem = () => {
    if(localStorage.getItem('Chemical') === null){
        localStorage.setItem('Chemical', JSON.stringify([]))
        window.location.reload();
    }else {
        return JSON.parse(localStorage.getItem('Chemical'));
    }
    

}
export const setCartItem = (item) => {
    localStorage.setItem('Chemical', JSON.stringify(item))
}



export const getCartItemTool = () => {
    if(localStorage.getItem('Tool') === null){
        localStorage.setItem('Tool', JSON.stringify([]))
        window.location.reload();
    }else {
        return JSON.parse(localStorage.getItem('Tool'));
    }
    

}
export const setCartItemTool = (item) => {
    localStorage.setItem('Tool', JSON.stringify(item))
}

export const getUserData = () => {
    JSON.parse(localStorage.getItem('user'));
}


