//! Mail gönderme modalını açar.
function openModal() {
  if (window.innerWidth < 768) handleToggleBar();
  document.getElementById("modal").classList.remove("hidden");
  window.addEventListener("click", outsideClickHandler);
}
//! Mail gönderme modalını kapatır.
function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  window.removeEventListener("click", outsideClickHandler);
}
//! Modal açıkken modal harici bir yere tıklandığında modalı kapatır.
function outsideClickHandler(event) {
  if (event.target === document.getElementById("modal")) {
    closeModal();
  }
}
//! Mail gönderme fonksitonu
function sendMail() {
  alert(
    "Mail gönderme işlemi henüz gerçekleştirilemiyor. Bu fonksiyonu kendinize göre özelleştirebilirsiniz."
  );
}
//! Site ilk kez açıldığında yıldızlı mailleri tutan diziyi çeker ve sisteme yükler.
//! Ayrıca mail.json dan mail verilerini çeker.
window.addEventListener("DOMContentLoaded", () => {
  const starredMailData = JSON.parse(localStorage.getItem("starredMails"));
  if (starredMailData) {
    starredMail = starredMailData;
  }
  mailData();
});
//! Yıldız ikonuna tıklandığında yıldızlı maillere eklenmesini...
//! tekrar tıklandığında buradan silinmesini sağlar
const handleStarredMail = (e) => {
  const selectedMail = mailArray[Number(e.target.dataset.id)];
  if (
    starredMail.some(
      (item) =>
        item.sender === selectedMail.sender &&
        item.subject === selectedMail.subject &&
        item.content === selectedMail.content &&
        item.time === selectedMail.time
    )
  ) {
    starredMail = starredMail.filter((mail) => {
      return mail.id !== Number(e.target.dataset.id);
    });
    e.target.classList.remove("active", "text-amber-500");
  } else {
    const newMail = { ...selectedMail, id: Number(e.target.dataset.id) };
    starredMail.push(newMail);
    e.target.classList.add("active", "text-amber-500");
  }
  if (starredMail.length === 0) {
    localStorage.removeItem("starredMails");
  }
  localStorage.setItem("starredMails", JSON.stringify(starredMail));
};

//! Mainde sol navigasyon menusunde bolumler arası geçişi sağlar.
const showMailSection = (section) => {
  if (window.innerWidth < 768) handleToggleBar();

  const sideBarİtems = document.getElementsByClassName("side-bar-list-items");
  for (let i = 0; i < sideBarİtems.length; i++) {
    sideBarİtems[i].classList.remove("bg-sky-300");
  }
  let result = "";
  if (section == "allMails") {
    sideBarİtems[0].classList.add("bg-sky-300");
    sideBarİtems[0].classList.remove("hover:bg-zinc-200");
    sideBarİtems[1].classList.add("hover:bg-zinc-200");
    sideBarİtems[2].classList.add("bg-sky-300");
    sideBarİtems[2].classList.remove("hover:bg-zinc-200");
    sideBarİtems[3].classList.add("hover:bg-zinc-200");
    result = mailArray
      .map((mail, index) => {
        let isStarred = "";
        if (
          starredMail.some(
            (item) =>
              item.sender === mail.sender &&
              item.subject === mail.subject &&
              item.content === mail.content &&
              item.time === mail.time
          )
        ) {
          isStarred = "active text-amber-500";
        }
        return `
    <div class=" grid  grid-cols-12 md:grid-cols-3 gap-2 hover:shadow-2xl hover:z-[2000]  hover:cursor-pointer  sm:gap-8 md:gap-12 lg:gap-24 py-1">
    <div class="col-span-2 md:col-span-1 flex flex-col justify-center md:justify-normal sm:flex-row items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 ps-2 md:ps-4 ">
        <span class="material-symbols-outlined  " >
            check_box_outline_blank
            </span>
            <span onclick="handleStarredMail(event)" data-id="${index}" class="material-symbols-outlined star ${isStarred}  p-1 rounded-full    hover:bg-zinc-200 ">
                star
                </span>
                <span class="hidden md:inline truncate font-semibold" >
                ${mail.sender}
                </span>
    </div>
    <div class="col-span-10 md:col-span-2 flex flex-col md:flex-row ps-0 justify-between  md:gap-1 lg:gap-0">
        <span class="inline md:hidden truncate   font-bold" >
        ${mail.sender}
        </span>
        <span class="w-[90%]  truncate font-semibold" title="${mail.content}" id="mail-header">${mail.content}</span>
        <span class="w-[10%] font-semibold" id="mail-time">${mail.time}</span>
    </div>
</div>
    
    `;
      })
      .join("");
  } else if (section == "starredMail") {
    sideBarİtems[1].classList.add("bg-sky-300");
    sideBarİtems[1].classList.remove("hover:bg-zinc-200");
    sideBarİtems[0].classList.add("hover:bg-zinc-200");
    sideBarİtems[3].classList.add("bg-sky-300");
    sideBarİtems[3].classList.remove("hover:bg-zinc-200");
    sideBarİtems[2].classList.add("hover:bg-zinc-200");
    result = starredMail
      .map((mail) => {
        return `
    <div class="grid  grid-cols-12 md:grid-cols-3 gap-4 hover:shadow-2xl hover:z-[2000]  hover:cursor-pointer  sm:gap-8 md:gap-12 lg:gap-24 py-1">
    <div class="col-span-2 md:col-span-1 flex flex-col sm:flex-row justify-center md:justify-normal items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 ps-2 md:ps-4 ">
        <span class="material-symbols-outlined  " >
            check_box_outline_blank
            </span>
            <span onclick="handleStarredMail(event)" data-id="${mail.id}" class="material-symbols-outlined star active text-amber-500 p-1 rounded-full    hover:bg-zinc-200 ">
                star
                </span>
                <span class="hidden md:inline truncate font-semibold">
                ${mail.sender}
                </span>
    </div>
    <div class="col-span-10 md:col-span-2 flex flex-col md:flex-row  ps-0 justify-between  md:gap-1 lg:gap-0">
        <span class="inline md:hidden truncate   font-bold" >
        ${mail.sender}
        </span>
        <span class="w-[90%]  truncate font-semibold" title="${mail.content}" id="mail-header">${mail.content}</span>
        <span class="w-[10%] font-semibold" id="mail-time">${mail.time}</span>
    </div>
</div>
    
    
    `;
      })
      .join("");
  }
  mails.innerHTML = result;
};

