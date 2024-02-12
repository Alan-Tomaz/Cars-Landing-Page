# NightDrive

## A vehicle buying and selling website created with React JS.

![Hero Section](https://i.imgur.com/zJSD5qo.png)

The nightdrive website is a vehicle buying and selling website focusing on cars, motorcycles and customized vehicles in general.

The site was created using **[React](https://react.dev)**, and some of the **[Firebase](https://console.firebase.google.com)** services, such as its storage server and the Firestore database. The website was also hosted on the Firebase hosting server and can be accessed at this link: **[NightDrive](https://nightdrive.web.app)**.

## Functionalities

The site allows you to:

- Learn about the company's history, its vision, values, mission and its services.
- Get to know the company's contact methods and allow you to get in touch using a contact form.
- See the list of vehicles for sale, in addition to being able to filter vehicles by price, name, manufacturer, user rating or type (car, motorcycle, or customized vehicle).
- See detailed vehicle information such as price, model, manufacturer, more detailed technical information such as year of release, type of drive or simply a short or long description.

![Vehicle Slider](https://i.imgur.com/r9bjPmj.png)

## Pages

### Home

![Home Page](https://i.imgur.com/M3YXWHW.png)

### About

![About Page](https://i.imgur.com/b0c20ai.png)

### Contact Us

![Contact Us Page](https://i.imgur.com/Phjxde0.png)

### Products 

![Products Page](https://i.imgur.com/ydod7Jk.png)

### Product Info

![Product Page](https://i.imgur.com/FWm6r6m.png)

#### Car Details:

![Product Page](https://i.imgur.com/Bl7J3If.png)

Motorcycles Details: 

![Product Page](https://i.imgur.com/VVVOl60.png)

## Completely responsive

The website can run on both high-resolution devices like computers and medium and small resolution devices like tablets and smartphones

### Medium Devices

![Medium Device](https://i.imgur.com/7kDC68x.png)

### Small Devices

![Small Device](https://i.imgur.com/FzmWsDw.png)

## Development Details

The following libraries were used to develop the website:

- [Axios](https://www.npmjs.com/package/react-axios) (HTTP Requests);
- [Toastify](https://www.npmjs.com/package/react-toastify) (Notifications)
- [Swiper](https://swiperjs.com/react) (Sliders)
- [React Router Dom](https://reactrouter.com/en/main) (Navigation)
- [React Icons](https://react-icons.github.io/react-icons/) (Styling)
- [Firebase](https://console.firebase.google.com) (Firebase Use)
- [React Number Format](https://www.npmjs.com/package/react-number-format) (Number Formatting)
- [React Star Ratings](https://www.npmjs.com/package/react-star-ratings) (Formatting of User Ratings Stars)
- [EmailJS](https://www.emailjs.com) (Send Emails)

To obtain vehicle details, the car API and the motorcycle API from the **[API Ninjas](https://api-ninjas.com)** website were used.

The Firestore database was used to store basic vehicle information such as name, model, associated images and tags. The images relating to the vehicles were saved on the Storage server.

## Usage Requirements

For full use and to avoid errors, some data must be filled in the project scripts:

- ContactUs.jsx: Your key and the IDs needed to send forms from the EmailJs library.

- Firebase.js: The firebaseConfig object must be filled with your Firebase project data.

- Axios.js: Your car and motorcycle API key from the API Ninjas website.