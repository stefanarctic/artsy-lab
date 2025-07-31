import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { useAuth } from "@/lib/AuthContext";
import { getUserProfile, updateUserProfile, createUserProfile } from "@/lib/firestore";
import { updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { 
  User, 
  Mail, 
  Award, 
  TrendingUp, 
  Image as ImageIcon,
  LogOut,
  Save
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    bio: "",
    photoURL: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [tempPhotoURL, setTempPhotoURL] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  // Load user profile data
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (user && !initialLoadDone) {
        try {
          let profile = await getUserProfile(user.uid);
          
          // If profile doesn't exist, create it
          if (!profile) {
            const newProfile = {
              displayName: user.displayName || "",
              email: user.email || "",
              bio: "",
              photoURL: user.photoURL || null,
              createdAt: new Date(),
              totalArtworks: 0,
              totalLessons: 0,
              completedLessons: []
            };
            
            await createUserProfile(user.uid, newProfile);
            profile = newProfile;
          }

          setProfileData({
            displayName: profile.displayName || user.displayName || "",
            email: profile.email || user.email || "",
            bio: profile.bio || "",
            photoURL: profile.photoURL || user.photoURL || null
          });
          setInitialLoadDone(true);
        } catch (error) {
          console.error('Error loading profile:', error);
          toast.error("Eroare la încărcarea profilului");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadProfile();

    // Cleanup function to revoke temporary URLs
    return () => {
      if (tempPhotoURL) {
        URL.revokeObjectURL(tempPhotoURL);
      }
    };
  }, [user, tempPhotoURL, initialLoadDone]);

  // Dummy data for achievements and progress
  const achievements = [
    {
      title: "Primul Portret",
      description: "Ai completat prima lecție de portret",
      icon: <Award className="h-4 w-4" />,
      date: "15 Mar 2024"
    },
    {
      title: "Anatomie Master",
      description: "Ai finalizat toate lecțiile de anatomie",
      icon: <TrendingUp className="h-4 w-4" />,
      date: "20 Mar 2024"
    }
  ];

  const progress = {
    lessonsCompleted: 8,
    totalLessons: 12,
    artworksCreated: 15,
    averageScore: 85
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Deconectare reușită!");
    } catch (error) {
      toast.error("Eroare la deconectare.");
      console.error(error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let finalPhotoURL = profileData.photoURL;

      // If there's a new photo file, upload it to Cloudinary
      if (photoFile) {
        const formData = new FormData();
        formData.append('file', photoFile);
        formData.append('upload_preset', 'artsy_uploads');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/ddbwrwscc/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        finalPhotoURL = data.secure_url;
      }

      // First update Firestore
      const updateData = {
        displayName: profileData.displayName,
        bio: profileData.bio,
        photoURL: finalPhotoURL,
        updatedAt: new Date()
      };
      await updateUserProfile(user.uid, updateData);

      // Then update Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: finalPhotoURL
      });

      // Update local state with the final photo URL
      setProfileData(prev => ({
        ...prev,
        photoURL: finalPhotoURL
      }));

      // Clean up temporary states
      if (tempPhotoURL) {
        URL.revokeObjectURL(tempPhotoURL);
      }
      setTempPhotoURL(null);
      setPhotoFile(null);

      // Set a flag to prevent reloading the old data
      setInitialLoadDone(true);
      
      toast.success("Profil actualizat cu succes!");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Eroare la actualizarea profilului");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the actual file for upload
      setPhotoFile(file);
      
      // Create temporary URL for preview
      const tempUrl = URL.createObjectURL(file);
      setTempPhotoURL(tempUrl);
      setProfileData(prev => ({
        ...prev,
        photoURL: tempUrl
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Se încarcă profilul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Profilul meu</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Deconectare
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Informații Profil</CardTitle>
              <CardDescription>
                Actualizează-ți informațiile personale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.photoURL} />
                    <AvatarFallback>
                      {loading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      ) : (
                        <User className="h-10 w-10" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {loading && (
                    <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
                    </div>
                  )}
                </div>
                <div>
                  <Label 
                    htmlFor="avatar" 
                    className="cursor-pointer inline-flex items-center px-4 py-2 border rounded-md hover:bg-accent"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Schimbă poza
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="displayName">Nume</Label>
                  <Input
                    id="displayName"
                    value={profileData.displayName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </div>
                <Button 
                  onClick={handleSaveProfile} 
                  disabled={loading}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Se salvează..." : "Salvează modificările"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress & Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Lecții completate</span>
                    <span>{progress.lessonsCompleted}/{progress.totalLessons}</span>
                  </div>
                  <Progress value={(progress.lessonsCompleted / progress.totalLessons) * 100} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{progress.artworksCreated}</div>
                    <div className="text-sm text-muted-foreground">Lucrări create</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{progress.averageScore}%</div>
                    <div className="text-sm text-muted-foreground">Scor mediu</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Realizări</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-muted rounded-lg"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.description}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {achievement.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;