import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadImage } from '@/lib/cloudinaryUtils';

const ConfigTest = () => {
  const [firebaseStatus, setFirebaseStatus] = useState('Checking...');
  const [cloudinaryStatus, setCloudinaryStatus] = useState('Checking...');

  useEffect(() => {
    // Test Firebase connection
    const unsubscribe = auth.onAuthStateChanged(() => {
      setFirebaseStatus('Connected ✅');
    }, (error) => {
      setFirebaseStatus(`Error: ${error.message} ❌`);
    });

    return () => unsubscribe();
  }, []);

  const testCloudinaryUpload = async () => {
    try {
      setCloudinaryStatus('Testing...');
      
      // Create a small test canvas
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, 100, 100);
      
      // Convert canvas to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], 'test.png', { type: 'image/png' });

      // Try to upload
      const url = await uploadImage(file);
      if (url) {
        setCloudinaryStatus('Connected ✅');
        console.log('Test upload successful:', url);
      }
    } catch (error) {
      setCloudinaryStatus(`Error: ${error.message} ❌`);
      console.error('Cloudinary test error:', error);
    }
  };

  return (
    <Card className="w-[400px] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Configuration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">Firebase Status:</p>
          <p>{firebaseStatus}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Cloud Name: {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
          </p>
        </div>
        <div>
          <p className="font-medium">Cloudinary Status:</p>
          <p>{cloudinaryStatus}</p>
          {cloudinaryStatus === 'Checking...' && (
            <Button 
              onClick={testCloudinaryUpload}
              className="mt-2"
            >
              Test Cloudinary Upload
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigTest;