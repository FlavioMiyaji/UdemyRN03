import React, {
    useEffect,
    useRef,
    createRef,
} from 'react';
import { NavigationActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import ShopNavigator from './ShopNavigator';
import { ReducersState as S } from '../App';

interface Props { }

const MyNavigationContainer = (props: Props) => {
    const navRef = useRef<any>(null);
    const isAuth = useSelector(({ authState }: S) => (!!authState.token));
    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({
                routeName: 'Auth',
            }));
        }
    }, [navRef, isAuth]);
    return (
        <ShopNavigator
            ref={navRef}
        />
    );
};

export default MyNavigationContainer;
