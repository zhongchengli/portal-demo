<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <title>Mumba</title>
        <link rel="stylesheet" href="index.css">
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="zepto.min.js"></script>
        <script type="text/javascript" src="bowser.min.js"></script>
    </head>
    <body>
        <splash-loader>
            <img src="assets/logo.png">
            <splash-loader-spinner></splash-loader-spinner>
        </splash-loader>
        <section>
            <log></log>
                <img src="assets/logo.png">
            </logo>
            <alias-box>
                <alias-notice>Please enter the code from your website to bind app; or try the code `demo`</alias-notice>
                <input id="alias" type="text" placeholder="ENTER CODE">
                <alias-button>GO</alias-button>
            </alias-box>

        </section>
        <script type="text/javascript" src="index.js"></script>
    </body>
</html>