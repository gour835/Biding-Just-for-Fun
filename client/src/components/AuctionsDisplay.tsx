import { useNavigate } from "react-router-dom";

interface Auctions{
    _id: number,
    productId:{title: string},
    hasAuction: boolean
}
interface AuctionsProps{
    auctions: Auctions[]
}
function AuctionsDisplay({auctions}: AuctionsProps) {
    const navigate = useNavigate();
  return (<>
    <h1>Auctions Display</h1>
    <div>
            <table className="w-full border-2 border-amber-100">
                <tr className="border-2 border-dotted border-amber-100"> 
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                {auctions.length === 0 ?
                <tr>
                    <td colSpan={3}>No Auctions Found...</td>
                </tr> : 
                auctions.map((auction, index: number)=>{
                return(<tr className="border-2 border-dashed border-amber-100">
                    <td >
                        {index+1}
                    </td>
                    <td>
                        {auction.productId.title}
                    </td>
                    <td>
                        <button 
                        key={auction._id}
                        className={`bg-green-400 p-1 m-2 rounded shadow-amber-50 shadow-xs text-black hover:shadow hover:scale-105 transition-all ${!auction.hasAuction ? '-': "hidden"}`}
                        onClick={()=>{
                            navigate(`/join/auction/${auction._id}`);
                        }}
                        >
                            Create Auction 
                        </button>
                    </td>
                </tr>)            
                })}
            </table>
            
        </div>
  </>
  )
}

export default AuctionsDisplay