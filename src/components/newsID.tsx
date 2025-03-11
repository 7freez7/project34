import { useNavigate, useParams } from "react-router-dom"; // For React Router v6 navigation
import { useState, useEffect } from "react";
import { formatDate } from "../lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { ImageGallery } from "./image-gallery";

// Define the NewsItem type
interface NewsItem {
  id: number;
  title: string;
  date: string | null;
  summary: string;
  content: string;
  imageUrl: string;
  galleryImages?: string[];
}

export default function NewsItemPage() {
  const { id } = useParams(); // Get the 'id' from the URL
  const navigate = useNavigate(); // For navigation

  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/404");
      return;
    }
  
    fetch("https://preview.zushm.cz/api/novinky/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData: NewsItem[] = data.map((item: any) => {
          // Split the 'Image' string into an array of URLs
          const imageUrls = item.Image ? item.Image.split(",") : [];
  
          // If there are images, add the first image to the gallery as well
          const galleryImages = imageUrls.length > 0 ? imageUrls : [];
  
          return {
            id: item.ID,
            title: item.Title,
            date: item.CreatedAt ? new Date(item.CreatedAt).toISOString() : null,
            summary: item.Content,
            content: item.Content,
            imageUrl: imageUrls[0] || "/placeholder.svg", // First image as main image
            galleryImages: [imageUrls[0], ...galleryImages.slice(1)], // Add first image as part of gallery
          };
        });
  
        // Find the specific news item using the id
        const selectedNewsItem = formattedData.find(
          (item) => item.id === Number.parseInt(id)
        );
  
        if (selectedNewsItem) {
          setNewsItem(selectedNewsItem);
        } else {
          navigate("/404");
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [id, navigate]);
  

  if (!newsItem) {
    return null; // Optionally, add a loading state here.
  }

  return (
    <main className="flex flex-col items-center py-32 px-4">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <Button
            variant="ghost"
            className="mb-4 gap-1"
            onClick={() => navigate("/aktuality")}
          >
            <ChevronLeft className="h-4 w-4" /> Zpět
          </Button>
          <h1 className="text-4xl font-bold tracking-tight pb-4">{newsItem.title}</h1>
          <p className="text-muted-foreground mt-2">{formatDate(newsItem.date || "")}</p>
        </div>

        {newsItem.galleryImages ? (
          <ImageGallery images={newsItem.galleryImages} alt={newsItem.title} />
        ) : (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={newsItem.imageUrl || "/placeholder.svg"}
              alt={newsItem.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        </div>
      </div>
    </main>
  );
}
