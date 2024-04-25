// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  


function getAssignInfo(assignmentGroup, id, subDate)
{
    let date;
    let pointsPossible;
    const assignments = assignmentGroup.assignments
    for (let assignment of assignments)
    {
        if (assignment.id == id)
        {
            date            = assignment.due_at
            pointsPossible  = assignment.points_possible
        } 
    }
    const dueDate       = new Date(date);
    const currentDate   = new Date();
    const submitDate    = new Date(subDate)
    const notDue        = currentDate < dueDate
    const late          = submitDate > dueDate
    return [pointsPossible, notDue, late] ; 
}

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions)
{
    const learnerAssignments = {}

    for(let submission of learnerSubmissions)
    {
        let learnerID       = submission.learner_id
        let assignID        = submission.assignment_id
        let submissionDate  = submission.submission.submitted_at
        let score           = submission.submission.score
        let assignmentInfo  = getAssignInfo(assignmentGroup, assignID, submissionDate)
        let pointsPossible  = assignmentInfo[0]
        let notDue          = assignmentInfo[1]
        let isLate          = assignmentInfo[2]
        if (isLate) score -= 15
        
        if (notDue) continue
        
        if(learnerAssignments[learnerID])
        {
            learnerAssignments[learnerID].push([assignID, score, pointsPossible])
        }
        else
        {
            learnerAssignments[learnerID] = [[assignID, score, pointsPossible]]
        }     
    }
    
    const gradebook = []
    for(learner in learnerAssignments)
    {
        const student           = {}
        let allPointsScored     = 0
        let allPointsPossible   = 0
        student.id              = Number(learner)
        student.avg             = 0 
        let grades = learnerAssignments[learner]
        for(let grade of grades)
        {
            let assignmentID    = grade[0]
            let pointsScored    = grade[1]
            let pointsPossible  = grade[2]
            allPointsScored    += pointsScored
            allPointsPossible  += pointsPossible 
            percentageScore     = (pointsScored / pointsPossible).toFixed(3)
            percentageScore     = Number(percentageScore)
            student[Number(assignmentID)] = percentageScore
        }
        let average = Number((allPointsScored / allPointsPossible).toFixed(3))
        student.avg = average
        gradebook.push(student)
    }

    return gradebook
    
}


const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
console.log(result);