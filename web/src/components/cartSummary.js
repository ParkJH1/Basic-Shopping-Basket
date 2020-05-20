import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {Mutation, Query} from "react-apollo";
import {ListGroup, Button} from 'react-bootstrap';
import NumberFormat from 'react-number-format';

const SET_SELECT_MUTATION = gql`
    mutation test($selected: [Int!]!){
        postMutation(selected: $selected)
    }`;

class CartSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    itemCard = () => {
        const listItem = [];
        for(let i = 0; i < this.props.selected.length; i++){
            if(this.props.returnStatusByIdx(i) !== 0){
                listItem.push(
                    <ListGroup.Item as="li">
                        {this.props.returnItemNameByIdx(i)}{" "}
                        {this.props.returnStatusByIdx(i)}개{" "}
                        <NumberFormat value={this.props.returnItemPriceByIdx(i) * this.props.returnStatusByIdx(i)} displayType={'text'} thousandSeparator={true} prefix={'₩'} />
                    </ListGroup.Item>
                    );
            }   
        }
        return listItem;
    }

    render() {
        return (
            <div>
                <br></br>
                총 {this.props.numberOfSelectedItems}개 제품 선택 됨
                <br /><br />
                <NumberFormat value={this.props.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'₩'} />
                <br /><br />
                <ListGroup as="ul">
                    <this.itemCard />                
                </ListGroup>

                <Mutation mutation={SET_SELECT_MUTATION} variables={{selected: this.props.returnStatusArr}}>
                    {postMutation => 
                        <Button onClick={postMutation}>Submit</Button>
                    }
                </Mutation>
            </div>
        );
    }
}

export default CartSummary;
