import React from "react";
import { useWeb3 } from "../context/Web3Provider";

interface ItemCardProps {
  itemIdentifier: string;
  imageUrl: string;
  name: string;
  price: string;
  pgType: string;
  currencyCode: string;
}

export default function ItemCard(Props: ItemCardProps) {
  const { provider, account, pProvider } = useWeb3();

  const hostPayment = async () => {
    console.log(provider, account, pProvider);
    if (!pProvider || !account || !provider) return;

    console.log(process.env.API_URL + "/api/store");

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerAddress: account,
        itemIdentifier: Props.itemIdentifier,
        name: Props.name,
        imageUrl: Props.imageUrl,
        pgType: "CRYPTO",
        currencyCode: "KAIA",
        price: Props.price,
        testMode: true,
      }),
    });

    const data = await result.json();
    console.log(data);
    await pProvider.startPayment(data.pId);
  };
  return (
    <div className="flex flex-col items-center bg-slate-400 rounded-2xl w-32 h-56">
      <img
        className="rounded-lg mb-1.5"
        src={Props.imageUrl}
        alt={Props.name}
      />
      <h1>{Props.name}</h1>
      <p>
        {Props.price} {Props.currencyCode}
      </p>
      <button
        className="flex justify-center items-center bg-slate-700 text-white rounded-lg w-20 h-8"
        onClick={hostPayment}
      >
        Buy
      </button>
    </div>
  );
}
