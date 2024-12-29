import React from "react";

export default function poll({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h1>poll[{id}]</h1>
    </div>
  );
}
