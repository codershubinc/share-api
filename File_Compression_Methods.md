# File Compression Methods for Appwrite File Sharing

## 1. Use Built-in Compression (ZIP, TAR, GZ)
Before uploading, compress files into ZIP or GZ format.

### Example (Node.js)
```ts
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

const input = createReadStream('file.txt');
const output = createWriteStream('file.txt.gz');

input.pipe(createGzip()).pipe(output);
```
- **ZIP**: Works for multiple files  
- **GZ**: Works for a single file (better compression for large files)

---

## 2. Appwrite Storage Compression (Client-Side)
Since Appwrite doesn’t support automatic compression, compress the file **before uploading** using **JSZip**:

### Example (JSZip in JavaScript)
```ts
import JSZip from 'jszip';

async function compressAndUpload(file) {
  const zip = new JSZip();
  zip.file(file.name, file);
  const compressedBlob = await zip.generateAsync({ type: "blob" });

  const formData = new FormData();
  formData.append("file", compressedBlob, file.name + ".zip");

  await fetch("/upload-endpoint", { method: "POST", body: formData });
}
```

---

## 3. WebP & HEIF for Image Compression
Convert images to **WebP or HEIF** for better compression.

### Example (Sharp in Node.js)
```ts
import sharp from 'sharp';

sharp('input.jpg')
  .toFormat('webp')
  .toFile('output.webp');
```
WebP and HEIF provide **50-80% smaller file sizes** than PNG/JPG.

---

## 4. Brotli Compression for Text Files
For text-based files like JSON, HTML, or logs, use **Brotli**.

### Example (Node.js with Brotli)
```ts
import { brotliCompress } from 'zlib';
import { writeFileSync } from 'fs';

const text = "Your file content here";
brotliCompress(Buffer.from(text), (err, compressed) => {
  if (!err) writeFileSync("file.br", compressed);
});
```
Brotli achieves **better compression than Gzip**.

---

## 5. Video Compression (FFmpeg)
For videos, use **FFmpeg** to optimize size.

### Example (MP4 compression using H.265 codec)
```sh
ffmpeg -i input.mp4 -vcodec libx265 -crf 28 output.mp4
```
- **H.265 (HEVC)** reduces file size by 50% compared to H.264.
- Use **-crf 28** for a balance between compression and quality.

---

## 6. Progressive Uploads with Chunking
For **large files**, break them into chunks before uploading.

### Example (Appwrite’s chunked uploads)
```ts
await storage.createFile(bucketId, fileId, InputFile.fromPath("file.zip"), {
  onProgress: (progress) => console.log(progress),
});
```
This prevents timeouts and makes downloads **faster**.

---

## Best Compression Methods for Different Files
| File Type    | Best Compression Method |
|-------------|------------------------|
| General Files | ZIP/GZ compression |
| Images | Convert to WebP or HEIF |
| Text Files (logs, JSON, etc.) | Brotli compression |
| Videos | FFmpeg with H.265 |
| Large Files | Use chunked uploads |

Would you like a script for **automatic compression before upload**?
