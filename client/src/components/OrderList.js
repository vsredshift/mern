import { useEffect } from "react"
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap"
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from "react-redux"
import { getProducts, deleteProduct } from "../actions/productActions"  


const OrderList = ({ getProducts, product, deleteProduct, isAuthenticated}) => {



    useEffect(() => {
        getProducts()

    }, [getProducts])

    const onDelete = (id) => {
        deleteProduct(id)
    }

    const { products } = product

    return (
        <div>
            <Container>
             
                <ListGroup>
                    <TransitionGroup className="order-list">
                        {products.map(({_id, name, simNumber}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                {isAuthenticated &&
                                    <Button 
                                        className='remove-btn'
                                        color='danger'
                                        size='sm'
                                        onClick={() => onDelete(_id)}>
                                        &times;
                                    </Button>
                                }
                                    {name} {simNumber}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        </div>
    )
}


const mapStateToProps = (state) => ({
    product: state.product,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getProducts, deleteProduct })(OrderList)
