import { useState } from 'react';
import { Play, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { type VideoItem, formatViewCount, formatDate, getYouTubeWatchUrl } from '@/lib/youtube';
import { trackEvent } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { MetadataTag } from './MetadataTag';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: VideoItem;
  categoryLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function VideoCard({ video, categoryLabel, size = 'md', className }: VideoCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const reduced = useReducedMotion();
  const watchUrl = getYouTubeWatchUrl(video.videoId);

  const sizeClasses = {
    sm: 'aspect-video',
    md: 'aspect-video',
    lg: 'aspect-video',
  };

  const handleClick = () => {
    trackEvent({ type: 'latest_video_click', videoId: video.videoId });
    trackEvent({ type: 'youtube_click', location: 'video_card' });
  };

  return (
    <motion.a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn('group block', className)}
    >
      <div className={cn('relative overflow-hidden rounded-xl2 surface', sizeClasses[size])}>
        {!imgLoaded && <div className="absolute inset-0 bg-graphite-800 animate-pulse" />}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out-expo',
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            'group-hover:scale-105'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/90 via-graphite-950/20 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-cyan/90 flex items-center justify-center glow-cyan">
            <Play className="w-5 h-5 text-graphite-950 ml-0.5" fill="currentColor" />
          </div>
        </div>

        {video.duration && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-graphite-950/80 text-text text-[0.625rem] font-mono">
            {video.duration}
          </span>
        )}

        {video.featured && (
          <span className="absolute top-3 left-3">
            <MetadataTag accent="cyan">In Evidenza</MetadataTag>
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {categoryLabel && (
            <div className="flex items-center gap-2">
              <MetadataTag accent="ember">{categoryLabel}</MetadataTag>
            </div>
          )}
          <h3 className="text-text font-semibold text-sm leading-snug line-clamp-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-4 text-text-dim text-xs font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(video.publishedAt)}
            </span>
            {video.viewCount !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViewCount(video.viewCount)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.a>
  );
}
