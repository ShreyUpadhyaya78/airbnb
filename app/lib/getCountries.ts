import countries from 'world-countries';

const countriesFormatted = countries.map((item) => ({
  value: item.cca2,
  region: item.region,
  flag: item.flag,
  latLang: item.latlng,
  label: item.name.common,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;
  const getCountryByValue = (value: string) => {
    return countriesFormatted.find((item) => item.value === value);
  };
  return { getAllCountries, getCountryByValue };
};
