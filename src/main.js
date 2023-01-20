require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, false); // 3rd argument true bypassing https requirement: not prod worthy

var buttonText, link, backgroundColor, borderColor, backgroundImage, borderRadius, fontSize, buttonWidth, buttonHeight, fontColor;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSettings () {
	document.getElementById('text-input-id-0').value = buttonText;
	document.getElementById('text-input-id-1').value = link;
	document.getElementById('text-input-id-2').value = backgroundColor;
	document.getElementById('text-input-id-3').value = borderColor;
	document.getElementById('text-input-id-4').value = backgroundImage;
	document.getElementById('text-input-id-5').value = borderRadius;
	document.getElementById('text-input-id-6').value = fontSize;
	document.getElementById('text-input-id-7').value = buttonWidth;
	document.getElementById('text-input-id-8').value = buttonHeight;
	document.getElementById('text-input-id-9').value = fontColor;

}

//function paintSliderValues () {
//}

function paintBlock() {
	// buttonText = document.getElementById('text-input-id-1').value;
	line1 = '<div><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="';
	link = document.getElementById('text-input-id-1').value;
	line2 = '" style="height:';
	height = document.getElementById('text-input-id-8').value;
	line3 = 'px;v-text-anchor:middle;width:';
	width = document.getElementById('text-input-id-7').value;
	line4 = 'px;" arcsize="';
	borderRadius = document.getElementById('text-input-id-5').value;
	arcSize = borderRadius * 3;
	line5 = '%" strokecolor="';
	borderColor = document.getElementById('text-input-id-3').value;
	line6 = '" fill="t"><v:fill type="tile" src="';
	backgroundImage = document.getElementById('text-input-id-4').value;
	line7 = '" color="';
	backgroundColor = document.getElementById('text-input-id-2').value;
	line8 = '" /><w:anchorlock/><center style="color:';
	fontColor = document.getElementById('text-input-id-9').value;
	line9 = ';font-family:sans-serif;font-size:';
	fontSize = document.getElementById('text-input-id-6').value;
	line10 = 'px;font-weight:bold;">';
	buttonText = document.getElementById('text-input-id-0').value;
	line11 = '</center></v:roundrect><![endif]--><a href="';
	// link
	line12 = '" style="background-color:';
	// backgroundColor
	line13 = ';background-image:url(';
	// backgroundImage
	line14 = ');border:1px solid ';
	// borderColor
	line15 = '; border-radius:';
	// borderRadius
	line16 = 'px;color:';
	// fontColor
	line17 = ';display:inline-block;font-family:sans-serif;font-size:';
	// fontSize
	line18 = 'px;font-weight:bold;line-height:';
	// height
	line19 = 'px;text-align:center;text-decoration:none;width:';
	// width
	line20 = 'px;-webkit-text-size-adjust:none;mso-hide:all;">';
	// buttonText
	line21 = '</a></div>'
	//if (!background) {
	//	return;
	//}
	sdk.setContent( line1 + link + line2 + height + line3 + width + line4 + arcSize + line5 + borderColor + line6 + backgroundImage + line7 + backgroundColor + line8 + fontColor + line9 + fontSize + line10 + buttonText + line11 + link + line12 + backgroundColor + line13 + backgroundImage + line14 + borderColor + line15 + borderRadius + line16 + fontColor + line17 + fontSize + line18 + height + line19 + width + line20 + buttonText + line21 );
	sdk.setData({
		buttonText: buttonText,
		link: link,
		backgroundColor: backgroundColor,
		borderColor: borderColor,
		backgroundImage: backgroundImage,
		arcSize: arcSize,
		borderRadius: borderRadius,
		fontSize: fontSize,
		buttonWidth: buttonWidth,
		buttonHeight: buttonHeight,
		fontColor: fontColor
	});
	localStorage.setItem('buttonText', buttonText);
	localStorage.setItem('link', link);
	localStorage.setItem('backgroundColor', backgroundColor);
	localStorage.setItem('borderColor', borderColor);
	localStorage.setItem('borderRadius', borderRadius);
	localStorage.setItem('fontSize', fontSize)
	localStorage.setItem('buttonWidth', buttonWidth);
	localStorage.setItem('buttonHeight', buttonHeight);
	localStorage.setItem('fontSize', fontSize);
	localStorage.setItem('fontSize', arcSize);
}

sdk.getData(function (data) {
	//background = data.background || localStorage.getItem('background');
	buttonText = data.buttonText || localStorage.getItem('buttonText') || 'Show me the monkey 🐒!';
	link = data.link || localStorage.getItem('link') || '';
	backgroundColor = data.backgroundColor || localStorage.getItem('backgroundColor') || '#000000'; 
	borderColor = data.borderColor || localStorage.getItem('borderColor') || '#000000';
	backgroundImage = data.backgroundImage || localStorage.getItem('backgroundImage') || '';
	borderRadius = data.borderRadius || localStorage.getItem('borderRadius') || '';
	fontSize = data.fontSize || localStorage.getItem('fontSize') || '18';
	buttonWidth = data.buttonWidth || localStorage.getItem('buttonWidth') || '200';
	buttonHeight = data.buttonHeight || localStorage.getItem('buttonHeight') || '40';
	fontColor = data.fontColor || localStorage.getItem('fontColor') || '#FFFFFF';
	arcSize = data.arcSize || localStorage.getItem('arcSize') || '0';
	paintSettings();
	//paintSliderValues();
	paintBlock();
});

document.getElementById('workspace').addEventListener("input", function () {
	debounce(paintBlock, 500)();
	paintSliderValues();
});
