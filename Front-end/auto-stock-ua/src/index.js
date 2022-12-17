import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import $ from 'jquery'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// var imgWrap = "";
// var imgArray = [];
// $(".upload__inputfile").on("change", function (e) {

//   imgWrap = $(this).closest(".upload__box").find(".upload__img-wrap");
//   var maxLength = $(this).attr("data-max_length");

//   var files = e.target.files;
//   var filesArr = Array.prototype.slice.call(files);
//   var iterator = 0;
//   filesArr.forEach(function (f, index) {
//     if (!f.type.match("image.*")) return;
//     if (imgArray.length > maxLength) return false;
//     else {
//       var len = 0;
//       for (var i = 0; i < imgArray.length; i++)
//         if (imgArray[i] !== undefined) len++;
//       if (len > maxLength) return false;
//       else {
//         imgArray.push(f);
//         var reader = new FileReader();
//         reader.onload = function (e) {
//           var html =
//             "<div class='upload__img-box'><div style='background-image: url(" +
//             e.target.result +
//             ")' data-number='" +
//             $(".upload__img-close").length +
//             "' data-file='" +
//             f.name +
//             "' class='img-bg'><div class='upload__img-close'></div></div></div>";
//           imgWrap.append(html);
//           iterator++;
//         };
//         reader.readAsDataURL(f);
//       }
//     }
//   });
// });

// $("body").on("click", ".upload__img-close", function (e) {
//   var file = $(this).parent().data("file");
//   for (var i = 0; i < imgArray.length; i++) {
//     if (imgArray[i].name === file) {
//       imgArray.splice(i, 1);
//       break;
//     }
//   }
//   $(this).parent().parent().remove();
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
