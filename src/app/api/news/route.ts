import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache for 1 hour

interface Article {
    id: string;
    title: string;
    summary: string;
    link: string;
    source: string;
    sourceColor: string;
    publishedAt: string;
}

interface RSSFeed {
    url: string;
    source: string;
    sourceColor: string;
    keywords?: string[]; // Filter by keywords for general feeds
}

// Fuentes RSS diversificadas en español sobre psicología y salud mental
const RSS_FEEDS: RSSFeed[] = [
    // Portal especializado en Psicología (España)
    {
        url: 'https://www.psicologiaymente.com/feed',
        source: 'Psicología y Mente',
        sourceColor: '#8b5cf6'
    },

    // Salud oficial NIH en español
    {
        url: 'https://medlineplus.gov/spanish/feeds/topic_352.xml', // Salud mental
        source: 'MedlinePlus',
        sourceColor: '#10b981'
    },
    // BBC Mundo - Salud
    {
        url: 'https://feeds.bbci.co.uk/mundo/rss.xml',
        source: 'BBC Mundo',
        sourceColor: '#dc2626',
        keywords: ['salud mental', 'psicología', 'ansiedad', 'depresión', 'cerebro', 'mente', 'bienestar']
    },
    // ScienceDaily en español (Google News alternative)
    {
        url: 'https://news.google.com/rss/search?q=psicolog%C3%ADa+salud+mental&hl=es-419&gl=CO&ceid=CO:es-419',
        source: 'Noticias',
        sourceColor: '#f59e0b'
    }
];

async function fetchRSSFeed(feed: RSSFeed): Promise<Article[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(feed.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml, */*'
            },
            signal: controller.signal,
            next: { revalidate: 3600 }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`Failed to fetch ${feed.source}: ${response.status}`);
            return [];
        }

        const xml = await response.text();
        const result = await parseStringPromise(xml, { explicitArray: false });

        const channel = result.rss?.channel || result.feed;
        if (!channel) return [];

        const items = channel.item || channel.entry || [];
        let itemsArray = Array.isArray(items) ? items : [items];

        // Filter by keywords if specified
        if (feed.keywords && feed.keywords.length > 0) {
            itemsArray = itemsArray.filter((item: any) => {
                const title = (item.title || '').toLowerCase();
                const desc = (item.description || '').toLowerCase();
                const content = title + ' ' + desc;
                return feed.keywords!.some(keyword => content.includes(keyword.toLowerCase()));
            });
        }

        return itemsArray.slice(0, 6).map((item: any, index: number) => {
            // Clean up description/summary
            let summary = item.description || item.summary || item.content || '';
            if (typeof summary === 'object') {
                summary = summary._ || summary['#text'] || '';
            }
            summary = summary.replace(/<[^>]*>/g, '').trim().substring(0, 150);
            if (summary.length === 150) summary += '...';

            // Get publish date
            const pubDate = item.pubDate || item.published || item['dc:date'] || new Date().toISOString();

            // Get link
            let link = item.link || '#';
            if (typeof link === 'object') {
                link = link.href || link.$?.href || '#';
            }

            return {
                id: `${feed.source.replace(/\s/g, '')}-${index}-${Date.now()}`,
                title: (item.title || 'Sin título').replace(/<[^>]*>/g, '').trim(),
                summary,
                link,
                source: feed.source,
                sourceColor: feed.sourceColor,
                publishedAt: new Date(pubDate).toISOString()
            };
        });
    } catch (error) {
        console.error(`Error fetching ${feed.source}:`, error);
        return [];
    }
}

export async function GET() {
    try {
        // Fetch all feeds in parallel
        const allArticlesArrays = await Promise.all(
            RSS_FEEDS.map(feed => fetchRSSFeed(feed))
        );

        // Flatten and combine
        let allArticles: Article[] = allArticlesArrays.flat();

        // Sort by date (newest first)
        allArticles.sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        // Remove duplicates by title similarity
        const seenTitles = new Set<string>();
        allArticles = allArticles.filter(article => {
            const normalizedTitle = article.title.toLowerCase().trim().substring(0, 40);
            if (seenTitles.has(normalizedTitle)) return false;
            seenTitles.add(normalizedTitle);
            return true;
        });

        // Limit to 24 articles for carousel
        allArticles = allArticles.slice(0, 24);

        return NextResponse.json({
            articles: allArticles,
            total: allArticles.length,
            sources: [...new Set(allArticles.map(a => a.source))]
        });
    } catch (error) {
        console.error('Error in news API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch news', articles: [], sources: [] },
            { status: 500 }
        );
    }
}
