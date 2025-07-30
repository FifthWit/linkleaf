import React from "react";

export function BlandLink({
  url,
  name,
  image,
}: {
  url: string;
  name: string;
  image: string | null;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow transition hover:scale-105 hover:shadow-lg"
      style={{ minWidth: 220 }}
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <span className="font-medium text-foreground">{name}</span>
    </a>
  );
}