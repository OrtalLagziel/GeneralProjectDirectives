 (function( $ ) {
    $(function() {
        var currentStatus = "CREATING_SERVICE";
        var idTimer = 0;
        var stepsIndex = {};
        stepsIndex["CREATING_SERVICE"] = "0";
       /* stepsIndex["CREATING_PIPLINE"] = "1";*/
        stepsIndex["UPLOAD_SERVICE"] = "1";
        stepsIndex["SERVICE_AVALIABLE"] = "2";

        var stepsMessages = {};
        stepsMessages["CREATING_SERVICE"] = "Creating your awesome service";
        /*stepsMessages["CREATING_PIPLINE"] = "Paving the way to the cloud";*/
        stepsMessages["UPLOAD_SERVICE"] = "Cloudifying your service";
        stepsMessages["SERVICE_AVALIABLE"] = "One awesome service is ready to go!";

        function goToAmoazon() {
            $.ajax({
                    method: "GET",
                    url: "http://127.0.0.1:9020/public/hw/getServiceUrl",
                    context: document.body
                })
                .done(function(data) {
                    /*alert( "success" );*/
                    console.log('goToAmoazon: success ' + data);
                    //window.location.href = data;
                    window.open(data, '_blank');
                })
                .fail(function(data) {
                    console.log('goToAmoazon: error ' + data);
                    alert( "error" );
                });
                $('#amazonLink')[0].style.display = 'none';
                $('.spinner')[0].style.display = 'inline-block';

        }
        function changeviewPage2To3(){
            var objServiceData = {

            };
            objServiceData.serviceName =  $('#apply_servicename')[0].value;
            objServiceData.servicePort =  $('#apply_portname')[0].value;
            $('.page2Container')[0].style.display = "none";
            $.ajax({
                    method: "POST",
                    data: JSON.stringify(objServiceData),
                    contentType:"application/json",
                    url: "http://127.0.0.1:9020/public/hw"

                })
                .done(function(data) {
                    console.log('success createing service');
                    idTimer  = setInterval(function(){ checkStatus(); }, 5000);
                    moveProgressBar();
                    var currentStatusStepMessage = stepsMessages["CREATING_SERVICE"];
                    $("div.page3Title")[0].innerHTML = currentStatusStepMessage;
                    //$( "div.finishStep" ).fadeIn( 1000 ).delay( 3000 ).fadeOut( 1000 );


                })
                .fail(function(data) {
                    console.log('error createing service')
            });
            $('#page1').addClass('animationPage2Move');
            $('.car').addClass('animationcar');
        }
        function changeviewPage1To2(){
            $('.logo').addClass('animationPage1Move');
            $('.page2Container').addClass('animationPage2Container');
        }
        function changeviewPage3To4(){
            clearInterval(idTimer);
            $('#page4').addClass('animationPage4Move');
            $('#background-wrap')[0].style.display = "none";

           /* $.ajax({
                method: "GET",
                  url: "http://127.0.0.1:9020/public/hw",
                  context: document.body
                })
              .done(function(data) {
                alert( "success" );
              })
              .fail(function(data) {
                debugger;
                alert( "error" );
              });*/
        }
        function animationlogo1(){
            $('.logo').addClass('animationlogo');
            //$('.page2Container').addClass('animationlogo');
        }
          function finishStepAlert(currentStatus){
             // $( "div.finishStep").
              var currentStatusStepIndex = stepsIndex[currentStatus];
              var currentStatusStepMessage = stepsMessages[currentStatus];

              if(currentStatusStepIndex === "2") {
                  setTimeout(changeviewPage3To4, 2000);
              }
              var widthStatusBar = currentStatusStepIndex * 50 + "%";
              document.getElementById("myBar").style.width = widthStatusBar;
              var stepIndexRepresentation = "step" + (parseInt(currentStatusStepIndex) + 1);
              document.getElementById(stepIndexRepresentation).className  += " fillSquere";

              $("div.page3Title")[0].innerHTML = currentStatusStepMessage;
              //$( "div.finishStep" ).fadeIn( 1000 ).delay( 3000 ).fadeOut( 1000 );

        }

        function checkStatus(){
            $.ajax({
                 method: "GET",
                 url: "http://127.0.0.1:9020/public/hw",
                 context: document.body
             })
             .done(function(data) {
                if(data !== currentStatus) {
                    currentStatus = data;
                    finishStepAlert(currentStatus);
                }
             })
            .fail(function(data) {
                console.log( "error" );
         });
        }
         $( "#changeviewPage1" ).click(changeviewPage1To2);
         $( "#changeviewPage2" ).click(changeviewPage2To3);
         $( "#changeviewPage3" ).click(changeviewPage3To4);
         $( "#finishStep" ).click(finishStepAlert);
         $( "#amazonLink" ).click(goToAmoazon);

         

        setTimeout(function(){ animationlogo1(); }, 300);
        setTimeout(function(){ changeviewPage1To2(); }, 4000);

        $( "#stopAnimation" ).click(function() {
            $( ".x1" ).addClass( "off" );
            $( ".x2" ).addClass( "off" );
            $( ".x3" ).addClass( "off" );
            $( ".x4" ).addClass( "off" );
            $( ".x5" ).addClass( "off" );
            $( ".wheel" ).addClass( "off" );
            $( ".x6" ).addClass( "off" );
            $( ".x7" ).addClass( "off" );
            $( ".x8" ).addClass( "off" );
            $( ".x9" ).addClass( "off" );
            $( ".x10" ).addClass( "off" );
            $( ".x11" ).addClass( "off" );
            $( ".x12" ).addClass( "off" );
            $( ".x13" ).addClass( "off" );
            $( ".x14" ).addClass( "off" );
            $( ".x15" ).addClass( "off" );
            $( ".x16" ).addClass( "off" );
        });
        $( "#startAnimation" ).click(function() {
            $( ".x1" ).removeClass( "off" );
            $( ".x2" ).removeClass( "off" );
            $( ".x3" ).removeClass( "off" );
            $( ".x4" ).removeClass( "off" );
            $( ".x5" ).removeClass( "off" );
            $( ".x6" ).removeClass( "off" );
            $( ".x7" ).removeClass( "off" );
            $( ".x8" ).removeClass( "off" );
            $( ".x9" ).removeClass( "off" );
            $( ".x10" ).removeClass( "off" );
            $( ".x11" ).removeClass( "off" );
            $( ".x12" ).removeClass( "off" );
            $( ".x13" ).removeClass( "off" );
            $( ".x14" ).removeClass( "off" );
            $( ".x15" ).removeClass( "off" );
            $( ".wheel" ).removeClass( "off" );
        });
    
     var id = 0;

    $( "#startProgressBar" ).click(moveProgressBar);
     $("#stopProgressBar" ).click(stopProgressBar);

        var id = 0;
        function moveProgressBar() {
         /* var elem = document.getElementById("myBar");
         
          id = setInterval(frame, 1000);
          function frame() {
            var fullwidth = document.getElementById("myBar").style.width;
            widthNum =  fullwidth .split("%")[0];
            if(widthNum !== "") {
              width  = parseInt(widthNum);
            }
           else {
                width = 1;
            }
            if (width >= 100) {
              clearInterval(id);
            } else {
              width++;
              elem.style.width = width + '%';
            }
          }*/
        }

        function stopProgressBar() {
           clearInterval(id);
        }
        });
    })( jQuery );