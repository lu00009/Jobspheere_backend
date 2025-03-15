import { Request, Response } from 'express';
import Job from '../models/jobModels';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Create Job
export const createJob = async (req: Request, res: Response): Promise<Response> => {

  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      currency,
      type,
      experience,
      isBookMarked,
      logo,
      postedBy
    } = req.body;
    const logoBuffer = req.file.buffer
    const resizedBuffer = await sharp(logoBuffer).resize(300, 300).toFormat('jpeg').toBuffer()


    const name = `logo-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`
    const filePath = path.join(__dirname, '../../uploads', name);

    fs.writeFile(filePath, resizedBuffer, (error) => {
      if (error) {
        console.log('error saving the file', error);
      }
    })



    const job = new Job({
      title,
      type,
      company,
      location,
      salary,
      description,
      logo: filePath,
      experience,
      currency,
      isBookMarked,
      postedBy: req.user._id
    });
    // console.log('Request Body:', req.body);
    await job.save();
    return res.status(201).json(job);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Error posting job' });
  }
};

// Get All Jobs
export const getJobs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const jobs = await Job.find();
    return res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update Job
export const updateJobs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json(updatedJob);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete Job
export const deleteJob = async (req: Request, res: Response): Promise<Response> => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(204).json({ message: 'Job deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get Job by ID
export const getJobById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json(job);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
