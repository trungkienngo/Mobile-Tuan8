import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import {
    increment, decrement, reset, incrementByFive
} from '../store/counterSlice';

export default function CounterScreen() {
    const dispatch = useDispatch();

    const count = useSelector(
        (state: RootState) => state.counter.value
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>COUNTER APP</Text>

            <Text style={styles.number}>{count}</Text>

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => dispatch(decrement())}
                >
                    <Text style={styles.text}>- Giảm</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => dispatch(increment())}
                >
                    <Text style={styles.text}>+ Tăng</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.reset}
                    onPress={() => dispatch(reset())}
                >
                    <Text style={styles.text}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => dispatch(incrementByFive())}
                >
                    <Text style={styles.text}>+ 5</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20
    },
    number: {
        fontSize: 65,
        fontWeight: 'bold',
        color: '#3949ab',
        marginBottom: 30
    },
    row: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12
    },
    button: {
        backgroundColor: '#3949ab',
        padding: 15,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center'
    },
    reset: {
        backgroundColor: '#e53935',
        padding: 15,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});