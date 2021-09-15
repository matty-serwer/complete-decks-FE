import React, { useContext } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import CartContext from './../context/Context';
import { IItem } from './../context/types';

export interface ICartItemProps {
    item: IItem;
    quantity: number;
}

const CartItem: React.FC<ICartItemProps> = (props) => {
    const { item, quantity } = props;
    const cartContext = useContext(CartContext);

    return (
        <Col sm={12} md={6} lg={4} xl={3}>
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <strong>
                        <h5>{item.name} x {quantity}</h5>
                    </strong>
                    <br />
                    <div>
                        <h4 className="text-warning">${parseInt(item.price) * quantity}</h4>
                        <Button
                            size="sm"
                            color="primary"
                            onClick={() => cartContext.cartDispatch({ type: 'REMOVE_CART_ITEM', payload: item })}
                        >
                            Remove one from cart
                            <i className="fa fa-minus ml-1" aria-hidden="true"></i>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CartItem;