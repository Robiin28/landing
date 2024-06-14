import React, { useState,useRef } from "react";


    const ProductForm = (props) => {
     const [formData, setFormData] = useState({
        name: "",
        price: "",
        desc: "",
        active: false,
        image: null,
    });
          const fileInputRef = useRef(null);

    const inputHandler = (input) => (event) => {
        const value = input === "active" ? event.target.checked : event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [input]: value,
        }));
    };

    const fileHandler = (event) => {
        const file = event.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const movie = {
            name: formData.name,
            description: formData.desc,
            price: Number(formData.price),
            active: Boolean(formData.active),
            image: formData.image,
        };
        props.createProduct(movie);

       setFormData({
            name: "",
            price: "",
            desc: "",
            active: false,
            image: null,
        });  

         if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        props.showForm(false);

    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Movie Name</label>
                    <input type="text" id="name" placeholder="Movie Name" onChange={inputHandler("name")} value={formData.name} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" placeholder="Price" onChange={inputHandler("price")} value={formData.price} />
                </div>
                <div>
                    <label htmlFor="desc">Description</label>
                    <input type="text" id="desc" placeholder="Description" onChange={inputHandler("desc")} value={formData.desc} />
                </div>
                <div>
                    <input type="checkbox" role="switch" id="active" onChange={inputHandler("active")} checked={formData.active} />
                    <label htmlFor="active">Is Active</label>
                </div>
                <div>
                    <label htmlFor="image">Choose Image</label>
                    <input type="file"  ref={fileInputRef} id="image" onChange={fileHandler} />
                </div>
                <button type="submit">Add Movie</button>
                <button onClick={()=>{props.showForm(false)}}>Cancel</button>
            </form>
        </>
    );
};

export default ProductForm;
