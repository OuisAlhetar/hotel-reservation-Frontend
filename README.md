# Hotel Reservation System 🏨

A modern and efficient hotel reservation system built with Vue.js, TailwindCSS, and Laravel. This full-stack application provides a seamless booking experience with a beautiful, responsive interface.

## 🌟 Features

- **Modern UI/UX**: Built with Vue.js and TailwindCSS for a responsive design
- **Real-time Updates**: Dynamic content updates without page refresh
- **Secure Authentication**: Laravel Sanctum for API authentication
- **Interactive Booking System**: Real-time availability checking
- **Admin Dashboard**: Comprehensive management interface
- **Automated Notifications**: Email notifications for bookings
- **Responsive Design**: Mobile-first approach using TailwindCSS

## 🚀 Getting Started

### Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16+ and npm
- MySQL Database

### Installation

1. Clone the repository

```bash
git clone https://github.com/OuisAlhetar/hotel-reservation.git
cd hotel-reservation
```

2. Install PHP dependencies

```bash
composer install
```

3. Install NPM packages

```bash
npm install
```

4. Set up environment file

```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env` file

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run migrations

```bash
php artisan migrate
```

7. Start the development server

```bash
# Terminal 1 - Laravel Backend
php artisan serve

# Terminal 2 - Vue Frontend
npm run dev
```

## 🛠️ Technology Stack

### Frontend

- **Vue.js 3**: Progressive JavaScript Framework
- **TailwindCSS**: Utility-first CSS Framework
- **Vite**: Next Generation Frontend Tooling
- **Vue Router**: Official Router for Vue.js

### Backend

- **Laravel 10**: PHP Web Application Framework
- **MySQL**: Database Management
- **Laravel Sanctum**: API Authentication
- **Laravel Mail**: Email Services

## 📱 Features Overview

### For Guests

- Intuitive room browsing interface
- Real-time availability checking
- Secure booking process
- Interactive calendar for date selection
- Booking management dashboard
- Email notifications

### For Administrators

- Comprehensive admin dashboard
- Real-time booking management
- Room inventory control
- Dynamic pricing management
- Booking statistics and reports
- User management system

## 🔒 Security

- Laravel Sanctum authentication
- CSRF protection
- XSS prevention
- Input validation
- Secure password hashing
- Rate limiting

## 📊 Project Structure

```
hotel-reservation/
├── app/
│   ├── Http/
│   ├── Models/
│   └── Services/
├── resources/
│   ├── js/
│   │   ├── components/
│   │   ├── pages/
│   │   └── stores/
│   └── views/
├── routes/
├── database/
└── tests/
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- [@OuisAlhetar](https://github.com/OuisAlhetar)
- [@OuisAlhetar](https://x.com/ouis_alhetar?s=35)

## 🙏 Acknowledgments

- Vue.js Team for the amazing framework
- Laravel Team for the robust backend framework
- TailwindCSS Team for the utility-first CSS framework
- All contributors who help improve this project

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Last updated: December 12, 2024
