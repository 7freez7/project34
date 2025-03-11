import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import DepartmentCards from "../components/cards";
import Banner from "../data/banner.jpg";
import { formatDate } from "../lib/utils"; // Assuming you have a formatDate function in utils

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

const Uvod = () => {
  // State to store the fetched latest news
  const [latestNews, setLatestNews] = useState<any[]>([]);

  // Function to strip HTML tags from content
  function stripHtmlTags(input: string): string {
    return input.replace(/<\/?p>/g, ""); // This will remove <p> and </p> tags
  }

  // Fetch the latest news from the API
  useEffect(() => {
    fetch("https://preview.zushm.cz/api/novinky/")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const formattedData = data.map((item: any) => ({
          id: item.ID, // Corrected key
          title: item.Title,
          date: item.CreatedAt ? new Date(item.CreatedAt).toISOString() : null, // Handle null values
          summary: item.Content ? stripHtmlTags(item.Content) : "",
          content: item.Content,
          imageUrl: item.Image ? item.Image.split(",")[0] : "/placeholder.svg", // Handle multiple images
        }));
        setLatestNews(formattedData); // Corrected state update
      })
      .catch(error => console.error("Fetch error:", error));
  }, []); // Empty dependency array ensures the effect runs once after the component mounts

  return (
    <div>
      <div className="relative h-[600px] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Banner})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 space-y-8">
          <h2 className="text-3xl font-light tracking-wider">ZUŠ Heřmanův Městec</h2>
          <p className="text-5xl font-bold text-center max-w-3xl leading-tight">
            Kde talent roste a tvořivost kvete!
          </p>
        </div>
      </div>

      <div className="relative -mt-32 z-10 px-4">
        <DepartmentCards />
      </div>

      <div className="-mt-16 relative z-0 !bg-gray-100">
        <section className="space-y-6 pt-32 px-4 pb-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Novinky</h2>
            <Link to="/aktuality">
              <Button variant="ghost" className="gap-1">
                Všechny novinky <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestNews.slice(0, 4).map((item) => (
              <Card key={item.id} className="flex flex-col overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>{item.date ? formatDate(item.date) : "N/A"}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-3 text-muted-foreground">{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/aktuality/${item.id}`}>
                    <Button variant="outline">Číst více</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Uvod;
