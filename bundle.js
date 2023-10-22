const constanstans = {
  authorization: "",
  sessionToken: "",
  schoolName: "",
  unitsToComplete: [],
  userId: "",
  languageCode: "",
};

const authorization = data["authorization"];
const languageCode = data["languageCode"];
const userId = data["userId"];
const schoolName = data["schoolName"];
const sessionToken = data["sessionToken"];

async function getData() {
  const res = await fetch("https://graph.rosettastone.com/graphql", {
    credentials: "include",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "content-type": "application/json",
      authorization: authorization,
      "x-request-id": "66a4813c-8077-4509-9875-6c10608b9933",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
    },
    referrer: "https://totale.rosettastone.com/",
    body:
      '{"operationName":"GetCourseMenu","variables":{"languageCode":"' +
      languageCode +
      '","filter":"ALL","chunking":false,"includeMilestoneInLessonFour":true},"query":"query GetCourseMenu($languageCode: String!, $filter: String!, $includeMilestoneInLessonFour: Boolean!, $chunking: Boolean!) {\\n  courseMenu(\\n    languageCode: $languageCode\\n    includeMilestoneInLessonFour: $includeMilestoneInLessonFour\\n    chunking: $chunking\\n    filter: $filter\\n  ) {\\n    currentCourseId\\n    bookmarkToUseOnload {\\n      course\\n      bookmarkToUseOnload\\n      __typename\\n    }\\n    speechEnabledBookmark {\\n      course\\n      unitIndex\\n      lessonIndex\\n      pathType\\n      __typename\\n    }\\n    speechDisabledBookmark {\\n      course\\n      unitIndex\\n      lessonIndex\\n      pathType\\n      __typename\\n    }\\n    curriculumDefaults {\\n      course\\n      curriculumId\\n      resource\\n      __typename\\n    }\\n    viperDefinedCurricula {\\n      id\\n      course\\n      firstExerciseId\\n      exerciseCount\\n      nameByLocale {\\n        curriculumId\\n        locale\\n        curriculumNameLocalized\\n        __typename\\n      }\\n      descriptionByLocale {\\n        curriculumId\\n        locale\\n        curriculumDescriptionLocalized\\n        __typename\\n      }\\n      __typename\\n    }\\n    showCurriculumChooser {\\n      course\\n      showCurriculumChooser\\n      __typename\\n    }\\n    numberOfUnits\\n    units {\\n      id\\n      index\\n      unitNumber\\n      titleKey\\n      color\\n      colorDesaturated\\n      lessons {\\n        id\\n        index\\n        titleKey\\n        lessonNumber\\n        paths {\\n          unitIndex\\n          lessonIndex\\n          curriculumLessonIndex\\n          sectionIndex\\n          index\\n          type\\n          id\\n          course\\n          resource\\n          scoreThreshold\\n          timeEstimate\\n          numChallenges\\n          numberOfChallengesSeen\\n          complete\\n          scoreCorrect\\n          scoreIncorrect\\n          scoreSkipped\\n          percentCorrectForDisplay\\n          percentIncorrect\\n          percentSkipped\\n          percentComplete\\n          pathCourseMenuDisplayState\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  tutoringSummary {\\n    status\\n    canSchedule\\n    userTimezone\\n    nextSession {\\n      startTimeStamp\\n      lessonNumber\\n      unitNumber\\n      coachName\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
    method: "POST",
    mode: "cors",
  });
  const data = await res.json();
  return data;
}

async function makeRequest({
  course,
  unitIndex,
  lessonIndex,
  type,
  questionAmount,
  time,
  questionsCorrect,
  completed,
  timeCompleted,
}) {
  console.log(
    course,
    unitIndex,
    lessonIndex,
    type,
    questionAmount,
    time,
    questionsCorrect,
    completed
  );
  const body =
    "<path_score>\n    <course>" +
    course +
    "</course>\n    <unit_index>" +
    unitIndex +
    "</unit_index>\n    <lesson_index>" +
    lessonIndex +
    "</lesson_index>\n    <path_type>" +
    type +
    "</path_type>\n    <occurrence>1</occurrence>\n    <complete>" +
    completed +
    "</complete>\n    <score_correct>" +
    questionsCorrect +
    "</score_correct>\n    <score_incorrect>" +
    (questionAmount - questionsCorrect) +
    '</score_incorrect>\n    <score_skipped type="fmcp">0</score_skipped>\n    <number_of_challenges>' +
    questionAmount +
    "</number_of_challenges>\n    <delta_time>" +
    time +
    "</delta_time>\n    <version>185054</version>\n    <updated_at>" +
    timeCompleted +
    "</updated_at>\n    <is_lagged_review_path>false</is_lagged_review_path>\n</path_score>";

  const res = await fetch(
    "https://tracking.rosettastone.com/ee/ce/" +
      data["schoolName"] +
      "/users/" +
      data["userId"] +
      "/path_scores?course=" +
      course +
      "&unit_index=" +
      unitIndex +
      "&lesson_index=" +
      lessonIndex +
      "&path_type=" +
      type +
      "&occurrence=1&_method=put",
    {
      credentials: "omit",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "content-type": "text/xml",
        "x-rosettastone-app-version": "ZoomCourse/11.11.2",
        "x-rosettastone-protocol-version": "8",
        "x-rosettastone-session-token": data["sessionToken"],
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
      },
      referrer: "https://totale.rosettastone.com/",
      body: body,
      method: "POST",
      mode: "cors",
    }
  );
  console.log(`Status ${res.status} (200 means success)`);
}

async function main() {
  const originalData = await getData();
  const data = JSON.parse(JSON.stringify(originalData)).data;
  // console.log("Data received");
  console.log(originalData);
  const units = data.courseMenu.units.filter((unit) =>
    constants["unitsToComplete"].includes(unit.unitNumber)
  );

  units.forEach((unit) => {
    unit.lessons.forEach((category) => {
      category.paths.forEach(
        ({
          unitIndex,
          curriculumLessonIndex,
          type,
          course,
          numChallenges,
          timeEstimate,
        }) => {
          const timeInMinutes =
            timeEstimate +
            getRndInteger(
              -1 * Math.floor(timeEstimate / 3),
              Math.floor(timeEstimate / 3)
            );
          const timeInMilliseconds =
            timeInMinutes * 60000 + getRndInteger(0, 6000);
          // const percentCorrect = getRndInteger(87, 100);
          const percentCorrect = 100;
          const questionsCorrect = Math.ceil(
            numChallenges * (percentCorrect / 100)
          );
          const completed = !!(questionsCorrect == numChallenges) + "";
          const timeCompleted = Date.now() - getRndInteger(0, 86400000);
          makeRequest({
            course,
            lessonIndex: curriculumLessonIndex,
            questionAmount: numChallenges,
            questionsCorrect,
            unitIndex: unitIndex % 4,
            time: timeInMilliseconds,
            type,
            completed,
            timeCompleted,
          });
        }
      );
    });
  });
  console.log("Finished (wait for requests)!!");
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
main();
