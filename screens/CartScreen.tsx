import React from 'react';
import {
    View, Text, TouchableOpacity,
    FlatList, StyleSheet
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import {
    addToCart, removeFromCart,
    updateQuantity, clearCart
} from '../store/cartSlice';

const products = [
    { id: 1, name: 'Laptop Dell', price: 1000 },
    { id: 2, name: 'Mouse Logitech', price: 25 },
    { id: 3, name: 'Keyboard', price: 120 }
];

export default function CartScreen() {
    const dispatch = useDispatch();

    const items = useSelector(
        (state: RootState) => state.cart.items
    );

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    return (
        <View style={s.container}>
            <Text style={s.title}>🛒 SHOPPING CART</Text>

            <Text style={s.heading}>Danh sách sản phẩm</Text>

            {/* Thêm sản phẩm */}
            {products.map(p => (
                <TouchableOpacity
                    key={p.id}
                    style={s.product}
                    onPress={() => dispatch(addToCart(p))}
                >
                    <Text>{p.name} - ${p.price}</Text>
                    <Text style={{ color: 'blue' }}>+ Thêm</Text>
                </TouchableOpacity>
            ))}

            <Text style={s.heading}>Giỏ hàng</Text>

            {/* Danh sách giỏ hàng */}
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <Text style={s.empty}>Giỏ hàng đang trống</Text>
                }
                renderItem={({ item }) => (
                    <View style={s.cartItem}>
                        <Text style={s.name}>{item.name}</Text>
                        <Text>Giá: ${item.price}</Text>

                        <View style={s.row}>
                            <TouchableOpacity
                                style={s.qtyButton}
                                onPress={() => dispatch(updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1
                                }))}
                            >
                                <Text>-</Text>
                            </TouchableOpacity>

                            <Text>Số lượng: {item.quantity}</Text>

                            <TouchableOpacity
                                style={s.qtyButton}
                                onPress={() => dispatch(updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1
                                }))}
                            >
                                <Text>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => dispatch(removeFromCart(item.id))}
                            >
                                <Text style={{ color: 'red' }}>Xóa</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={s.price}>
                            Thành tiền: ${item.price * item.quantity}
                        </Text>
                    </View>
                )}
            />

            {/* Tổng tiền và xóa giỏ */}
            <View style={s.bottom}>
                <Text style={s.total}>Tổng tiền: ${total}</Text>

                <TouchableOpacity
                    style={s.clearButton}
                    onPress={() => dispatch(clearCart())}
                >
                    <Text style={s.white}>Xóa giỏ hàng</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    product: {
        backgroundColor: 'white',
        padding: 12,
        marginBottom: 6,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cartItem: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        marginVertical: 10
    },
    qtyButton: {
        backgroundColor: '#ddd',
        padding: 8,
        borderRadius: 5
    },
    price: {
        color: 'red',
        fontWeight: 'bold'
    },
    empty: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20
    },
    bottom: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderColor: '#ddd'
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    clearButton: {
        backgroundColor: '#e53935',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center'
    },
    white: {
        color: 'white',
        fontWeight: 'bold'
    }
});