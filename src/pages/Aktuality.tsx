"use client";

import { useState, useEffect } from "react";
import { formatDate } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Newspaper, Search } from "lucide-react";
import { motion } from "framer-motion";

interface NewsItem {
  id: number;
  title: string;
  date: string | null;
  summary: string;
  content: string;
  imageUrl: string;
}

function AktualityContainer() {
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage] = useState(12); // Number of items per page

  function stripHtmlTags(input: string): string {
    return input.replace(/<\/?p>/g, "");  // This will remove <p> and </p> tags
  }

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
        setAllNews(formattedData);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);

  const years = Array.from(new Set(allNews.map(item => (item.date ? new Date(item.date).getFullYear() : null)))).filter(Boolean);

  const filteredNews = allNews.filter(item => {
    const title = item.title?.toLowerCase() || "";
    const summary = item.summary?.toLowerCase() || "";
    const matchesSearch = title.includes(searchTerm.toLowerCase()) || summary.includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear ? (item.date ? new Date(item.date).getFullYear().toString() === selectedYear : false) : true;
    return matchesSearch && matchesYear;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageItems = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="flex flex-col items-center py-32 px-4">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Newspaper className="h-10 w-10" />
            Novinky
          </h1>
          <p className="text-muted-foreground mt-2">Prohlédněte si všechny naše nejnovější zprávy a aktualizace</p>
        </div>
        <div className="mx-auto max-w-xs relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Vyhledej..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {currentPageItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>{item.date ? formatDate(item.date) : "No date available"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">{item.summary}</p>
                </CardContent>
                <CardFooter>
                  <a href={`/aktuality/${item.id}`}>
                    <Button variant="outline">Číst více</Button>
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination controls */}
        <div className="flex justify-center space-x-2 mt-6">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default AktualityContainer;
