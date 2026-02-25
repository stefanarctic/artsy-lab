import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, MessageSquare, Search, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { useAuth } from "@/lib/AuthContext";
import { saveArtwork, getPublicArtworks, toggleLikeOnDocument } from "@/lib/firestore.js";
import { uploadImage } from "@/lib/cloudinaryUtils.js";
import { COLLECTIONS } from "@/lib/appDataModel.js";
import { toast } from "sonner";

const Gallery = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const filters = [
    { id: "all", label: "Toate" },
    { id: "head-shape", label: "Forma capului" },
    { id: "eyes", label: "Ochi" },
    { id: "nose", label: "Nas" },
    { id: "mouth", label: "Gură" },
    { id: "popular", label: "Popular" },
  ];

  const loadArtworks = async ({ append = false } = {}) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const result = await getPublicArtworks({ pageSize: 12, lastDoc: append ? lastDoc : null });
      setArtworks((prev) => (append ? [...prev, ...result.items] : result.items));
      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error(error);
      toast.error("Nu am putut încărca galeria.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const filteredArtworks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    let items = artworks.filter((artwork) => {
      if (!normalizedSearch) return true;
      const title = (artwork.title || "").toLowerCase();
      const artist = (artwork.authorName || "artist").toLowerCase();
      return title.includes(normalizedSearch) || artist.includes(normalizedSearch);
    });

    if (selectedFilter === "popular") {
      items = [...items].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    } else if (selectedFilter !== "all") {
      items = items.filter((artwork) => artwork.lessonId === selectedFilter);
    }
    return items;
  }, [artworks, searchQuery, selectedFilter]);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const image = await uploadImage(file);
      await saveArtwork(user.uid, {
        image,
        title: `Lucrare ${new Date().toLocaleDateString("ro-RO")}`,
        lessonId: "head-shape",
        authorName: user.displayName || user.email || "Artist",
        authorAvatar: user.photoURL || null,
        likedBy: [],
        isPublic: true,
      });
      toast.success("Lucrare încărcată cu succes!");
      await loadArtworks();
    } catch (error) {
      console.error(error);
      toast.error("Upload eșuat. Verifică configurarea media.");
    } finally {
      setUploading(false);
      if (event.target) event.target.value = "";
    }
  };

  const handleLike = async (artworkId, alreadyLiked) => {
    if (!user) {
      toast.error("Autentifică-te pentru a aprecia lucrări.");
      return;
    }

    setArtworks((prev) =>
      prev.map((item) =>
        item.id === artworkId
          ? {
              ...item,
              likesCount: Math.max(0, (item.likesCount || 0) + (alreadyLiked ? -1 : 1)),
              likedBy: alreadyLiked
                ? (item.likedBy || []).filter((id) => id !== user.uid)
                : [...(item.likedBy || []), user.uid],
            }
          : item
      )
    );

    try {
      await toggleLikeOnDocument({
        collectionName: COLLECTIONS.artworks,
        docId: artworkId,
        userId: user.uid,
        liked: !alreadyLiked,
      });
    } catch (error) {
      console.error(error);
      toast.error("Nu am putut salva aprecierea.");
      await loadArtworks();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold">Galerie</h1>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={!user || uploading}>
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? "Se încarcă..." : "Încarcă lucrare"}
            </Button>
          </div>
        </div>

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

        {loading ? (
          <div className="text-center text-muted-foreground py-16">Se încarcă galeria...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork) => {
              const liked = Boolean(user && (artwork.likedBy || []).includes(user.uid));
              return (
                <Card key={artwork.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={artwork.image}
                      alt={artwork.title || "Artwork"}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x400?text=No+Image";
                      }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Avatar>
                          <AvatarImage src={artwork.authorAvatar} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <CardTitle className="text-lg truncate">{artwork.title || "Lucrare"}</CardTitle>
                          <CardDescription className="truncate">{artwork.authorName || "Artist"}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">{artwork.lessonId || "general"}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" onClick={() => handleLike(artwork.id, liked)}>
                          <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
                          {artwork.likesCount || 0}
                        </Button>
                        <Button variant="ghost" size="sm" disabled>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {artwork.commentsCount || 0}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => loadArtworks({ append: true })} disabled={loadingMore}>
              {loadingMore ? "Se încarcă..." : "Încarcă mai multe"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

