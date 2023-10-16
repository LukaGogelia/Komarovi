import React, { useState, useEffect } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";
import { georgiaRegions } from "@/data/georgiaRegions";

function RegionDropdowns({
  type,
  onRegionChange,
  onUnitChange,
  onAddressChange,
  addressState,
}) {
  const [selectedRegion, setSelectedRegion] = useState(addressState.region);
  const [adminUnits, setAdminUnits] = useState([]);
  const [selectedAdminUnit, setSelectedAdminUnit] = useState(
    addressState.adminUnit
  );
  const [address, setAddress] = useState(addressState.addressLine);

  useEffect(() => {
    if (selectedRegion && georgiaRegions[selectedRegion]) {
      setAdminUnits(georgiaRegions[selectedRegion]);
    }
  }, [selectedRegion]);

  const handleRegionChange = (event) => {
    const regionName = event.target.value;
    setSelectedRegion(regionName);
    setSelectedAdminUnit("");
    setAddress("");
    setAdminUnits(georgiaRegions[regionName] || []);
    onRegionChange(type, regionName);
  };

  const handleAdminUnitChange = (event) => {
    const unitName = event.target.value;
    setSelectedAdminUnit(unitName);
    onUnitChange(type, unitName);
  };

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    onAddressChange(type, newAddress); // propagate to parent
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <label>
          {type === "registration" ? "Registration Address" : "Actual Address"}
        </label>
      </Grid>

      <Grid
        item
        xs={12}
        sm={selectedAdminUnit ? 4 : adminUnits.length ? 6 : 12}
      >
        <FormControl fullWidth variant="outlined" className="new-input">
          <InputLabel id={`${type}-region-select-label`}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Region
          </InputLabel>
          <Select
            labelId={`${type}-region-select-label`}
            id={`${type}-region-select`}
            value={selectedRegion}
            onChange={handleRegionChange}
            label={`${type.charAt(0).toUpperCase() + type.slice(1)} Region`}
          >
            {Object.keys(georgiaRegions).map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {selectedRegion && (
        <Grid
          item
          xs={12}
          sm={selectedAdminUnit ? 4 : adminUnits.length ? 6 : 12}
        >
          <FormControl fullWidth variant="outlined" className="new-input">
            <InputLabel id={`${type}-unit-select-label`}>
              {type.charAt(0).toUpperCase() + type.slice(1)} Administrative Unit
            </InputLabel>
            <Select
              labelId={`${type}-unit-select-label`}
              id={`${type}-unit-select`}
              value={selectedAdminUnit}
              required
              onChange={handleAdminUnitChange}
              label={`${
                type.charAt(0).toUpperCase() + type.slice(1)
              } Administrative Unit`}
            >
              {adminUnits.map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      {selectedAdminUnit && (
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="Address"
            value={address}
            onChange={handleAddressChange}
            className="new-input"
          />
        </Grid>
      )}
    </Grid>
  );
}

export default RegionDropdowns;
