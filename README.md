[![Stories in Ready](https://badge.waffle.io/modernnights/modernnights.png?label=ready&title=Ready)](https://waffle.io/modernnights/modernnights)
# Modern Nights
A character generator for classic World of Darkness, 20th anniversary edition

[![Coverage Status](https://coveralls.io/repos/github/modernnights/modernnights/badge.svg?branch=master)](https://coveralls.io/github/modernnights/modernnights?branch=master)
[![Dependency Status](https://david-dm.org/modernnights/modernnights.svg)](https://david-dm.org/modernnights/modernnights)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/modernnights/modernnights/LICENSE)

## Environment Variables
In order to get this to run you'll have to set several environment variables:
```
PORT
SQLUSER
SQLPASS
SQLPORT
```
They are pretty self-explanatory.
Right now `npm start` is set up to run `start_script` which is not included in the repo.
Currently that consists of the following code:
```
#!/bin/bash
PORT=a_number SQLUSER='a_user_name' SQLPASS='a_password' SQLPORT=a_number ./server/bin/www
```
You can use this to set your environment variables if you want. Otherwise, simply `EXPORT` them

## API endpoints
```
GET    /api/whoami

GET    /api/players

GET    /api/monsters
GET    /api/monsters/<id>

GET    /api/monsters/<id>/canbuy

GET    /api/archetypes
GET    /api/archetypes/<id>

GET    /api/paths
GET    /api/paths/<id>

GET    /api/stats
GET    /api/stats/<id>

GET    /api/stats/<id>/cost/<monsterID>

GET    /api/characters

POST   /api/characters

GET    /api/players/<id>/characters

GET    /api/characters/<id>
GET    /api/characters/<dbref>

PUT    /api/characters/<id>
PUT    /api/characters/<dbref>

GET    /api/characters/<id>/<stat>
GET    /api/characters/<dbref>/<stat>

PUT    /api/characters/<id>/<stat>
PUT    /api/characters/<dbref>/<stat>

GET    /api/characters/<id>/<stat>/specialties
GET    /api/characters/<dbref>/<stat>/specialties

GET    /api/characters/<id>/<stat>/specialties/<id>
GET    /api/characters/<dbref>/<stat>/specialties/<id>

POST   /api/characters/<id>/<stat>/specialties
POST   /api/characters/<dbref>/<stat>/specialties

GET    /api/characters/<id>/<pool>
GET    /api/characters/<dbref>/<pool>

PUT    /api/characters/<id>/<pool>
PUT    /api/characters/<dbref>/<pool>

POST   /api/characters/<id>/<pool>/burn
POST   /api/characters/<dbref>/<pool>/burn

DELETE /api/characters/<id>
DELETE /api/characters/<dbref>

GET    /api/characters/<id>/rarity
GET    /api/characters/<dbref>/rarity

GET    /api/characters/<id>/xp
GET    /api/characters/<dbref>/xp

GET    /api/characters/<id>/lineage
GET    /api/characters/<dbref>/lineage
```
