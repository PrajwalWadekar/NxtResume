import resumeModel from "../models/resumeModel.js";

export const createResume = async (req,res) => {
    try {
        const {title} = req.body;

        //Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await resumeModel.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })

        res.status(201).json(newResume);
    } catch (error) {
        res.status(500).json({
            success:false,
            messgae:"Failed to create resume",
            error:error.message
        })
    }
    
}

//GET Funciton

export const getUserResume = async (req,res) =>{
    try {
        const resumes = await resumeModel.find({userId:req.user._id}).sort({
            updatedAt:-1
        });

        res.json(resumes);
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Failed to get resumes",
            error:error.message
        })
    }
}


//get resume by id

export const getResumeById = async (req,res)=>{ 
    try {
        const resume = await resumeModel.findOne({_id:req.params.id, userId:req.user._id})
        
        if(!resume){
            return res.status(404).json({
                success:false,
                message:"Resume not found"
            })
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Failed to get resume",
            error:error.message
        })
    }
}


