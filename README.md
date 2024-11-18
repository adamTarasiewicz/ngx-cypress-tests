### Ngx-Admin Angular 8 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Cypress.

The original repo is here: https://github.com/akveo/ngx-admin







# Cypress Learning Project

This project is designed for learning and practicing Cypress, a powerful tool for automated testing of web applications. Tests written by me are inside `cypress/e2e` folder.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Ensure you have Node.js installed on your machine as Cypress requires it. You can download it from [Node.js website](https://nodejs.org/).

### Installation

1. Clone the repository to your local machine.

    ```bash
    git clone [URL of the repository]
    ```

2. Navigate to the project directory.

    ```bash
    cd [project-directory]
    ```

3. Install the necessary packages using npm.

    ```bash
    npm install --force
    ```

### 1. Running the Application

To start the server along with the app, enter the following command in your terminal:

    npm start

This should launch the server hosting your application. Go to http://localhost:4200/ with browser of your choice

### 2. Running Cypress Tests

After starting your application, open second terminal and you can run Cypress tests with the following command:


    npx cypress open
