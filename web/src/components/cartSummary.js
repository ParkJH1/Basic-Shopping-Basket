import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import {Button} from 'react-bootstrap';

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                {
                    this.props.receipt.map((item) => {
                        if(item !== undefined) {
                            return (
                                <div>
                                    {item.name} x {item.amount}개 = {item.price * item.amount}원
                                </div>
                            )
                        }
                    })
                }
                
                총 {this.props.numberOfSelectedItems}개 제품 선택 됨
                <br /><br />
                합계: <NumberFormat value={this.props.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'₩'} />
                <br /><br />
                <Button variant="primary">저장</Button>
            </div>
        );
    }
}

export default CartSummary;
