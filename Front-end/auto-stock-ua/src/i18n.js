import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
let lg = 'ua'
if(sessionStorage.getItem('lg')=='en')
   lg='en'
i18n.use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
   
    resources: {
      en: {
        translation: {
        signin: 
          "Sign in",
          email: 
          "Email",
          password: 
          "Password",
          signingin: 
          "Sign in",
          dontveAccount: 
          "Don't have an account?",
          signup: 
          "Sign up",
          signingup: 
          "Sign up",
          haveAccount: 
          "Have an account?",
          newAuto: 
          "New auto",
          notNewAuto: 
          "Used auto",
          chooseFiltering: 
          "Сhoose by filtering",
          enterEmail: 
          "Enter Email",
          CreateAdvertisement: 
          "Create an advertisement",
          personalAccount: 
          "Personal account",
          favourites: 
          "Favourites",
          myAdvertisements: 
          "My advertisements",
          myComments: 
          "My comments",
          logout: 
          "Logout",
      }
      },
      ua: {
        translation: {
        signin: 
          "Увійдіть",
          email: 
          "Електронна адреса",
          password: 
          "Пароль",
          signingin: 
          "Вхід",
          dontveAccount: 
          "Нема облікового запису?",
          signup: 
          "Зареєструйтеся",
          signingup: 
          "Зареєструватись",
          haveAccount: 
          "Є обліковий запис?",
          newAuto: 
          "Нові авто",
          notNewAuto: 
          "Вживані авто",
          chooseFiltering: 
          "Оберіть фільтруючи",
          enterEmail: 
          "Введіть пошту",
          CreateAdvertisement: 
          "Створити оголошення",
          personalAccount: 
          "Особистий кабінет",
          favourites: 
          "Обране",
          myAdvertisements: 
          "Мої оголошення",
          myComments: 
          "Мої коментарі",
          logout: 
          "Вийти",
      }
    }
    },

    lng: lg, // if you're using a language detector, do not define the lng option
    fallbackLng: lg,
    interpolation: {
      escapeValue: false
    }
    
  });
export default i18n;
