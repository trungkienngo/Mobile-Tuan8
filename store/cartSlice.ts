import {
    createSlice, PayloadAction
} from '@reduxjs/toolkit';

export interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        // Thêm sản phẩm
        addToCart: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(
                item => item.id === action.payload.id
            );

            if (index >= 0) {
                state.items[index].quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },

        // Xóa sản phẩm
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            );
        },

        // Cập nhật số lượng
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const item = state.items.find(
                item => item.id === action.payload.id
            );

            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter(
                        x => x.id !== action.payload.id
                    );
                } else {
                    item.quantity = action.payload.quantity;
                }
            }
        },

        // Xóa toàn bộ giỏ
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;