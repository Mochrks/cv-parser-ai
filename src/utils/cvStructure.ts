export const CV_STRUCTURE = `{
  "employee": {
    "name": "Your Name",
    "position": "Your Position",
    "email": "Your Email",
    "phone": "Your Phone",
    "image": "Image URL",
    "biodata": {
      "profile": "Your profile description",
      "objective": "Your objectives or skills",
      "placeOfBirth": "Place of Birth",
      "dateOfBirth": "YYYY-MM-DD",
      "gender": "Male/Female"
    }
  },
  "histories": {
    "employment": [
      {
        "employer": "Employer Name",
        "position": "Position",
        "from": "Start Year",
        "to": "End Year or Present"
      }
    ],
    "certification": [
      {
        "title": "Certification Title",
        "provider": "Provider",
        "date": "Completion Date",
        "duration": "Duration",
        "certificate": "Yes/No"
      }
    ],
    "education": [
      {
        "school": "School Name",
        "degree": "Degree",
        "subject": "Subject",
        "from": "Start Year",
        "to": "End Year",
        "GPA": "GPA (optional)"
      }
    ],
    "project": [
      {
        "projectName": "Project Name",
        "role": "Your Role",
        "from": "Start Date",
        "to": "End Date or Present",
        "customer": "Customer",
        "projectDescription": "Brief description of the project",
        "technicalInformation": "Technical info or tools used",
        "jobDescription": "Your responsibilities in the project"
      }
    ]
  }
}`;

export const CV_STRUCTURE_INSTRUCTIONS = `
You are a CV parser that converts CV content into JSON format. 
Always return the JSON in this exact structure:
${CV_STRUCTURE}
Ensure all data is properly categorized and formatted according to this structure.
If any information is not available in the CV, use "-" for string values 
and empty arrays [] for array values. For date fields, use "YYYY" format for years 
and "YYYY-MM-DD" for full dates. If a date is ongoing or current, use "Present".
For the "gender" field, use either "Male", "Female", or "-".
For the "certificate" field in certifications, use either "Yes", "No", or "-".
The "GPA" field in education is optional; if -, use "-".
Ensure that all array fields (employment, certification, education, project) 
are always present, even if empty.
`;