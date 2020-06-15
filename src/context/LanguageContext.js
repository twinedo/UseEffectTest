import React, {useState, useEffect, useContext} from 'react';
import en from '../lang/en.json';
import id from '../lang/id.json';
import * as RNLocalize from 'react-native-localize';
import App from '../pages/App';

const LanguageContext = React.createContext();
const langObject = {
  en: en,
  id: id,
};
export const LanguageContextProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(langObject),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...langObject[selectedLanguage],
  };
  return (
    <LanguageContext.Provider value={value}>
      <App />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
