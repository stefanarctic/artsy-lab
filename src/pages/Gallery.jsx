import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { 
  Heart,
  MessageSquare,
  Share2,
  Filter,
  Search,
  Upload,
  User
} from "lucide-react";

const Gallery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Dummy data for artworks
  const artworks = [
    {
      id: 1,
      title: "Portret în creion",
      artist: {
        name: "Maria Popescu",
        avatar: null
      },
      image: "https://example.com/artwork1.jpg",
      likes: 124,
      comments: 15,
      tags: ["portret", "creion", "realism"],
      dateCreated: "2024-03-15"
    },
    {
      id: 2,
      title: "Studiu anatomic",
      artist: {
        name: "Ion Ionescu",
        avatar: null
      },
      image: "https://example.com/artwork2.jpg",
      likes: 89,
      comments: 8,
      tags: ["anatomie", "schițe", "studiu"],
      dateCreated: "2024-03-14"
    }
  ];

  const filters = [
    { id: "all", label: "Toate" },
    { id: "portret", label: "Portrete" },
    { id: "anatomie", label: "Anatomie" },
    { id: "schite", label: "Schițe" },
    { id: "popular", label: "Popular" }
  ];

  const handleLike = (artworkId) => {
    toast.success("Apreciere adăugată!");
  };

  const handleComment = (artworkId) => {
    // Implement comment functionality
  };

  const handleShare = (artworkId) => {
    // Implement share functionality
    toast.success("Link copiat în clipboard!");
  };

  const handleUpload = () => {
    // Implement artwork upload
    toast.success("Încărcare reușită!");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold">Galerie</h1>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Încarcă lucrare
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Caută lucrări..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={artwork.artist.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{artwork.title}</CardTitle>
                      <CardDescription>{artwork.artist.name}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {artwork.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(artwork.id)}
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {artwork.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleComment(artwork.id)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {artwork.comments}
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(artwork.id)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;