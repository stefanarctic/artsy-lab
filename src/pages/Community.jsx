import { useEffect, useState } from "react";
import { Heart, MessageSquare, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { useAuth } from "@/lib/AuthContext";
import { COLLECTIONS } from "@/lib/appDataModel.js";
import { addCommentToPost, createPost, getPostComments, getPostsFeed, toggleLikeOnDocument } from "@/lib/firestore.js";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Community = () => {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [commentDraft, setCommentDraft] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState(null);
  const [commentsByPostId, setCommentsByPostId] = useState({});
  const [loadingCommentsFor, setLoadingCommentsFor] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { items } = await getPostsFeed({ pageSize: 20 });
      setPosts(items);
    } catch {
      toast.error("Nu am putut încărca comunitatea.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePost = async () => {
    const content = postContent.trim();
    if (!content) return;
    if (!user) return toast.error("Autentifică-te pentru a posta.");
    await createPost(user.uid, {
      content,
      authorName: user.displayName || user.email || "Artist",
      authorAvatar: user.photoURL || null,
      likedBy: [],
    });
    setPostContent("");
    await loadPosts();
  };

  const handleLike = async (postId, liked) => {
    if (!user) return toast.error("Autentifică-te pentru a aprecia.");
    await toggleLikeOnDocument({
      collectionName: COLLECTIONS.posts,
      docId: postId,
      userId: user.uid,
      liked: !liked,
    });
    await loadPosts();
  };

  const handleComment = async (postId) => {
    if (!user) return toast.error("Autentifică-te pentru a comenta.");
    const content = (commentDraft[postId] || "").trim();
    if (!content) return;
    const authorName = user.displayName || user.email || "Artist";
    await addCommentToPost(postId, user.uid, content, authorName);
    setCommentDraft((prev) => ({ ...prev, [postId]: "" }));
    await loadPosts();
    if (commentsByPostId[postId]) {
      const next = await getPostComments(postId);
      setCommentsByPostId((prev) => ({ ...prev, [postId]: next }));
    }
  };

  const toggleComments = async (postId) => {
    if (expandedCommentsPostId === postId) {
      setExpandedCommentsPostId(null);
      return;
    }
    setExpandedCommentsPostId(postId);
    if (!commentsByPostId[postId]) {
      setLoadingCommentsFor(postId);
      try {
        const list = await getPostComments(postId);
        setCommentsByPostId((prev) => ({ ...prev, [postId]: list }));
      } catch {
        toast.error("Nu s-au putut încărca comentariile.");
      } finally {
        setLoadingCommentsFor(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Scrie o postare..." />
            <div className="flex justify-end">
              <Button onClick={handlePost}><Send className="w-4 h-4 mr-2" />Postează</Button>
            </div>
          </CardContent>
        </Card>
        {loading ? <div className="text-center text-muted-foreground">Se încarcă...</div> : posts.map((post) => {
          const liked = Boolean(user && (post.likedBy || []).includes(user.uid));
          return (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Avatar><AvatarImage src={post.authorAvatar} /><AvatarFallback><User className="w-4 h-4" /></AvatarFallback></Avatar>
                  {post.authorName || "Artist"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>{post.content}</p>
                <div className="flex gap-3">
                  <Button size="sm" variant="ghost" onClick={() => handleLike(post.id, liked)}><Heart className={`w-4 h-4 mr-1 ${liked ? "fill-current" : ""}`} />{post.likesCount || 0}</Button>
                  <Button size="sm" variant="ghost" onClick={() => toggleComments(post.id)}><MessageSquare className="w-4 h-4 mr-1" />{post.commentsCount || 0}</Button>
                </div>
                {expandedCommentsPostId === post.id && (
                  <div className="rounded-md border bg-muted/40 p-3 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Comentarii</p>
                    {loadingCommentsFor === post.id ? (
                      <p className="text-sm text-muted-foreground">Se încarcă...</p>
                    ) : (commentsByPostId[post.id] || []).length === 0 ? (
                      <p className="text-sm text-muted-foreground">Niciun comentariu. Fii primul!</p>
                    ) : (
                      <ul className="space-y-2">
                        {(commentsByPostId[post.id] || []).map((c) => (
                          <li key={c.id} className="text-sm border-b border-border/50 pb-2 last:border-0">
                            <span className="font-medium">{c.authorName || "Utilizator"}</span>
                            <span className="text-muted-foreground ml-1 text-xs">
                              {c.createdAt ? (typeof c.createdAt.toDate === "function" ? new Date(c.createdAt.toDate()).toLocaleString("ro-RO") : c.createdAt.seconds ? new Date(c.createdAt.seconds * 1000).toLocaleString("ro-RO") : "") : ""}
                            </span>
                            <p className="mt-0.5">{c.content}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <div className="flex gap-2">
                  <Textarea className="min-h-[40px]" value={commentDraft[post.id] || ""} onChange={(e) => setCommentDraft((prev) => ({ ...prev, [post.id]: e.target.value }))} placeholder="Adaugă comentariu..." />
                  <Button onClick={() => handleComment(post.id)}>Trimite</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Community;

