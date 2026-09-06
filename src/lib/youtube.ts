export interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  category: string;
  viewCount?: number;
  duration?: string;
  featured?: boolean;
}

export interface VideoFeed {
  latest: VideoItem[];
  byCategory: Record<string, VideoItem[]>;
}

export const placeholderVideos: VideoItem[] = [
  {
    id: 'v1',
    videoId: 'dQw4w9WgXcQ',
    title: 'Dragon Ball: Sparking! ZERO — La Recensione Definitiva',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-10-11',
    category: 'sparking-zero',
    viewCount: 125000,
    duration: '18:42',
    featured: true,
  },
  {
    id: 'v2',
    videoId: 'dQw4w9WgXcQ',
    title: 'Xenoverse 2 — Nuovo DLC Completo Walkthrough',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-10-05',
    category: 'xenoverse',
    viewCount: 89000,
    duration: '32:15',
  },
  {
    id: 'v3',
    videoId: 'dQw4w9WgXcQ',
    title: 'Dragon Ball Z: Kakarot — 100% Completion Run Part 12',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-09-28',
    category: 'kakarot',
    viewCount: 67000,
    duration: '45:30',
  },
  {
    id: 'v4',
    videoId: 'dQw4w9WgXcQ',
    title: 'Unboxing Edizione Collezionista Dragon Ball',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-09-20',
    category: 'unboxing',
    viewCount: 54000,
    duration: '15:22',
  },
  {
    id: 'v5',
    videoId: 'dQw4w9WgXcQ',
    title: 'Sfida Estrema in Dragon Ball Xenoverse 2',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-09-15',
    category: 'challenges',
    viewCount: 78000,
    duration: '22:10',
  },
  {
    id: 'v6',
    videoId: 'dQw4w9WgXcQ',
    title: 'Vlog: Dietro le quinte di un creator gaming',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-09-08',
    category: 'vlogs',
    viewCount: 41000,
    duration: '12:45',
  },
  {
    id: 'v7',
    videoId: 'dQw4w9WgXcQ',
    title: 'I Nuovi Giochi del 2024 — Le Mie Recensioni',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-09-01',
    category: 'reviews',
    viewCount: 93000,
    duration: '28:50',
  },
  {
    id: 'v8',
    videoId: 'dQw4w9WgXcQ',
    title: 'Dragon Ball — Le Migliori Battaglie di Sempre',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-08-25',
    category: 'dragonball',
    viewCount: 156000,
    duration: '20:33',
  },
  {
    id: 'v9',
    videoId: 'dQw4w9WgXcQ',
    title: 'Nuovi Giochi in Arrivo — Anteprime Esclusive',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    publishedAt: '2024-08-18',
    category: 'new-games',
    viewCount: 62000,
    duration: '16:40',
  },
];

export function getVideoFeed(): VideoFeed {
  const latest = [...placeholderVideos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const byCategory: Record<string, VideoItem[]> = {};
  for (const video of placeholderVideos) {
    if (!byCategory[video.category]) byCategory[video.category] = [];
    byCategory[video.category].push(video);
  }

  return { latest, byCategory };
}

export function getFeaturedVideo(): VideoItem | undefined {
  return placeholderVideos.find((v) => v.featured) ?? placeholderVideos[0];
}

export function formatViewCount(count?: number): string {
  if (count === undefined) return '—';
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return count.toString();
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeThumb(videoId: string, quality: 'hq' | 'mq' | 'sd' | 'max' = 'hq'): string {
  const qualityMap = {
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
    max: 'maxresdefault',
  };
  return `https://i.ytimg.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * YouTube Data API v3 integration point.
 *
 * To connect real data, implement this function to fetch from:
 *   https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=...&order=date&maxResults=10&key=API_KEY
 *
 * Then map the API response into VideoItem[] and return it.
 * The UI layer does not change — only this data source does.
 */
export async function fetchLatestVideosFromYouTube(
  apiKey: string,
  channelId: string
): Promise<VideoItem[]> {
  throw new Error(
    'YouTube Data API non ancora configurata. Collega una API key per abilitare i dati reali.'
  );
}
