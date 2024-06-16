const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Utility function to remove temporary files

// New endpoint for uploading files
router.post('/upload-file', auth, authAdmin, (req, res) => {
  const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) console.error('Failed to remove temporary file:', err);
    });
  };
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File size too large' });
    }

    // Check file type (only JPEG and PNG)
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File format is incorrect' });
    }

    // Upload to Cloudinary
    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: 'uploads' },
      (err, result) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(500).json({ msg: err.message });
        }

        // Remove the temporary file and send response
        removeTmp(file.tempFilePath);
        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/destroy', auth, authAdmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'No images Selected' });

    cloudinary.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: 'Deleted' });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
