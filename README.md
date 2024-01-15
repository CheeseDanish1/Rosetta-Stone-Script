# Rosetta Stone Lesson Finisher

This is a Node.js program designed to automatically complete lessons on the Rosetta Stone platform using network requests. It's useful for users who want to quickly finish lessons in a structured way, especially in an educational context. Please note that this program requires certain constants, such as authorization and session tokens, to work correctly. These tokens can be obtained through network requests when logging into the Rosetta Stone platform. Additionally, this can be run in browser as it uses no dependencies.

If you need assistance obtaining the required tokens, you can contact the program's author me on GitHub.

## Configuration

To configure the program, open the constants.json file and set the following constants:

```json
{
  "person": "YOUR_NAME (Not Required)",
  "authorization": "YOUR_AUTHORIZATION_TOKEN",
  "sessionToken": "YOUR_SESSION_TOKEN",
  "schoolName": "YOUR_SCHOOL_NAME",
  "unitsToComplete": [1, 2, 3], // Replace with the unit numbers you want to complete
  "userId": "YOUR_USER_ID",
  "languageCode": "YOUR_LANGUAGE_CODE" // E.g., "HEB" for Hebrew, "FRA" for French, etc.
}
```

Make sure to replace "YOUR_AUTHORIZATION_TOKEN", "YOUR_SESSION_TOKEN", "YOUR_SCHOOL_NAME", "YOUR_USER_ID", and "YOUR_LANGUAGE_CODE" with your actual Rosetta Stone credentials

The Authorization Token, Session Token, and User Id can be taken from the network request when the main page loads. Look for a file titled graphql

## Usage

TO BEGIN
Make sure to install nodejs from here https://nodejs.org.

### Download files
This is a video showing how to download the files from github and open the ones you need in a text editor

https://github.com/CheeseDanish1/Rosetta-Stone-Hack/assets/65871181/ac35f1b7-2daa-498f-8a59-e7fbe4147024

### Filling Constants.json

https://github.com/CheeseDanish1/Rosetta-Stone-Hack/assets/65871181/1d907c8f-5430-4b70-8fcd-947d35ab44db


### Percent Correct (OPTIONAL)
By default, the program randomly does between 89% to 100% correct. If you want to change it follow this video

https://github.com/CheeseDanish1/Rosetta-Stone-Hack/assets/65871181/cc817b15-a809-4171-9f12-6b555ca86ef2

### Running program
This video shows you how to run the program

https://github.com/CheeseDanish1/Rosetta-Stone-Hack/assets/65871181/9e44b644-60a0-4507-a24b-fc96086f7edd


If anyone has further questions watch the videos and then if they persist open an issue. All explanations used firefox.

## Program Files

- index.js: The main program file that orchestrates the lesson completion process.
- getData.js: This file retrieves necessary data from the Rosetta Stone platform using network requests.
- makeRequest.js: Handles making network requests to mark lessons as completed.

## Disclaimer

Use this program responsibly and in accordance with Rosetta Stone's terms and conditions. Automated completion of lessons may violate their policies. The I take no responsibility for any misuse or consequences that may arise from using this software.

