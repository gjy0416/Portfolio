document.querySelector('#foldable_label').onclick = function() {
   if (document.querySelector('#list_unfold').checked)
      document.querySelector('#foldable_change_img').src='../images/info_use/unfold_icon_down.png';
   else
      document.querySelector('#foldable_change_img').src='../images/info_use/unfold_icon_up.png';
}