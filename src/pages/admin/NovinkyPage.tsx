"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../../components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Edit, Maximize, Plus, Trash2 } from "lucide-react";
import Sidebar from "./sidebar";
import { useToast } from "../../components/ui/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  images: string[];
  date: string;
}

const NovinkyPage = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [newsData, setNewsData] = useState({ title: "", content: "" });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchNews = async () => {
    try {
      const response = await fetch("https://preview.zushm.cz/api/novinky/");
      const data = await response.json();
      
      const formattedNews = data
        .filter((item: any) => item.DeletedAt === null)
        .map((item: any) => ({
          id: item.ID.toString(),
          title: item.Title,
          content: item.Content,
          images: item.Image.split(","),
          date: item.CreatedAt.split("T")[0],
        }));

      setNewsItems(formattedNews);
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    setSelectedImages(files);

    const newImagePreviewUrls: string[] = [];
    files.forEach((file) => {
      newImagePreviewUrls.push(URL.createObjectURL(file));
    });
    setImagePreviewUrls(newImagePreviewUrls);
  };

  const handleCreateNews = async () => {
    // Retrieve the token from cookies
    const token = document.cookie.split("; ").find(row => row.startsWith("token"));
    
    if (token) {
        const tokenValue = token.split("=")[1];
    
        // Create FormData object and append form fields
        const formData = new FormData();
        formData.append("title", newsData.title);
        formData.append("content", newsData.content);
  
        // Handle image file selection
        const imageUpload = document.getElementById("imageUpload") as HTMLInputElement | null;
        if (imageUpload && imageUpload.files) {
            const imageFiles: FileList = imageUpload.files;
            console.log(imageFiles);

            // Limit to a maximum of 20 images
            const maxImages = Math.min(imageFiles.length, 20);
            for (let i = 0; i < maxImages; i++) {
                formData.append(`image${i}`, imageFiles[i]); // Append each image as image0, image1, image2, etc.
                console.log(`image${i}`, imageFiles[i]); // Log each image for debugging
            }
        }
    
        try {
            // Log the formData to check the structure before sending
            console.log(formData);

            const response = await fetch("https://preview.zushm.cz/api/novinky/create", {
                method: "POST",
                headers: {
                    "Authorization": tokenValue, // Add Authorization header
                },
                body: formData, // Send the FormData object with the images and other fields
            });
    
            // If the response is not OK (status code 200), it will throw an error.
            if (!response.ok) {
                const data = await response.json();
                console.error("Error:", data.message);
                toast({
                    title: "Neúspěch",
                    description: "Novinka nebyla úspěšně přidána.",
                });
                return;
            }
    
            const data = await response.json();
            // Handle successful creation
            toast({
                title: "Úspěch",
                description: "Novinka byla úspěšně přidána.",
            });
            setNewsItems((prev) => [...prev, data]); // Update news list with new data

        } catch (error) {
            console.error("Error uploading data:", error);
            toast({
                title: "Neúspěch",
                description: "Novinka nebyla úspěšně přidána.",
            });
        }
    } else {
        console.error("No token found");
        toast({
            title: "Neúspěch",
            description: "Novinka nebyla úspěšně přidána.",
        });
    }
    
    // Reset form and close dialog after submission
    setNewsData({ title: "", content: "" });
    setImagePreviewUrls([]); // Clear image previews
    setSelectedImages([]); // Clear selected images
    setIsCreateDialogOpen(false); // Close create dialog
    fetchNews(); // Refresh news list after submission
};

  const handleEditNews = async () => {
    if (!currentNews || !newsData.title || !newsData.content) {
      toast({
        title: "Chyba",
        description: "Prosím vyplňte titulek a obsah novinky.",
        variant: "destructive",
      });
      return;
    }

    const token = document.cookie.split("; ").find(row => row.startsWith("token"));

    if (token) {
      const tokenValue = token.split("=")[1];
      try {
        const response = await fetch("https://preview.zushm.cz/api/novinky/update", {
          method: "POST",
          headers: {
            "Authorization": tokenValue,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(currentNews.id),
            title: newsData.title,
            content: newsData.content,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          toast({
            title: "Úspěch",
            description: "Novinka byla úspěšně upravena.",
          });
          // Update the list of news items
          setNewsItems((prev) => prev.map((item) =>
            item.id === currentNews.id ? { ...item, ...newsData } : item
          ));
        } else {
          toast({
            title: "Neúspěch",
            description: "Novinka nebyla úspěšně upravena.",
          });
        }
      } catch (error) {
        console.error("Error updating data:", error);
        toast({
          title: "Neúspěch",
          description: "Novinka nebyla úspěšně upravena.",
        });
      }
    } else {
      console.error("No token found");
      toast({
        title: "Neúspěch",
        description: "Novinka nebyla úspěšně upravena.",
      });
    }

    // Reset form and close dialog after submission
    setNewsData({ title: "", content: "" });
    setIsEditDialogOpen(false);
    fetchNews();
  };

  const handleDeleteNews = (id: string) => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="));
  
    if (token) {
      const tokenValue = token.split("=")[1];
  
      fetch("https://preview.zushm.cz/api/novinky/delete", {
        method: "POST",
        headers: {
          "Authorization": tokenValue,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: id,  // Use the passed id instead of title
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Novinka deleted") {
            fetchNews();
          } else {
            console.error("Failed to delete novinka:", data.message);
          }
        })
        .catch(error => {
          console.error("Error deleting novinka", error);
        });
    } else {
      console.log("eror")
    }
    fetchNews();
  };

  const openEditDialog = (news: NewsItem) => {
    setCurrentNews(news);
    setNewsData({ title: news.title, content: news.content });
    setImagePreviewUrls(news.images);
    setIsEditDialogOpen(true);
  };

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Novinky</h1>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Přidat novinku
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titulek</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Obrázky</TableHead>
                <TableHead className="text-right">Akce</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsItems.map((news) => (
                <TableRow key={news.id}>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell>{news.date}</TableCell>
                  <TableCell>{news.images.length} obrázků</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(news)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Upravit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNews(news.title)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Create News Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Přidat novinku</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Titulek</Label>
                  <Input
                    id="title"
                    value={newsData.title}
                    onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                    placeholder="Zadejte titulek"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Obsah</Label>
                  <Textarea
                    id="content"
                    value={newsData.content}
                    onChange={(e) => setNewsData({ ...newsData, content: e.target.value })}
                    placeholder="Zadejte obsah"
                  />
                </div>
                <div>
                  <Label htmlFor="image">Obrázky</Label>
                  <input
                    type="file"
                    id="imageUpload"
                    name="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500"
                    multiple
                  />
                  <div className="mt-2">
                    {imagePreviewUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="w-56 h-32 bg-cover bg-center" style={{ backgroundImage: `url(${url})` }}></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Zrušit
                </Button>
                <Button onClick={handleCreateNews}>Uložit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit News Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upravit novinku</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Titulek</Label>
                  <Input
                    id="edit-title"
                    value={newsData.title}
                    onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                    placeholder="Zadejte titulek"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Obsah</Label>
                  <Textarea
                    id="edit-content"
                    value={newsData.content}
                    onChange={(e) => setNewsData({ ...newsData, content: e.target.value })}
                    placeholder="Zadejte obsah"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-image">Obrázky</Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500"
                  />
                  <div className="mt-2">
                    {imagePreviewUrls.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="w-32 h-32 bg-cover bg-center" style={{ backgroundImage: `url(${url})` }}></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Zrušit
                </Button>
                <Button onClick={handleEditNews}>Upravit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default NovinkyPage;