

// This code is kind of horrible, isn't there a better way?
function dohtmlreplace(element) {     
	var nodes = element.childNodes;
	for (var n=0; n<nodes.length; n++) {
		if (nodes[n].nodeType == Node.ELEMENT_NODE) {
			var r = new RegExp('\\$(\\s*)([0-9,]*\\d(\\.\\d+)?)', 'gi');
			l = 0
			nc = ''
			do {
				m = r.exec(nodes[n].innerHTML);
				if (r.lastIndex != 0) {
					z = parseFloat(m[2].replace(',',''));
					x = z;
					o = Math.pow(10, Math.floor(Math.log(z) / Math.LN10) - 1);
					x = Math.ceil(z / o);
					/*if (Math.floor(z / o) % 10 == 9) {
						x = x + 1
					}*/
					x = x * o;
					//diff = z - x
					dp = 0
					if (m[3]) {
						dp = m[3].length-1					
					}
					nu = '<span title="' + m[0] + '">$' + m[1] + x.toFixed(dp) + '</span>'; // + '(' + diff.toFixed(2) + ')';
					app = nodes[n].innerHTML.substring(l, r.lastIndex-m[0].length) + nu
					nc = nc + app;
					l = r.lastIndex
				}
			} while (r.lastIndex != 0);
			nodes[n].innerHTML = nc + nodes[n].innerHTML.substr(l)
		} else {
			dohtmlreplace(nodes[n]);
		}
	}
}
dohtmlreplace(document.body);