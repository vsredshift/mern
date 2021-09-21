import { useState } from "react"
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from "reactstrap"
import { connect } from "react-redux"
import { addProduct } from '../actions/productActions'


const ProductModal = ({addProduct, isAuthenticated}) => {

    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [simNumber, setSimNumber] = useState()

    const toggle = () => {
        setModal(!modal)
    }


    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeSim = (e) => {
        setSimNumber(e.target.value)
    }


    const onSubmit = e => {
        e.preventDefault()
        const newProduct = {
            name,
            simNumber
        }

        addProduct(newProduct)
        toggle()
    }

    return (
        <div>
        {isAuthenticated ?
            <Button 
                color='dark mt-4'
                style={{marginBottom: '2rem'}}
                onClick={toggle}>
                Add Product
            </Button>
            : <h4 className="mt-3 ml-4">Please login to manage products</h4>}
            <Modal
                isOpen={modal}
                toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add To Order List
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="product">Product</Label>
                            <Input className="mt-2 mb-2" type="text" name={name} id="name" placeholder="Enter product name" onChange={onChangeName}></Input>
                            <Input className="mt-2 mb-2" type="text" name={simNumber} id="sim" placeholder="Enter sim number" onChange={onChangeSim}></Input>
                            
                            <Button color="dark" style={{marginTop: '2rem', width:'100%'}} block >
                                Add Product
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state.product,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addProduct})(ProductModal)
