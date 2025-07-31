import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Autentificare reușită!");
      navigate("/");
    } catch (error) {
      toast.error("Eroare la autentificare. Verificați datele și încercați din nou.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Autentificare reușită cu Google!");
      navigate("/");
    } catch (error) {
      toast.error("Eroare la autentificarea cu Google.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Autentificare</CardTitle>
          <CardDescription>
            Conectează-te pentru a-ți continua călătoria artistică
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nume@exemplu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parolă</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                "Se procesează..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Autentificare
                </>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Sau continuă cu
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="mr-2 h-4 w-4"
            />
            Google
          </Button>

          <div className="mt-6 text-center text-sm">
            Nu ai cont?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Înregistrează-te
              <ArrowRight className="ml-1 inline-block h-4 w-4" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;