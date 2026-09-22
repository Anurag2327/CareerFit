const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestions: z.array(z.object(
        {
            question: z.string().describe("The technical question can be asked in the interview"),
            intention: z.string().describe("The intention of interviewer behind asking this questions"),
            answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
        }
    )).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object(
        {
            question: z.string().describe("The technical question can be asked in the interview"),
            intention: z.string().describe("The intention of interviewer behind asking this question"),
            answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
        }
    )).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object(
        {
            skill: z.string().describe("The skill which the candidate is lacking"),
            severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
        }
    )).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object(
        {
            day: z.number().describe("The day number in the preparation plan, starting from 1"),
            focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
            tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
        }
    )).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = ` 
                    You are an expert technical interviewer.

                    Based on the candidate resume, self description and job description,
                    generate an interview preparation report.

                    RESUME:
                    ${resume}

                    SELF DESCRIPTION:
                    ${selfDescription}

                    JOB DESCRIPTION: 
                    ${jobDescription}

                    Return ONLY valid JSON.

                    The JSON MUST contain exactly these fields:

                    {
                        "matchScore": 85,
                        "technicalQuestions": [
                            {
                                "question": "string",
                                "intention": "string",
                                "answer": "string"
                            }
                        ],
                    
                        "behavioralQuestions": [
                            {
                                "question": "string",
                                "intention": "string",
                                "answer": "string"
                            }
                        ],
                        
                        "skillGaps": [
                            {    
                                "skill": "string",
                                "severity": "low"
                            }
                        ],
                        
                        "preparationPlan": [
                            {
                                "day": 1,
                                "focus": "string",
                                "tasks": ["string"]
                            }
                        ]
                    }`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const result = JSON.parse(response.text);

    const validatedResult = interviewReportSchema.parse(result);

    return validatedResult;
}

async function generatePdfFormatHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0"})

    const pdfBuffer = await page.pdf({ format: "A4", margin:{ top: "20mm", bottom:"20", left:"15mm", right:"15mm"}})

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({resume, selfDescription, jobDescription}) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate a resume for a condidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        The response should be a JSON object with a single field "html" which 
                        contains the HTML content of the resume which can be converted to PDF 
                        using any library like puppeteer

                        The resume should be tailored for the given job description and should 
                        highlight the condidate's strengths and relevent experience. The HTML 
                        content should be well-formatted and structured, making it easy to read
                        and visibile appearing.

                        The content of resume should not sound like it's generated by AI and should
                        be as close as possible to a real human-written resume.

                        You can highlight the content using some colors or different font styles but
                        the overall design should be simple and professional.

                        The content should be ATS friendly, i.e it should be easily parasable by ATS system

                        The HTML should not be so lengthy, it should ideally be 1-2 pages  long when converted
                        to PDF, focus on quality rather than quantity and make sure to include all the relevent
                        information that can increase the candidate's chances of getting an interview call for the
                        given job description.
                  `

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const jsonContent = JSON.parse(response.text);

    const pdfBuffer = await generatePdfFormatHtml(jsonContent.html)

    return pdfBuffer;
    
}

module.exports = { generateInterviewReport, generateResumePdf };