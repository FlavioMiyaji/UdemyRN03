import React, { useState, useCallback, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Styles } from '../../constants';
import { Product } from '../../models';
import { HeaderButton } from '../../components';
import { updateProduct, createProduct } from '../../store/actions/ProductsActions';

const EditProductScreen = (props: any) => {
    const { navigation } = props;
    const productId = navigation.getParam('productId');
    let selectedProduct: Product | undefined = undefined;
    if (productId) {
        selectedProduct = useSelector((state: any) =>
            state.productsReducer.availableProducts.find(({ id }: Product) => id === productId)
        );
    }
    const [title, setTitle] = useState(selectedProduct ? selectedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(selectedProduct ? selectedProduct.imageUrl : '');
    const [price, setPrice] = useState(selectedProduct ? String(selectedProduct.price) : '');
    const [description, setDescription] = useState(selectedProduct ? selectedProduct.description : '');

    const dispatch = useDispatch();
    const submitHandler = useCallback(() => {
        if (selectedProduct) {
            dispatch(
                updateProduct({
                    ...selectedProduct,
                    title,
                    imageUrl,
                    description,
                })
            );
        } else {
            dispatch(
                createProduct({
                    id: '',
                    ownerId: 'u1',
                    title,
                    imageUrl,
                    price: +price,
                    description,
                })
            );
        }
        navigation.goBack();
    }, [
        dispatch,
        selectedProduct,
        title,
        imageUrl,
        price,
        description,
    ]);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView
            contentContainerStyle={styles.form}
        >
            <View>
                <View style={styles.formControl}>
                    <Text style={Styles.label}>Title</Text>
                    <TextInput
                        style={Styles.input}
                        value={title}
                        onChangeText={newValue => setTitle(newValue)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={Styles.label}>Image URL</Text>
                    <TextInput
                        style={Styles.input}
                        value={imageUrl}
                        onChangeText={newValue => setImageUrl(newValue)}
                    />
                </View>
                {!selectedProduct && (
                    <View style={styles.formControl}>
                        <Text style={Styles.label}>Price</Text>
                        <TextInput
                            style={Styles.input}
                            value={price}
                            onChangeText={newValue => setPrice(newValue)}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={Styles.label}>Description</Text>
                    <TextInput
                        style={Styles.input}
                        value={description}
                        onChangeText={newValue => setDescription(newValue)}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = ({ navigation }: any) => {
    const productId = navigation.getParam('productId');
    const submit: Function = navigation.getParam('submit');
    return {
        headerTitle: productId ? 'Editing' : 'Adding',
        headerRight: (
            <HeaderButton
                iconName="check"
                onPress={submit}
            />
        ),
    };
};

const styles = StyleSheet.create({
    form: {
        ...Styles.screen,
        flex: 0,
        flexGrow: 1,
    },
    formControl: {
        width: '100%'
    },
});

export default EditProductScreen;
