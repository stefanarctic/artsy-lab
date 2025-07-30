import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

interface ArtworkCritique {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  encouragement: string;
}

const Critique = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { artwork, lessonTitle, isComplete } = location.state || {};
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [critique, setCritique] = useState<ArtworkCritique | null>(null);
  const [userNotes, setUserNotes] = useState("");

  // Mock AI critique - In a real app, this would call an AI service
  const generateCritique = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockCritique: ArtworkCritique = {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100 range
      strengths: [
        "Great use of proportional guidelines",
        "Confident line work and stroke placement",
        "Good understanding of basic facial structure",
        "Clean and organized approach to construction"
      ],
      improvements: [
        "Try varying line weights for more depth",
        "Focus on smoother curves for organic shapes",
        "Practice blending and shading techniques",
        "Work on symmetry between facial features"
      ],
      suggestions: [
        "Study real portrait references for accuracy",
        "Practice gesture drawing for fluid lines",
        "Experiment with different drawing tools",
        "Break down complex shapes into simpler forms"
      ],
      encouragement: "You're making excellent progress! Your understanding of facial proportions is developing well. Keep practicing regularly and don't be afraid to experiment with different techniques."
    };
    
    setCritique(mockCritique);
    setIsAnalyzing(false);
    toast.success("AI analysis complete!");
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
    <div className="min-h-screen bg-gradient-canvas">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/lessons")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lessons
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">AI Art Critique</h1>
            <p className="text-muted-foreground text-lg">
              Get personalized feedback to improve your artistic skills
            </p>
          </div>
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

                {/* Strengths */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">✨ Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {critique.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Areas for Improvement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-600 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {critique.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">💡 Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {critique.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Encouragement */}
                <Card className="bg-gradient-secondary">
                  <CardHeader>
                    <CardTitle>Encouragement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg italic">{critique.encouragement}</p>
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