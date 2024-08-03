import { redirect } from "react-router-dom";

export function getAuthId(){
    const id = localStorage.getItem('id');
    return id;
}

export function cheackAuthLoader(){
    const id = getAuthId();
    if(!id){
        return redirect('/ologin');
    }

    return null;
}

async function getOrders(ownerID){
    const response = await fetch('/api/v1/orders/' + ownerID);
    if(!response.ok){
        return Error('error fetching orders');
    }else{
        const data = await response.json();
        return data;
    }
}

export async function dashboardLoader(){
    const id = getAuthId();
    if(!id){
        return redirect('/ologin');
    }

    if(id){
        const orders = await getOrders(id);
        return orders;
    }

    return null;
}

export function idLoader(){
    return getAuthId();
}

export function logout(){
    localStorage.removeItem('id');
    localStorage.removeItem('clg');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    return redirect('/ologin');
}