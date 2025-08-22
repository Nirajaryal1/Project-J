# Voice Capture

This app uses the browser `MediaRecorder` to capture audio and upload it to Firebase Storage.

## Steps
1. Request mic permission.
2. Start `MediaRecorder` and collect chunks.
3. Save as Blob → upload to Storage.
4. Create a Firestore entry document with metadata.
5. (Optional) Send to speech-to-text & summarization.

## Sample (simplified)
```ts
export async function recordAndUpload() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  const chunks: Blob[] = [];

  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    // upload blob to Firebase Storage and write metadata to Firestore
  };

  mediaRecorder.start();
  // call mediaRecorder.stop() in UI when done
}
```
