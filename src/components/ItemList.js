import { CDN_URL } from "../utils/constants.js";

const ItemList = ({items}) => {
    return (<div>
        {items.map((item) => (
            <div
                key={item.card.info.id}
                className="p-2 m-2 border border-gray-200 border-b-2 text-left flex justify-between"
            >
                <div className="w-3/12 p-2">
                    <div className="absolute">
                        <button className={"p-2 mx-16 bg-black text-white shadow-lg rounded-lg"}>Add +</button>
                    </div>
                    <img src={CDN_URL + item.card.info.imageId} className="w-full" />
                </div>
                <div className="w-9/12 flex flex-col">
                <div className="py-2">
                    <span>{item.card.info.name}</span>
                    <span> ₹ { item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice/100 }</span>
                </div>
                <p className="py-2 text-xs">{item.card.info.description}</p>
                </div>
            </div>
        ))}
    </div>)
}

export default ItemList;