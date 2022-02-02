# Dispatch UI
## About this repository
This repository contains the Dispatch UI that allows users to create and manage emergencies in the [Dispatch Service](https://github.com/animo/binnen-bereik-service).

## Installing the project
In order to install the project, run `yarn` or `npm install`.

## Running the project
Before we can run the project, we need to do some configuration. First we need to set the Google Maps API Key. Information on how to acquire this key can be found here: https://developers.google.com/maps/documentation/javascript/get-api-key. Once you have the key, you'll need to provide it in the `.env` file. Don't forget to rename the `.env.template` file to `.env`!

With the configuration out of the way, you can now start the Dispatch UI by running `yarn start` or `npm run start`.