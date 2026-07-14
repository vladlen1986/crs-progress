# Images
> Source: https://manual.bubble.io/help-guides/data/images · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

When you upload an image, Bubble does not modify the original file. This means no resizing, compressing, or altering takes place during the upload process. The original file is stored exactly as it was uploaded.

However, Bubble automatically generates optimized copies of the uploaded file for performance reasons. They are generated at run-time and cached.

## Image caching

While Bubble doesn’t natively support image modification, it offers a [CDN transformation layer](#user-content-fn-1)[^1] for rendering images dynamically in your app.

This transformation is used specifically for images displayed inside image elements or backgrounds[^2] under the following conditions:

1. **Public images:** The image is not attached[^3] to any private Bubble “thing.”
2. **Bubble storage:** The image is stored within Bubble’s file storage system.
3. **File type:** [SVG files](#user-content-fn-4)[^4] are not compressed[^5]. SVGs are vector-based, which means they are inherently scalable without quality loss

When displaying an image, Bubble’s run-mode engine determines the optimal size and compression needed based on the container or device resolution. It uses the transformation layer to create a temporary resized or compressed copy of the original image.

Each time the image is rendered in a new context—whether in a differently sized container or on a device with a different resolution—a new copy is generated on the fly. For example:

* Displaying the same image in a small icon versus a full-width banner will create two differently resized versions.
* High-resolution devices may trigger higher-quality copies compared to standard-resolution devices.

These transformations ensure efficient loading and optimal display quality across various devices and layouts.

Copies generated through the transformation layer are stored temporarily in Bubble’s caching system for up to 30 days. This caching applies even if the original image is deleted during this period, meaning the transformed versions can still be accessed for up to 30 days after deletion.

Cached image copies do not count toward your storage limit because they are managed within Bubble’s performance infrastructure. If a cached version is unavailable, Bubble automatically generates a new resized copy from the original file to ensure the image is always displayed correctly.

<details>

<summary><strong>Advanced:</strong> how Bubble determines image sizes for caching and rendering</summary>

**Resizing**

When an image is displayed in a responsive layout, its size is often proportional to its parent container. This results in a variety of sizes across devices, with widths ranging continuously, for example, from 150px to 2000px.

To manage this variability, Bubble uses a systematic approach to limit the number of image copies generated. The system rounds each size up to the nearest value in a predefined sequence of widths:

* 128px
* 192px
* 256px
* 384px
* 512px
* 768px
* 1024px
* 1536px
* 2048px
* 3072px

This sequence ensures no more than approximately 10 resized copies of an image are stored, striking a balance between performance and storage efficiency.

**Rendering**

When rendering an image, Bubble determines the closest size in this sequence that is slightly larger than the container dimensions.

For example, in a Full HD viewport (1920px width), if the image container is sized at 768x512 pixels, the system rounds up to the next size in the sequence: 1024px width. Bubble then scales the container dimensions proportionally, requesting an image at 1024x683 pixels.

To ensure a proper fit, Bubble’s engine retrieves the “max fit” version of the image, which is the largest size that fits within the specified dimensions. In this case, the final image served might be slightly adjusted, such as 1024x585 pixels, preserving aspect ratio and ensuring optimal display quality. This process minimizes unnecessary resizing operations while delivering the best visual results for the user’s specific device and layout.

This method of resizing and caching is key to Bubble's performance infrastructure, enabling efficient image handling without compromising on quality

</details>

### Should I compress images before uploading?

Compressing and resizing images before uploading is generally unnecessary for performance reasons, as Bubble automatically optimizes images for display through its CDN caching and transformation process.

However, if conserving storage space is a priority, resizing and compressing images to the size they’ll most frequently be displayed at can be beneficial. When doing so, ensure that the images are large enough to accommodate screens larger than your own. For example, if you’re using a full HD monitor to test a background image, a higher-resolution image may be necessary to maintain quality for users with 4K monitors.

For apps where image quality is crucial, we recommend uploading images at the maximum resolution they will be viewed. This ensures the best possible experience for all users, regardless of their device’s screen size.

### What about user-uploaded images?

When users upload an image, you may lose control over the initial file size, potentially leading to larger storage consumption than intended. Since Bubble does not include native image processing features, you may need to address this in one of two ways:

#### Set a Maximum File Size

You can configure the picture uploader element to enforce a maximum file size. This ensures users reduce their file size before uploading, helping you maintain control over storage limits.

#### Use a Plugin

Plugins can provide features like image compression before uploading. For the best results, choose plugins that store the compressed image in Bubble’s file storage. This allows the image to benefit from Bubble’s caching and transformation process, as described earlier, ensuring optimal performance and flexibility.

### Is compression and resizing applied when using the file uploader element?

Yes, compression and resizing are applied when the image is first loaded, rather than during upload. This means the optimization process also applies to images uploaded through the file uploader element. The same rules [described above](#image-caching) apply to files uploaded this way.

Since the file uploader supports a wider range of file formats, some files may not be optimized, such as SVGs and animated GIFs. Additionally, HEIC and HEIF (Apple formats) are not officially supported.

## Images uploaded via plugins

Images uploaded through a plugin follow the same behavior as other uploads, as long as they are stored in Bubble’s file storage. However, if a plugin stores the image in an external storage service, the caching and transformation process will not occur.

<details>

<summary>Bypassing the CDN transformation layer</summary>

If you want to bypass the automatic optimization of images in your app, you can append the following parameter to the image URL:

`?ignore_imgix=true`

This advanced feature disables Bubble’s image optimization for that specific image. Use this feature with caution, as it may impact performance and loading times. If you’re unsure about its purpose, it’s best to avoid using it.

</details>

[^1]: A CDN transformation layer dynamically adjusts images for optimal display by resizing or compressing them based on the user’s device or container size. This ensures faster load times and reduced bandwidth usage without altering the original image file.

[^2]: When used as background in an element, such as setting an image as a background in a group element.

[^3]: When a file is “attached” to a thing, it means the file is protected by the privacy rules applied to that thing. As a result, the file will be inaccessible to users who do not meet the conditions defined by those rules. For more details on file security, refer to the article section below:\
    \
    Article section: [Uploading private files](/help-guides/data/files#uploading-private-files)

[^4]: SVG files are Scalable Vector Graphics, a file format for two-dimensional images. Unlike raster images, they use XML-based code to define shapes and paths, allowing them to scale without losing quality.

[^5]: Keep in mind that while SVG files *can* be compressed, Bubble’s CDN does not provide this functionality. To minimize file size, consider compressing your SVG files before uploading them.
