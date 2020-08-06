import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import ItemList from '../components/itemList';
import CartSummary from '../components/cartSummary'

class ShoppingBasket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            receipt: [],
            numberOfSelectedItems: 0,
            totalPrice: 0
        };
    }

    addItem = (item, amount, idx) => {
        const receipt = [...this.state.receipt]
        let numberOfSelectedItems = this.state.numberOfSelectedItems
        let totalPrice = this.state.totalPrice
        if(receipt[idx] === undefined) {
            receipt[idx] = {
                name: '',
                price: 0,
                amount: 0
            }
        }
        receipt[idx].name = item.name
        receipt[idx].price = item.price
        receipt[idx].amount += amount
        numberOfSelectedItems += amount
        totalPrice += amount * item.price
        this.setState({
            receipt: receipt,
            numberOfSelectedItems: numberOfSelectedItems,
            totalPrice: totalPrice
        });
    }

    removeItem = (item, amount, idx) => {
        const receipt = [...this.state.receipt]
        let numberOfSelectedItems = this.state.numberOfSelectedItems
        let totalPrice = this.state.totalPrice
        if(receipt[idx] === undefined) {
            receipt[idx] = {
                name: '',
                price: 0,
                amount: 0
            }
        }
        const real_amount = Math.min(receipt[idx].amount, amount)
        receipt[idx].name = item.name
        receipt[idx].price = item.price
        receipt[idx].amount -= real_amount
        if(receipt[idx].amount == 0) receipt.splice(idx, 1)
        numberOfSelectedItems -= real_amount
        totalPrice -= real_amount * item.price
        this.setState({
            receipt: receipt,
            numberOfSelectedItems: numberOfSelectedItems,
            totalPrice: totalPrice
      });
    }

    render() {
        return (
            <Container>
                <br />
                <Row className="justify-content-md-center">
                    <div style={{display: 'flex',
                        flexDirection: 'row',
                        height: '100vh'}}>
                        <div style={{width: '80%', overflowY: 'scroll'}}>
                            <ItemList addItems={this.addItem}
                                      removeItem={this.removeItem}/>
                        </div>
                        <div style={{flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'}}>
                            <CartSummary receipt={this.state.receipt} numberOfSelectedItems={this.state.numberOfSelectedItems} totalPrice={this.state.totalPrice}/>
                        </div>
                    </div>
                </Row>
            </Container>

        );
    }
}

export default ShoppingBasket;
