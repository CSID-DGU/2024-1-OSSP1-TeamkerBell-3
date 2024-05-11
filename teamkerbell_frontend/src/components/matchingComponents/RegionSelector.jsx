import React, { useState } from 'react';
import styles from "./RegionSelector.module.css";
function RegionSelector() {
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");

  const regions = {
    "서울특별시": ["강남구", "서초구", "종로구"],
    "부산광역시": ["해운대구", "남구", "동래구"],
    "대구광역시": ["수성구", "중구"],
    "인천광역시": ["부평구", "계양구"],
    "광주광역시": ["북구", "남구"]
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistricts(regions[selectedCity]);
  };

  const handleGunGuChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
  };


  console.log(city);
  console.log(district);

  return (
    <div className = {styles.container}>
      <label htmlFor="city-select"></label>
      <select id="city-select" class = {styles.select} value={city} onChange={handleCityChange}>
        <option value="">시 선택</option>
        {Object.keys(regions).map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <label htmlFor="district-select"></label>
      <select id="district-select" class={styles.select} value={district} onChange={handleGunGuChange}>
        <option value="">군/구 선택</option>
        {districts.map(district => (
          <option key={district} value={district} >{district}</option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;
