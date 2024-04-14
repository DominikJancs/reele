# mini-routerek mappa dokumentációja

Ez a mappa tartalmazza a a frontend és backend közötti kommunikációs javascript fájlokat, meg az oldalak közötti átirányítást.

## cHandler.js

A chkClubInf leellenőrzi a beküldött adatokat. 

A createclub az adatok alapján léterhozza a klubot. 

A dspCErr hibaüzenetek jelenít meg, potenciális hiba esetén.

## clubGet.js

A joinedClub lekéri azokat a klubokat amelyekbe a felhasználó csatlakozva van.

A top5club az 5 legnépszerűbb klubbot kéri le.

## goBack.js

A visszagombok lenyomása esetén visszalépteti a felhasználót a fő oldalra.

## hHandler.js

Átirányítja a kiválasztott klub oldalára a felhasználót. A logo lenyomásával meg visszairányítja a főoldalra.

## hLog.js

Menü kiválasztásával átirányítja a felhasználót a profil oldalra.

Menü kiválasztásával kijelentkezteti a felhasználót majd átirányítja őt a fő oldalra.

## interact_UI.js

A toggleto átváltja az oldalt a bejelentkezéses formából a regisztrációssá, vagy a másik esetbe fordítva.

A clearValues kitörli az összes adatot az inputokból.

A resetImg visszaállítja a képet az alap képre.

A setDefault visszaállítja az inputokat az alap értékre és az ikonokat az alap ikonra.

## interact.js

Először eldönti, hogy a felhasználó váltani szeretne az oldalak között, vagy használni az adott funkciót (regisztráli, vagy bejelentkezni). Majd utána továbbküldi a megfelelő eseményre, a toggleto-ra (váltás) vagy a catchroute-ra (funkció használatá-ra).

A catchroute regisztrálja vagy bejelentkezteti a felhasználót, regisztráció esetén később még a kiválasztott felhasználó képet is feltölti.

## joinHandler.js

Először megvizsgálja, hogy a felhasználó csatlakozhat-e a klubba vagy nem.

A clubJoin csatlakoztatja, vagy eltávolítja a felhasználót a klubból.

## laLog.js

Átirányítja a felhasználót a főoldalra, és kijelentkezteti az admint kérés esetén.

## makeClub.js

Átirányítja a felhasználót a klub létrehozás oldalra.

## pHandler.js

A upActIc kicseréli a régi profilképet az újra egy backend hívással.

A upActPass kicseréli a régi jelszót az újra egy backend hívással.

A upActDes kicseréli a régi leírást az újra egy backend hívással, vagy újat ad meg, ha még nem volt megadva.

## postGetC.js

A genreSearch műfaj alapján kéri le a posztokat a klub oldalra (csak az adott klubban posztolt posztokat kéri le).

A getAll az összes posztot lekéri az adatbázisból a klub oldalra (csak az adott klubban posztolt posztokat kéri le).

A yourReeles a felhasználó által kedvencként megjelölt posztokat kéri le a klub oldalra (csak az adott klubban posztolt posztokat kéri le).

## postGetH.js

A genreSearch műfaj alapján kéri le a posztokat a fő oldalra.

A getAll az összes posztot lekéri az adatbázisból a fő oldalra.

A yourReeles a felhasználó által kedvencként megjelölt posztokat kéri le a fő oldalra.

## postGetP.js

A yourReeles a felhasználó által kedvencként megjelölt posztokat kéri le a profil oldalra.

## postHandler.js

Betölti a klubban megadott műfajokat, hogy majd lehessen választani közülük. Meg végigvezeti az adatokat az összes eseményen.

A createPost létrehozza a posztot a megadott adatok alapján.

A chkPostInf ellenőrzi a poszt létrehozása közben megadott adatok helyességét.

A dspPErr a poszt létrehozásánál felmerülő hibákat jeleníti meg a felhasználónak.

## postThought.js

A thougtAction feltölti a kommentet az adatbázisba.

A chkPageIndex ellenőrzi, hogy az index helyes-e.

A getThoughts lekéri a kommenteket.

A sendVote feltölti a kommentre leadott szavazatot.

A dspVote kezeli a szavazatokat.

A deactivateBank inaktívvá teszi a gombokat, amikor nem szavaztunk.

A activateVote fényessé teszi azt a gombot, ahoz függően, hogy fel vagy le szavaztunk.

## redirect.js

Elősegíti a lap váltásokat, hogy nem kelljen az egyész url-t beírni, csak a függvényt meghívi.

## reeleH.js

Meghívaja a posztfeltöltés függvényt gombnyomásra.

## reeleInteract.js

A flagAction elhelyezi a zászlót a kifogásolhatókéne megjelölt posztokra.

A reeleAction elhelyezi a posztot a kedvencek között.

A bookMarkAction egy könyvjelzőt helyez el a kiválasztott lapon.

## reglog.js

Átteszi a felhasználót a regisztrációs vagy a bejelentkezéses oldalra.

## routescript.js

Ez a fájl a route scripteket tartalmazza.