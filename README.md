# SanaE-commerce

This project is a React-based e-commerce application using Vite for fast development and build processes.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/SanaE-commerce.git
    cd SanaE-commerce
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

### Running the Project

1. **Start the development server:**

    ```sh
    npm run dev
    ```

    This will start the Vite development server and you can view the application by navigating to `http://localhost:3000` in your web browser.

### Building the Project

To create a production build of the project, run:

```sh
npm run build
 ```

### Basic Functionality of the Store

Upon launching the project, the home page ('/') will load a list of all products without filtering by categories. This list is paginated with a maximum of 9 products per page.
Clicking on any of the categories will filter the content, displaying only the products belonging to that specific category.
By default, no user is logged in. Clicking on "Sign In" will simulate a user login.
Products can be added to the shopping cart by default, but placing an order will not be allowed unless a user is logged in.
The images of the products on their left side allow opening a window with the product details.
The button located above each image allows adding the product to the cart.
Below each product image, you'll find a list of tags or labels indicating the categories to which the product belongs.