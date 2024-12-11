"use client"
import React from 'react'
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Form from 'next/form'
import { PackageIcon, TrolleyIcon } from '@sanity/icons'
import useBasketStore from '@/store/store'

const Header = () => {
    const { user } = useUser();
    const itemCount = useBasketStore((state) =>
            state.items.reduce((acc, item) => acc + item.quantity, 0)
    )

    return (
        <header className="flex flex-wrap justify-between items-center px-4 py-2">
            <div className="flex w-full justify-between flex-wrap items-center">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
                >
                    Hido-yeelo
                </Link>

                {/* Search Bar */}
                <Form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search for products"
                        className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border w-full max-w-4xl"
                        aria-label="Search for products"
                    />
                </Form>

                {/* User and Basket Section */}
                <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
                    {/* Basket Link */}
                    <Link
                        href="/basket"
                        className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        aria-label="My Basket"
                    >
                        <TrolleyIcon className="w-6 h-6" />
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                            {itemCount} 
                        </span>
                        <span>My Basket</span>
                    </Link>

                    {/* User Section */}
                    <ClerkLoaded>
                        {user && (
                            <Link
                                href="/orders"
                                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                aria-label="My Orders"
                            >
                                <PackageIcon className="w-6 h-6" />
                                <span>My Orders</span>
                            </Link>
                        )}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <UserButton />
                                <div className="hidden sm:block text-xs">
                                    <p>Welcome Back</p>
                                    <p>{user.fullName}!</p>
                                </div>
                            </div>
                        ) : (
                            <SignInButton mode="modal" />
                        )}
                    </ClerkLoaded>
                </div>
            </div>
        </header>
    );
};

export default Header;