import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
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
  Send,
  User,
  Users,
  Hash,
  TrendingUp
} from "lucide-react";

import Navbar from "@/components/Navbar";

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [postContent, setPostContent] = useState("");

  // Dummy data for posts
  const posts = [
    {
      id: 1,
      author: {
        name: "Maria Popescu",
        avatar: null,
        role: "Artist"
      },
      content: "Tocmai am terminat un nou portret! Ce părere aveți despre tehnica de umbrire folosită?",
      image: "https://example.com/artwork1.jpg",
      likes: 45,
      comments: 12,
      tags: ["portret", "tehnici", "umbrire"],
      datePosted: "2024-03-15T10:30:00"
    },
    {
      id: 2,
      author: {
        name: "Ion Ionescu",
        avatar: null,
        role: "Instructor"
      },
      content: "Sfat pentru începători: Când desenați ochi, concentrați-vă mai întâi pe forma generală și apoi adăugați detaliile.",
      likes: 89,
      comments: 23,
      tags: ["sfaturi", "tehnici", "ochi"],
      datePosted: "2024-03-14T15:45:00"
    }
  ];

  // Dummy data for trending topics
  const trendingTopics = [
    { tag: "portret", count: 234 },
    { tag: "tehnici", count: 189 },
    { tag: "anatomie", count: 156 },
    { tag: "sfaturi", count: 123 },
    { tag: "inspirație", count: 98 }
  ];

  // Dummy data for active users
  const activeUsers = [
    { name: "Ana Maria", role: "Artist", avatar: null },
    { name: "Dan Popescu", role: "Instructor", avatar: null },
    { name: "Elena Ionescu", role: "Artist", avatar: null }
  ];

  const filters = [
    { id: "all", label: "Toate" },
    { id: "questions", label: "Întrebări" },
    { id: "tips", label: "Sfaturi" },
    { id: "showcase", label: "Lucrări" },
    { id: "discussions", label: "Discuții" }
  ];

  const handlePost = () => {
    if (!postContent.trim()) {
      toast.error("Adaugă un conținut postării!");
      return;
    }
    // Here you would typically send the post to your backend
    toast.success("Postare publicată cu succes!");
    setPostContent("");
  };

  const handleLike = (postId) => {
    toast.success("Apreciere adăugată!");
  };

  const handleComment = (postId) => {
    // Implement comment functionality
  };

  const handleShare = (postId) => {
    toast.success("Link copiat în clipboard!");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trendingTopics.map((topic) => (
                    <div 
                      key={topic.tag}
                      className="flex items-center justify-between hover:bg-muted p-2 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span>{topic.tag}</span>
                      </div>
                      <Badge variant="secondary">{topic.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Utilizatori activi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeUsers.map((user, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 hover:bg-muted p-2 rounded-lg cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={user?.photoURL} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Ce gânduri vrei să împărtășești?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button onClick={handlePost}>
                        <Send className="mr-2 h-4 w-4" />
                        Postează
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
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

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{post.author.name}</CardTitle>
                          <CardDescription>
                            {post.author.role} • {formatDate(post.datePosted)}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{post.content}</p>
                    {post.image && (
                      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post attachment"
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/800x450?text=No+Image";
                          }}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post.id)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comunitatea ta</CardTitle>
                <CardDescription>
                  Conectează-te cu alți artiști și împărtășește experiența ta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">1.2K</div>
                      <div className="text-sm text-muted-foreground">Membri</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">450</div>
                      <div className="text-sm text-muted-foreground">Postări</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">89</div>
                      <div className="text-sm text-muted-foreground">Online</div>
                    </div>
                  </div>
                  <Button className="w-full">
                    Invită prieteni
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;