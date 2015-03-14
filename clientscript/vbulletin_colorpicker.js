/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.2.2
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/
vBulletin.events.systemInit.subscribe(function(){init_color_picker_page("profileform")});var color_picker;function vB_ColorPicker(){this.cpid="colorpicker";this.previewid="";this.inputid="";this.init()}vB_ColorPicker.prototype.init=function(){var B=new Array(5,4,3,2,1,0,0,1,2,3,4,5);var K=new Array(0,5,4,3,2,1,0,0,1,2,3,4,5,5,4,3,2,1,0);var D=new Array("00","33","66","99","CC","FF");var G=new Array("#000000","#333333","#666666","#999999","#CCCCCC","#FFFFFF","#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF");var J,I,L,N;var C=fetch_object(this.cpid+"_swatches_container");C.innerHTML="";var E=C.appendChild(document.createElement("table"));E.cellPadding=0;E.cellSpacing=1;E.border=0;E.width="100%";E.id="colorpicker_swatches";var M=document.createElement("tbody");E.appendChild(M);for(I=0;I<12;I++){N=document.createElement("tr");M.appendChild(N);for(J=0;J<19;J++){L=document.createElement("td");L.id="sw"+J+"-"+I;L.className="pickerswatch";L.innerHTML='<img src="'+cleargifurl+'" width="11" height="11" />';N.appendChild(L);if(J==0){L.style.background=G[I]}else{var A=Math.min(5,Math.floor((18-J)/6)*2+Math.floor(I/6));var F=B[I];var H=K[J];L.style.background="#"+D[A]+D[F]+D[H]}}}this.select_handler=new vB_Select_Overlay_Handler(this.cpid);YAHOO.util.Event.on(E,"click",this.swatch_click,this,true);YAHOO.util.Event.on(E,"mouseover",this.swatch_hover,this,true);YAHOO.util.Event.on(this.cpid+"_transparent","click",this.transparent_click,this,true);YAHOO.util.Event.on(this.cpid+"_close","click",this.close_click,this,true)};vB_ColorPicker.prototype.update_new_color=function(A){fetch_object(this.cpid+"_surround_new").style.background=fetch_object(A).style.backgroundColor};vB_ColorPicker.prototype.open=function(C){if(C){this.previewid=C;this.inputid=C.replace(/_preview/,"")}if(is_color(fetch_object(this.inputid).value,fetch_object(this.cpid+"_surround_old"))){fetch_object(this.cpid+"_surround_old").style.background=fetch_object(this.inputid).value;fetch_object(this.cpid+"_surround_new").style.background=fetch_object(this.inputid).value}var B=fetch_object(this.previewid);var E=YAHOO.util.Dom.getX(B);var A=YAHOO.util.Dom.getY(B)+B.offsetHeight;var D=fetch_object(this.cpid);D.style.left=E+"px";D.style.top=A+"px";D.style.display="";if(E+D.offsetWidth>document.body.clientWidth){E-=E+D.offsetWidth-document.body.clientWidth;D.style.left=E+"px"}this.select_handler.hide()};vB_ColorPicker.prototype.close=function(){fetch_object(this.cpid).style.display="none";this.select_handler.show()};vB_ColorPicker.prototype.swatch_hover=function(B){var A=this.getAncestorOrThisByClassName(YAHOO.util.Event.getTarget(B),"pickerswatch");if(!A){return }this.update_new_color(A.id)};vB_ColorPicker.prototype.swatch_click=function(B){var A=this.getAncestorOrThisByClassName(YAHOO.util.Event.getTarget(B),"pickerswatch");if(!A){return }fetch_object(this.inputid).value=this.fetch_hex_color(A.style.backgroundColor);update_color_preview(this.inputid);this.close()};vB_ColorPicker.prototype.close_click=function(A){this.close()};vB_ColorPicker.prototype.transparent_click=function(A){fetch_object(this.inputid).value="";update_color_preview(this.inputid);this.close()};vB_ColorPicker.prototype.getAncestorOrThisByClassName=function(B,A){if(B.className&&B.className==A){return B}else{return YAHOO.util.Dom.getAncestorByClassName(B,A)}};vB_ColorPicker.prototype.fetch_hex_color=function(A){if(A.substr(0,1)=="r"){colorMatch=A.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);for(var B=1;B<4;B++){colorMatch[B]=parseInt(colorMatch[B]).toString(16);if(colorMatch[B].length<2){colorMatch[B]="0"+colorMatch[B]}}A="#"+(colorMatch[1]+colorMatch[2]+colorMatch[3]).toUpperCase()}return A.toUpperCase()};function update_color_preview(B){var A=fetch_object(B+"_preview");var C=fetch_object(B);C.value=PHP.trim(C.value);if(is_transparent(C.value)){A.style.background="none";A.style.borderStyle="dashed";A.style.borderWidth="1px"}else{if(is_color(C.value,A)){A.style.background=C.value;A.style.borderStyle="inset";A.style.borderWidth="1px"}else{A.style.background="";A.style.borderStyle="dashed";A.style.borderWidth="1px"}}}function is_color(D,F){var A=new RegExp("^(#?([a-f0-9]{3}){1,2}|\d{1,3}s*,s*\d{1,3}s*,s*\d{1,3}|[a-z0-9]+)$","gi");if(!D.match(A)){return false}if(F){var C=true;var E=F.style.background;try{F.style.background=D;C=false}catch(B){}if(C){F.style.background=E;return false}}return true}function is_transparent(A){return(A==""||A=="none"||A=="transparent")}function init_color_picker_page(D){var A;var B=fetch_tags(fetch_object(D),"input");for(var C=0;C<B.length;C++){if(B[C].id&&B[C].id.substr(0,8)=="usercss_"){A=fetch_object(B[C].id+"_preview");if(A){YAHOO.util.Event.on(A,"click",display_color_picker);YAHOO.util.Event.on(B[C],"change",input_color_change);update_color_preview(B[C].id)}}}}function display_color_picker(){if(!color_picker){color_picker=new vB_ColorPicker()}if(typeof (background_picker)!="undefined"){background_picker.close()}color_picker.open(this.id)}function input_color_change(){var A=new RegExp("^[a-f0-9]{3}([a-f0-9]{3})?$","gi");if(this.value.match(A)){this.value="#"+this.value}update_color_preview(this.id)};