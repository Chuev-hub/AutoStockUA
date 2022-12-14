import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
let lg = 'ua'
if(sessionStorage.getItem('lg')=='en')
   lg='en'
i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          signin: "Sign in",
          email: "Email",
          password: "Password",
          signingin: "Sign in",
          dontveAccount: "Don't have an account?",
          signup: "Sign up",
          signingup: "Sign up",
          haveAccount: "Have an account?",
          newAuto: "New auto",
          notNewAuto: "Used auto",
          chooseFiltering: "Сhoose by filtering",
          enterEmail: "Enter Email",
          CreateAdvertisement: "Create an advertisement",
          personalAccount: "Personal account",
          favourites: "Favourites",
          myAdvertisements: "My advertisements",
          myComments: "My comments",
          logout: "Logout",
          accountDetails: " Account Details",
          username: "Username ",
          enterUsername: "Enter username",
          phoneNumber: "Phone number",
          enterPhone: "Enter phone number",
          saveChanges: "Save changes",
          profilePicture: "Profile Picture",
          uploadNewImage: "Upload new image",
          changePassword: "Change password",
          oldPassword: "Old password",
          enterOldPassword: "Enter old password",
          newPassword: "New password",
          enterNewPassword: "Enter new password",
          change: "Change",
          createad:"Create new advertisement",
          create: "Create",
          conditionType: "Condition type",
          accidentStatus : "Accident status",
          bodyType: "Body type",
          brand : "Brand",
          model: "Model",
          color: "Color",
         country : "Country",
         driveType: "Drive type",
         engineType: "Engine type",
         gearboxType : "Gearbox type",
         numberOfDoors : "Number of doors",
         numberOfPlaces : "Number of places",
         region: "Region",
          CarStateNumber: "State Numbuer",
          OwnerCount: "Owners count",
          Price : "Price",
          Power: "Horse power",
          EngineLiters : "Engine liters",
          Year : "Year",
          Mileage: "Mileage",
          IsNew: "New",
          AllowToComent: "Allow commenting",
          About: "About",
          enterAbout: "Enter info min. 20 characters",
        },
      },
      ua: {
        translation: {
          createad:"Створіть нове оголошення",
          signin: "Увійдіть",
          email: "Електронна адреса",
          password: "Пароль",
          signingin: "Вхід",
          dontveAccount: "Нема облікового запису?",
          signup: "Зареєструйтеся",
          signingup: "Зареєструватись",
          haveAccount: "Є обліковий запис?",
          newAuto: "Нові авто",
          notNewAuto: "Вживані авто",
          chooseFiltering: "Оберіть фільтруючи",
          enterEmail: "Введіть пошту",
          CreateAdvertisement: "Створити оголошення",
          personalAccount: "Особистий кабінет",
          favourites: "Обране",
          myAdvertisements: "Мої оголошення",
          myComments: "Мої коментарі",
          logout: "Вийти",
          accountDetails:"Деталі аккаунту",
          username: "Ім'я користувача",
          enterUsername: "Введіть ім'я користувача",
          phoneNumber: "Телефон",
          enterPhone: "Введіть Телефон",
          saveChanges: "Зберегти зміни",
          profilePicture: "Фото профілю",
          uploadNewImage: "Нове зображення",
          changePassword: "Змінити пароль",
          oldPassword: "Старий пароль",
          enterOldPassword: "Введіть старий пароль",
          newPassword: "Новий пароль",
          enterNewPassword: "Введіть новий пароль",
          change: "Змінити",
          create: "Створити",
          conditionType: "Тех. стан",
          accidentStatus : "Участь в ДТП",
          bodyType: "Тип кузова",
          brand : "Бренд",
          model: "Модель",
          color: "Колір",
         country : "Країна виробник",
         driveType: "Привід",
         engineType: "Тип двигуна",
         gearboxType : "Тип кпп",
         numberOfDoors : "К-ть дверей",
         numberOfPlaces : "К-ть місць",
         region: "Регіон",
          carStateNumbuer: "Держ. номер",
          OwnerCount: "К-ть власників",
          Price : "Вартість",
          Power: "Потужність (к.с.)",
          EngineLiters : "Об*єм двигуна",
          Year : "Рік випуску",
          Mileage: "Пробіг",
          IsNew: "Нова",
          AllowToComent: "Дозволити коментувати",
          About: "Про авто",
          enterAbout: "Введіть інформацію мін. к-ть символів 20",
        },
      },
    },

    lng: lg, // if you're using a language detector, do not define the lng option
    fallbackLng: lg,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
