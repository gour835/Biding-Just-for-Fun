import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { io, type Socket } from "socket.io-client";

interface ServerToClientEvents {
    hello: (val: string) => void,
    bid: (val: object) => void;
}

interface ClientToServerEvents {
    bid: (val: object) => void,
    ping: (cb: () => void) => void;
}
interface Auctions {
    _id: string,
    userId: string,
    productId: {
        _id: string,
        title: string
    }
}
interface User{
    _id: string,
    name: string
}
interface AuctionParams {
    auctions: Auctions[],
    user: User[]
}


function Auction({ auctions, user }: AuctionParams) {
    const [title, setTitle] = useState<string>(' ');
    const [bid, setBid] = useState<string>();
    const [bidList, setBidList] = useState([]);
    const { id } = useParams();

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("ws://localhost:8080/");

    socket.on("connect", () => {
        console.log(`connect ${socket.id}`);
    });
    socket.on("bid", (msg) => {
        console.log(msg.amount)
        setBidList((prevBids) => [...prevBids, msg]);
    });


    socket.on("disconnect", () => {
        console.log(`disconnect`);
    });
    useEffect(() => {
        async function GetProductDetails() {
            console.log(id);
            console.log({ auctions });
            const Product = auctions.find((auction) => auction._id === id);
            const ProductTitle = Product?.productId?.title;
            setTitle(ProductTitle ?? 'Not Found');
        }
        GetProductDetails();
    }, [auctions, id])

    async function submit() {
        if (!bid) {
            alert('please add the bid amount');
            return;
        }
        socket.emit('bid', {'amount': bid, name: user.name});
        setBid('');
    }

    return (
        <>
            <h1>Auction for the
                <i>
                    `{title}`
                </i>
                {/* bids section */}
                <section>
                    <ul className="list">
                        {bidList.map((bid, index)=>{
                            return (
                            <li key={index} className="flex flex-row gap-3 m-2 p-2">
                                <div>
                                    {bid.name}
                                </div>
                               {bid.amount}
                            </li>
                            )
                        })}
                    </ul>
                </section>

                {/* create bid section */}
                <section className="p-2 m-2">
                    <input
                        className=" border-2 border-amber-200 rounded-lg py-2 px-1 my-2 w-md h-16"
                        type="text"
                        name="amount"
                        placeholder="Price Of the Bid"
                        inputMode="numeric"
                        value={bid}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (/^\d*$/.test(e.target.value)){
                                setBid(e.target.value);
                            }
                        }}
                    />
                </section>

                <div className="p-1 m-1">
                    <button className="border-2 border-amber-200 bg-red-500 text-amber-200 rounded-lg py-2 px-3" type="button"
                        onClick={() => {
                            submit()
                        }}
                    >Submit</button>
                </div>
            </h1>
        </>
    )
}

export default Auction