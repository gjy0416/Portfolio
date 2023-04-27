let clicknum = 0;
let dep_img, arr_img, pre_dep_img, pre_arr_img;
let upperclass = document.getElementsByClassName('upper_img');
let lowerclass = document.getElementsByClassName('lower_img');
let upper2class = document.getElementsByClassName('upper2_img');
let centerclass = document.getElementsByClassName('center_img');

window.onload = function initValueCheck() {
   if (localStorage.getItem('dep') && localStorage.getItem('arr')) {
      document.getElementById('dep_sel').value = localStorage.getItem('dep');
      document.getElementById('arr_sel').value = localStorage.getItem('arr');
      localStorage.removeItem('dep');
      localStorage.removeItem('arr');
   }
   select_station(document.getElementById('arr_sel'));
   select_station(document.getElementById('dep_sel'));
}
function click_stationimg(target) {
   if ((target != dep_img && target != arr_img)) {
      if (clicknum == 0) {
         if (dep_img != null) {
            dep_img.parentNode.removeChild(dep_img.parentNode.lastChild);
         }
         dep_img = target;
         clicknum = 1;
         let add_img = document.createElement('img');

         add_img.setAttribute('src','../images/info_use/depcircle_red.png');
         add_img.setAttribute('alt','출발 원');
         switch (target.className) {
            case "upper_img stations": {
               add_img.setAttribute('class', "upper_circle");
               break;
            }
            case "lower_img stations": {
               add_img.setAttribute('class', "lower_circle");
               break;
            }
            case "upper2_img stations": {
               add_img.setAttribute('class', "upper2_circle");
               break;
            }
            case "center_img stations": {
               add_img.setAttribute('class', "center_circle");
               break;
            }
         }
         dep_img.parentNode.appendChild(add_img);
         document.getElementById("dep_sel").value = dep_img.getAttribute("id");
         map_firstsubway_lastsubway();
      }
      else {
         if (arr_img != null) {
            arr_img.parentNode.removeChild(arr_img.parentNode.lastChild);
         }
         
         arr_img = target;
         clicknum = 0;
         let add_img = document.createElement('img');

         add_img.setAttribute('src','../images/info_use/arrcircle_blue.png');
         add_img.setAttribute('alt','도착 원');
         switch (target.className) {
            case "upper_img stations": {
               add_img.setAttribute('class', "upper_circle");
               break;
            }
            case "lower_img stations": {
               add_img.setAttribute('class', "lower_circle");
               break;
            }
            case "upper2_img stations": {
               add_img.setAttribute('class', "upper2_circle");
               break;
            }
            case "center_img stations": {
               add_img.setAttribute('class', "center_circle");
               break;
            }
         }
         arr_img.parentNode.appendChild(add_img);
         document.getElementById("arr_sel").value = arr_img.getAttribute("id");
      }
      railcolorinitial();
      if (dep_img != null && arr_img != null) {
         timecalc();
         pricecalc();
         railcolorchange();
      }
   }
   else if (dep_img != arr_img && (dep_img != null && arr_img != null)) {
      let dep_img_classname = dep_img.parentNode.lastChild.className;
      let arr_img_classname = arr_img.parentNode.lastChild.className;
      let add_dep_img = document.createElement('img');
      let add_arr_img = document.createElement('img');

      dep_img.parentNode.removeChild(dep_img.parentNode.lastChild);
      arr_img.parentNode.removeChild(arr_img.parentNode.lastChild);
      add_dep_img.setAttribute('src','../images/info_use/depcircle_red.png');
      add_dep_img.setAttribute('alt','출발 원');
      add_arr_img.setAttribute('src','../images/info_use/arrcircle_blue.png');
      add_arr_img.setAttribute('alt','도착 원');
      if (dep_img == target) {
         add_arr_img.setAttribute('class', dep_img_classname);
         target.parentNode.appendChild(add_arr_img);
         add_dep_img.setAttribute('class', arr_img_classname);
         arr_img.parentNode.appendChild(add_dep_img);
         dep_img = arr_img;
         arr_img = target;
         clicknum = 0;
      }
      else {
         add_dep_img.setAttribute('class', arr_img_classname);
         target.parentNode.appendChild(add_dep_img);
         add_arr_img.setAttribute('class', dep_img_classname);
         dep_img.parentNode.appendChild(add_arr_img);
         arr_img = dep_img;
         dep_img = target;
         clicknum = 1;
      }
      railcolorinitial();
      railcolorchange();
      select_station_exchange();
      timecalc();
      pricecalc();
      map_firstsubway_lastsubway();
   }
   else {
      railcolorinitial();
   }
}
function timecalc() {
   if (dep_img != null && arr_img != null) {
      let station1 = dep_img.getAttribute('data-time');
      let station2 = arr_img.getAttribute('data-time');
      let timeresult = Math.abs(station2 - station1);

      document.getElementById('time_result').innerHTML = "예상 소요시간은 "+timeresult+"분 입니다.";
   }
   else {
      document.getElementById('time_result').innerHTML = "-";
   }
}
function pricecalc() {
   if (dep_img != null && arr_img != null) { 
      let station1 = dep_img.getAttribute('data-km');
      let station2 = arr_img.getAttribute('data-km');
      let kmresult = Math.abs(station2 - station1);
      let addprice = 0;
      let priceresult = 1450;

      if (kmresult > 50) {
         addprice = Math.trunc((kmresult - 50) / 8) * 100 + 800;
      }
      else if (kmresult > 10) {
         addprice = Math.trunc((kmresult - 10) / 5) * 100;
      }
      priceresult += addprice;
      document.getElementById('price_result').innerHTML = "운임료는 "+priceresult+"원 입니다.";
   }
   else {
      document.getElementById('price_result').innerHTML = "-";
   }
}
function railcolorchange() {
   let station_check_dep_num = dep_img.getAttribute('data-num');
   let station_check_arr_num = arr_img.getAttribute('data-num');
   let station_check_num = arr_img.getAttribute('data-num') - dep_img.getAttribute('data-num');
   let railcolor_css = "10px solid rgb(88, 30, 3)";

   if (station_check_num < 0) {
      station_check_arr_num = dep_img.getAttribute('data-num');
      station_check_dep_num = arr_img.getAttribute('data-num');
   }

   for (let i = station_check_dep_num; i <= station_check_arr_num - 1; i++) {
      for (let j = 0; j <= 14; j++) {
         if (document.getElementsByClassName('stations')[j].getAttribute('data-num') == i) {
            switch (document.getElementsByClassName('stations')[j].className) {
               case "upper_img stations" : {
                  document.getElementsByClassName('upper_img')[j].parentNode.style.borderTop = railcolor_css;
                  break;
               }
               case "lower_img stations" : {
                  document.getElementsByClassName('lower_img')[j - 9].parentNode.style.borderBottom = railcolor_css;
                  break;
               }
               case "upper2_img stations" : {
                  document.getElementsByClassName('upper2_img')[0].parentNode.style.borderTop = railcolor_css;
                  document.getElementsByClassName('center_img')[0].parentNode.style.borderRight = railcolor_css;
                  document.getElementsByClassName('center_img')[0].parentNode.style.borderTop = railcolor_css;
                  break;
               }
               case "center_img stations" : {

                  document.getElementsByClassName('lower_img')[6].parentNode.style.borderBottom = railcolor_css;
                  document.getElementsByClassName('lower_img')[6].parentNode.style.borderRight = railcolor_css;
                  break;
               }
            }
            break;
         }
      }
   }
}
function railcolorinitial() {
   let initial_rail_css = getComputedStyle(document.getElementById("tablemap")).border; 

   for (let i = 0; i <= 5; i++) {
      document.getElementsByClassName('upper_img')[i].parentNode.style.borderTop = initial_rail_css;
   }
   for (let i = 0; i <= 6; i++) {
      document.getElementsByClassName('lower_img')[i].parentNode.style.borderBottom = initial_rail_css;
   }
   document.getElementsByClassName('lower_img')[6].parentNode.style.borderRight = initial_rail_css;
   document.getElementsByClassName('upper2_img')[0].parentNode.style.borderTop = initial_rail_css;
   document.getElementsByClassName('center_img')[0].parentNode.style.borderRight = initial_rail_css;
   document.getElementsByClassName('center_img')[0].parentNode.style.borderTop = initial_rail_css;
}
function select_station(target) {
   if (target != "") {
      pre_arr_img = arr_img;
      pre_dep_img = dep_img;
      if (target.getAttribute('id') == "dep_sel") {
         clicknum = 0;
         click_stationimg(document.getElementById(target.value));
         if (target.value == document.getElementById('arr_sel').value && dep_img != null) {
            document.getElementById('arr_sel').value = pre_dep_img.getAttribute('id');
         }
      }
      else {
         clicknum = 1;
         click_stationimg(document.getElementById(target.value));
         if (target.value == document.getElementById('dep_sel').value && arr_img != null) {
            document.getElementById('dep_sel').value = pre_arr_img.getAttribute('id');
         }
      }
   }
}
function select_station_exchange() {
   let select_dep = document.getElementById("dep_sel").value;
   let select_arr = document.getElementById("arr_sel").value;

   document.getElementById("dep_sel").value = select_arr;
   document.getElementById("arr_sel").value = select_dep;
}
function map_select_initialize() {
   railcolorinitial();
   if (dep_img != null) {
      dep_img.parentNode.removeChild(dep_img.parentNode.lastChild);
   }
   if (arr_img != null) {
      arr_img.parentNode.removeChild(arr_img.parentNode.lastChild);
   }
   dep_img = null;
   arr_img = null;
   document.getElementById('dep_sel').value = "";
   document.getElementById('arr_sel').value = "";
   timecalc();
   pricecalc();
   clicknum = 0;
   map_firstsubway_lastsubway();
}
function map_firstsubway_lastsubway() {
   if (dep_img != null) {
      let first_addtime = 30;
      let last_addtime = 30; 
      let last_base_hour = 23;

      if (document.getElementById("giheung_side").checked) {
         switch(dep_img.getAttribute("id")) {
            case "giheung": case "gangnamuniv": case "jisuck": case "eujung": case "dongbaek": case "chodang": {
               first_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("chodang").getAttribute("data-time"));
               break;
            }
            case "samga": case "yongingov": case "myungjiuniv": case "gimnyangjang": case "songdamuniv": {
               first_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("songdamuniv").getAttribute("data-time"));
               break;
            }
            case "gojin": case "bopyeong": case "dunjeon": case "everland": {
               first_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("everland").getAttribute("data-time"));
               break;
            }
         }
         last_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("everland").getAttribute("data-time"));
      }
      else {
         switch(dep_img.getAttribute("id")) {
            case "giheung": case "gangnamuniv": case "jisuck": case "eujung": case "dongbaek": {
               first_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("giheung").getAttribute("data-time"));
               break;
            }
            case "chodang": case "samga": case "yongingov": case "myungjiuniv": case "gimnyangjang": {
               first_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("chodang").getAttribute("data-time"));
               break;
            }
            case "songdamuniv": case "gojin": case "bopyeong": case "dunjeon": case "everland": {
               first_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("songdamuniv").getAttribute("data-time"));
               break;
            }
         }
         last_addtime += Math.abs(dep_img.getAttribute("data-time") - document.getElementById("giheung").getAttribute("data-time"));
      }
      if (last_addtime >= 60) {
         last_base_hour += (last_addtime / 60).toFixed();
         last_addtime %= 60;
      }
      if ((document.getElementById("giheung_side").checked && dep_img.getAttribute("id") == "giheung") || (document.getElementById("everland_side").checked && dep_img.getAttribute("id") == "everland")) {
         document.getElementById("firstsubway_hour").innerHTML = "-";
         document.getElementById('firstsubway_minute_normal').innerHTML = "-";
         document.getElementById('firstsubway_minute_holiday').innerHTML = "-";
         document.getElementById("lastsubway_hour").innerHTML = "-";
         document.getElementById('lastsubway_minute_normal').innerHTML = "-";
         document.getElementById('lastsubway_minute_holiday').innerHTML = "-";
      }
      else {
         document.getElementById("firstsubway_hour").innerHTML = 5;
         document.getElementById('firstsubway_minute_normal').innerHTML = first_addtime;
         document.getElementById('firstsubway_minute_holiday').innerHTML = first_addtime;
         document.getElementById("lastsubway_hour").innerHTML = last_base_hour;
         document.getElementById('lastsubway_minute_normal').innerHTML = last_addtime;
         document.getElementById('lastsubway_minute_holiday').innerHTML = last_addtime;
      }      
   }
   else {
      document.getElementById("firstsubway_hour").innerHTML = "-";
      document.getElementById("firstsubway_minute_normal").innerHTML = "-";
      document.getElementById("firstsubway_minute_holiday").innerHTML = "-";
      document.getElementById("lastsubway_hour").innerHTML = "-";
      document.getElementById("lastsubway_minute_normal").innerHTML = "-";
      document.getElementById("lastsubway_minute_holiday").innerHTML = "-";
   } 
}
  