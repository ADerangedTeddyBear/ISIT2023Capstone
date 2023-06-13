import React from 'react';

export default function DesktopDisclaimer() {
  document.title = "Desktop Disclaimer"
    return (
      <>
        <br/>
        <h1>This webpage is designed for the future scope of the Admin side, providing them with the ability to add, remove, and update their products.</h1>

        <br/>
        <br/>
        <br/>
        <h1>To Access Application ⬇️</h1>
        <br/>
        <h3>This is a web-based mobile application. To access the mobile device toolbar,</h3>
        <h3>Press <b style={{ color: 'red' }}>F12</b> and use the keyboard shortcut <b style={{ color: 'red' }}>Ctrl + Shift + M</b> and <b style={{ color: 'red' }}>refresh the page.</b></h3>
        <br/>
        <br/>
        <h3>If you are using a <b style={{ color: 'red' }}>Mac with Safari</b>, follow these steps to view a webpage in mobile mode:</h3>
        <h4>1. Open Safari on your computer and navigate to the webpage you want to view.</h4>
        <h4>2. In the menu bar at the top of the screen, click on "Develop".</h4>
        <h4>3. If you do not see the "Develop" menu option, go to "Safari" - "Preferences" - "Advanced" and enable the checkbox labeled "Show Develop menu in menu bar".</h4>
        <h4>4. In the "Develop" menu, hover your cursor over "User Agent" and select the desired mobile device from the available options. You can choose from various models of iPhone, iPad, and iPod Touch.</h4>
        <h4>5. Safari will automatically reload the webpage, presenting it in a simulated environment that mimics the selected mobile device's screen size and behavior.</h4>
      </>
    );
}