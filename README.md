# Project Set up

## Requirement
To set up this project, ensure the following is installed on your system:
1. **Docker**: Required for containerization.

## Installation
Follow these steps to clone and run the project:

  1. **Clone the Repository**
    
     Clone this repository to your local machine or server using the following command:
     ```bash
     git clone <repository-url>
     ```
  4. **Navigate to the Project Directory**
     
     Open a terminal or command prompt and navigate to the directory where the repository is located:
     ```bash
     cd <repository-directory>
     ```
  5. **Build the Docker Containers**
     
     Run the following command to build the containers:
     ```bash
     docker compose build
     ```
  4. **Start the Docker Containers**
     
     After building, start the containers with this command:
     ```bash
     docker compose up
     ```
  6. **Service Port**
     
     The following services will be available on these ports:
     - Database: Mapped to ```localhost:5432```
     - Backend: Mapped to ```localhost:3001```
     - Frontend: Mapped to ```localhost:3000```
