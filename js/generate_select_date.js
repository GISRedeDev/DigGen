$(document).ready(function() {

    var map_report_picker = document.getElementById('map-report-picker');

    var report_year = '';
    var report_month = '';
    var report_year_month = '';
    for (var i = 0; i < json_dates.years.length; i++) {

        report_year = json_dates.years[i].year;

        map_report_picker.innerHTML = map_report_picker.innerHTML +
            '<optgroup  label="' + report_year + '">';

        for (var ii = 0; ii < json_dates.years[i].month_n.length; ii++) {
            report_month_n = json_dates.years[i].month_n[ii];
            report_month_l = json_dates.years[i].month_l[ii];
            report_year_month = report_year + '_' + report_month_n;

            map_report_picker.innerHTML = map_report_picker.innerHTML +
                '<option value="' + report_year_month + '">' + report_year + ' ' + report_month_l + '</option>';

        }
        map_report_picker.innerHTML = map_report_picker.innerHTML +
            '<option disabled style="font-size: 0.25em;"></option>';
        map_report_picker.innerHTML = map_report_picker.innerHTML +
            '<option disabled style="background: #c9c9c9; font-size: 0.1px;"></option>';
        map_report_picker.innerHTML = map_report_picker.innerHTML +
            '<option disabled style="font-size: 0.25em;"></option>';

        map_report_picker.innerHTML = map_report_picker.innerHTML +
            '</optgroup >';
    }

});