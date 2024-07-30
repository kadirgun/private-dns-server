<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="src/assets/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Private DNS Server</h3>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][product-screenshot]

A desktop application that creates a DNS server on the local machine. Through the application, DNS records can be added, and the server responds to queries for those DNS records. If the DNS record is not found in the local records, it falls back to using a user-defined DoH (DNS over HTTPS) query.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

App is built with the electron-forge framework and uses the following technologies:

- [![React][React.js]][React-url]
- [![Electron][Electron.js]][Electron-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  yarn global add @electron-forge/cli
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kadirgun/private-dns-server
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Start the app
   ```sh
    yarn start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Electron.js]: https://img.shields.io/badge/Electron-1b1c26?style=for-the-badge&logo=electron&logoColor=47848F
[Electron-url]: https://www.electronjs.org/
