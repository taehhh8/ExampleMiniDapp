"use client";

import React from "react";
import ItemCard from "../../../components/ItemCard";

const exampleItems = [
  {
    itemIdentifier: "test",
    name: "testItem",
    imageUrl:
      "https://cyqrsixkgnoiflgq.public.blob.vercel-storage.com/IMG_9055-GNxneDxjn0bwyou8SDKDhRHJD0xoJg.png",
    price: "1",
    currencyCode: "KAIA",
    pgType: "CRYPTO",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col mx-10 my-5 gap-5">
      {exampleItems.map((item) => (
        <ItemCard
          key={item.itemIdentifier}
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          pgType={item.pgType}
          currencyCode={item.currencyCode}
        />
      ))}
    </div>
  );
}
