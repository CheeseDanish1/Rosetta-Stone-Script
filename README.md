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

To run the program and automatically complete lessons, use the following command:

```bash
node index.js
```

The program will start working and simulate lesson completions. Please be patient and wait for it to finish its requests. It should only take a few moments.

## Program Files

- index.js: The main program file that orchestrates the lesson completion process.
- getData.js: This file retrieves necessary data from the Rosetta Stone platform using network requests.
- makeRequest.js: Handles making network requests to mark lessons as completed.

## Disclaimer

Use this program responsibly and in accordance with Rosetta Stone's terms and conditions. Automated completion of lessons may violate their policies. The I take no responsibility for any misuse or consequences that may arise from using this software.
