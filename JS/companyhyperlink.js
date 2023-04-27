function companyhyperlink() {
   let company = document.querySelector('#select_company');
   let company_value = company.options[company.selectedIndex].value;

   if (company_value != "")
      location.href = company_value;
}