"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Channel,
  fetchIPTVPlaylist,
  groupChannelsByCategory,
  searchChannels,
} from "@/lib/iptvParser";
import { CustomVideoPlayer } from "@/components/CustomVideoPlayer";
import {
  PixelBox,
  ChannelCard,
  SearchBox,
  CategoryLabel,
  Header,
} from "@/components/PixelBoxUI";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const PLAYLIST_URL = "https://iptv-org.github.io/iptv/index.m3u";

export default function Home() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"player" | "channels">("player");
  const [showChannelInfo, setShowChannelInfo] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    async function loadPlaylist() {
      try {
        setLoading(true);
        const fetchedChannels = await fetchIPTVPlaylist(PLAYLIST_URL);
        setChannels(fetchedChannels);
        if (fetchedChannels.length > 0) {
          setSelectedChannel(fetchedChannels[0]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to load playlist");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPlaylist();
  }, []);

  // Memoize filtered and grouped channels
  const filteredChannels = useMemo(
    () =>
      debouncedQuery ? searchChannels(channels, debouncedQuery) : channels,
    [channels, debouncedQuery]
  );

  const groupedChannels = useMemo(
    () => groupChannelsByCategory(filteredChannels),
    [filteredChannels]
  );

  const handleTabSwitch = (tab: "player" | "channels") => {
    setActiveTab(tab);
  };

  return (
    <main className="min-h-screen framebox-bg flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row gap-6 p-4 lg:p-6 lg:max-w-7xl lg:mx-auto lg:w-full lg:pb-6">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6 lg:w-full">
          {/* Left Sidebar - Player */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <PixelBox className="p-4 flex-1 flex flex-col gap-4">
              {selectedChannel && (
                <>
                  <CustomVideoPlayer
                    src={selectedChannel.url}
                    channelName={selectedChannel.name}
                  />
                  <div className="border-t-2 border-[#4382EC] pt-4">
                    <p className="text-[#4382EC] pixel-font text-sm mb-2">
                      Now Playing
                    </p>
                    <p className="text-[#E2EEFF] font-bold text-lg truncate">
                      {selectedChannel.name}
                    </p>
                    {selectedChannel.group && (
                      <p className="text-[#C0C0C0] text-sm mt-1">
                        {selectedChannel.group}
                      </p>
                    )}
                  </div>
                </>
              )}
              {!selectedChannel && !loading && (
                <div className="text-center py-12">
                  <p className="text-[#2E5BC4] pixel-font">
                    No channels available
                  </p>
                </div>
              )}
              {loading && (
                <div className="text-center py-12">
                  <p className="text-[#4382EC] pixel-font">
                    Loading channels...
                  </p>
                </div>
              )}
            </PixelBox>

            {error && (
              <PixelBox className="p-4 border-[#DC143C]">
                <p className="text-[#DC143C] pixel-font text-sm">{error}</p>
              </PixelBox>
            )}
          </div>

          {/* Right Sidebar - Channel List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <PixelBox className="p-4">
              <p className="text-[#4382EC] pixel-font text-sm mb-3">Search</p>
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Filter channels..."
              />
            </PixelBox>

            {/* Channel Grid */}
            <PixelBox className="p-4 flex-1 overflow-y-auto overflow-x-hidden max-h-[600px] scrollbar-thin scrollbar-track-[#1A1A1A] scrollbar-thumb-[#8B4513]">
              {Object.entries(groupedChannels).map(
                ([category, categoryChannels]) => (
                  <div key={category}>
                    <CategoryLabel name={category} />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {categoryChannels.slice(0, 20).map((channel, idx) => (
                        <ChannelCard
                          key={`${category}-${idx}`}
                          channel={channel}
                          isSelected={
                            selectedChannel?.name === channel.name &&
                            selectedChannel?.url === channel.url
                          }
                          onClick={() => setSelectedChannel(channel)}
                        />
                      ))}
                      {categoryChannels.length > 20 && (
                        <div className="col-span-2 text-center py-2">
                          <p className="text-[#2E5BC4] pixel-font text-xs">
                            +{categoryChannels.length - 20} more channels
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              {!loading && filteredChannels.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-[#2E5BC4] pixel-font">No channels found</p>
                </div>
              )}
            </PixelBox>
          </div>
        </div>

        {/* Mobile Layout - Keep both tabs mounted for instant switching */}
        <div className="lg:hidden flex flex-col gap-4 flex-1 pb-24">
          {/* Player Tab */}
          <div
            className={`flex flex-col gap-4 flex-1 ${
              activeTab !== "player" ? "hidden" : ""
            }`}
          >
            {/* Video Container - Fullscreen on Mobile */}
            <div className="flex-1 flex flex-col gap-2 min-h-0">
              <PixelBox className="flex-1 p-0 overflow-hidden">
                {selectedChannel && (
                  <CustomVideoPlayer
                    src={selectedChannel.url}
                    channelName={selectedChannel.name}
                  />
                )}
                {!selectedChannel && !loading && (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-[#2E5BC4] pixel-font text-xs">
                      No channels available
                    </p>
                  </div>
                )}
                {loading && (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-[#4382EC] pixel-font text-xs">
                      Loading channels...
                    </p>
                  </div>
                )}
              </PixelBox>

              {/* Channel Info - Collapsible */}
              {selectedChannel && (
                <PixelBox
                  className="p-2 cursor-pointer hover:border-[#BBD6FD] transition-colors"
                  onClick={() => setShowChannelInfo(!showChannelInfo)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#E2EEFF] font-bold text-sm truncate">
                        {selectedChannel.name}
                      </p>
                    </div>
                    <span className="text-[#4382EC] pixel-font text-xs ml-2">
                      {showChannelInfo ? "▼" : "▶"}
                    </span>
                  </div>

                  {/* Expanded Info */}
                  {showChannelInfo && (
                    <div className="mt-2 border-t border-[#4382EC]/50 pt-2">
                      <p className="text-[#4382EC] pixel-font text-xs mb-1">
                        Now Playing
                      </p>
                      {selectedChannel.group && (
                        <p className="text-[#C0C0C0] text-xs">
                          Category: {selectedChannel.group}
                        </p>
                      )}
                    </div>
                  )}
                </PixelBox>
              )}
            </div>

            {error && (
              <PixelBox className="p-3 border-[#DC143C]">
                <p className="text-[#DC143C] pixel-font text-xs">{error}</p>
              </PixelBox>
            )}
          </div>

          {/* Channels Tab */}
          <div
            className={`flex flex-col gap-3 flex-1 ${
              activeTab !== "channels" ? "hidden" : ""
            }`}
          >
            <PixelBox className="p-3">
              <p className="text-[#4382EC] pixel-font text-xs mb-2">Search</p>
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Filter channels..."
              />
            </PixelBox>

            <PixelBox className="p-3 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-[#1A1A1A] scrollbar-thumb-[#4382EC]">
              {Object.entries(groupedChannels).map(
                ([category, categoryChannels]) => (
                  <div key={category}>
                    <CategoryLabel name={category} />
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {categoryChannels.slice(0, 12).map((channel, idx) => (
                        <ChannelCard
                          key={`${category}-${idx}`}
                          channel={channel}
                          isSelected={
                            selectedChannel?.name === channel.name &&
                            selectedChannel?.url === channel.url
                          }
                          onClick={() => {
                            setSelectedChannel(channel);
                            handleTabSwitch("player");
                          }}
                        />
                      ))}
                      {categoryChannels.length > 12 && (
                        <div className="col-span-2 text-center py-1">
                          <p className="text-[#2E5BC4] pixel-font text-xs">
                            +{categoryChannels.length - 12} more
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}

              {!loading && filteredChannels.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-[#2E5BC4] pixel-font text-xs">
                    No channels found
                  </p>
                </div>
              )}
            </PixelBox>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e27] border-t-4 border-[#4382EC] flex gap-2 p-2">
        <button
          onClick={() => handleTabSwitch("player")}
          className={`flex-1 py-3 pixel-font text-xs font-bold rounded transition-all ${
            activeTab === "player"
              ? "bg-[#4382EC] text-white"
              : "bg-[#2C2C2C] text-[#4382EC] hover:bg-[#3C3C3C]"
          }`}
        >
          Player
        </button>
        <button
          onClick={() => handleTabSwitch("channels")}
          className={`flex-1 py-3 pixel-font text-xs font-bold rounded transition-all ${
            activeTab === "channels"
              ? "bg-[#4382EC] text-white"
              : "bg-[#2C2C2C] text-[#4382EC] hover:bg-[#3C3C3C]"
          }`}
        >
          Channels
        </button>
      </div>
    </main>
  );
}
