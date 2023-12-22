export const getStorage=(n)=>JSON.parse(localStorage.getItem(n))
export const setStorage=(n,d)=>localStorage.setItem(n,JSON.stringify(d))
export const removeStorage=(n)=>localStorage.removeItem(n)
export const clearStorage=()=>localStorage.clear()
