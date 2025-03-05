const express = require("express")
require('../db/conn')

const ResumeCollection = require("../db/models/resumeData")
const MessageCollection = require("../db/models/messages")


const upload = require('../middlewares/multer/multerConfig');

const router = new express.Router()



router.get("/resume/:field", async (req, res) => {
    try {
        const field = req.params.field;
        const resume = await ResumeCollection.findOne().select(field);

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/resume', async (req, res) => {
    try {
        const resume = await ResumeCollection.findOne();
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})




//// update the resume entirely
router.post('/resume', async (req, res) => {
    try {
        const existingResume = await ResumeCollection.findOne();
        if (existingResume) {
            return res.status(400).json({ message: "Resume already exists." });
        }

        const newResume = new ResumeCollection(req.body);
        await newResume.save();
        res.status(201).json({ message: "Resume added successfully", newResume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})


//// just update the specific field
router.put('/resume', async (req, res) => {
    try {
        const { fieldPath, UpdatedValue } = req.body;  // Get field name and new value
        console.log(fieldPath, UpdatedValue)

        const resume = await ResumeCollection.findOne();
        if (!resume) {
            return res.status(404).json({ message: "No resume found. Please add one first." });
        }

        const updatedResume = await ResumeCollection.findByIdAndUpdate(resume._id, { $set: { [fieldPath]: UpdatedValue } }, { new: true });

        res.json({ message: "Resume updated successfully", updatedResume });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})





////////////////////////////////////////////////////////// routes for messages storing from clients/////////////

router.post('/message', async (req, res) => {
    try {
        const newMessage = new MessageCollection(req.body);
        await newMessage.save();
        res.status(201).json({ message: "Message Sent successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})


router.get('/messages', async (req, res) => {
    try {

        const messages = await MessageCollection.find();
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})



















/////////////////////////////////////file uploading routes////////////////////////////////////////////
router.post('/upload/profile', upload.single('profileImage'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded!' });
        }

        const profileUrl = `/uploads/${req.file.filename}`;

        let resume = await ResumeCollection.findOne();
        if (!resume) {
            resume = new ResumeCollection({ personalInfo: { profileUrl } });
        } else {
            resume.personalInfo.profileUrl = profileUrl;
        }

        await resume.save();

        res.status(200).json({ message: 'Profile image uploaded!', profileUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Profile upload failed!' });
    }
});




router.post('/upload/projectdetails', async (req, res) => {
    try {
        const newProject = req.body; // Project data from frontend


        const updatedResume = await ResumeCollection.findOneAndUpdate(
            {}, // Finds the first document (assuming only one exists)
            {
                $push: {
                    projects: {
                        name: newProject.projectName,
                        imageUrl: newProject.projectImg,
                        description: newProject.projectDescription,
                        url: newProject.projectUrl
                    }
                }
            },
            { new: true, upsert: true } // Return updated document, create if not exists
        );

        if (!updatedResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        res.json({ message: "Project added successfully", updatedResume });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});


// BY USING THE MIDDLEWARE 'MULTER' STORING THE IMAGES FROM REACT IN UPLOAD FOLDER IN BACKEND
router.post('/upload/image', upload.single('projectImage'), async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded!' });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ message: 'Project image uploaded!', imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Project upload failed!' });
    }
});

//// thsi is for resumeuploading file
router.post('/upload/file', upload.single('pdfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded!' });
        }
        const pdfURL = `/uploads/${req.file.filename}`;

        const newResume = await ResumeCollection.findOneAndUpdate(
            {},
            {
                $set: {
                    resumefile: {
                        name: req.file.filename,
                        pdflink: pdfURL,
                        pdfsize: req.file.size
                    }
                }
            },
            { new: true, upsert: true }
        )

        await newResume.save();
        res.status(200).json({ message: 'Resume Pdf uploaded!', newResume });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Resume uploading failed!' });
    }
});




///////////////////////////////////  ADD NEW SKILLS ///////////////////////

router.post("/addskills", async (req, res) => {
    const { skillName, InputValue } = req.body
    console.log(skillName, InputValue)

    // const resume = await ResumeCollection.findOne();
    // if (!resume) {
    //     return res.status(404).json({ message: "No resume found. Please add one first." });
    // }

    const updatedResume = await ResumeCollection.findOneAndUpdate({}, { $push: { [`skills.${skillName}`]: InputValue } }, { new: true });
    res.json({ message: "Skills Added successfully", updatedResume });
})







module.exports = router