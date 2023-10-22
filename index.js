const getData = require("./getData.js");
const constants = require("./constants.json");
const makeRequest = require("./makeRequest.js");

async function main() {
  const originalData = await getData();
  const data = JSON.parse(JSON.stringify(originalData)).data;
  console.log("Data received");
  console.log(originalData);
  const units = data.courseMenu.units.filter((unit) =>
    constants["unitsToComplete"].includes(unit.unitNumber)
  );

  units.forEach((unit) => {
    // Start Time should reset for each unit
    const startTime = Date.now() - getRndInteger(0, 86400000);
    let timeSoFar = 0;

    // Loop through each lesson
    unit.lessons.forEach((category) => {
      // Loop through each category
      category.paths.forEach(
        ({
          unitIndex,
          curriculumLessonIndex,
          type,
          course,
          numChallenges,
          timeEstimate,
        }) => {
          // This is the lesson portion

          // Randomize the time it took to complete lesson based off given estimate
          const timeInMinutes =
            timeEstimate +
            getRndInteger(
              -1 * Math.floor(timeEstimate / 3),
              Math.floor(timeEstimate / 3)
            );

          // Convert that time to milliseconds
          const timeInMilliseconds =
            timeInMinutes * 60000 + getRndInteger(0, 6000);

          // For randomizing how much is correct
          // const percentCorrect = getRndInteger(87, 100);

          // Keep track of what time it was submitted
          timeSoFar += timeInMilliseconds;
          // Randomize a little bit
          timeSoFar += getRndInteger(0, 60000);

          // Choose what percent correct is done
          // Use the randomize function for a range (e.g. getRndInteger(87, 100))
          const percentCorrect = getRndInteger(89, 100);
          // const percentCorrect = 100;

          const questionsCorrect = Math.ceil(
            numChallenges * (percentCorrect / 100)
          );

          // Check if lesson has been completed
          // Can't do if (percentCorrect == 100) because of rounding
          const completed = !!(questionsCorrect == numChallenges) + "";

          // The time the lesson will be marked as completed
          // Will reset for each unit
          let timeCompleted = startTime + timeSoFar;

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
