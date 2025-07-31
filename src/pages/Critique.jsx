import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { 
  ArrowLeft, 
  Send, 
  Star, 
  TrendingUp, 
  MessageSquare,
  Download,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const Critique = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork, lessonTitle, isComplete } = location.state || {};
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState(null);
  const [userNotes, setUserNotes] = useState("");

  const generateCritique = async () => {
    if (!artwork) {
      toast.error("No artwork available for critique");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Create the payload
      const payload = {
        imageData: artwork, // The artwork is already in base64 format from the canvas
        type: "portret full"
      };

      // Make the API call
      const response = await fetch('https://puls-ai-chatbot.fly.dev/webhook/critique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Extract score from the output text
      const scoreMatch = result.output.match(/Scor: (\d+)\/100/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      
      // The rest of the text is the feedback
      const feedback = result.output.replace(/Scor: \d+\/100/g, '').trim();
      
      // Transform the API response into our expected critique format
      const apiCritique = {
        overallScore: score,
        feedback: feedback,
        // Remove the other fields since we're not using them anymore
        strengths: [],
        improvements: [],
        suggestions: [],
        encouragement: ""
      };
      
      setCritique(apiCritique);
      toast.success("AI analysis complete!");
    } catch (error) {
      console.error('Error getting critique:', error);
      toast.error("Failed to get AI critique. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadArtwork = () => {
    if (!artwork) return;
    
    const link = document.createElement('a');
    link.download = `${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-final.png`;
    link.href = artwork;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Artwork downloaded!");
  };

  const handleNextLesson = () => {
    navigate("/lessons");
  };

  return (
    <div className="critique-page">
      <div className="critique-content">
        {/* Header */}
        <header className="critique-header">
          <div className="critique-header-container">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/lessons")}
              className="critique-back-button"
            >
              <ArrowLeft />
              Back to Lessons
            </Button>
          </div>
        </header>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Art Critique</h1>
          <p className="text-muted-foreground text-lg">
            Get personalized feedback to improve your artistic skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Artwork Display */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{lessonTitle}</span>
                  {artwork && (
                    <Button variant="outline" size="sm" onClick={handleDownloadArtwork}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  {isComplete ? "Portfolio Review" : "Your completed artwork"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {artwork ? (
                  <div className="border-2 border-border rounded-lg p-4 bg-canvas">
                    <img 
                      src={artwork} 
                      alt="Your artwork" 
                      className="w-full max-w-md mx-auto rounded shadow-canvas"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20">
                    <p className="text-muted-foreground">
                      {isComplete 
                        ? "Complete portfolio review - no specific artwork selected" 
                        : "No artwork available for critique"
                      }
                    </p>
                  </div>
                )}

                {/* Analysis Button */}
                {!critique && (
                  <div className="mt-6 text-center">
                    <Button 
                      variant="default"
                      size="lg"
                      onClick={generateCritique}
                      disabled={isAnalyzing}
                      className="gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Get AI Critique
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Notes */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Your Notes
                </CardTitle>
                <CardDescription>
                  Add your own thoughts and reflections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What did you learn? What was challenging? What would you do differently next time?"
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="min-h-[120px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Critique Results */}
          <div>
            {critique ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Overall Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {critique.overallScore}/100
                      </div>
                      <Progress value={critique.overallScore} className="h-3 mb-4" />
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        {critique.overallScore >= 90 ? "Excellent" :
                         critique.overallScore >= 80 ? "Very Good" :
                         critique.overallScore >= 70 ? "Good" : "Needs Work"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      AI Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      {critique.feedback.split('\n').map((line, index) => (
                        line.trim() ? <p key={index}>{line}</p> : <br key={index} />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button 
                    variant="default" 
                    size="lg" 
                    onClick={handleNextLesson}
                    className="flex-1"
                  >
                    Continue Learning
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => setCritique(null)}
                  >
                    New Analysis
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <div className="text-6xl mb-4">🎨</div>
                  <CardTitle className="mb-2">Ready for AI Feedback?</CardTitle>
                  <CardDescription className="text-lg">
                    Submit your artwork to get personalized critique and suggestions for improvement.
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Critique; 