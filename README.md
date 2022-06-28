# GreatReads
You will need to setup python env and npm
# Deploy locally:
In the terminal where django will be runn(cd to GreatReads)
```
python manage.py runserver
```
In the terminal where react will be run(cd to GreatReads/frontend)
```
npm start
```
# How to update react build that django is using:
build react again
```
npm run build
```
# The website django is showing doesn't update when I modify react files:
Django just uses the files generated by npm run build. Just rebuild it

