let first_i;

function search_text() {
   let search1 = document.getElementById('search_wrap');

   if (first_i == null)
   {
      search1.style.display = "block";
      first_i = 1;
   }
   else
   {
      if (search1.style.display == "none") 
         search1.style.display = "block";
      else
         search1.style.display = "none";
   }
}