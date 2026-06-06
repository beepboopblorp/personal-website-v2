
//html elementsfor each image button that can e clicked on
const theme_change = document.getElementById("theme_change"); //sun or moon, image changes
const get_hint = document.getElementById("get_hint");
const hint_arrow = document.getElementById("hint_arrow");
const close_popup_btn = document.getElementById("close_popup_btn");
let current_count = 0;
let congrats_shown = false;
const image_elements = [
{img_element: document.getElementById("intro_cloud")},
{img_element: document.getElementById("help_cloud")},
{img_element: document.getElementById("hints_cloud")},
{img_element: document.getElementById("paw"), clicked: false, hint_top: "40%", hint_left: "15%", hint_rotate: "150deg"}, //clemson
{img_element: document.getElementById("duck"), clicked: false, hint_top: "55%", hint_left: "40%", hint_rotate: "170deg"}, //quote
{img_element: document.getElementById("magnifying_glass"), clicked: false, hint_top: "31%", hint_left: "13.5%", hint_rotate: "150deg"}, //research
{img_element: document.getElementById("orpheus_heidi"), clicked: false, hint_top: "60%", hint_left: "60%", hint_rotate: "-30deg"}, //hack club
{img_element: document.getElementById("rocket"), clicked: false, hint_top: "20%", hint_left: "85%", hint_rotate: "150deg"}, //ascend
{img_element: document.getElementById("rov"), clicked: false, hint_top: "77.5%", hint_left: "32.5%", hint_rotate: "170deg"}, //robotics
{img_element: document.getElementById("mic"), clicked: false, hint_top: "57.5%", hint_left: "81%", hint_rotate: "130deg"}, //gavel club
{img_element: document.getElementById("wrench"), clicked: false, hint_top: "62.5%", hint_left: "67.5%", hint_rotate: "-40deg"}, //makerspace
{img_element: document.getElementById("computer"), clicked: false, hint_top: "37.5%", hint_left: "22.5%", hint_rotate: "90deg"}, //hmsrf
{img_element: document.getElementById("paint"), clicked: false, hint_top: "22.5%", hint_left: "30%", hint_rotate: "90deg"}, //art festival
{img_element: document.getElementById("pretzel"), clicked: false, hint_top: "20%", hint_left: "52.5%", hint_rotate: "70deg"}, //german
{img_element: document.getElementById("easel"), clicked: false, hint_top: "20%", hint_left: "49%", hint_rotate: "160deg"}, //art history site
{img_element: document.getElementById("banana_duck"), clicked: false, hint_top: "30%", hint_left: "12.5%", hint_rotate: "170deg"}, //banana duck site
{img_element: document.getElementById("ghostie"), clicked: false, hint_top: "27.5%", hint_left: "25%", hint_rotate: "20deg"}, //ghostie graveyard site
{img_element: document.getElementById("present"), clicked: false, hint_top: "60%", hint_left: "65%", hint_rotate: "-90deg"}, //winterboba site
{img_element: document.getElementById("phone"), clicked: false, hint_top: "57.5%", hint_left: "85%", hint_rotate: "100deg"}, //contact me
{img_element: document.getElementById("crown"), clicked: false, hint_top: "70%", hint_left: "70%", hint_rotate: "-15deg"}, //scholars bowl + trivia site
{img_element: document.getElementById("flask"), clicked: false, hint_top: "62.5%", hint_left: "1%", hint_rotate: "-140deg"}, //science bowl
{img_element: document.getElementById("shark"), clicked: false, hint_top: "45%", hint_left: "87.5%", hint_rotate: "130deg"}]; //meet head shark site

//event listeners
if(theme_change) {
    theme_change.addEventListener('click', () => {
        if(light_mode()) {
            document.getElementById('body_id').style.backgroundImage = "url(assets/dark_pond_bg.png)";
            document.getElementById("easel_img").src = "assets/dark_easel.png";
            document.getElementById("theme_change_img").src = "assets/moon.png";
            document.getElementById("easel_popup_img").src = "assets/dark_easel.png";
        } else {
            document.getElementById('body_id').style.backgroundImage = "url(assets/light_pond_bg.png)";
            document.getElementById("easel_img").src = "assets/light_easel.png";
            document.getElementById("theme_change_img").src = "assets/sun.png";
            document.getElementById("easel_popup_img").src = "assets/light_easel.png";
        }
    })
}

for(let i=0; i < image_elements.length; i++) {
    if(image_elements[i].img_element) {
        image_elements[i].img_element.addEventListener("click", () => show_popup(image_elements[i].img_element.id));
    }
}

if(get_hint) {get_hint.addEventListener('click', show_hint);}

if(close_popup_btn) close_popup_btn.addEventListener("click", () => {
    for(let i=0; i<document.getElementsByClassName("popup").length; i++) {
        document.getElementsByClassName("popup")[i].style.display = "none";
    }
    close_popup_btn.style.display = "none";
    if(document.getElementById("counter").innerText == "19/19" && !congrats_shown) {
        show_popup("finished");
        congrats_shown = true;
    }
});

if(hint_arrow) hint_arrow.addEventListener("click", ()=> hint_arrow.style.display = 'none');


//functions
function show_popup(element_id) {
    document.getElementById(element_id + "_popup").style.display = "block";
    document.getElementById(element_id + "_popup").style.animation = "show_popup 1s";

    if(hint_arrow.style.display != "none" && hint_arrow.name.includes(element_id)) {
        hint_arrow.style.display = "none";
    }

    setTimeout(() => {
        close_popup_btn.style.display = "block";
        if(element_id != "intro_cloud" && element_id != "help_cloud" && element_id != "hints_cloud" ) {
            for(let i=0; i < image_elements.length; i++) {
                if(element_id == image_elements[i].img_element.id && !image_elements[i].clicked) {
                    current_count++;
                    document.getElementById("counter").innerText = current_count + "/19";
                    image_elements[i].clicked = true;
                    break;
                }
            }
        } else if (element_id == "intro_cloud") {
            document.getElementsByClassName("overlay")[0].innerText = "Intro";
        }
    }, 1000);
}

function show_hint() {
    for(let i=3; i < image_elements.length; i++) {
        if(!image_elements[i].clicked) {
            hint_arrow.style.top = image_elements[i].hint_top;
            hint_arrow.style.left = image_elements[i].hint_left;
            hint_arrow.style.rotate = image_elements[i].hint_rotate;
            hint_arrow.style.display = "block";
            hint_arrow.name = image_elements[i].img_element.id + "_hint";
            if(image_elements[i].img_element.id == "flask") hint_arrow.style.transform = "scaleY(-1)";
            break;
        }
    }

    for(let i=0; i<document.getElementsByClassName("popup").length; i++) {
        document.getElementsByClassName("popup")[i].style.display = "none";
    }
    close_popup_btn.style.display = "none";
}

function light_mode() {
    if(document.getElementById('body_id').style.backgroundImage.includes('light')) {
        return true;
    } else {
        return false;
    }
}