import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"

interface CreateProductsProp{
  title: string,
  description: string,
  basePrice: string
}
function Create() {
  const navigate = useNavigate();
  const { action, type } = useParams();
  const [basePrice, setBasePrice] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  async function CreateProduct({title, description, basePrice}: CreateProductsProp) {
    console.log(title, description, basePrice);
    try {
      const credentials = {
        title,
        description,
        basePrice
      }
      const server = await axios.post('http://localhost:8080/api/user/add-product', credentials, {withCredentials: true});
      if(server.status === 200){
        alert('Product added successfully');
        navigate('/products');
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (action === 'create' && type === 'product') {
    return (
      <>
        <h1>Create Product</h1>


        <div>
          <input
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            type="text"
            name="title"
            placeholder="Title Of the Product"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <textarea
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            name="desc"
            placeholder="Description Of the Product"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
              console.log(description);
            }}
          />
        </div>
        <div>
          <input
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            type="text"
            name="basePrice"
            placeholder="Base-Price Of the Product"
            inputMode="numeric"
            value={basePrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (/^\d*$/.test(e.target.value)) {
                setBasePrice(e.target.value);
              }
            }}
          />

        </div>
        <div className="p-1 m-1">
          <button className="border-2 border-amber-200 bg-red-500 text-amber-200 rounded-lg py-2 px-3" type="button"
            onClick={() => {
              console.log('first')
              CreateProduct({ title: title || '', description: description || '' , basePrice: basePrice || ''});
            }}
          >Submit</button>
        </div>

      </>
    );
  }
  return (
    <div>Action: {action}, Type: {type}</div>
  )
}

export default Create;