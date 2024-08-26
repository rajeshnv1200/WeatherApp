/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/

import axios from 'axios';
import React, { useState } from 'react';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// Replace with your OpenWeatherMap API key
const apiKey = 'e9711191d0dc3d6e95d2c4d944950efe';//'YOUR_API_KEY';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = response.data;
      const weatherDescription = data.weather[0].description;
      const temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
      setWeather({
        description: weatherDescription,
        temperature: temperature
      });
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image style={styles.logo} source={require('./assets/weather-logo.png')} />
        <Text style={styles.header}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor="#666"
          value={city}
          onChangeText={setCity}
        />
        <Button title="Get Weather" onPress={fetchWeather} color="#4CAF50" />
        <View style={styles.resultContainer}>
          {weather ? (
            <View>
              <Text style={styles.resultTitle}>Weather in {city}</Text>
              <Text style={styles.resultText}>Description: {weather.description}</Text>
              <Text style={styles.resultText}>Temperature: {weather.temperature}°C</Text>
            </View>
          ) : (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    color: '#555',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default App;
