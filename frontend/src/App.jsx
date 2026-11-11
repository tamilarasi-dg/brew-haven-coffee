
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const coffeeImages = {
    Cappuccino: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600',
    Espresso: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600',
    Latte: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600'
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/coffees')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load coffee menu');
        }
        return response.json();
      })
      .then(data => {
        setCoffees(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="website">

      <nav className="navbar">
        <h2 className="logo">☕ Brew Haven</h2>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#menu" className="nav-button">Order Now</a>
      </nav>

      <section className="hero" id="home">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/coffeevideo.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="tagline">WELCOME TO BREW HAVEN</p>
          <h1>Start Your Day<br />With Fresh Coffee</h1>
          <p className="hero-description">
            Discover the perfect blend of rich flavors,
            fresh coffee beans and unforgettable moments.
          </p>
          <a href="#menu" className="main-button">Explore Our Menu</a>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900"
            alt="Coffee shop interior"
          />
        </div>
        <div className="about-content">
          <p className="tagline">OUR STORY</p>
          <h2>More Than Just Coffee</h2>
          <p>
            At Brew Haven, we believe every cup of coffee
            tells a story. We bring you freshly brewed coffee
            made with carefully selected beans and love.
          </p>
          <a href="#menu" className="main-button">Discover More</a>
        </div>
      </section>

      <section className="menu" id="menu">
        <p className="tagline">OUR SPECIALITIES</p>
        <h2>Popular Coffee</h2>

        <div className="coffee-container">
          {loading && <p>Loading coffee menu...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && coffees.map(coffee => (
            <div className="coffee-card" key={coffee.id}>
              <img
                src={coffeeImages[coffee.name] || coffeeImages.Cappuccino}
                alt={coffee.name}
              />
              <h3>{coffee.name}</h3>
              <p className="price">₹{coffee.price}</p>
              <p>{coffee.description}</p>
              <button onClick={() => alert(`${coffee.name} selected!`)}>
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="tagline">GET IN TOUCH</p>
        <h2>Visit Our Coffee Shop</h2>
        <p>Fresh coffee, warm smiles and beautiful moments.</p>
        <a href="mailto:brewhaven@example.com" className="main-button">
          Contact Us
        </a>
      </section>

      <footer>
        <h2>☕ Brew Haven</h2>
        <p>Made with love and coffee. © 2026 Brew Haven.</p>
      </footer>

    </div>
  );
}

export default App;
