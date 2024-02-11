# ORM-BACKEND

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## User Story
```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Description:
The application prompts the user to select a color and shape, providing text for the logo, and saves the generated SVG to a `logo.svg` file which contains the results of the users input. 

## Table of Contents:

- [License](#License)
- [User Story](#User-Story)
- [Description](#Description)
- [Acceptance Criteria](#Acceptance-Criteria)
- [Screenshots](#Screenshots)
- [Demonstration](#Demonstration)
- [Installation](#Installation)
- [Author](#Author)
- [Acknowledgments](#Acknowledgments)


## Acceptance Criteria
```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

## Screenshots:

### Initiate Test
![Screenshot](./media/Screenshot1.png)
### Successful Input for Logo
![Screenshot](./media/Sceenshot2.png)
### Newly Designed Logo
![Screenshot](./media/logo.svg)

## Demonstration: 

![SVG Logo Generator](./media/Usage.gif)


## Installation:
```md
1. Open the cloned repository in any source code editor e.g. Visual Studio Code.
2. Open integrated terminal on index.js within VS Code.
3. Input “node index.js” in the command line
4. Within the command line interface - the user will be prompted with a series of questions - the user will provide a response to each question and proceed.
5. Once completed a SVG file named "logo.svg" will be created.
6. At any point, the user may rename the "logo.svg" file to the file name of their choice.
7. (Optional) Regarding future use, you may alter the text of the questions within the index.js to best suit their needs.
8. (Optional) The SVG Logo Maker serves as a basic template that doesnt limit any alterations to the files in order to create the best possible "logo.svg" file.
```

## Author

Follow me on Github at [Utero93](https://github.com/Utero93) Additional questions or concerns? feel free to contact me at angel.m.gonzalez193@gmail.com. 
