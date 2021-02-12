# KOALA HOLLA

## Description

_Duration: 2 days sprint_

Koala Holla (1976 Llama Comma Drive, Walla Walla WA) is a non-profit dedicated to the ethical transitioning of koalas from the outdoors (whereupon they may be rained) to urban areas where roofs exist.

This web app allows volunteers to view information about the Koalas currently under Koala Holla protection as well as add incoming Koalas and update the Transfer status.

## Installation

Heres are the installations needed to run a test file of this web app. Once deployed, all functions should be built into the website.

1. Create a database named `koala_holla`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Open up your editor of choice and run an `npm install`
4. Run `npm start` in your terminal

## Usage

Heres how to use this web app:

1. To add a Koala to the data base, add their info to the input fields. NOTE: All fields are required except for notes.
2. Clicking the 'Add Koala' button will submit the koala to the database.
3. Review the list of Koalas to see who is Ready for Transfer and any notes on the individual koalas.
4. Once a koala is ready for transfer, click the 'Ready' button to stage them for transfer.
5. If a koala needs to be removed from the database, click the 'Delete' button at the end of their entry. Be careful as this this is irreversible!

## Built With

- JQuery
- Node
- Express
- SQL

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support

If you have suggestions or issues, please email Koala Holla at [koala.support@koalaholla.org](www.google.com)
