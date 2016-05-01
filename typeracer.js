var casper = require('casper').create();
casper.options.waitTimeout = 120000;

casper.start('http://play.typeracer.com/', function() {
  this.clickLabel('Enter a typing race', 'a')
  this.echo('Entered the race.');
});

casper.waitForSelector('.gameStatusLabel', function() {
  this.waitWhileSelector('.countdownPopup', function() {
    this.echo('Countdown over.');
    this.capture('countdown_over.png');

    var textToType = this.evaluate(function() {
      return document.querySelector('[id*=nhwMiddlegwt-uid-]').innerText;
    });
    var commandToNextWord = this.evaluate(function() {
      return document.querySelector('[id*=nhwMiddleCommagwt-uid-]').innerText;
    });

    while(textToType !== '') {
      this.echo('Typing: ' + textToType + commandToNextWord);
      this.click('.txtInput');
      this.sendKeys('.txtInput', textToType + commandToNextWord + ' ');
      this.capture('sending_keys.png');
      textToType = this.evaluate(function() {
        return document.querySelector('#nhwMiddlegwt-uid-8').innerText;
      });
      commandToNextWord = this.evaluate(function() {
        return document.querySelector('[id*=nhwMiddleCommagwt-uid-]').innerText;
      });
    }

    this.wait(5000, function() {
      this.capture('complete.png');
      this.echo('Complete!');
    });
  });
});
casper.run();
