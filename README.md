# cn

Calcul numeric teme.

# Development

In permanenta mereu inainte de a te apuca sa contribui la proiect
``` 
	git pull
```

Inainte de a modifica vre-un javascript file trebuie sa pornesti watchify

```bash
	npm start
```

Comanda vegheaza toate fisierele din `js/modules/*` in asa fel incat cand faci o modificare el da build si va suprascrie `js/build.js` iar acest fisier este inclus in html.

### De luat in vedere

Aplicatia e impratita in asa fel incat atunci cand vrei sa mai adaugi o tema mai intai o imporetezi in fisierul `controller.js` cu 
```
//controller.js
var tema = require('.tema');
``` 

si o incluse in `switch-ul` respectiv.

```
//controller.js
	var fn = function(nH, nX, echo){
		switch(nH) {
			case '1':
				switch(nX) {
					case '1':
						h1.Init();
						break;
					case '2':
					case '3':
					case '4':

```

     nH = numarul temei, nX = numarul exercitiului, echo = display mesaje