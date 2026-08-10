
function startParty() {
    document.getElementById("partyWindow").style.display = "block";
}

function closeParty() {
    document.getElementById("partyWindow").style.display = "none";
}

function openRecycle() {
    document.getElementById("recycleWindow").style.display = "flex";
}

function closeRecycle() {
    document.getElementById("recycleWindow").style.display = "none";
}

function openInternet() {
    window.open(
        "https://www.google.com/search?q=how+to+stop+aging",
        "_blank"
    );
}

function openSaves(){
    document.getElementById("savesWindow").style.display = "flex";
}

function closeSaves(){
    document.getElementById("savesWindow").style.display = "none";
}

let photos = [
    "chess.png",
    "radio.png",
    "video_games.png",
    "bday.png",
    "baklava.png",
    "fish.png"
];

let currentPhotoIndex = 0;

function openPhotos() {
    currentPhotoIndex = 0;
    document.getElementById("currentPhoto").src =
        photos[currentPhotoIndex];
    document.getElementById("photosWindow").style.display = "flex";
}

function closePhotos(){
    document.getElementById("photosWindow").style.display="none";
}

function nextPhoto(){
    currentPhotoIndex++;
    if(currentPhotoIndex >= photos.length){
        currentPhotoIndex = 0;
    }
    document.getElementById("currentPhoto").src =
    photos[currentPhotoIndex];
}

function prevPhoto(){
    currentPhotoIndex--;
    if(currentPhotoIndex < 0){
        currentPhotoIndex = photos.length - 1;
    }
    document.getElementById("currentPhoto").src =
        photos[currentPhotoIndex];
}

function openWinamp() {
    document.getElementById("winampWindow").style.display = "flex";
}

function closeWinamp() {
    document.getElementById("winampWindow").style.display = "none";
}

function openSpotify() {
    window.open(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1",
        "_blank"
    );
}

function openBirthday() {
    document.getElementById("birthdayWindow").style.display = "flex";
}

function closeBirthday() {
    document.getElementById("birthdayWindow").style.display = "none";
}

function openSecret() {
    document.getElementById("secretWindow").style.display = "flex";
}

function closeSecret() {
    document.getElementById("secretWindow").style.display = "none";
}

function openPasswords() {
    document.getElementById("passwordsWindow").style.display = "flex";
}

function closePasswords() {
    document.getElementById("passwordsWindow").style.display = "none";
}

function openBirthdaySave() {
    document.getElementById("birthdaySaveWindow").style.display = "flex";
}

function closeBirthdaySave() {
    document.getElementById("birthdaySaveWindow").style.display = "none";
}

function openBaklava() {
    document.getElementById("baklavaWindow").style.display = "flex";
}

function closeBaklava() {
    document.getElementById("baklavaWindow").style.display = "none";
}

function openReadme() {
    document.getElementById("readmeWindow").style.display = "flex";
}

function closeReadme() {
    document.getElementById("readmeWindow").style.display = "none";
}

function launchSurprise() {

    const window = document.getElementById("surpriseWindow");
    const loading = document.getElementById("surpriseLoading");
    const message = document.getElementById("surpriseMessage");
    const blocks = document.getElementById("loadingBlocks");

    window.style.display = "flex";

    loading.style.display = "flex";
    message.style.display = "none";

    blocks.textContent = "";

    let count = 0;
    const totalBlocks = 8;

    const loadingInterval = setInterval(function() {

        blocks.textContent += "■";
        count++;

        if (count >= totalBlocks) {
            clearInterval(loadingInterval);
        }

    }, 250);

    setTimeout(function() {

        clearInterval(loadingInterval);

        loading.style.display = "none";
        message.style.display = "flex";

    }, 2000);
}

function closeSurprise() {
    document.getElementById("surpriseWindow").style.display = "none";
}

function openMemories() {
    document.getElementById("memoriesWindow").style.display = "flex";
}

function closeMemories() {
    document.getElementById("memoriesWindow").style.display = "none";
}

