const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number(),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    )
});

function cleanJsonResponse(text) {
    let cleanText = text.trim();

    if (cleanText.startsWith("```json")) {
        cleanText = cleanText
            .replace(/^```json\s*/, "")
            .replace(/\s*```$/, "");
    } else if (cleanText.startsWith("```")) {
        cleanText = cleanText
            .replace(/^```\s*/, "")
            .replace(/\s*```$/, "");
    }

    return JSON.parse(cleanText);
}

async function generateWithRetry(prompt, retries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(
                `Gemini API request: attempt ${attempt}/${retries}`
            );

            const response = await ai.models.generateContent({
                model: "gemini-3.5-flash-lite",
                contents: prompt
            });

            console.log("Gemini API request successful");

            return response;
        } catch (error) {
            lastError = error;

            const errorMessage = error?.message || "";

            const isTemporaryError =
                errorMessage.includes("503") ||
                errorMessage.includes("UNAVAILABLE") ||
                errorMessage.includes("high demand");

            if (!isTemporaryError) {
                throw error;
            }

            if (attempt < retries) {
                const delay = 2000 * Math.pow(2, attempt - 1);

                console.log(
                    `Retrying Gemini API in ${delay / 1000} seconds...`
                );

                await new Promise(resolve =>
                    setTimeout(resolve, delay)
                );
            }
        }
    }

    throw lastError;
}

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {
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

Do not use markdown.
Do not wrap the JSON inside a code block.

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
}
`;

    const response = await generateWithRetry(prompt);

    const result = cleanJsonResponse(response.text);

    const validatedResult = interviewReportSchema.parse(result);

    return validatedResult;
}

async function generatePdfFormatHtml(htmlContent) {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm"
            }
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription
}) {
    const resumePdfSchema = z.object({
        html: z.string()
    });

    const prompt = `
Generate a resume for a candidate with the following details:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

The response must be a JSON object with a single field "html"
which contains the HTML content of the resume.

Do not use markdown.
Do not wrap the JSON inside a code block.

The resume should be tailored for the given job description and should
highlight the candidate's strengths and relevant experience.

The content of the resume should not sound AI-generated and should be
as close as possible to a real human-written resume.

You can use colors or different font styles, but the overall design
should be simple and professional.

The content should be ATS friendly and easily parsable by ATS systems.

The HTML should ideally produce a 1-2 page resume when converted to PDF.

Focus on quality rather than quantity and include relevant information
that can increase the candidate's chances of getting an interview call.
`;

    const response = await generateWithRetry(prompt);

    const jsonContent = cleanJsonResponse(response.text);

    const validatedResume = resumePdfSchema.parse(jsonContent);

    const pdfBuffer = await generatePdfFormatHtml(
        validatedResume.html
    );

    return pdfBuffer;
}

module.exports = {
    generateInterviewReport,
    generateResumePdf
};