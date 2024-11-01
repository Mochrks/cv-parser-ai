
export const CV_STRUCTURE = `{
  "employee": {
    "name": "Full Name",
    "position": "Current or Desired Position",
    "email": "Email Address",
    "phone": "Phone Number",
    "linkedin": "LinkedIn Profile URL"
  },
  "skills": [
    "Skill Category: Specific Skills"
  ],
  "employment": [
    {
      "company": "Company Name",
      "location": "Company Location",
      "summary": "Brief company description",
      "skills": "Skills used at the job",
      "positions": [
        {
          "title": "Position Title",
          "duration": "Start Date - End Date",
          "details": [
            {
              "projectTitle": "Project Title",
              "bullets": [
                "Description of work",
                "Achievement details"
              ]
            }
          ]
        }
      ]
    }
  ],
  "education": [
    {
      "school": "School Name",
      "degree": "Degree Name",
      "duration": "Start Year - End Year"
    }
  ],
  "certifications": [
    "Certification Title (Year)"
  ]
}`;

export const CV_STRUCTURE_INSTRUCTIONS = `
You are a CV parser that converts CV content into JSON format. 
Always return the JSON in this exact structure:
${CV_STRUCTURE}
Ensure all data is properly categorized and formatted according to this structure.
If any information is not available in the CV, use "Not provided" for string values 
and empty arrays [] for array values.
`;