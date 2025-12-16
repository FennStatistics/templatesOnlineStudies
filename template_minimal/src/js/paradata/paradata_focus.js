var paradefocuscount = 0;
var arraydefocusevent = [];
var lastBlurTimestamp;


if(false){ // turn on and off focus event listener for debugging
    function enterFullscreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // for IE11 (remove June 15, 2022)
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // iOS Safari
            document.documentElement.webkitRequestFullscreen();
        }
    }
    
                 
    window.addEventListener('load', (e) => {
        document.getElementById('alert').style.visibility = "visible";
        document.getElementById('hideall').style.visibility = "hidden";
    });
    
    
window.addEventListener('blur', (e) => {
  setTimeout(() => {
    // Now visibilityState is up to date
    if (document.visibilityState !== 'hidden') {
      // Still visible → likely just clicked the iframe → ignore
      return;
    }

    // Real defocus (tab change / window minimized)
    paradefocuscount++;
    document.getElementById('alert').style.visibility = "visible";
    document.getElementById('hideall').style.visibility = "hidden";
    lastBlurTimestamp = e.timeStamp;  // or Date.now() if you prefer
  }, 50); // 50–100 ms is usually enough
});
    
    
    window.addEventListener('focus', (e) => {
        var durDefocus = e.timeStamp - lastBlurTimestamp;
        //console.log('duration:', duration)
        //console.log('sender', this.state.sender)
        if(study.internals.currentComponent.options.title != null){
            arraydefocusevent.push({
                "durationblur": durDefocus,
                "senderblur": study.internals.currentComponent.options.title
            })
            console.log("durDefocus: ", durDefocus, "senderblur: ", study.internals.currentComponent.options.title)
        }
        study.options.datastore.set('para_defocuscount', arraydefocusevent);
    })
}
