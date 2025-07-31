import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, getUserProfile } from './firestore';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, displayName) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(user, { displayName });
      
      // Create user profile in Firestore
      await createUserProfile(user.uid, {
        email,
        displayName,
        photoURL: user.photoURL
      });
      
      toast.success("Cont creat cu succes!");
      return user;
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Autentificare reușită!");
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      toast.error("Email sau parolă incorectă");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Deconectare reușită!");
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Eroare la deconectare");
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // Check if user profile exists, if not create it
      const profile = await getUserProfile(user.uid);
      if (!profile) {
        await createUserProfile(user.uid, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      }
      
      toast.success("Autentificare reușită cu Google!");
      return user;
    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error("Eroare la autentificarea cu Google");
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email de resetare trimis!");
    } catch (error) {
      console.error('Error during password reset:', error);
      toast.error("Eroare la trimiterea emailului de resetare");
      throw error;
    }
  };

  const value = {
    user,
    signup,
    login,
    logout,
    loginWithGoogle,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};