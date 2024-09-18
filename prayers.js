document.addEventListener('DOMContentLoaded', async () => {
  let fajirPrayerDisplay = document.getElementById('fajirPrayers');
  let DhuhrPrayerDisplay = document.getElementById('DhuhrPrayers');
  let AsrPrayerDisplay = document.getElementById('AsrPrayers');
  let MaghribPrayerDisplay = document.getElementById('MaghribPrayers');
  let IshaPrayerDisplay = document.getElementById('IshaPrayers');
  let citySelect = document.getElementById('citySelect');
  let adhanSound = document.getElementById('adhanSound');
  let dateGregorianDisplay = document.getElementById('dateGregorian'); // عنصر التاريخ الميلادي

  if (!fajirPrayerDisplay || !DhuhrPrayerDisplay || !AsrPrayerDisplay || 
      !MaghribPrayerDisplay || !IshaPrayerDisplay || !citySelect || 
      !adhanSound || !dateGregorianDisplay) {
    console.error('One or more elements are not found in the HTML.');
    return;
  }

  await fetchPrayerTimes(citySelect.value);

  citySelect.addEventListener('change', async () => {
    await fetchPrayerTimes(citySelect.value);
  });

  async function fetchPrayerTimes(city) {
    let url = `https://api.aladhan.com/v1/calendarByCity/2024/6?city=${city}&country=Saudi Arabia&method=2`;
    let res = await fetch(url, { method: 'GET' });
    let data = await res.json();
    let dataArray = data.data;

    let dateHijri = document.getElementById('dateHijri');
    let day = document.getElementById('day');

    if (!dateHijri || !day) {
      console.error('Date elements are not found in the HTML.');
      return;
    }

    let objectFound = dataArray[4];

    dateHijri.innerText = objectFound.date.hijri.date;
    
    dateGregorianDisplay.innerText = objectFound.date.gregorian.date;

    fajirPrayerDisplay.innerText = objectFound.timings.Fajr;
    DhuhrPrayerDisplay.innerText = objectFound.timings.Dhuhr;
    AsrPrayerDisplay.innerText = objectFound.timings.Asr;
    MaghribPrayerDisplay.innerText = objectFound.timings.Maghrib;
    IshaPrayerDisplay.innerText = objectFound.timings.Isha;
    day.innerText = objectFound.date.hijri.weekday.ar;

    setInterval(() => {
      checkPrayerTimes(objectFound.timings);
    }, 60000); 
  }

  function checkPrayerTimes(prayerTimes) {
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();

    function isTimeForAdhan(prayerTime) {
      let [hours, minutes] = prayerTime.split(':');
      return currentHour == parseInt(hours) && currentMinute == parseInt(minutes);
    }

    if (
      isTimeForAdhan(prayerTimes.Fajr) ||
      isTimeForAdhan(prayerTimes.Dhuhr) ||
      isTimeForAdhan(prayerTimes.Asr) ||
      isTimeForAdhan(prayerTimes.Maghrib) ||
      isTimeForAdhan(prayerTimes.Isha)
    ) {
      adhanSound.play();
    }
  }
});
