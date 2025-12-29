"use client";

import React from "react";
import Image from "next/image";

interface PixelBoxProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function PixelBox({
  children,
  className = "",
  onClick,
  selected,
}: PixelBoxProps) {
  return (
    <div
      onClick={onClick}
      className={`
        pixel-box cursor-pointer
        ${selected ? "selected" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function ChannelCard({
  channel,
  isSelected,
  onClick,
}: {
  channel: { name: string; logo?: string };
  isSelected: boolean;
  onClick: () => void;
}) {
  const [showLogo, setShowLogo] = React.useState(true);

  return (
    <PixelBox
      onClick={onClick}
      selected={isSelected}
      className="p-2 lg:p-4 h-24 lg:h-32 flex flex-col items-center justify-center gap-1 lg:gap-2 group"
    >
      {channel.logo && showLogo ? (
        <div className="relative h-8 w-8 lg:h-12 lg:w-12">
          <Image
            src={channel.logo}
            alt={channel.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform"
            onError={() => setShowLogo(false)}
            unoptimized
          />
        </div>
      ) : (
        <div className="text-xl lg:text-3xl font-bold text-[#4382EC]">TV</div>
      )}
      <p className="text-xs text-[#BBD6FD] font-bold text-center truncate w-full pixel-font line-clamp-2">
        {channel.name}
      </p>
    </PixelBox>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder = "Search channels...",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <PixelBox className="p-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[#4382EC] placeholder-[#2E5BC4] outline-none pixel-font text-sm"
      />
    </PixelBox>
  );
}

export function CategoryLabel({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-4">
      <div className="h-1 w-8 bg-[#4382EC]"></div>
      <h2 className="text-xl font-bold text-[#4382EC] pixel-font">{name}</h2>
      <div className="flex-1 h-1 bg-[#4382EC]"></div>
    </div>
  );
}

export function Header() {
  return (
    <header className="framebox-header w-full p-3 lg:p-6 border-b-4 border-[#4382EC]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-4xl font-black text-[#4382EC] pixel-font drop-shadow-lg">
          FRAME BOX
        </h1>
        <p className="text-[#E2EEFF] text-xs lg:text-sm mt-1 lg:mt-2 pixel-font">
          Live TV Streaming
        </p>
      </div>
    </header>
  );
}