const mailMessages = [

    {
        sender: "Aza",
        subject: "Raspberry Ice-cream on a beach",
        date: "12-Aug-1996",

        body:
`Happy birthday lyrical, shall we meet on the Milky Way? 😉`
    },

    {
        sender: "Kiku",
        subject: "Spoiler: cringe mandatory birthday wishes",
        date: "12-Aug-1996",

        body:
`Happy Birthday, Sick! One year older and wiser (hopefully). Jokes aside, you are one of the kindest, most thoughtful and hardworking people I know.

I am so lucky to have gotten to know you, even if it’s through the internet. For an internet friend, you really did put up with all the shit I threw your way. I guess that’s what true friends do. I hope to be there for you, just as you have been there for me all these years.

But for now, I hope you’re eating cake and drinking beer. Love you loads ❤️`
    },

    {
        sender: "Prinz",
        subject: "Best Wishes",
        date: "12-Aug-1996",

        body:
`Dear Timmy, happy birthday!

I hope you have a wonderful day to enjoy, and will recieve a lot of good things in the coming year!

You deserve all the best!

Prinz`
    },

    {
        sender: "AN5A",
        subject: "HB",
        date: "12-Aug-1996",

        body:
`Hiiiii Timmy! 

I wish you the bestest birthday and I hope we will all play something soon!

AN5A`
    },

    {
        sender: "Jesse",
        subject: "Amazingly Mellifluous",
        date: "12-Aug-1996",

        body:
`Lyrical my most treasured bosom friend! You’re the low-key constant in my life that’s become an irrefutable necessity. I know, I know, I should be over all the butterflies. You’re the me I want to be. Happy Birthday!`
    },

    {
        sender: "Paul",
        subject: "Happy Birthday!",
        date: "12-Aug-1996",

        body:
`Happy Birthday Timmy!

Hope you have an awesome day! You're nearly as old as me now!

Paul`
    },

    {
        sender: "Jason",
        subject: "You need to",
        date: "12-Aug-1996",

        body:
`Hello sickermore. Have a great birthday. You are now older and slower so it's time for you to KEEP UP!`
    },

    {
        sender: "Evee",
        subject: "🚨⚠️ FWD: FWD: FWD: RE: ⚠️🚨",
        date: "12-Aug-1996",

        body:
`You 🛑 THOUGHT 🤔 today 📅 was just 🤷 a NORMAL 🎂 birthday... !!!?? 🎁🎁 You 👈 were WRONG. ❌🚫💀💥

By 👀 OPENING 📂 this email, 📧 you 🫵 have OFFICIALLY 📜 triggered ⚡ the Cursed Cake 🎂 of Eternal ⏳ Inconvenience !!! 🎂👹🔥💥🚨

If you 👉 do NOT 🙅‍♂️ forward ➡️ this EXACT 💯 email 📧 to 7 people 👥👥 within ⏱️ the next ⏩ 66 minutes ⏱️⏳‼️, the following ⬇️ CURSES 🪬 will be UNLEASHED 🐺 upon 👤 you at MIDNIGHT... !!! 🕛🌙🔮👻💀

Warm Pillows: 🛏️ BOTH 👋 sides of your pillow 💤 will STAY 🛑 permanently WARM 🥵 !!! 🥵🛏️💤🔥🌡️

Driver Loop: 💻 Your TECH 🖥️ devices 📱 will TRAP 🪤 you in ENDLESS 🔄 system restarts ⏳ !!!?? 💻🔄🚨👾💥🤖

Spoiler Alert: 📚 STRANGERS 👥 will SHOUT 🗣️ the endings 🏁 of BOOKS 📖 on your shelf 👀 !!! 📚🗣️❌📖😱🤬

The Blue Screen: 🧠 Your BRAIN 🧠 will experience 💥 a 404 🚫 ERROR ⚠️ every time ⏰ you TRY 🙋‍♂️ to remember 🤔 why you WALKED 🚶‍♂️ into a room 🚪 !!! 🧠🌀🥶💻⚡🛸

DO NOT 🚫 ATTEMPT 🛑 TO DELETE 🗑️ THIS PARTITION... !!! 🚫💾🚫 The Basement 🏚️ Leviathan 👹 is ACTIVELY 📡 pinging ⚡ your IP 🌐 address !!! 👁️🖥️👾👹🖲️🎯

Happy 🎉 LEVEL UP 🎮 Day... !!!?? 🎈🎈🎮👾🎂🥳🧁✨`
    },

    {
        sender: "celacım",
        subject: "birthday gl1tches",
        date: "12-Aug-1996",

        body:
`my timmycım,

od srca ti želim sve najbolje — may you, above all, be in good health and live in love, lightness, contentment & fulfillment

senin için iyi olan her şey yolunu bulup sana gelsin

love,
 M`
    },

    {
        sender: "Mourdy",
        subject: "Mourdy’s Manifesto",
        date: "12-Aug-1996",

        body:
`For sick who is cool as cucumber and uniquely amaizing. You have such a great way of doing life completely in your own style which I look up to. Keep being yourself with pride.

I hope this next year brings you lots of good moments and excitment.

Happy birthday!`
    },

    {
        sender: "Oddstep",
        subject: "",
        date: "12-Aug-1996",

        body:
`Love You, Boo`
    },

    {
        sender: "Kite",
        subject: "",
        date: "12-Aug-1996",

        body:
`Happy birthday Lit, when Skyrim?`
    },

    {
        sender: "Greg",
        subject: "Bat Rats",
        date: "12-Aug-1996",

        body:
`Timbo slice my sweet boy, this year you shan't receive a toy. Perhaps a rhyme a riddle a couple words, to offset our terrible tarkov turds. Happy birthday my ancient fella, let me nestle my nose and feel your smell nyaa.`
    },

    {
        sender: "Ponlulu",
        subject: "gratz",
        date: "12-Aug-1996",

        body:
`Congratulations on finishing another lap around the sun!

Ponlulu`
    },

    {
        sender: "Laurel",
        subject: "RE: Birthday plans",
        date: "11-Aug-1996",

        body:
`Yeah, I'm coming.

I'll bring the seasoning!

See you tomorrow!

Laurel`
    },

    {
        sender: "You",
        subject: "Don't forget...",
        date: "10-Aug-1996",

        body:
`Don't forget the cake.

Seriously.

You`
    },


    {
        sender: "MP3 World",
        subject: "CONGRATULATIONS! YOU'VE WON!",
        date: "09-Aug-1996",
        spam: true,
        body:
`CONGRATULATIONS!!!
You have been selected to receive a FREE portable MP3 player!
CLICK HERE TO CLAIM YOUR PRIZE!`
    },


    {
        sender: "Theo",
        subject: "New mail who dis",
        date: "09-Aug-1996",

        body:
`Hello?

Let me know if you get this!`
    }

];

