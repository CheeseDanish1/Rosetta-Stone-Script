const data = require("./constants.json");

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
  console.log(`Time: ${Date().toLocaleString()}`);
}

module.exports = makeRequest;
