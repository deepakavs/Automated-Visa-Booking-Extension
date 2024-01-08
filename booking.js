function notify(msg) {
    chrome.runtime.sendMessage({type: "slotavailable", message: msg});
}

function blinkTitle(){
	setInterval(function(){
   var title = document.title;
   document.title = (title == "!!!!Slot found here" ? '\u200E' : "!!!!Slot found here");
}, 300);
}


function reloadthetab() {
    if (getParam('r') === "skip") {

    } else {
        //setTimeout(function () { location.reload(1); }, 5000);
    }
}

function getParam(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}


$(document).ready(function () {
    const locationmap = new Map();
    locationmap.set('a0CC000000KUJyeMAH', "CHENNAI VAC");
    locationmap.set('a0CC000000KUJyjMAH',"HYDERABAD VAC");
    locationmap.set('a0CC000000KUJyoMAH',"KOLKATA VAC");
    locationmap.set('a0CC000000KUJytMAH',"MUMBAI VAC");
    locationmap.set('a0CC000000KUJz3MAH',"NEW DELHI VAC");
    let slotsDates = [];
    let bookslot = false;
    let prefslotstartdate = new Date('July 19 2022');
    console.log("Preferred slot start date - " + prefslotstartdate);
    let prefslotenddate = new Date('August 20 2022');
    console.log("Preferred slot end date - " + prefslotenddate);
    $('a.ui-state-default').each(function (dayindex, element) {
        let location = locationmap.get($('select[name^="thePage:SiteTemplate:theForm"]').val());
        $(element).parent().trigger('click');
        setTimeout(2000);
        $('#myCalendarTable').find('tbody').find('tr').each(function (timeindex, row) {
            if (timeindex === 0) {
                return;
            }
            let date = $(row).find('td:nth-child(3)').text();
            let count = 0;
            count = $(row).find('td:nth-child(4)').text();
            let time = $(row).find('td:nth-child(2)').text();

            let dateobj = {};
            dateobj['title'] = dayindex + 1 + "." + timeindex;
            dateobj['message'] = time + " " + location + " - " + date + " " + count + " slot(s)";
            console.log(dateobj);
            slotsDates.push(dateobj['message'] + '\n');
            if (localStorage.getItem("status") !== "booked") {
                //remove day name
                date = date.split('day ')[1];
                // initializing date object
                date = new Date(date);
                if (date >= prefslotstartdate && date<= prefslotenddate) {
                        $(row).find('td:first').find('input').trigger("click");
						setTimeout(500);
						blinkTitle();
                        notify("Matching date- " + date);
                        //$('form[name="thePage:SiteTemplate:theForm"]').submit();
						$('input[value="Continue"]').trigger('click');
                        //set flag
                        localStorage.setItem("status", "booked");
                        //window.location.assign(window.location.href + "?q=skip");
                }
            }
        });
    });
    if (slotsDates.length >= 1) {
        //notify(slotsDates);
    } else {
        console.log("no slots");
    }
});
