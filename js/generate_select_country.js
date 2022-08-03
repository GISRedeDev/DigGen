$(document).ready(function() {

    var report_country_name = '';
    var report_country_iso = '';

    var select_iso = document.getElementById('select_iso');

    for (var i = 0; i < report_countries.isos.length; i++) {
        report_country_iso = report_countries.isos[i].iso;
        report_country_name = report_countries.isos[i].name;
        //console.log(report_country_name); 
        select_iso.innerHTML = select_iso.innerHTML +
            '<option value="' + report_country_iso + '">' + report_country_name + '</option>';


    }
});