//! Mobil cihazda açılan toggle aside barda aside bar harici bir yere tıklandığında aside barı kapatır
function screenToggleBarClickHandler(e) {
  if (e.target.classList.contains("aside")) handleToggleBar();
}
//! Cihaz boyutlarına göre toggle bar iconun tıklanma davranışını ayarlar.
//! 1024 px uzeri sol navigasyon cubugu kısaltılıp uzatılabilir.
//! 768px ve 1024px arası davranıs yok(Çünkü zaten sol navigasyon cubugu kısalıyor otomatik)
//! 768px aşağısı soldan acılıp kapanan side bar 
const handleToggleBar = () => {
  let screenWidth = window.innerWidth;
  if (screenWidth > 1024) {
    if (!toggleClick) {
      toggleItem[0].classList.remove("lg:col-end-3");
      toggleItem[1].classList.remove("lg:p-4");
      toggleItem[2].classList.remove("lg:inline");
      toggleItem[3].classList.remove("lg:inline");
      toggleItem[4].classList.remove("lg:inline");
      toggleItem[5].classList.remove("lg:inline");
      toggleItem[6].classList.remove("lg:inline");
      toggleItem[7].classList.remove("lg:inline");
      toggleItem[8].classList.remove("lg:inline");
      toggleItem[9].classList.remove("lg:inline");
      toggleItem[10].classList.remove("lg:ps-5");
      toggleItem[11].classList.remove("lg:inline");
      toggleItem[12].classList.remove("lg:col-start-3");
      toggleClick = true;
    } else {
      toggleItem[0].classList.add("lg:col-end-3");
      toggleItem[1].classList.add("lg:p-4");
      toggleItem[2].classList.add("lg:inline");
      toggleItem[3].classList.add("lg:inline");
      toggleItem[4].classList.add("lg:inline");
      toggleItem[5].classList.add("lg:inline");
      toggleItem[6].classList.add("lg:inline");
      toggleItem[7].classList.add("lg:inline");
      toggleItem[8].classList.add("lg:inline");
      toggleItem[9].classList.add("lg:inline");
      toggleItem[10].classList.add("lg:ps-5");
      toggleItem[11].classList.add("lg:inline");
      toggleItem[12].classList.add("lg:col-start-3");
      toggleClick = false;
    }
  }
  if (screenWidth < 768) {
    if (!toggleClick) {
      sideBarContainer.classList.remove("hidden");
      setTimeout(() => {
        sideBar.classList.add("translate-x-0");
        sideBar.classList.remove("-translate-x-full");
      }, 10);
      toggleClick = true;
      window.addEventListener("click", screenToggleBarClickHandler);
    } else {
      sideBar.classList.remove("translate-x-0");
      sideBar.classList.add("-translate-x-full");
      setTimeout(() => {
        sideBarContainer.classList.add("hidden");
      }, 10);
      toggleClick = false;
      window.removeEventListener("click", screenToggleBarClickHandler);
    }
  }
};
