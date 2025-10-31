// msw/db/assessments.js OR data/assessmentsService.js

export const assessments = [
  {
    id: "1",
    jobId: "job-1",
    sections: [
      {
        id: "section-1",
        title: "Front-End Skills",
        description: "Key frontend technical screening",
        questions: [
          {
            id: "q1",
            type: "single-choice",
            text: "Are you familiar with React?",
            required: true,
            options: [
              { id: "opt-yes", text: "Yes" },
              { id: "opt-no", text: "No" }
            ]
          },
          {
            id: "q2",
            type: "short-text",
            text: "How many years of React experience?",
            required: true,
            validation: { maxLength: 40 },
            conditional: {
              questionId: "q1",
              expectedValue: "Yes"
            }
          },
          {
            id: "q3",
            type: "multi-choice",
            text: "Which CSS tools have you used?",
            required: true,
            options: [
              { id: "opt-tw", text: "Tailwind" },
              { id: "opt-sass", text: "SASS" },
              { id: "opt-sc", text: "Styled Components" },
              { id: "opt-bs", text: "Bootstrap" }
            ]
          },
          {
            id: "q4",
            type: "numeric",
            text: "How many years of experience do you have?",
            required: true,
            validation: { min: 0, max: 30 }
          },
          {
            id: "q5",
            type: "long-text",
            text: "Describe your most challenging React project.",
            required: false,
            validation: { maxLength: 500 }
          },
          {
            id: "q6",
            type: "file-upload",
            text: "Attach your portfolio (PDF).",
            required: false
          }
        ]
      }
    ]
  },
  {
    id: "2",
    jobId: "job-2",
    sections: [
      {
        id: "section-2",
        title: "Back-End Skills",
        description: "Backend technical knowledge check",
        questions: [
          {
            id: "q1",
            type: "single-choice",
            text: "Primary backend language?",
            required: true,
            options: [
              { id: "opt-node", text: "Node.js" },
              { id: "opt-py", text: "Python" },
              { id: "opt-go", text: "Go" },
              { id: "opt-other", text: "Other" }
            ]
          },
          {
            id: "q2",
            type: "short-text",
            text: "Favorite database?",
            required: true,
            validation: { maxLength: 30 },
            conditional: {
              questionId: "q1",
              expectedValue: "Node.js"
            }
          },
          {
            id: "q3",
            type: "numeric",
            text: "Years with SQL?",
            required: false,
            validation: { min: 0, max: 25 }
          }
        ]
      }
    ]
  },
  {
    id: "3",
    jobId: "job-3",
    sections: [
      {
        id: "section-3",
        title: "Managerial & Product",
        description: "Experience and skills as PM",
        questions: [
          {
            id: "q1",
            type: "multi-choice",
            text: "Select all domains you've worked in.",
            required: true,
            options: [
              { id: "opt-b2b", text: "B2B" },
              { id: "opt-b2c", text: "B2C" },
              { id: "opt-fin", text: "Fintech" },
              { id: "opt-ed", text: "Edtech" }
            ]
          },
          {
            id: "q2",
            type: "single-choice",
            text: "Have you worked in Fintech?",
            required: false,
            options: [
              { id: "opt-yes", text: "Yes" },
              { id: "opt-no", text: "No" }
            ],
            conditional: {
              questionId: "q1",
              expectedValue: "Fintech"
            }
          },
          {
            id: "q3",
            type: "long-text",
            text: "Describe your Fintech experience.",
            required: true,
            validation: { maxLength: 400 },
            conditional: {
              questionId: "q2",
              expectedValue: "Yes"
            }
          }
        ]
      }
    ]
  }
];
