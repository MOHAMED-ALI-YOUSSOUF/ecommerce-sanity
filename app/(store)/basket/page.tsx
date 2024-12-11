"use client"
// import { createCheckoutSession, Metadata } from '@/actions/createCheckoutSession'
import AddToBasketButton from '@/components/AddToBasketButton'
import Loader from '@/components/Loader'
import { imageUrl } from '@/lib/imageUrl'
import useBasketStore from '@/store/store'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';




const BasketPage = () => {
    const groupedItems = useBasketStore((state) => state.getGroupedItems())
    const { isSignedIn} = useAuth()
    const { user} = useUser();
    // const router = useRouter();

    const [isClient, setIsClent]= useState(false);
    const [isLoading, setIsLoading]= useState(false);


    useEffect(() =>{
        setIsClent(true)
    },[])

    if (!isClient){
        return <Loader/>
    }

    if (groupedItems.length === 0){
        return (
            <div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]'>
                <h1 className='text-2xl font-bold mb-6 text-gray-800'>Your Basket</h1>

                <p className='text-gray-600 text-lg'> Your basket is empty</p>
            </div>
    )
    }

    // const handleCheckout = async() => {
    //     if (!isSignedIn) return;
    //     setIsLoading(true)

    //     try {
    //         const metadata:Metadata  = {

    //             orderNumber: crypto.randomUUID(),
    //             customerName: user?.fullName ?? "Unknown",
    //             customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
    //             clerkUserId: user!.id
    //         }

    //         const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
            
    //     } catch (error) {
            
    //     } finally{
    //         setIsLoading(false)
    //     }

    // }

   
    const handleCheckout = async () => {
        if (!isSignedIn) return;
    
        setIsLoading(true);
    
        try {
            // Générer les détails de la commande
            const orderSummary = groupedItems.map((item) => {
                return `- ${item.quantity} x ${item.product.name} (${(item.product.price)?.toFixed(2)} USD)`;
            }).join("\n");
    
            // Calculer le total
            const totalPrice = useBasketStore.getState().getTotalPrice().toFixed(2);
    
            // Détails du client
            const customerName = user?.fullName || "Unknown";
            const customerEmail = user?.emailAddresses[0]?.emailAddress || "Unknown";
    
            // Construire le message WhatsApp
            const message = `
    🛒 *New Order* 🛒
    --------------------------------
    👤 Customer: ${customerName}
    📧 Email: ${customerEmail}
    --------------------------------
    🛍️ *Order Details:*
    ${orderSummary}
    --------------------------------
    💰 *Total Price:* ${totalPrice} USD
    --------------------------------
    Thank you for your order! 🎉
            `;
    
            // Numéro WhatsApp du destinataire (vous ou votre équipe)
            const phoneNumber = "905314340471"; // Remplacez par votre numéro WhatsApp
    
            // Créer l'URL WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
            // Rediriger l'utilisateur vers WhatsApp
            window.open(whatsappUrl);
    
            // Vider le panier
            useBasketStore.getState().clearBasket();
    
            // Afficher un pop-up de succès
            Swal.fire({
                icon: 'success',
                title: 'Order Sent!',
                text: 'Your order has been successfully sent via WhatsApp. Thank you for shopping with us!',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error("Error sending order via WhatsApp:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Something went wrong while sending your order. Please try again.',
                confirmButtonText: 'OK',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    
    
  return (
    <div className='conatiner mx-auto p-4 max-w-6xl'>
      <h1 className='text-2xl font-bold mb-4'>Your Basket</h1>
      <div className='flex flex-col lg:flex-row gap-8'>
        <div className="flex-grow">
            {
                groupedItems?.map((item) => (
                    <div key={item.product._id} 
                    className=" rounded mb-4 p-4 border flex items-center justify-between ">
                        <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4' >
                            {
                                item.product.image && (
                                    <Image
                                    src={imageUrl(item.product.image).url()}
                                    alt={item.product.name ?? "Product image"}
                                    className='w-full h-full object-cover rounded'
                                    width={96}
                                    height={96}
                                    
                                    
                                    />

                                )
                            }
                            


                        </div>
                        <div className='min-w-0'>
                            <h2 className='text-lg font-semibold sm:text-xl truncate'>{item.product.name}</h2>
                            <p className='sm:text-base text-sm'>
                                Price: $
                                {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                            </p>
                        </div>
                       
                        <div className='flex items-center ml-4 flex-shrink-0'> 
                            <AddToBasketButton product={item.product}/>
                           </div>
                        </div>
                ))
            }
        </div>

<div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto" >
    <h3 className='text- xl font-semibold'>Order Summary</h3>
    <div className='mt-4 space-y-2'>
        <p className='flex justify-between'>
            <span>Items :</span>
            <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
        </p>
        <p className='flex justify-between text-2xl font-bold border-t pt-2'>
            <span>Total:</span>
            <span>
                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
            </span>
        </p>
    </div>
{/* {
    isSignedIn ? (
        <button 
        onClick={handleCheckout}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px mt-4 w-full disabled:bg-gray-400
        -4 rounded"
         > {isLoading ? "Processing..." : "Checkout"}

        </button>
    ) : (
        <SignInButton mode='modal'>
            <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px mt-4 w*full
            -4 rounded"
            >
                Sign in to checkout
            </button>
        </SignInButton>
    )
} */}

{
    isSignedIn ? (
        <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px mt-4 w-full disabled:bg-gray-400 rounded"
        >
            {isLoading ? "Processing..." : "Send Order via WhatsApp"}
        </button>
    ) : (
        <SignInButton mode="modal">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px mt-4 w-full rounded"
            >
                Sign in to send order
            </button>
        </SignInButton>
    )
}


</div>



<div className='h-64 lg:h-0'>

</div>
      </div>
    </div>
  )
}

export default BasketPage
