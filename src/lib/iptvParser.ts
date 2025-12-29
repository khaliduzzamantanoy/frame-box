import axios from "axios";

export interface Channel {
  name: string;
  url: string;
  logo?: string;
  group?: string;
}

export async function fetchIPTVPlaylist(
  playlistUrl: string
): Promise<Channel[]> {
  try {
    const response = await axios.get(playlistUrl, { timeout: 10000 });
    const playlistContent = response.data;
    return parseM3U(playlistContent);
  } catch (error) {
    console.error("Error fetching IPTV playlist:", error);
    return [];
  }
}

function parseM3U(content: string): Channel[] {
  const lines = content.split("\n");
  const channels: Channel[] = [];
  let currentChannel: Partial<Channel> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("#EXTINF")) {
      // Parse the EXTINF line to extract channel info
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const nameMatch = line.match(/,(.+)$/);
      const groupMatch = line.match(/group-title="([^"]+)"/);

      currentChannel = {
        name: nameMatch ? nameMatch[1].trim() : "Unknown",
        logo: logoMatch ? logoMatch[1] : undefined,
        group: groupMatch ? groupMatch[1] : "Other",
      };
    } else if (line && !line.startsWith("#") && currentChannel) {
      // This should be the URL
      currentChannel.url = line;
      if (currentChannel.name && currentChannel.url) {
        channels.push(currentChannel as Channel);
      }
      currentChannel = null;
    }
  }

  return channels;
}

export function groupChannelsByCategory(
  channels: Channel[]
): Record<string, Channel[]> {
  return channels.reduce((acc, channel) => {
    const group = channel.group || "Other";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);
}

export function searchChannels(channels: Channel[], query: string): Channel[] {
  const lowerQuery = query.toLowerCase();
  return channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(lowerQuery) ||
      channel.group?.toLowerCase().includes(lowerQuery)
  );
}
