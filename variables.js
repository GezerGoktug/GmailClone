//! DOM ACCESS
const mails = document.getElementById("mail-container");
const loading = document.getElementById("loading");
const mailsNumber = document.getElementsByClassName("mails-number");
const toggleItem = document.getElementsByClassName("toggleBarItem");
const sideBarContainer = document.getElementById("side-bar-screen");
const sideBar = document.getElementById("side-bar");
const toggleBar = document.getElementById("left-sidebar");
//! DOM ACCESS
let toggleClick = false;
let mailArray=[]//? Tüm maillerin bulunduğu dizi
let starredMail = [];//? Yıldızlı maillerin bulunduğu dizi