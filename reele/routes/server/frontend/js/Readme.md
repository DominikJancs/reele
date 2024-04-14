# javascript mappa dokumentációja

Ez a mappa tartalmazza a weboldal javascript fájljait.

## characterCounter.js

A charaters ellenőrzi, hogy a karakterlánc hossza megfelelő-e.

## clubLineGenerator.js

A generateClubLine a csatlakozott klubokat szúrja be a weboldalra.

A generateTop5 az öt legnépszerűbb klubot szúrja be a weboldalra.

## colorGenerator.js

A kód alap részét a [stackoverflor](https://stackoverflow.com/questions/5162828/how-to-get-the-average-or-main-color-from-an-image-with-javascript) oldal egyik válaszától vettük és dolgoztuk dovább. A választ [Wayne](https://stackoverflow.com/users/592746/wayne) tette közzé a weboldalon.

A generateColor megvizsgálja, hogy megfelel-e minden, és meghívja a további eseményket.

A displayColor kiválasztja, hogy milyen esetre szeretnénk felhasználni az átlag szín kikérését, mivel a megfelelő formában fogja visszaküldeni.

A processInput az átlag színt a képen.

A isGray, isWhite, és a isBlack azt vizsgálja meg, hogy a szín fehér, fekete, vagy szürke, ha igen, akkor keresünk egy másik színt a processInput-al.

## docPHandler.js

Ez a fájl megnézi, hogy a feltöltött állomány megfelel-e az elvártaknak, és közli azt a felhasználóval.

A checkDoc megnézi, hogy a pdf megfelel-e a feltételeknek.

## FRvalidator.js

A validmail megvizsgálja, hogy az ímél cím ímél formátumú-e.

A validPass megvizsgálja, hogy a jelszó megfelel-e az elvártaknak (legalább egy kis és nagy betű, egy speciális karakter, és legalább hat karakterrel rendelkezik).

## genremerch.js

A handlegenreItem megnézi, hogy az a műfaj már ki volt-e választva a kereséshez vagy nem, és ahhoz megfelelően hívja meg a további eseményket.

A clearSearch leveszi a kijelölést a keresett műfajról.

## handlegenreItem.js

A handlegenreItem megnézi, hogy a műfaj már hozzá volt-e adva a klubhoz vagy nem.

## handlelibraItem.js

A chkLibra megnézi, hogy a megadott szabály megfelel-e a követelményeknek.

A addLibra hozzáadja az új szabály miután a chkLibra megvizsgálta.

A removeLibra eltávolítja a legutóbb megadott szabályt.

A clearLibraInp kitörli a már hozzáadott elemet a beviteli mezőből.

## imgCHandler.js

Ez a fájl betölti a felhasználó által megadott képet a klubra.

A resetDefCB visszaállítja az alap állapotot ha a klub borító kép nem felel meg.

A resetDefCI visszaállítja az alap állapotot ha a klub profil kép nem felel meg

A checkImg megnézi, hogy a klubra megadott kép megfelel-e a követelményeknek.

## imgHandler.js

Ez a fájl betölti a felhasználó által megadott új képet, és megvizsgálja, hogy megfelelő-e.

A checkImg megvizsgálja, hogy a kép megfelel-e a követelményeknek.

## imgPHandler.js

Ez a fájl betölti a felhasználó által megadott borítóképet a posztra.

A resetDefCo visszaállítja a borítófeltöltő mező alapértelmezett állapotát (rossz borítókép esetén).

A checkImg megnézi, hogy a poszt borítóképe megfelel-e a követelményeknek.

A replaceMsg kicseréli a weboldal által a felhasználónak küldött üzenetet (a borítókép megfelel-e vagy nem).

## jquery-3.7.1.js

A jquery 3.7.1.-es verzióját használjuk a weboldalon.

## mouseDrag.js

Ez a fájl az egér mozgást figyeli a profilon lévő tabokon amikor a bal egér le van nyomva.

## mreeleGenerator.js

A generateMreele beszúrj a kedvencként megjelölt posztokat a weboldalra.

## onscroll.js

A scrollAct megnézi, hogy a weboldalon lévőlapozás felfele vagy lefele megy.

A scrollShow az alapján, hogy felfele megy a görgetés vagy nem eltünteti, vagy megjeleníti az adatokat.

A clearClass eltünteti az adatokat.

## personalTabHandler.js

A setcurr megnézi, hogy a cancel gombot nyomtuk-e meg vagy nem a profilváltoztatásnál.

A resetEditForm visszaállítja a weboldalt eredeti állapotába.

A toclipboard vágólapra másolja a jelszót.

A applyEditAction megnézi, hogy editelni kívánjuk-e a jelszót vagy a már megadott új jelszót kívánjuk feltölteni.

A addCancel hozzáadja a mégse gombot.

## placeindicator.js

A indicateUIreq megnézi, hogy a regisztrációs vagy a bejelentkezéses részén vagyunk a weboldalnak, és az alapján továbbküldi az adatokat.

A indicateSignreq megnézi, hogy a jelszavak egyeznek-e a regisztrációnál.

A indicateLogreq meghívja azokat az eseményeket amelyek megnézik, hogy az ímél meg a jelszó valid-e meg, hogy ki vannak-e töltve a mezők.

A emailPassValid megnézi, hogy a jelszó meg az ímél valid-e (megfelelnek-e az elvárt követelményeknek).

A inpEmptyCheck megnézi, hogy a kitöltendő mezők üresek-e.

A indicateUIres átváltja az ikonokat a hibát jelző ikonokra.

## postGenerator.js

A generatePost beszúrja az összes posztot a weboldalra.

A removePost eltünteti az összes beszúrt posztot.

## profileActH.js

Az acAc figyeli, hogy a profilkép feltöltése sikeres volt, vagy nem.

Az acBc figyeli figyeli, hogy a jelszót változtatni kívántuk-e.

Az acDes figyeli, hogy a leírást változtatni akarták-e.

A profileCh figyeli, hogy a profilkép változtatása sikeres volt-e, ha igen akkor megváltoztatja a profilképet a weboldalon.

A replaceMsg kicseréli az üzenetet a felhasználónak, hogy sikeres volt a változtatás, vagy nem.

A chkUpInp megnézi, hogy a kép jó-e, és ha nem akkor berakja az alap képet a helyére.

A checkImg ellenőrzi a képet, hogy megfelelő-e az elvárásoknak.

## searchbarMech.js

A kereső bárra való nyomással láthatóvá teszi az opciót, hogy mire akar keresni a felhasználó (poszt, klub).

## sidebarMech.js

A sideBarAct nyitja és zárja az oldal bárokat amikor a képernyő kissebb mint 1200 pixel.

A clearAlayer törli az oldalsávok átlátszóságát.

A closeall bezárja az összes oldalsávot.

## tab-switcher.js

A settab eldönti, hogy a felhasználó melyik tabra ment át és az alapján meghívja a tabokat formázó függvényeket.

A setDefuPRo beállítja az alap profilképet.

A setProUrl beállítja a felhasználó profilképét.

A loadBlob betölti a jelszót.

A setActive azt a gombot teszi aktívvá amelyiken éppen áll a felhasználó.

A clearTabs eltünteti azt az osztályt amin a felhasználó éppen nem áll.

## tab.js

A setActive azt a gombot teszi aktívvá amelyiken éppen áll a felhasználó.

## testIndicator_2.js

A poszt megtekintési oldal hátterét színátmenetesre állítja a generateColor meghívásával.

## testIndicator.js

A profil oldal hátterét színátmenetesre állítja a generateColor meghívásával.

## thoughtGenerator.js

A generateThought beszúrja a kommenteket a weboldalra.

A removeThought törli az eddig beszúrt kommenteket.

## thoughtInteract.js

A setPageIndex beállítja a komment íráshoz az indexet.

A setDefPageIndex beállítja az alapértelmezett lap indexet.

A scrollToPage elviszi a lapra indexre nyomás alapján a kommentekből.