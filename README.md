# CarQuery API

Wrapper for the [CarQuery](http://www.carqueryapi.com/) API in JavaScript with Promise support.

## Installing
Using npm:
```
npm install car-query
```

## Example

Initialize the CarQuery object.
```javascript
const carQuery = new CarQuery();
```

Retrieve the minimum and maximum years in the CarQuery database.
```javascript
carQuery.getYears()
    .then(years => {
        // Process data
    });
```

Retrieve all of the makes produced in a given year.
```javascript
carQuery.getMakes(2018)
    .then(makes => {
        // Process data
    });
```

Retrieve all of the models meeting the search criteria.
```javascript
const searchCriteria = {
    year: 2018,
    make: 'Ford'
}

carQuery.getModels(searchCriteria)
    .then(models => {
        // Process data
    });
```

Retrive detailed information on the specified model by ID number.
```javascript
carQuery.getModelDetail(44859)
    .then(years => {
        // Process data
    });
```

Add more search criteria
```javascript
const searchCriteria = {
    year: 2018,
    make: 'Ford',
    soldInUSA: true,
    body: Bodystyle.SUV
}

carQuery.getModels(searchCriteria)
    .then(models => {
        // Process data
    });
```

Retrieve trim data for models meeting the search criteria.
```javascript
const searchCriteria = {
    year: 2018,
    make: 'Ford',
    model: 'Escape'
}

carQuery.getTrims(searchCriteria)
    .then(trims => {
        // Process data
    });
```

## API
### Instance methods
```javascript
getYears();
```

```javascript
getMakes(year[, soldInUSA]);
```

```javascript
getModels(params);
```

```javascript
getTrims(params);
```

```javascript
getModelDetail(modelId);
```

## Known Issues
The CarQuery API does not contain the Access-Control-Allow-Origin header in its responses, so this package cannot be used within a browser.