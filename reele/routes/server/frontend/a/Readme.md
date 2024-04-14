# Admin mappa dokumentációja

Ez a mappa tartalmaz minden admin oldali frontend kódot.

## admin.hbs

A megjelenő oldal html kódját tartalmazza.

## aHandler.js

Ez a fájl kéri le a megjelölt clubokat, majd az abban lévő megjelölt posztokat. Ezek mellett ez a fájl tartalmazza a kódot ami majd le fogja venni a megjelölést a posztról és azt is ami majd törölni fogja a posztot az api végpont meghívásával. 

## clubGenerator.js

A klub adatok lekérése után az adatbázisból, ez a fájl legenerálja a klubot az előbb lekérdezett adatokkal együtt.

## postsGenerator.js

A poszt adatok lekérése után az adatbázisból, ez a fájl generálja le a posztokat a megadott adatokkal együtt.