"use client";

import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Context'i oluştur
const CartContext = createContext();

// Reducer fonksiyonu: Sepet state'ini güncelleyen mantığı içerir
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex > -1) {
        // Ürün zaten sepette varsa, miktarını artır
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return updatedCart;
      } else {
        // Ürün sepette yoksa, yeni ürün olarak ekle
        return [...state, { ...action.payload }];
      }
    }
    case 'REMOVE_ITEM': {
      return state.filter(item => item._id !== action.payload.id);
    }
    case 'UPDATE_QUANTITY': {
      return state.map(item =>
        item._id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    }
    case 'LOAD_CART': {
      // Sayfa yüklendiğinde localStorage'dan sepeti yükle
      return action.payload;
    }
    case 'CLEAR_CART': {
        return [];
    }
    default:
      return state;
  }
};

// Context Provider component'i
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // İlk yüklemede localStorage'dan sepeti yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Sepet her değiştiğinde localStorage'ı güncelle
  useEffect(() => {
    if (cart.length > 0 || localStorage.getItem('cart')) { // Sadece sepet doluysa veya daha önce kaydedilmişse güncelle
        localStorage.setItem('cart', JSON.stringify(cart));
    } else if (cart.length === 0 && localStorage.getItem('cart')) { // Sepet boşaldıysa localStorage'ı temizle
        localStorage.removeItem('cart');
    }
  }, [cart]);

  // Sepete ekleme fonksiyonu
  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  // Sepetten çıkarma fonksiyonu
  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  // Miktarı güncelleme fonksiyonu
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id); // Miktar 0 veya daha az ise ürünü çıkar
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  // Sepeti temizleme fonksiyonu
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Context'i kullanmak için özel bir hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 