// import { getMyOrders } from '@/sanity/lib/orders/getMyOrders'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Orders = async() => {
    const {userId} = await auth() 
    if(!userId) {
        return redirect("/")
    }
    // const orders = await getMyOrders(userId)
  return (
    <div>
      <div>
        <h1>Orders</h1>
      </div>
    </div>
  )
}

export default Orders
