import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
import * as mediaModel from '../models/mediaModel.js';

// folders paths
const baseDir = path.join(process.cwd(), 'data', 'media');
const folders = {
  image: path.join(baseDir, 'image'),
  audio: path.join(baseDir, 'audio'),
  video: path.join(baseDir, 'video'),
};

// controller upload media
export const uploadMediaController = async (req, res) => {
  try {
    const files = req.file ? [req.file] : req.files;
    if (!req.file && (!req.files || req.files.length === 0 )) {
      return res.status(400).json({ message: 'no media provided' });
    }

    const mediaType = req.body.type.toLowerCase();
    if (!['image', 'audio', 'video'].includes(mediaType)) {
      return res.status(400).json({ message: 'invalid media type' });
    }

    // generate ID in controller
    const mediaId = uuid();

    const ext = path.extname(req.file.originalname).toLowerCase();
    const fileName = `${mediaId}${ext}`;
    const targetPath = path.join(folders[mediaType], fileName);

    // process image
    if (mediaType === 'image') {
      await sharp(req.file.path)
        .resize({ width: 1000, height: 1000, fit: 'inside' })
        .jpeg({ quality: 80 })
        .toFile(targetPath);

      fs.unlinkSync(req.file.path); // remove temp file
    } else {
      // audio & video  just move file
      fs.renameSync(req.file.path, targetPath);
    }

    // build minimal media data 
    const mediaData = {
      mediaId,
      type: mediaType,
      url: `/media/${mediaType}/${fileName}`,
      createdAt: new Date().toISOString(),
    };

    // save metadata via model
    const savedMedia = await mediaModel.createMedia(mediaData);

    res.status(201).json({
      message: 'media created successfully',
      media: savedMedia,
    });
  } catch (error) {
    console.error('upload media error:', error);
    res.status(500).json({
      message: 'failed to upload media',
    });
  }
};
