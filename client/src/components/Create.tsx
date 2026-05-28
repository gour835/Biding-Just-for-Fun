import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"

interface products {
  _id: string,
  title: string,
  basePrice: string
}
interface auctions {
  userId: string,
  productId: {
    title: string
  }
}

interface CreateProps {
  products: products[],
  auctions: auctions[]
}
interface CreateProductsProp {
  title: string,
  description: string,
  basePrice: string
}

interface CreateAuctionProps {
  productId: string,
  amount: string,
  starting: string,
  ending: string

}
function Create({ products }: CreateProps) {
  const navigate = useNavigate();
  const { action, type, id } = useParams();
  const [basePrice, setBasePrice] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [starting, setStarting] = useState<string>('');
  const [ending, setEnding] = useState<string>('');
  const [productId, setproductId] = useState<string>('');

  const tomorrowStr = new Date();
  tomorrowStr.setDate(tomorrowStr.getDate() + 1);
  const minDate = tomorrowStr.toISOString().split('T')[0];

  async function CreateProduct({ title, description, basePrice }: CreateProductsProp) {
    console.log(title, description, basePrice);
    try {
      const credentials = {
        title,
        description,
        basePrice
      }
      const server = await axios.post('http://localhost:8080/api/user/add-product', credentials, { withCredentials: true });
      if (server.status === 200) {
        alert('Product added successfully');
        navigate('/products');
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function CreateAuction({ productId, amount, starting, ending }: CreateAuctionProps) {
    console.log(productId, amount, starting, ending);
    try {
      const credentials = {
        productId,
        amount,
        startingAt: starting,
        endingAt: ending,
      }
      const server = await axios.post('http://localhost:8080/api/user/add-auction', credentials, { withCredentials: true });
      if (server.status === 200) {
        alert('auction added successfully');
        navigate('/auctions');
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    async function ProductBasePrice() {
      if (action === 'create' && type === 'auction' && id) {
        const prod = products.find(prod => prod._id === id);
        const BasePrice = prod?.basePrice;
        if (BasePrice) {
          setproductId(prod._id);
          setAmount(BasePrice);
        }
      }
    }
    ProductBasePrice()
  }, []);

  useEffect(() => {
    async function setStartingDate() {
      setStarting(minDate);
    }
    setStartingDate();
  }, [minDate])

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
              CreateProduct({ title: title || '', description: description || '', basePrice: basePrice || '' });
            }}
          >Submit</button>
        </div>

      </>
    );
  }
  if (action === 'create' && type === 'auction') {
    return (
      <>
        <h1>Create Auction</h1>
        <div>
          <select
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            name="productId"
            value={productId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setproductId(e.target.value);
              const SelectedProduct = products.find(p => p._id === e.target.value);
              if (SelectedProduct) {
                setAmount(SelectedProduct.basePrice)
              } else {
                setAmount('0');
              }
            }}
          >
            <option value="">Choose Product</option>
            {products.map((product) => {
              return (
                <option key={product._id} value={product._id} data-amount={product.basePrice}>
                  {product.title}
                </option>
              )
            })}
          </select>
        </div>

        <div>
          <input
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            type="text"
            name="amount"
            placeholder="Base-Price Of the Product"
            inputMode="numeric"
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (/^\d*$/.test(e.target.value)) {
                console.log(products);
                setAmount(e.target.value);
              }
            }}
          />

        </div>
        <div>
          <input
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            type="date"
            name="staring"
            min={minDate}
            value={starting}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setStarting(e.target.value)
            }}
          />

        </div>
        <div>
          <input
            className="border-2 border-amber-200 rounded-lg py-2 px-3 my-2 w-xl"
            type="date"
            name="ending"
            min={starting}
            value={ending}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEnding(e.target.value)
            }}
          />

        </div>
        <div className="p-1 m-1">
          <button className="border-2 border-amber-200 bg-red-500 text-amber-200 rounded-lg py-2 px-3" type="button"
            onClick={() => {
              console.log('first')
              CreateAuction({ productId: productId || '', amount: amount || '', starting: starting || '', ending: ending || '' });
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