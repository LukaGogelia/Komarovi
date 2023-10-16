// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import formidable from 'formidable';

// import FormData from 'form-data';

// export async function POST(request) {

//     try {


//         // Rest of the logic remains the same...


//         // if (request.headers['content-type'].startsWith('multipart/form-data;')) {
//         const form = new formidable.IncomingForm();
//         const data = await new Promise((resolve, reject) => {
//             form.parse(request, (err, fields, files) => {
//                 if (err) reject(err);
//                 resolve({ fields, files });
//             });
//         });

//         const file = data.files.file;

//         if (!file) {
//             return NextResponse.json(
//                 { error: "No file provided." },
//                 { status: 400 }
//             );
//         }

//         // Setup form data for image upload to Cloudinary
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'xdfggik7'); // Replace with your Cloudinary upload preset

//         // Send the image to Cloudinary
//         const cloudinaryResponse = await axios.post(
//             `https://api.cloudinary.com/v1_1/komarovi/image/upload`, // Replace with your Cloudinary cloud name
//             formData,
//             {
//                 headers: formData.getHeaders(),
//             }
//         );

//         // Check Cloudinary response and extract the URL
//         if (cloudinaryResponse.status === 200) {
//             const imageUrl = cloudinaryResponse.data.url;
//             return NextResponse.json({ imageUrl });
//         } else {
//             return NextResponse.json(
//                 { error: "Failed to upload image to Cloudinary." },
//                 { status: 500 }
//             );
//         }
//         // }
//         //  else {
//         //     return NextResponse.json(
//         //         { error: "Request is not multipart/form-data." },
//         //         { status: 400 }
//         //     );
//         // }
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         return NextResponse.json(
//             { error: "Internal server error." },
//             { status: 500 }
//         );
//     }
// }