import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [parts, setParts] = useState({});

    useEffect(() => {
        const url = `http://localhost:5000/parts/${id}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setParts(data))
    }, [id])

    const handleOrder = event => {
        event.preventDefault()
        const order = {
            email: user?.email,
            userName: user?.displayName,
            name: parts.name,
            price: parts.price,
            address: event.target.address.value,
            phone: event.target.phone.value,
            quantity: event.target.quantity.value

        }

        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Order successfully placed')
            })
    }


    return (
        <div className='min-h-screen w-80 mx-auto'>
            {/* <h2 className='text-center text-2xl'>Purchase: {id}</h2> */}
            <label for="my-modal-3" class="btn modal-button w-full max-w-xs my-10">Parts Detail</label>

            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <img className='w-80' src={parts.img} alt="" />
                    <h3 class="text-2xl font-bold">{parts.name}</h3>
                    <p class="py-4">Price:${parts.price}</p>
                    <p>minQuantity:{parts.minQuantity}</p>
                    <p>availableQuantity:{parts.availableQuantity}</p>
                </div>
            </div>

            <form onSubmit={handleOrder}>
                <input type="text" value={user?.displayName} class="input input-bordered w-full max-w-xs" />
                <input type="text" value={user?.email} class="input input-bordered w-full max-w-xs mt-2" disabled />
                <input type="text" name='address' placeholder="address" class="input input-bordered w-full max-w-xs mt-2" />
                <input type="text" name='phone' placeholder="Phone" class="input input-bordered w-full max-w-xs mt-2" />
                <input type="number" name='quantity' class="input input-bordered w-full max-w-xs mt-2" />

                <button class="btn w-full max-w-xs mt-2">place order</button>
            </form>
        </div >
    );
};

export default Purchase;