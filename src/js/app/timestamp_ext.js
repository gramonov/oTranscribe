/******************************************
               Timestamp
******************************************/


oT.timestamp = {
    split: function(hms){
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 + (+a[1]);
        return seconds;
    },
    get: function(){
        // get timestamp
        if (!oT.player || !oT.player.getTime) {
            return false;
        }
        var time = oT.player.getTime();
        var minutes = Math.floor(time / 60);
        var seconds = ("0" + Math.floor( time - minutes * 60 ) ).slice(-2);
        return minutes+":"+seconds;
    },
    seconds: function(){
        // get timestamp in seconds
        if (!oT.player || !oT.player.getTime) {
            return false;
        }
        var time = oT.player.getTime();
        var seconds = Math.floor(time * 10) / 10;
        return seconds;
    },
    insert: function(){
        var time = oT.timestamp.get();
        if (time) {
            document.execCommand('insertHTML',false,
            '<span class="timestamp" contenteditable="true" data-timestamp="' + oT.timestamp.get() + '" >' + oT.timestamp.seconds() + '</span>&nbsp;'
            );
            oT.timestamp.activate();
        }
    },
    activate: function(){
        $('.timestamp').each(function( index ) {
            $( this )[0].contentEditable = true;
            $( this ).off().click(function(){
                var time = $( this ).attr('data-timestamp') || $(this).text();
                oT.player.skipTo( oT.timestamp.split(time) );
            })
        });
    }
}

// backwards compatibility, as old timestamps use setFromTimestamp() and ts.setFrom()
window.setFromTimestamp = function(clickts, element){
    ts.setFrom(clickts, element);
}
window.ts = {
    setFrom: function(clickts, element){
        if (element.childNodes.length == 1) {
            oT.player.skipTo( oT.timestamp.split(clickts) );
        }
    }
}