function buildMailInbox() {

    const list =
        document.getElementById("mailMessageList");

    list.innerHTML = "";


    mailMessages.forEach(function(message, index) {

        const row =
            document.createElement("div");

        row.className = "mail-row";


        if (message.type === "spam") {

            row.classList.add("spam");

        }


        row.innerHTML = `

            <span>${message.sender}</span>

            <span>${message.subject}</span>

            <span>${message.date}</span>

        `;


        row.dataset.search =
            message.search;


        row.onclick = function() {

            openMailMessage(index);

        };


        list.appendChild(row);

    });


    document.getElementById("mailCount").textContent =
        mailMessages.length;


    document.getElementById("mailFooterCount").textContent =
        mailMessages.length;

}

function openMail() { const mailWindow = document.getElementById("mailWindow"); mailWindow.style.display = "flex"; buildMailInbox(); }

function closeMail() {

    document.getElementById("mailWindow").style.display =
        "none";

}

function openMailMessage(index) {

    const message = mailMessages[index];

    document.getElementById("emailFrom").textContent =
        message.sender;

    document.getElementById("emailSubject").textContent =
        message.subject;

    document.getElementById("emailDate").textContent =
        message.date;


    const body =
        document.getElementById("emailBody");


    body.innerHTML = "";


    if (message.spam) {

        body.innerHTML = `
            <div class="spam-email">CONGRATULATIONS!!!<br><br>You have been selected to receive a FREE portable MP3 player!<br>
                <span class="spam-link" onclick="triggerBSOD(event)">CLICK HERE TO CLAIM YOUR PRIZE!</span>
            </div>
        `;

    } else {

        body.textContent = message.body;

    }

    document.getElementById("emailWindow").style.display =
        "flex";
}

function closeMailMessage() {

    document.getElementById("emailWindow").style.display =
        "none";

}

function showBSOD() {
    document.getElementById("bsodScreen").style.display = "block";
}

document.addEventListener("keydown", function () {
    document.getElementById("bsodScreen").style.display = "none";
});

function triggerBSOD(event) {
    event.stopPropagation();

    document.getElementById("emailWindow").style.display = "none";
    document.getElementById("mailWindow").style.display = "none";
    document.getElementById("bsodScreen").style.display = "block";
}

function openGames() {
    document.getElementById("gamesWindow").style.display = "flex";
}

function closeGames() {
    document.getElementById("gamesWindow").style.display = "none";
}