const data = require("./constants.json");

const authorization = data["authorization"];
const languageCode = data["languageCode"];

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

module.exports = getData;
