//! mail.json dan mail verilerini çeken asenkron fonksiyon
async function mailData() {
  try {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    const response = await fetch("mail.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    let result = "";
    mailArray = data;
    document.title = `Gelen Kutusu(${mailArray.length})`;
    mailsNumber[0].textContent = mailArray.length;
    mailsNumber[1].textContent = mailArray.length;
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
    mails.innerHTML = result;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  } finally {
    loading.classList.add("hidden");
    loading.classList.remove("flex");
  }
}
