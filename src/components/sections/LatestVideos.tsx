import { Play, Eye, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getVideoFeed, getFeaturedVideo, formatViewCount, formatDate, getYouTubeWatchUrl } from '@/lib/youtube';
import { trackEvent } from '@/lib/analytics';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { VideoCard } from '@/components/ui/VideoCard';
import { Button } from '@/components/ui/Button';
import { MetadataTag } from '@/components/ui/MetadataTag';
import { siteConfig } from '@/config/site';

export function LatestVideos() {
  const feed = getVideoFeed();
  const featured = getFeaturedVideo();
  const secondary = feed.latest.filter((v) => !v.featured).slice(0, 3);
  const reduced = useReducedMotion();

  if (!featured) return null;

  const featuredCategory = siteConfig.contentCategories.find((c) => c.id === featured.category);

  return (
    <section id="videos" className="relative py-24 md:py-32 section-pad">
      <SectionHeader
        index="01"
        title="Ultimi Video"
        subtitle="I contenuti più recenti dal canale YouTube. Connetti l'API per dati live."
        accent="cyan"
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.a
          href={getYouTubeWatchUrl(featured.videoId)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackEvent({ type: 'latest_video_click', videoId: featured.videoId });
            trackEvent({ type: 'youtube_click', location: 'featured_video' });
          }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative lg:col-span-2 block overflow-hidden rounded-xl3 surface"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={featured.thumbnail}
              alt={featured.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-cyan/90 flex items-center justify-center glow-cyan">
                <Play className="w-6 h-6 text-graphite-950 ml-1" fill="currentColor" />
              </div>
            </div>

            {featured.duration && (
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-graphite-950/80 text-text text-xs font-mono">
                {featured.duration}
              </span>
            )}

            <div className="absolute top-4 left-4">
              <MetadataTag accent="cyan">In Evidenza</MetadataTag>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-3">
            {featuredCategory && (
              <MetadataTag accent="ember">{featuredCategory.label}</MetadataTag>
            )}
            <h3 className="text-xl md:text-2xl font-display font-bold leading-tight text-balance">
              {featured.title}
            </h3>
            <div className="flex items-center gap-5 text-text-dim text-sm font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(featured.publishedAt)}
              </span>
              {featured.viewCount !== undefined && (
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {formatViewCount(featured.viewCount)} views
                </span>
              )}
            </div>
          </div>
        </motion.a>

        <div className="flex flex-col gap-6">
          {secondary.map((video, i) => {
            const cat = siteConfig.contentCategories.find((c) => c.id === video.category);
            return (
              <motion.div
                key={video.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoCard video={video} categoryLabel={cat?.label} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            trackEvent({ type: 'youtube_click', location: 'latest_videos_channel' });
            window.open(siteConfig.socials[0].url, '_blank', 'noopener,noreferrer');
          }}
        >
          <ExternalLink className="w-4 h-4" />
          Guarda su YouTube
        </Button>
      </div>
    </section>
  );
}
