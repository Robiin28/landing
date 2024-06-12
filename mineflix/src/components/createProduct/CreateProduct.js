
import React,{useState} from 'react'; 
import ProductForm from "./ProductForm";
const CrateProduct = (props) => {
    const showProducts = (prod) => {
        props.createProduct(prod);
    } 
    let [form, showForm] = useState(false);
    const checkForm = () => {
        showForm(true);
    }
    return(
        <div>

            {!form && <button onClick={checkForm}>create Product </button>}
            {form && <ProductForm
                createProduct={showProducts}
                showForm={showForm}
            />}
        </div>
    );
}
export default CrateProduct;