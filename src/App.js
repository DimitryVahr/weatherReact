import React, { PureComponent } from 'react';
import './App.css';
import Info from './Components/Info'
import Form from './Components/Form'
import Weather from './Components/Weather'

const API_KEY = 'fa13c7113b5346e7c1fd829e078ace41'

class App extends PureComponent {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value
    if (city) {
      const api_url = await
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await api_url.json()
      if (data.cod !== '404') {
        let sunset = data.sys.sunset
        let date = new Date()
        date.setTime(sunset)
        let sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          sunset: sunset_date,
          error: undefined
        });
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunset: undefined,
          error: 'Ввдите город на английском языке с большой буквы'
        });
      }

    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="info">
            <Info />
          </div>
          <div className="form">
            <Form weatherMethod={this.gettingWeather} />
            <Weather
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunset={this.state.sunset}
              error={this.state.error}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
