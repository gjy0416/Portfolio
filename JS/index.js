let slide_num = 0;
let autoslideid;

function autoslide_off() {
   slide_num = 0;
   clearTimeout(autoslideid);
}
function autoslide() {
   let slide_all = document.getElementsByName('slide');

   if (slide_num != 3) {
      slide_all[slide_num].checked = true;
      slide_num += 1;
   }
   else {
      slide_all[slide_num].checked = true;
      slide_num = 0;
   }
   autoslideid = setTimeout(autoslide, 2500);
}
function slidenum_change(target) {
   slide_num = parseInt(target.getAttribute('data-num'));
   clearTimeout(autoslideid);
   autoslideid = setTimeout(autoslide, 2500);
}
function deleteSameStation(target) {
   let select_id = "dep_sel";

   if (target == document.getElementById("dep_sel")) {
      select_id = "arr_sel"
   }
   for (let i = 1; i < document.getElementById(select_id).children.length; i++) {
      document.getElementById(select_id).children[i].style.display = "block";
   }
   for (let i = 1; i < document.getElementById(select_id).children.length; i++) {
      if (document.getElementById(select_id).children[i].value == target.value) {
         document.getElementById(select_id).children[i].style.display = "none";
         break;
      }
   }
}
function searchStationMap() {
   if (document.getElementById("dep_sel").value != "" && document.getElementById("arr_sel").value != "") {
      localStorage.setItem('dep', document.getElementById("dep_sel").value);
      localStorage.setItem('arr', document.getElementById("arr_sel").value);
      location.href = "info_use/Info_use_info_map.html";
   }
}